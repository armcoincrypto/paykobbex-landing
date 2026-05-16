/**
 * Build-time public analytics configuration (Next inlines `NEXT_PUBLIC_*` for the client bundle).
 * Leave unset to ship zero third-party measurement scripts.
 */
export type AnalyticsProvider = "none" | "plausible" | "umami" | "cloudflare";

const raw = (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? "none").toLowerCase();

export const ANALYTICS_PROVIDER: AnalyticsProvider =
  raw === "plausible" || raw === "umami" || raw === "cloudflare" ? raw : "none";

export const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "";

/** Default Plausible CDN; override for self-hosted (`https://analytics.example.com/js/script.js`). */
export const PLAUSIBLE_SCRIPT_URL =
  process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL ?? "https://plausible.io/js/script.js";

export const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? "";
export const UMAMI_SCRIPT_URL = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ?? "";

/** Cloudflare Web Analytics beacon token (script tag `data-cf-beacon`). */
export const CF_ANALYTICS_TOKEN = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN ?? "";
