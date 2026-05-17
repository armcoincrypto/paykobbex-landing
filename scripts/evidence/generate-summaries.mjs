import { CONVERSION_EVENTS } from "./constants.mjs";

function fmtPct(ratio) {
  if (ratio == null || Number.isNaN(ratio)) return "n/a";
  return `${Math.round(ratio * 100)}%`;
}

export function plausibleSummaryMd(report, dateStamp) {
  if (report.status === "blocked") {
    return `# Plausible summary — ${dateStamp}

**Status:** blocked (automation not configured)

## Blocker

${report.blocker}

## Owner setup

1. Plausible → Settings → API Keys → **Stats API** → create key (shown once).
2. Add to \`.env.local\` (gitignored):

\`\`\`
PLAUSIBLE_API_KEY=<paste-stats-api-key>
PLAUSIBLE_SITE_ID=pay.kobbex.com
\`\`\`

3. Re-run: \`npm run evidence:weekly\`

See \`docs/EVIDENCE_PIPELINE.md\`.
`;
  }

  const lines = [
    `# Plausible summary — ${dateStamp}`,
    "",
    `**Status:** ${report.status} · **Period:** ${report.period} · **Site:** ${report.siteId}`,
    "",
    "## Aggregate",
    "",
    `| Metric | Value |`,
    `| --- | ---: |`,
    `| Unique visitors | ${report.aggregate.visitors ?? "—"} |`,
    `| Pageviews | ${report.aggregate.pageviews ?? "—"} |`,
    `| Visits | ${report.aggregate.visits ?? "—"} |`,
    "",
    "## Custom goals (7)",
    "",
    `| Goal | Events |`,
    `| --- | ---: |`,
  ];

  for (const g of CONVERSION_EVENTS) {
    lines.push(`| \`${g}\` | ${report.goals[g] ?? "—"} |`);
  }

  lines.push(
    "",
    "## Derived",
    "",
    `| Signal | Value |`,
    `| --- | --- |`,
    `| operations_view ÷ docs_view | ${report.derived.operations_view_div_docs_view ?? "n/a"} (${fmtPct(report.derived.operations_view_div_docs_view)}) |`,
    `| guides_view ÷ docs_view | ${report.derived.guides_view_div_docs_view ?? "n/a"} |`,
    "",
    "## Top pages (by pageviews)",
    "",
  );

  if (report.topPages?.length) {
    lines.push(`| Page | Pageviews | Visitors |`, `| --- | ---: | ---: |`);
    for (const row of report.topPages.slice(0, 12)) {
      lines.push(`| ${row.page} | ${row.pageviews} | ${row.visitors} |`);
    }
  } else {
    lines.push("_No page breakdown returned._");
  }

  lines.push("", "## Top entry pages", "");
  if (report.topEntryPages?.length) {
    lines.push(`| Entry page | Visitors |`, `| --- | ---: |`);
    for (const row of report.topEntryPages.slice(0, 8)) {
      lines.push(`| ${row.page} | ${row.visitors} |`);
    }
  } else {
    lines.push("_No entry page breakdown returned._");
  }

  if (report.errors?.length) {
    lines.push("", "## Errors", "", ...report.errors.map((e) => `- ${e}`));
  }

  lines.push(
    "",
    "---",
    "",
    "_Read-only report. Paste key tables into `docs/EVIDENCE_GUIDED_REFINEMENT.md` for refinement decisions._",
    "",
  );

  return lines.join("\n");
}

export function gscSummaryMd(report, dateStamp) {
  if (report.status === "blocked") {
    return `# GSC summary — ${dateStamp}

**Status:** blocked (automation not configured)

## Blocker

${report.blocker}

## Owner setup

1. Google Cloud project with **Search Console API** enabled.
2. Service account with access to the GSC property for \`pay.kobbex.com\`.
3. Add to \`.env.local\`:

\`\`\`
GSC_CREDENTIALS_PATH=/absolute/path/to/service-account.json
GSC_SITE_URL=https://pay.kobbex.com/
\`\`\`

4. Re-run: \`npm run evidence:weekly\`

See \`docs/EVIDENCE_PIPELINE.md\`.
`;
  }

  const lines = [
    `# GSC summary — ${dateStamp}`,
    "",
    `**Status:** ${report.status} · **Site:** ${report.siteUrl}`,
    `**Window:** ${report.startDate} → ${report.endDate}`,
    "",
    "## Aggregate",
    "",
    `| Metric | Value |`,
    `| --- | ---: |`,
    `| Impressions | ${report.aggregate.impressions ?? "—"} |`,
    `| Clicks | ${report.aggregate.clicks ?? "—"} |`,
    `| CTR | ${report.aggregate.ctr != null ? (report.aggregate.ctr * 100).toFixed(2) + "%" : "—"} |`,
    `| Avg position | ${report.aggregate.position != null ? report.aggregate.position.toFixed(1) : "—"} |`,
    "",
    "## Top queries",
    "",
  ];

  if (report.topQueries?.length) {
    lines.push(`| Query | Impr. | Clicks | CTR | Pos. |`, `| --- | ---: | ---: | ---: | ---: |`);
    for (const row of report.topQueries.slice(0, 10)) {
      lines.push(
        `| ${row.query} | ${row.impressions} | ${row.clicks} | ${(row.ctr * 100).toFixed(1)}% | ${row.position.toFixed(1)} |`,
      );
    }
  } else {
    lines.push("_No query rows (property may be too new)._");
  }

  lines.push("", "## Top pages (search)", "");
  if (report.topPages?.length) {
    lines.push(`| Page | Impr. | Clicks | CTR |`, `| --- | ---: | ---: | ---: |`);
    for (const row of report.topPages.slice(0, 10)) {
      lines.push(
        `| ${row.page} | ${row.impressions} | ${row.clicks} | ${(row.ctr * 100).toFixed(1)}% |`,
      );
    }
  }

  lines.push("", "## Low-CTR candidates (≥50 impressions, below site CTR)", "");
  if (report.lowCtrCandidates?.length) {
    lines.push(`| Page | Impr. | CTR |`, `| --- | ---: | ---: |`);
    for (const row of report.lowCtrCandidates) {
      lines.push(`| ${row.page} | ${row.impressions} | ${(row.ctr * 100).toFixed(1)}% |`);
    }
  } else {
    lines.push("_None identified in this window._");
  }

  if (report.errors?.length) {
    lines.push("", "## Errors", "", ...report.errors.map((e) => `- ${e}`));
  }

  lines.push(
    "",
    "---",
    "",
    "_Read-only report. Title/meta changes require human approval per P20 governance._",
    "",
  );

  return lines.join("\n");
}

export function weeklyEvidenceSummaryMd({ dateStamp, plausible, gsc }) {
  const pReady = plausible.status === "ok" || plausible.status === "partial";
  const gReady = gsc.status === "ok";

  return `# Weekly evidence rollup — ${dateStamp}

Generated by \`npm run evidence:weekly\`. **Does not modify the public site.**

| Source | Status | Artifact |
| --- | --- | --- |
| Plausible | ${plausible.status} | \`plausible-summary-${dateStamp}.md\` |
| GSC | ${gsc.status} | \`gsc-summary-${dateStamp}.md\` |

## P21 readiness

- **Primary Plausible data:** ${pReady ? "yes — review summaries" : "no — configure PLAUSIBLE_API_KEY"}
- **Primary GSC data:** ${gReady ? "yes — review summaries" : "no — configure GSC_CREDENTIALS_PATH"}
- **Public refinement allowed:** ${pReady && gReady ? "human decision only (max one change)" : "no — evidence incomplete"}

## Governance

- Reports are read-only operational artifacts.
- No automatic content, SEO, or IA changes from this script.
- Humans approve all refinements; see \`docs/EVIDENCE_GUIDED_REFINEMENT.md\`.
`;
}
