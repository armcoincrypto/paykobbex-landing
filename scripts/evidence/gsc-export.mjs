import { getGscAccessToken, getGscConfig } from "./gsc-auth.mjs";
import { safeErrorMessage } from "./redact.mjs";

/** GSC data lags ~2–3 days; end date is offset accordingly. */
function dateRangeDays(days = 28, lagDays = 3) {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - lagDays);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days);
  const fmt = (d) => d.toISOString().slice(0, 10);
  return { startDate: fmt(start), endDate: fmt(end) };
}

async function searchAnalyticsQuery(token, siteUrl, body) {
  const encodedSite = encodeURIComponent(siteUrl);
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`GSC API ${res.status}: ${json?.error?.message || "request failed"}`);
  }
  return json;
}

export async function exportGsc() {
  const generatedAt = new Date().toISOString();
  const days = Number(process.env.EVIDENCE_GSC_DAYS) || 28;
  const { startDate, endDate } = dateRangeDays(days);
  const config = getGscConfig();

  if (!config.ready) {
    return {
      status: "blocked",
      blocker: config.blocker,
      generatedAt,
      siteUrl: config.siteUrl,
      startDate,
      endDate,
    };
  }

  const report = {
    status: "ok",
    blocker: null,
    generatedAt,
    siteUrl: config.siteUrl,
    startDate,
    endDate,
    aggregate: {},
    topQueries: [],
    topPages: [],
    lowCtrCandidates: [],
    errors: [],
  };

  try {
    const token = await getGscAccessToken(config);

    const siteAgg = await searchAnalyticsQuery(token, config.siteUrl, {
      startDate,
      endDate,
    });
    const row = siteAgg.rows?.[0];
    report.aggregate = {
      clicks: row?.clicks ?? 0,
      impressions: row?.impressions ?? 0,
      ctr: row?.ctr ?? 0,
      position: row?.position ?? 0,
    };

    const queries = await searchAnalyticsQuery(token, config.siteUrl, {
      startDate,
      endDate,
      dimensions: ["query"],
      rowLimit: 25,
    });
    report.topQueries = (queries.rows ?? []).map((r) => ({
      query: r.keys?.[0] ?? "",
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      ctr: r.ctr ?? 0,
      position: r.position ?? 0,
    }));

    const pages = await searchAnalyticsQuery(token, config.siteUrl, {
      startDate,
      endDate,
      dimensions: ["page"],
      rowLimit: 25,
    });
    report.topPages = (pages.rows ?? []).map((r) => ({
      page: r.keys?.[0] ?? "",
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      ctr: r.ctr ?? 0,
      position: r.position ?? 0,
    }));

    const avgCtr = report.aggregate.ctr || 0;
    report.lowCtrCandidates = report.topPages
      .filter((p) => p.impressions >= 50 && p.ctr < avgCtr)
      .slice(0, 10);
  } catch (err) {
    report.status = "error";
    report.blocker = safeErrorMessage(err);
    report.errors.push(report.blocker);
  }

  return report;
}
