"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const AnalyticsRoot = dynamic(
  () => import("@/components/analytics/AnalyticsRoot").then((mod) => mod.AnalyticsRoot),
  { ssr: false },
);

const RouteIntentBeacon = dynamic(
  () =>
    import("@/components/analytics/RouteIntentBeacon").then((mod) => mod.RouteIntentBeacon),
  { ssr: false },
);

/** Client-only analytics shell — defers script hydration on static pages. */
export function DeferredAnalyticsShell() {
  return (
    <>
      <Suspense fallback={null}>
        <RouteIntentBeacon />
      </Suspense>
      <AnalyticsRoot />
    </>
  );
}
