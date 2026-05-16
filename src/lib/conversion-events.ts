/**
 * Conversion / intent labels — no PII, no wallet or API payload data.
 * Fired only when analytics is explicitly enabled at build time (`NEXT_PUBLIC_ANALYTICS_PROVIDER`).
 *
 * Page views (`docs_view`, `guides_view`, `contact_click` on `/contact`) use `RouteIntentBeacon`;
 * clicks use `data-conv` on links (see `Link` primitive).
 */
export const CONVERSION_EVENTS = [
  "request_access_click",
  "docs_view",
  "guides_view",
  "contact_click",
  "merchant_login_click",
] as const;

export type ConversionEventName = (typeof CONVERSION_EVENTS)[number];

export function isConversionEventName(v: string): v is ConversionEventName {
  return (CONVERSION_EVENTS as readonly string[]).includes(v);
}
