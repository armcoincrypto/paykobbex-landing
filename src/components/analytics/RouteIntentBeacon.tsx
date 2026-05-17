"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackConversion } from "@/lib/analytics-track";
import type { ConversionEventName } from "@/lib/conversion-events";

function sessionKey(pathname: string, event: ConversionEventName) {
  return `kobbopay_conv_route:${event}:${pathname}`;
}

function fireRouteEventOncePerSession(pathname: string, event: ConversionEventName) {
  if (typeof window === "undefined") return;
  try {
    const key = sessionKey(pathname, event);
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    /* sessionStorage may be unavailable; still attempt a single track in this tab */
  }
  trackConversion(event);
}

function routeEventForPath(pathname: string): ConversionEventName | null {
  if (pathname === "/contact") return "contact_click";
  if (pathname === "/operations") return "operations_view";
  if (pathname === "/onboarding") return "onboarding_view";
  if (pathname.startsWith("/guides")) return "guides_view";
  if (pathname.startsWith("/docs")) return "docs_view";
  return null;
}

/**
 * Emits privacy-safe custom events once per browser tab session when key routes load.
 * Complements `data-conv` click tracking (e.g. `request_access_click` before navigation).
 */
export function RouteIntentBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const event = routeEventForPath(pathname);
    if (!event) return;
    fireRouteEventOncePerSession(pathname, event);
  }, [pathname]);

  return null;
}
