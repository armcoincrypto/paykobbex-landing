/** Canonical public marketing origin (no trailing slash). */
export const SITE_URL = "https://pay.kobbex.com";

export const MERCHANT_PORTAL_URL = "https://merchant.kobbex.com";

/** Update to your monitored inbox before launch. */
export const CONTACT_EMAIL = "hello@kobbex.com";

/** Default Open Graph / Twitter card (1200×630 PNG in `public/`). */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Kobbopay — B2B crypto payment infrastructure",
} as const;

export const OG_IMAGES = [OG_IMAGE] as const;
