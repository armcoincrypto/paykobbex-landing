import { Link } from "@/components/primitives/link";
import { Container } from "@/components/primitives/Container";
import type { ConversionEventName } from "@/lib/conversion-events";

const productLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/use-cases", label: "Use cases" },
];

const legalTrustLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/security", label: "Security" },
];

const buildLinks: Array<{ href: string; label: string; conv?: ConversionEventName }> = [
  { href: "/docs", label: "Docs" },
  { href: "/guides", label: "Guides" },
  { href: "/glossary", label: "Glossary" },
  { href: "/developers", label: "Developers" },
  { href: "/operations", label: "Operations" },
  { href: "/onboarding", label: "Onboarding" },
  { href: "/contact#merchant-intake", label: "Request access", conv: "request_access_click" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle/80 bg-surface bg-gradient-to-b from-surface to-canvas py-14 sm:py-16 print:hidden">
      <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <p className="text-sm font-semibold text-primary">Kobbopay</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
            API-first B2B crypto payment infrastructure. Access is reviewed; rails and environments are
            scoped per merchant configuration. Operational procedures — not marketing SLAs — govern
            production enablement.
          </p>
        </div>
        <div>
          <p className="type-eyebrow">Product</p>
          <ul className="mt-3 space-y-2 text-sm">
            {productLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted no-underline hover:text-primary" muted>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="type-eyebrow">Legal &amp; trust</p>
          <ul className="mt-3 space-y-2 text-sm">
            {legalTrustLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted no-underline hover:text-primary" muted>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="type-eyebrow">Build &amp; merchants</p>
          <ul className="mt-3 space-y-2 text-sm">
            {buildLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted no-underline hover:text-primary"
                  muted
                  {...(item.conv ? { conv: item.conv } : {})}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/login" conv="merchant_login_click">
                Merchant login
              </Link>
            </li>
            <li>
              <Link href="https://merchant.kobbex.com/" conv="merchant_login_click">
                Merchant portal
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="mt-10 border-t border-border-subtle pt-6">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} Kobbopay. Marketing site — payment processing is provided
          through approved merchant accounts on configured rails where enabled.{" "}
          <Link href="/privacy" className="text-muted no-underline hover:text-primary" muted>
            Privacy
          </Link>
          {" · "}
          <Link href="/terms" className="text-muted no-underline hover:text-primary" muted>
            Terms
          </Link>
          {" · "}
          <Link href="/docs" className="text-muted no-underline hover:text-primary" muted>
            Docs
          </Link>
          {" · "}
          <Link href="/guides" className="text-muted no-underline hover:text-primary" muted>
            Guides
          </Link>
          {" · "}
          <Link href="/glossary" className="text-muted no-underline hover:text-primary" muted>
            Glossary
          </Link>
          {" · "}
          <Link href="/security" className="text-muted no-underline hover:text-primary" muted>
            Security
          </Link>
          {" · "}
          <Link href="/contact" className="text-muted no-underline hover:text-primary" muted>
            Contact
          </Link>
        </p>
      </Container>
    </footer>
  );
}
