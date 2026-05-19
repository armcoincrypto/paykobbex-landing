"use client";

import { Fragment, useState } from "react";
import { Link } from "@/components/primitives/link";
import { Container } from "@/components/primitives/Container";
import { cn } from "@/lib/cn";
import type { ConversionEventName } from "@/lib/conversion-events";

type NavItem = {
  href: string;
  label: string;
  conv?: ConversionEventName;
  tier?: "secondary";
};

/** P6 — enterprise IA grouping (labels shown in mobile drawer only). */
const navGroups: Array<{ id: string; label: string; items: NavItem[] }> = [
  {
    id: "product",
    label: "Product",
    items: [
      { href: "/features", label: "Features" },
      { href: "/use-cases", label: "Use cases", tier: "secondary" },
    ],
  },
  {
    id: "developers",
    label: "Developers",
    items: [
      { href: "/docs", label: "Docs" },
      { href: "/guides", label: "Guides" },
      { href: "/developers", label: "Developers" },
    ],
  },
  {
    id: "trust",
    label: "Trust",
    items: [
      { href: "/security", label: "Security", tier: "secondary" },
      { href: "/onboarding", label: "Onboarding", tier: "secondary" },
    ],
  },
  {
    id: "commercial",
    label: "Commercial",
    items: [
      { href: "/pricing", label: "Pricing", tier: "secondary" },
      { href: "/contact#merchant-intake", label: "Contact", tier: "secondary" },
    ],
  },
];

const merchantLogin: NavItem = {
  href: "https://merchant.kobbex.com/",
  label: "Merchant login",
  conv: "merchant_login_click",
  tier: "secondary",
};

function NavLink({
  item,
  className,
  onNavigate,
}: {
  item: NavItem;
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        "site-navbar__link no-underline decoration-transparent hover:decoration-transparent",
        item.tier === "secondary" && "site-navbar__link--secondary",
        className,
      )}
      muted
      {...(item.conv ? { conv: item.conv } : {})}
      {...(onNavigate ? { onClick: onNavigate } : {})}
    >
      {item.label}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-navbar sticky top-0 z-50 print:hidden">
      <Container className="site-navbar__bar">
        <Link href="/" className="site-navbar__brand no-underline">
          Kobbopay
        </Link>

        <nav className="site-navbar__nav hidden lg:flex" aria-label="Primary">
          {navGroups.map((group, groupIndex) => (
            <Fragment key={group.id}>
              {groupIndex > 0 ? (
                <span className="site-navbar__divider" aria-hidden="true" />
              ) : null}
              <div className="site-navbar__group" role="group" aria-label={group.label}>
                {group.items.map((item) => (
                  <NavLink key={item.href} item={item} />
                ))}
              </div>
            </Fragment>
          ))}
          <span className="site-navbar__divider site-navbar__divider--access" aria-hidden="true" />
          <NavLink item={merchantLogin} className="site-navbar__link--merchant" />
        </nav>

        <div className="site-navbar__actions">
          <Link
            href="/contact#merchant-intake"
            variant="button-primary"
            className="site-navbar__cta ui-control hidden no-underline lg:inline-flex"
            conv="request_access_click"
          >
            Request access
          </Link>
          <button
            type="button"
            className="site-navbar__menu-toggle lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="site-navbar__menu-icon" aria-hidden>
              {open ? "×" : "≡"}
            </span>
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        className={cn("site-navbar__drawer lg:hidden", open && "site-navbar__drawer--open")}
        hidden={!open}
        aria-hidden={!open}
      >
        <Container className="site-navbar__drawer-inner">
          {navGroups.map((group) => (
            <div key={group.id} className="site-navbar__drawer-group">
              <p className="site-navbar__drawer-label">{group.label}</p>
              <div className="site-navbar__drawer-links">
                {group.items.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    className="site-navbar__drawer-link"
                    onNavigate={close}
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="site-navbar__drawer-access">
            <p className="site-navbar__drawer-label">Access</p>
            <div className="site-navbar__drawer-links">
              <NavLink
                item={merchantLogin}
                className="site-navbar__drawer-link"
                onNavigate={close}
              />
            </div>
            <Link
              href="/contact#merchant-intake"
              variant="button-primary"
              className="site-navbar__drawer-cta ui-control no-underline"
              conv="request_access_click"
              onClick={close}
            >
              Request access
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}
