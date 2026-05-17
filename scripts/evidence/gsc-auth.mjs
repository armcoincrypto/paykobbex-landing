import fs from "node:fs";
import crypto from "node:crypto";
import { safeErrorMessage } from "./redact.mjs";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function readServiceAccount() {
  const path = process.env.GSC_CREDENTIALS_PATH?.trim();
  if (!path || !fs.existsSync(path)) {
    return {
      ready: false,
      blocker:
        "GSC_CREDENTIALS_PATH is not set or file missing. Add a Google Cloud service account JSON path to .env.local with Search Console API access.",
    };
  }
  try {
    const raw = JSON.parse(fs.readFileSync(path, "utf8"));
    if (!raw.client_email || !raw.private_key) {
      return { ready: false, blocker: "GSC credentials JSON missing client_email or private_key." };
    }
    return { ready: true, clientEmail: raw.client_email, privateKey: raw.private_key };
  } catch (err) {
    return { ready: false, blocker: `GSC credentials unreadable: ${safeErrorMessage(err)}` };
  }
}

async function signJwt(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64url(
    JSON.stringify({
      iss: sa.clientEmail,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsigned = `${header}.${payload}`;
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(unsigned);
  sign.end();
  const signature = sign
    .sign(sa.privateKey)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return `${unsigned}.${signature}`;
}

export function getGscConfig() {
  const siteUrl =
    process.env.GSC_SITE_URL?.trim() || "https://pay.kobbex.com/";
  const sa = readServiceAccount();
  if (!sa.ready) {
    return { ready: false, siteUrl, blocker: sa.blocker };
  }
  return { ready: true, siteUrl, clientEmail: sa.clientEmail, privateKey: sa.privateKey, blocker: null };
}

export async function getGscAccessToken(config) {
  const assertion = await signJwt(config);
  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion,
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.access_token) {
    throw new Error(`GSC token exchange failed (${res.status})`);
  }
  return json.access_token;
}
