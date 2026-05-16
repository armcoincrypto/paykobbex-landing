"use client";

import { useEffect } from "react";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { MERCHANT_PORTAL_URL } from "@/lib/site";

export default function LoginRedirectPage() {
  useEffect(() => {
    window.location.replace(`${MERCHANT_PORTAL_URL}/`);
  }, []);

  return (
    <main className="bg-canvas py-[var(--token-section-loose)]">
      <Container className="max-w-lg">
        <h1 className="text-h1 font-semibold text-primary">Merchant portal</h1>
        <p className="mt-3 text-sm text-muted">
          Redirecting you to the merchant portal. If nothing happens, use the link below.
        </p>
        <p className="mt-6">
          <Link href={MERCHANT_PORTAL_URL} className="text-sm font-medium">
            Continue to {MERCHANT_PORTAL_URL.replace(/^https:\/\//, "")}
          </Link>
        </p>
      </Container>
    </main>
  );
}
