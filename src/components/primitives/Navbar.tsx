"use client";

import { useState } from "react";
import { Link } from "@/components/primitives/link";
import { Container } from "@/components/primitives/Container";
import { cn } from "@/lib/cn";
import type { ConversionEventName } from "@/lib/conversion-events";

const nav: Array<{
  href: string;
  label: string;
  conv?: ConversionEventName;
}> = [
  { href: "/features", label: "Features" },
  { href: "/docs", label: "Docs" },
  { href: "/guides", label: "Guides" },
  { href: "/developers", label: "Developers" },
  { href: "/onboarding", label: "Onboarding" },
  { href: "/security", label: "Security" },
  { href: "/pricing", label: "Pricing" },
  { href: "/use-cases", label: "Use cases" },
  { href: "/contact#merchant-intake", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle/80 bg-canvas/80 shadow-[0_1px_0_0_rgb(255_255_255/0.04)] backdrop-blur-xl supports-[backdrop-filter]:bg-canvas/70 print:hidden">
      <Container className="flex h-14 items-center justify-between gap-4 sm:h-16">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-primary no-underline transition-colors hover:text-accent"
        >
          Kobbopay
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm no-underline"
              muted
              {...(item.conv ? { conv: item.conv } : {})}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="https://merchant.kobbex.com/"
            className="text-sm no-underline"
            muted
            conv="merchant_login_click"
          >
            Merchant login
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact#merchant-intake"
            variant="button-primary"
            className="hidden px-4 py-2.5 text-sm no-underline lg:inline-flex"
            conv="request_access_click"
          >
            Request access
          </Link>
          <button
            type="button"
            className="inline-flex rounded-md border border-border-subtle p-2 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle menu</span>
            <span aria-hidden className="text-lg leading-none">
              {open ? "×" : "≡"}
            </span>
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-border-subtle bg-canvas lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-3 py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm"
              muted
              {...(item.conv ? { conv: item.conv } : {})}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="https://merchant.kobbex.com/"
            className="text-sm"
            muted
            conv="merchant_login_click"
          >
            Merchant login
          </Link>
          <Link
            href="/contact#merchant-intake"
            className="text-sm font-medium"
            conv="request_access_click"
            onClick={() => setOpen(false)}
          >
            Request access →
          </Link>
        </Container>
      </div>
    </header>
  );
}
