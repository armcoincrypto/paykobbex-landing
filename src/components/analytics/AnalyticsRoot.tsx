"use client";

import Script from "next/script";
import { useEffect, type ReactNode } from "react";
import {
  ANALYTICS_PROVIDER,
  CF_ANALYTICS_TOKEN,
  PLAUSIBLE_DOMAIN,
  PLAUSIBLE_SCRIPT_URL,
  UMAMI_SCRIPT_URL,
  UMAMI_WEBSITE_ID,
} from "@/lib/analytics-public";
import { trackConversionFromDataset } from "@/lib/analytics-track";

/**
 * Optional third-party scripts + delegated click capture for `data-conv` on links.
 * Custom goals: `request_access_click`, `merchant_login_click`, `contact_click` (see `conversion-events.ts`).
 * Route-level `docs_view`, `guides_view`, and `contact_click` (page) are emitted from `RouteIntentBeacon`.
 * Scripts render only when `NEXT_PUBLIC_ANALYTICS_PROVIDER` and required tokens are set at build time.
 */
export function AnalyticsRoot() {
  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest("[data-conv]");
      if (!el) return;
      const v = el.getAttribute("data-conv");
      if (v) trackConversionFromDataset(v);
    };
    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, []);

  let script: ReactNode = null;

  if (ANALYTICS_PROVIDER === "plausible" && PLAUSIBLE_DOMAIN) {
    script = (
      <Script
        strategy="afterInteractive"
        src={PLAUSIBLE_SCRIPT_URL}
        data-domain={PLAUSIBLE_DOMAIN}
      />
    );
  } else if (ANALYTICS_PROVIDER === "umami" && UMAMI_WEBSITE_ID && UMAMI_SCRIPT_URL) {
    script = (
      <Script
        strategy="afterInteractive"
        src={UMAMI_SCRIPT_URL}
        data-website-id={UMAMI_WEBSITE_ID}
      />
    );
  } else if (ANALYTICS_PROVIDER === "cloudflare" && CF_ANALYTICS_TOKEN) {
    script = (
      <Script
        strategy="afterInteractive"
        src="https://static.cloudflareinsights.com/beacon.min.js"
        {...{
          "data-cf-beacon": JSON.stringify({ token: CF_ANALYTICS_TOKEN }),
        }}
      />
    );
  }

  return <>{script}</>;
}
