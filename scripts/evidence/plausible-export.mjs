import { CONVERSION_EVENTS, STRATEGIC_PATHS } from "./constants.mjs";
import {
  getPlausibleConfig,
  plausibleQuerySafe,
} from "./plausible-client.mjs";

const DATE_RANGE = process.env.EVIDENCE_DATE_RANGE?.trim() || "7d";

function metricValue(rows, metric) {
  if (!rows.length) return 0;
  const v = rows[0][metric];
  return typeof v === "number" ? v : Number(v) || 0;
}

function goalCountsFromRows(rows) {
  const counts = Object.fromEntries(CONVERSION_EVENTS.map((g) => [g, 0]));
  for (const row of rows) {
    const name = row["event:goal"];
    if (name && name in counts) counts[name] = Number(row.events) || 0;
  }
  return counts;
}

function normalizePagePath(page) {
  if (!page) return "";
  try {
    const u = new URL(page, "https://pay.kobbex.com");
    return u.pathname || page;
  } catch {
    return page.startsWith("/") ? page : `/${page}`;
  }
}

export async function exportPlausible() {
  const generatedAt = new Date().toISOString();
  const config = getPlausibleConfig();

  if (!config.ready) {
    return {
      status: "blocked",
      blocker: config.blocker,
      generatedAt,
      period: DATE_RANGE,
      siteId: config.siteId,
    };
  }

  const report = {
    status: "ok",
    blocker: null,
    generatedAt,
    period: DATE_RANGE,
    siteId: config.siteId,
    apiBase: config.apiBase,
    aggregate: {},
    goals: {},
    topPages: [],
    topEntryPages: [],
    strategicPages: {},
    derived: {},
    errors: [],
  };

  const aggregate = await plausibleQuerySafe(config, {
    metrics: ["visitors", "pageviews", "visits"],
    date_range: DATE_RANGE,
  });
  if (!aggregate.ok) {
    report.errors.push(aggregate.error);
    report.status = "error";
    report.blocker = aggregate.error;
    return report;
  }
  report.aggregate = {
    visitors: metricValue(aggregate.rows, "visitors"),
    pageviews: metricValue(aggregate.rows, "pageviews"),
    visits: metricValue(aggregate.rows, "visits"),
  };

  const goalsBreakdown = await plausibleQuerySafe(config, {
    metrics: ["events"],
    date_range: DATE_RANGE,
    dimensions: ["event:goal"],
  });
  if (goalsBreakdown.ok) {
    report.goals = goalCountsFromRows(goalsBreakdown.rows);
  } else {
    report.errors.push(`goals: ${goalsBreakdown.error}`);
    for (const g of CONVERSION_EVENTS) {
      const single = await plausibleQuerySafe(config, {
        metrics: ["events"],
        date_range: DATE_RANGE,
        filters: [["is", "event:goal", [g]]],
      });
      report.goals[g] = single.ok ? metricValue(single.rows, "events") : null;
    }
  }

  const topPages = await plausibleQuerySafe(config, {
    metrics: ["pageviews", "visitors"],
    date_range: DATE_RANGE,
    dimensions: ["event:page"],
  });
  if (topPages.ok) {
    report.topPages = topPages.rows
      .map((r) => ({
        page: normalizePagePath(r["event:page"]),
        pageviews: Number(r.pageviews) || 0,
        visitors: Number(r.visitors) || 0,
      }))
      .sort((a, b) => b.pageviews - a.pageviews)
      .slice(0, 20);
  } else {
    report.errors.push(`topPages: ${topPages.error}`);
  }

  const entryPages = await plausibleQuerySafe(config, {
    metrics: ["visitors"],
    date_range: DATE_RANGE,
    dimensions: ["visit:entry_page"],
  });
  if (entryPages.ok) {
    report.topEntryPages = entryPages.rows
      .map((r) => ({
        page: normalizePagePath(r["visit:entry_page"]),
        visitors: Number(r.visitors) || 0,
      }))
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 15);
  } else {
    report.errors.push(`entryPages: ${entryPages.error}`);
  }

  for (const p of STRATEGIC_PATHS) {
    const match = report.topPages.find(
      (row) => row.page === p || row.page === `${p}/`,
    );
    report.strategicPages[p] = match
      ? { pageviews: match.pageviews, visitors: match.visitors }
      : { pageviews: 0, visitors: 0 };
  }

  const docsGoal = report.goals.docs_view ?? 0;
  const opsGoal = report.goals.operations_view ?? 0;
  const guidesGoal = report.goals.guides_view ?? 0;

  const opsDivDocs =
    docsGoal > 0 ? Math.round((opsGoal / docsGoal) * 1000) / 1000 : null;

  report.derived = {
    operations_view_div_docs_view: opsDivDocs,
    guides_view_div_docs_view:
      docsGoal > 0 ? Math.round((guidesGoal / docsGoal) * 1000) / 1000 : null,
    funnel: {
      docs_view: report.goals.docs_view ?? null,
      guides_view: report.goals.guides_view ?? null,
      operations_view: report.goals.operations_view ?? null,
      onboarding_view: report.goals.onboarding_view ?? null,
      contact_click: report.goals.contact_click ?? null,
      request_access_click: report.goals.request_access_click ?? null,
      merchant_login_click: report.goals.merchant_login_click ?? null,
    },
    navbarRule: {
      description:
        "Add Operations to primary nav only if operations_view / docs_view < 0.33 for two consecutive Plausible weeks.",
      currentRatio: opsDivDocs,
    },
  };

  if (report.errors.length) report.status = "partial";

  return report;
}
