#!/usr/bin/env node
/**
 * Weekly evidence export — read-only, no public-site changes.
 * Usage: npm run evidence:weekly
 */
import fs from "node:fs";
import path from "node:path";
import { exportPlausible } from "./plausible-export.mjs";
import { exportGsc } from "./gsc-export.mjs";
import {
  gscSummaryMd,
  plausibleSummaryMd,
  weeklyEvidenceSummaryMd,
} from "./generate-summaries.mjs";
import { loadEvidenceEnv, reportDateStamp, reportsDir } from "./load-env.mjs";
import { redactSecrets } from "./redact.mjs";

loadEvidenceEnv();

const dateStamp = process.env.EVIDENCE_DATE_STAMP?.trim() || reportDateStamp();
const outDir = reportsDir();

function writeJson(name, data) {
  const filePath = path.join(outDir, name);
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  return filePath;
}

function writeMd(name, content) {
  const filePath = path.join(outDir, name);
  fs.writeFileSync(filePath, content, "utf8");
  return filePath;
}

function scanForSecrets(content) {
  const hits = [];
  if (/Bearer\s+[A-Za-z0-9._-]{20,}/.test(content)) hits.push("Bearer token pattern");
  if (/"private_key"\s*:\s*"-----BEGIN/.test(content)) hits.push("private_key in output");
  if (/PLAUSIBLE_API_KEY=[A-Za-z0-9._-]{20,}/.test(content)) hits.push("PLAUSIBLE_API_KEY literal");
  return hits;
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`Evidence weekly export — ${dateStamp}`);
  console.log(`Output: ${outDir}`);

  const plausible = await exportPlausible();
  const gsc = await exportGsc();

  const files = [];

  files.push(writeJson(`plausible-weekly-${dateStamp}.json`, plausible));
  files.push(writeMd(`plausible-summary-${dateStamp}.md`, plausibleSummaryMd(plausible, dateStamp)));

  files.push(writeJson(`gsc-weekly-${dateStamp}.json`, gsc));
  files.push(writeMd(`gsc-summary-${dateStamp}.md`, gscSummaryMd(gsc, dateStamp)));

  const rollup = {
    generatedAt: new Date().toISOString(),
    dateStamp,
    plausible: { status: plausible.status, blocker: plausible.blocker ?? null },
    gsc: { status: gsc.status, blocker: gsc.blocker ?? null },
    p21Ready: {
      plausible: plausible.status === "ok" || plausible.status === "partial",
      gsc: gsc.status === "ok",
    },
  };
  files.push(writeJson(`weekly-evidence-${dateStamp}.json`, rollup));
  files.push(
    writeMd(`weekly-evidence-${dateStamp}.md`, weeklyEvidenceSummaryMd({ dateStamp, plausible, gsc })),
  );

  let leakFound = false;
  for (const f of files) {
    const content = fs.readFileSync(f, "utf8");
    const leaks = scanForSecrets(content);
    if (leaks.length) {
      leakFound = true;
      console.error(`SECRET SCAN FAIL ${path.basename(f)}: ${leaks.join(", ")}`);
    }
  }

  console.log("");
  console.log(`Plausible: ${plausible.status}${plausible.blocker ? " — see summary" : ""}`);
  console.log(`GSC: ${gsc.status}${gsc.blocker ? " — see summary" : ""}`);
  console.log("");
  console.log("Wrote:");
  for (const f of files) console.log(`  - ${path.relative(process.cwd(), f)}`);

  if (leakFound) {
    console.error("\nAborting: potential secret in report output.");
    process.exit(2);
  }

  if (plausible.status === "blocked" && gsc.status === "blocked") {
    console.log("\nConfigure credentials in .env.local — see docs/EVIDENCE_PIPELINE.md");
    process.exit(0);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(redactSecrets(err instanceof Error ? err.message : String(err)));
  process.exit(1);
});
