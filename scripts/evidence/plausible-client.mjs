import { redactSecrets, safeErrorMessage } from "./redact.mjs";

/**
 * Plausible Stats API v2 (read-only).
 * @see https://plausible.io/docs/stats-api
 */
export function getPlausibleConfig() {
  const apiKey = process.env.PLAUSIBLE_API_KEY?.trim();
  const siteId =
    process.env.PLAUSIBLE_SITE_ID?.trim() ||
    process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim() ||
    "pay.kobbex.com";
  const apiBase =
    process.env.PLAUSIBLE_API_BASE_URL?.trim().replace(/\/$/, "") ||
    "https://plausible.io";

  if (!apiKey) {
    return {
      ready: false,
      blocker:
        "PLAUSIBLE_API_KEY is not set. Create a Stats API key in Plausible → Settings → API Keys, then add it to .env.local (gitignored).",
      siteId,
      apiBase,
    };
  }

  return { ready: true, apiKey, siteId, apiBase, blocker: null };
}

export async function plausibleQuery(config, body) {
  const url = `${config.apiBase}/api/v2/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ site_id: config.siteId, ...body }),
  });

  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }

  if (!res.ok) {
    const detail = json?.error || json?.message || text.slice(0, 200);
    throw new Error(
      `Plausible API ${res.status}: ${redactSecrets(String(detail))}`,
    );
  }

  return json;
}

/** Parse v2 query results into row objects. */
export function parseQueryRows(response) {
  const results = response?.results ?? [];
  const dimensions = response?.meta?.dimensions ?? [];
  const metrics = response?.meta?.metrics ?? [];

  return results.map((row) => {
    const obj = {};
    dimensions.forEach((dim, i) => {
      obj[dim] = row.dimensions?.[i];
    });
    metrics.forEach((metric, i) => {
      obj[metric] = row.metrics?.[i];
    });
    return obj;
  });
}

export async function plausibleQuerySafe(config, body) {
  try {
    const response = await plausibleQuery(config, body);
    return { ok: true, response, rows: parseQueryRows(response), error: null };
  } catch (err) {
    return { ok: false, response: null, rows: [], error: safeErrorMessage(err) };
  }
}
