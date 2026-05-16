import type { ConversionEventName } from "@/lib/conversion-events";
import { isConversionEventName } from "@/lib/conversion-events";

type PlausibleFn = (
  event: string,
  options?: { props?: Record<string, string | number | boolean> },
) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
    umami?: { track?: (eventName?: string, eventData?: Record<string, unknown>) => void };
  }
}

/**
 * Fire a named conversion to whichever first-party-friendly tool is loaded (if any).
 * Custom goals are limited to `CONVERSION_EVENTS` (no PII, no wallet/API payloads).
 */
export function trackConversion(event: ConversionEventName): void {
  if (typeof window === "undefined") return;

  try {
    window.plausible?.(event, { props: { surface: "marketing" } });
  } catch {
    /* ignore */
  }

  try {
    window.umami?.track?.(event);
  } catch {
    /* ignore */
  }

  // Cloudflare Web Analytics beacon does not expose a stable public custom-events API in the
  // default snippet; use Plausible or Umami for named conversion goals, or CF Zaraz / Workers.
}

export function trackConversionFromDataset(value: string): void {
  if (!isConversionEventName(value)) return;
  trackConversion(value);
}
