#!/usr/bin/env node
/**
 * Content safety: fail CI on high-risk marketing/compliance claims.
 * Scans: src/app, src/components, src/lib (ts/tsx), public/*.txt, public/*.xml
 *
 * Negation heuristic: if a match is preceded (within ~200 chars) by clear negation language,
 * treat as allowed (e.g. "do not promise instant payouts").
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const SCAN_DIRS = [
  path.join(ROOT, "src", "app"),
  path.join(ROOT, "src", "components"),
  path.join(ROOT, "src", "lib"),
];

const PUBLIC_DIR = path.join(ROOT, "public");

/** Match in content; label for error output */
const RULES = [
  { label: "SOC 2 certified", re: /SOC\s*2\s+certified/i },
  { label: "ISO 27001 certified", re: /ISO\s*27001\s+certified/i },
  { label: "licensed exchange", re: /licensed\s+exchange/i },
  { label: "audited platform", re: /audited\s+platform/i },
  { label: "guaranteed settlement", re: /guaranteed\s+settlement/i },
  { label: "instant payouts", re: /instant\s+payouts/i },
  { label: "65+ coins", re: /65\s*\+\s*coins/i },
  {
    label: "best crypto payment gateway",
    re: /best\s+crypto\s+payment\s+gateway/i,
  },
  {
    label: "#1 marketing claim",
    re: /\#1(?![0-9a-fA-F])/,
  },
];

const NEGATION_BEFORE = new RegExp(
  [
    "do\\s+not",
    "don\\'t",
    "doesn\\'t",
    "does\\s+not",
    "did\\s+not",
    "cannot",
    "can\\'t",
    "never",
    "\\bno\\b",
    "\\bnot\\b",
    "without",
    "avoid",
    "not\\s+publish",
    "do\\s+not\\s+publish",
    "we\\s+do\\s+not",
    "nor\\s+",
  ].join("|"),
  "i",
);

function walkFiles(dir, acc, exts) {
  if (!fs.existsSync(dir)) return;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith(".")) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkFiles(p, acc, exts);
    else if (exts.some((e) => ent.name.endsWith(e))) acc.push(p);
  }
}

function readPublicTxtXml() {
  const out = [];
  if (!fs.existsSync(PUBLIC_DIR)) return out;
  for (const ent of fs.readdirSync(PUBLIC_DIR, { withFileTypes: true })) {
    if (!ent.isFile()) continue;
    if (ent.name.endsWith(".txt") || ent.name.endsWith(".xml")) {
      out.push(path.join(PUBLIC_DIR, ent.name));
    }
  }
  return out;
}

function isNegatedAt(content, index) {
  const start = Math.max(0, index - 220);
  const window = content.slice(start, index);
  return NEGATION_BEFORE.test(window);
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const rel = path.relative(ROOT, filePath);
  const problems = [];

  for (const rule of RULES) {
    const re = new RegExp(rule.re.source, rule.re.flags.includes("g") ? rule.re.flags : rule.re.flags + "g");
    let m;
    while ((m = re.exec(content)) !== null) {
      if (isNegatedAt(content, m.index)) continue;
      const line = content.slice(0, m.index).split("\n").length;
      problems.push({ rule: rule.label, line, rel });
    }
  }

  return problems;
}

const files = [];
for (const d of SCAN_DIRS) walkFiles(d, files, [".ts", ".tsx"]);
files.push(...readPublicTxtXml());

const all = [];
for (const f of files) {
  all.push(...scanFile(f));
}

if (all.length) {
  console.error("check-content-claims: FAILED\n");
  for (const p of all) {
    console.error(`  ${p.rel}:${p.line} — forbidden pattern: ${p.rule}`);
  }
  console.error(`\nTotal: ${all.length}`);
  process.exit(1);
}

console.log(`check-content-claims: OK (${files.length} files scanned)`);
