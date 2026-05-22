"use client";

import { useEffect, useRef, useState } from "react";
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
  tier?: "primary" | "secondary" | "utility";
};

const primaryNav: NavItem[] = [
  { href: "/features", label: "Features", tier: "primary" },
  { href: "/developers", label: "Developers", tier: "primary" },
  { href: "/security", label: "Security", tier: "primary" },
  { href: "/docs", label: "Docs", tier: "primary" },
];

const secondaryNav: NavItem[] = [
  { href: "/use-cases", label: "Use cases", tier: "secondary" },
  { href: "/guides", label: "Guides", tier: "secondary" },
  { href: "/operations", label: "Operations", tier: "secondary" },
  { href: "/onboarding", label: "Onboarding", tier: "secondary" },
  { href: "/pricing", label: "Pricing", tier: "secondary" },
  { href: "/contact#merchant-intake", label: "Contact", tier: "secondary" },
  { href: "/glossary", label: "Glossary", tier: "secondary" },
];

const drawerSections: Array<{ id: string; label: string; items: NavItem[] }> = [
  { id: "platform", label: "Platform", items: primaryNav },
  { id: "resources", label: "Resources", items: secondaryNav },
];

const merchantLogin: NavItem = {
  href: "https://merchant.kobbex.com/",
  label: "Merchant login",
  conv: "merchant_login_click",
  tier: "utility",
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

function isSecondaryActive(pathname: string) {
  return secondaryNav.some((item) => isNavActive(item.href, pathname));
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
        item.tier === "utility" && "site-navbar__link--utility",
        item.tier === "primary" && "site-navbar__link--primary",
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

function BrandBlock({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="site-navbar__brand no-underline">
      <BrandMark className="site-navbar__brand-mark" size={compact ? 30 : 32} />
      <span className="site-navbar__brand-text">
        <span className="site-navbar__brand-name">Kobbopay</span>
        <span
          className={cn(
            "site-navbar__brand-meta",
            compact && "site-navbar__brand-meta--compact",
          )}
        >
          B2B payment infrastructure
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const moreTriggerRef = useRef<HTMLButtonElement>(null);
  const returnMoreFocusRef = useRef(false);
  const pathname = usePathname();
  const closeDrawer = () => setDrawerOpen(false);
  const secondaryActive = isSecondaryActive(pathname);

  const closeMore = (returnFocus = false) => {
    returnMoreFocusRef.current = returnFocus;
    setMoreOpen(false);
  };

  useEffect(() => {
    setDrawerOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (moreOpen) {
      const firstLink = moreRef.current?.querySelector<HTMLAnchorElement>(
        ".site-navbar__more-link",
      );
      requestAnimationFrame(() => firstLink?.focus());
      return;
    }

    if (returnMoreFocusRef.current) {
      moreTriggerRef.current?.focus();
      returnMoreFocusRef.current = false;
    }
  }, [moreOpen]);

  useEffect(() => {
    if (!moreOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        closeMore(true);
      }
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMore(true);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [moreOpen]);

  return (
    <header className="site-navbar sticky top-0 z-50 print:hidden">
      <div className="site-navbar__atmosphere" aria-hidden="true" />
      <div className="site-navbar__frame" aria-hidden="true" />
      <div className="site-navbar__seam" aria-hidden="true" />
      <Container className="site-navbar__bar">
        <div className="site-navbar__shell">
          <div className="site-navbar__desktop">
            <div className="site-navbar__access-console">
              <div className="site-navbar__brand-block">
                <BrandBlock />
              </div>

              <nav className="site-navbar__primary-channel" aria-label="Primary">
                {primaryNav.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    active={isNavActive(item.href, pathname)}
                  />
                ))}
              </nav>

              <div className="site-navbar__access-deck">
                <NavLink item={merchantLogin} className="site-navbar__login" />
                <Link
                  href="/contact#merchant-intake"
                  className="site-navbar__cta no-underline"
                  conv="request_access_click"
                >
                  Request access
                </Link>
                <div className="site-navbar__more" ref={moreRef}>
                  <button
                    ref={moreTriggerRef}
                    type="button"
                    className={cn(
                      "site-navbar__more-trigger",
                      (moreOpen || secondaryActive) && "site-navbar__more-trigger--active",
                    )}
                    aria-expanded={moreOpen}
                    aria-controls="desktop-more-panel"
                    onClick={() => {
                      if (moreOpen) closeMore(true);
                      else setMoreOpen(true);
                    }}
                  >
                    <span className="sr-only">Additional pages</span>
                    <span aria-hidden="true">More</span>
                  </button>
                  <nav
                    id="desktop-more-panel"
                    className="site-navbar__more-panel"
                    aria-label="Additional pages"
                    hidden={!moreOpen}
                  >
                    {secondaryNav.map((item) => (
                      <NavLink
                        key={item.href}
                        item={item}
                        className="site-navbar__more-link"
                        active={isNavActive(item.href, pathname)}
                        onNavigate={() => closeMore(false)}
                      />
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <div className="site-navbar__mobile">
            <div className="site-navbar__brand-zone">
              <BrandBlock compact />
            </div>

            <div className="site-navbar__menu-zone">
              <button
                type="button"
                className="site-navbar__menu-toggle"
                aria-expanded={drawerOpen}
                aria-controls="mobile-nav"
                onClick={() => setDrawerOpen((value) => !value)}
              >
                <span className="sr-only">{drawerOpen ? "Close menu" : "Open menu"}</span>
                <MenuIcon open={drawerOpen} />
              </button>
            </div>
          </div>
        </div>
      </Container>

      <div
        id="mobile-nav"
        className={cn("site-navbar__drawer", drawerOpen && "site-navbar__drawer--open")}
        hidden={!drawerOpen}
        aria-hidden={!drawerOpen}
      >
        <Container className="site-navbar__drawer-inner">
          <div className="site-navbar__drawer-brand">
            <BrandMark size={32} />
            <div>
              <p className="site-navbar__drawer-brand-name">Kobbopay</p>
              <p className="site-navbar__drawer-brand-meta">B2B payment infrastructure</p>
            </div>
          </div>

          {drawerSections.map((section) => (
            <div key={section.id} className="site-navbar__drawer-group">
              <p className="site-navbar__drawer-label">{section.label}</p>
              <div className="site-navbar__drawer-links">
                {section.items.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    className="site-navbar__drawer-link"
                    active={isNavActive(item.href, pathname)}
                    onNavigate={closeDrawer}
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
                onNavigate={closeDrawer}
              />
            </div>
            <Link
              href="/contact#merchant-intake"
              className="site-navbar__drawer-cta no-underline"
              conv="request_access_click"
              onClick={closeDrawer}
            >
              Request access
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}
