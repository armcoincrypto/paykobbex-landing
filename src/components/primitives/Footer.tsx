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
  { href: "/contact", label: "Contact" },
];

const buildJournalLinks = [
  { href: "/blog", label: "Journal", hub: true as const },
  { href: "/research", label: "Research" },
  { href: "/knowledge-map", label: "Knowledge map" },
] as const;

const buildIntegrationLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/guides", label: "Guides" },
  { href: "/glossary", label: "Glossary" },
  { href: "/developers", label: "Developers" },
  { href: "/operations", label: "Operations" },
] as const;

const buildCompanyLinks = [
  { href: "/about", label: "About" },
  { href: "/editorial-principles", label: "Editorial" },
] as const;

const merchantLinks: Array<{
  href: string;
  label: string;
  conv?: ConversionEventName;
}> = [
  { href: "/onboarding", label: "Onboarding" },
  { href: "/request-access", label: "Request access", conv: "request_access_click" },
];

const utilityLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/docs", label: "Docs" },
  { href: "/guides", label: "Guides" },
  { href: "/glossary", label: "Glossary" },
  { href: "/security", label: "Security" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer print:hidden">
      <Container className="site-footer__main">
        <div className="site-footer__brand">
          <div className="site-footer__brand-head">
            <p className="site-footer__brand-name">Kobbopay</p>
            <span className="site-footer__infra-chip">Operational infrastructure</span>
          </div>
          <p className="site-footer__brand-copy">
            API-first B2B crypto payment infrastructure. Access is reviewed; rails and environments are
            scoped per merchant configuration. Operational procedures — not marketing SLAs — govern
            production enablement.
          </p>
          <div className="site-footer__signature" aria-hidden="true">
            <svg
              className="site-footer__signature-svg"
              viewBox="0 0 120 8"
              preserveAspectRatio="none"
              focusable="false"
            >
              <line
                className="site-footer__signature-depth"
                x1="0"
                y1="4"
                x2="120"
                y2="4"
                vectorEffect="non-scaling-stroke"
              />
              <line
                className="site-footer__signature-base"
                x1="0"
                y1="4"
                x2="120"
                y2="4"
                vectorEffect="non-scaling-stroke"
              />
              <line
                className="site-footer__signature-pulse"
                x1="0"
                y1="4"
                x2="120"
                y2="4"
                vectorEffect="non-scaling-stroke"
              />
              <circle className="site-footer__signature-node" cx="88" cy="4" r="1.75" />
            </svg>
          </div>
          <p className="site-footer__telemetry" aria-hidden="true">
            <span className="site-footer__telemetry-led" />
            <span className="site-footer__telemetry-copy">Reviewed merchant environments</span>
          </p>
        </div>

        <div className="site-footer__column site-footer__column--product">
          <p className="type-eyebrow site-footer__eyebrow">Product</p>
          <ul className="site-footer__list">
            {productLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="site-footer__link" muted>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__column site-footer__column--legal">
          <p className="type-eyebrow site-footer__eyebrow">Legal &amp; trust</p>
          <ul className="site-footer__list">
            {legalTrustLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="site-footer__link" muted>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__column site-footer__column--nav">
          <div className="site-footer__nav-cluster">
            <div className="site-footer__nav-group">
              <p className="type-eyebrow site-footer__eyebrow">Build</p>
              <div className="site-footer__nav-subgroup site-footer__nav-subgroup--journal">
                <p className="site-footer__nav-subgroup-label">Journal</p>
                <ul className="site-footer__list">
                  {buildJournalLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={"hub" in item && item.hub ? "site-footer__link site-footer__link--journal-hub" : "site-footer__link"}
                        muted
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="site-footer__nav-subgroup">
                <p className="site-footer__nav-subgroup-label">Integration</p>
                <ul className="site-footer__list">
                  {buildIntegrationLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="site-footer__link" muted>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="site-footer__nav-subgroup">
                <p className="site-footer__nav-subgroup-label">Company</p>
                <ul className="site-footer__list">
                  {buildCompanyLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="site-footer__link" muted>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="site-footer__nav-group">
              <p className="type-eyebrow site-footer__eyebrow">Merchants</p>
              <ul className="site-footer__list">
                {merchantLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="site-footer__link"
                      muted
                      {...(item.conv ? { conv: item.conv } : {})}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <Container className="site-footer__bar">
        <div className="site-footer__bar-inner">
          <p className="site-footer__legal">
            <span className="site-footer__legal-copy">
              © {year} Kobbopay. Marketing site — payment processing is provided through approved
              merchant accounts on configured rails where enabled.
            </span>
          </p>
          <nav className="site-footer__utilities" aria-label="Footer utilities">
            <ul className="site-footer__utility-list">
              {utilityLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="site-footer__link site-footer__utility-link" muted>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
