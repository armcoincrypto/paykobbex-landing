"use client";

import { Fragment, useState } from "react";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/primitives/BrandMark";
import { Link } from "@/components/primitives/link";
import { Container } from "@/components/primitives/Container";
import { cn } from "@/lib/cn";
import type { ConversionEventName } from "@/lib/conversion-events";

type NavItem = {
  href: string;
  label: string;
  conv?: ConversionEventName;
  tier?: "secondary" | "anchor";
};

const navGroups: Array<{ id: string; label: string; items: NavItem[] }> = [
  {
    id: "product",
    label: "Product",
    items: [
      { href: "/features", label: "Features", tier: "anchor" },
      { href: "/use-cases", label: "Use cases", tier: "secondary" },
    ],
  },
  {
    id: "developers",
    label: "Developers",
    items: [
      { href: "/docs", label: "Docs", tier: "anchor" },
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

function navHrefBase(href: string) {
  return href.split("#")[0] || href;
}

function isNavActive(href: string, pathname: string) {
  const base = navHrefBase(href);
  if (base === "/") return pathname === "/";
  if (base.startsWith("http")) return false;
  return pathname === base || pathname.startsWith(`${base}/`);
}

function NavLink({
  item,
  className,
  onNavigate,
  active,
}: {
  item: NavItem;
  className?: string;
  onNavigate?: () => void;
  active?: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        "site-navbar__link no-underline decoration-transparent hover:decoration-transparent",
        item.tier === "secondary" && "site-navbar__link--secondary",
        item.tier === "anchor" && "site-navbar__link--anchor",
        active && "site-navbar__link--active",
        className,
      )}
      muted
      aria-current={active ? "page" : undefined}
      {...(item.conv ? { conv: item.conv } : {})}
      {...(onNavigate ? { onClick: onNavigate } : {})}
    >
      {item.label}
    </Link>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="site-navbar__menu-icon-svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {open ? (
        <path
          d="M4.5 4.5l9 9M13.5 4.5l-9 9"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      ) : (
        <>
          <path d="M3 5h12" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
          <path d="M3 9h12" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
          <path d="M3 13h12" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <header className="site-navbar sticky top-0 z-50 print:hidden">
      <div className="site-navbar__atmosphere" aria-hidden="true" />
      <div className="site-navbar__frame" aria-hidden="true" />
      <div className="site-navbar__seam" aria-hidden="true" />
      <Container className="site-navbar__bar">
        <div className="site-navbar__shell">
          <div className="site-navbar__desktop">
            <div className="site-navbar__command-rail">
              <div className="site-navbar__rail-depth" aria-hidden="true" />
              <div className="site-navbar__rail-edge" aria-hidden="true" />
              <div className="site-navbar__brand-anchor">
                <Link href="/" className="site-navbar__brand no-underline">
                  <BrandMark className="site-navbar__brand-mark" size={30} />
                  <span className="site-navbar__brand-text">
                    <span className="site-navbar__brand-name">Kobbopay</span>
                    <span className="site-navbar__brand-meta">Settlement infrastructure</span>
                  </span>
                </Link>
              </div>

              <nav className="site-navbar__nav-channel" aria-label="Primary">
                <div className="site-navbar__nav-track">
                  {navGroups.map((group, groupIndex) => (
                  <Fragment key={group.id}>
                    {groupIndex > 0 ? (
                      <span className="site-navbar__group-gap" aria-hidden="true" />
                    ) : null}
                    <div className="site-navbar__group" role="group" aria-label={group.label}>
                      {group.items.map((item) => (
                        <NavLink
                          key={item.href}
                          item={item}
                          active={isNavActive(item.href, pathname)}
                        />
                      ))}
                    </div>
                  </Fragment>
                ))}
                </div>
              </nav>

              <div className="site-navbar__access">
                <NavLink item={merchantLogin} className="site-navbar__login" />
                <Link
                  href="/contact#merchant-intake"
                  className="site-navbar__cta no-underline"
                  conv="request_access_click"
                >
                  Request access
                </Link>
              </div>
            </div>
          </div>

          <div className="site-navbar__mobile">
            <div className="site-navbar__brand-zone">
              <Link href="/" className="site-navbar__brand no-underline">
                <BrandMark className="site-navbar__brand-mark" size={30} />
                <span className="site-navbar__brand-text">
                  <span className="site-navbar__brand-name">Kobbopay</span>
                  <span className="site-navbar__brand-meta">Settlement infrastructure</span>
                </span>
              </Link>
            </div>

            <div className="site-navbar__menu-zone">
              <button
                type="button"
                className="site-navbar__menu-toggle"
                aria-expanded={open}
                aria-controls="mobile-nav"
                onClick={() => setOpen((v) => !v)}
              >
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <MenuIcon open={open} />
            </button>
            </div>
          </div>
        </div>
      </Container>

      <div
        id="mobile-nav"
        className={cn("site-navbar__drawer lg:hidden", open && "site-navbar__drawer--open")}
        hidden={!open}
        aria-hidden={!open}
      >
        <Container className="site-navbar__drawer-inner">
          <div className="site-navbar__drawer-brand">
            <BrandMark size={30} />
            <div>
              <p className="site-navbar__drawer-brand-name">Kobbopay</p>
            </div>
          </div>

          {navGroups.map((group) => (
            <div key={group.id} className="site-navbar__drawer-group">
              <p className="site-navbar__drawer-label">{group.label}</p>
              <div className="site-navbar__drawer-links">
                {group.items.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    className="site-navbar__drawer-link"
                    active={isNavActive(item.href, pathname)}
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
              className="site-navbar__drawer-cta no-underline"
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
