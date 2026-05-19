"use client";

import { useEffect } from "react";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { OperationalPageHeader } from "@/components/operational/OperationalPageHeader";
import { MERCHANT_PORTAL_URL } from "@/lib/site";

export default function LoginRedirectPage() {
  useEffect(() => {
    window.location.replace(`${MERCHANT_PORTAL_URL}/`);
  }, []);

  return (
    <Section tone="default" className="ops-page ops-page-hero-band pt-10 sm:pt-16 pb-[var(--token-section-loose)]">
      <Container className="max-w-lg">
        <OperationalPageHeader
          className="ops-page-header--hero"
          eyebrow="Merchants"
          title="Merchant portal"
          lead="Redirecting approved merchant accounts to the merchant portal. If nothing happens, use the link below. New merchants should request access from this marketing site—not sign in here."
        >
          <p className="mt-2">
            <Link href={MERCHANT_PORTAL_URL} className="text-sm font-medium">
              Continue to {MERCHANT_PORTAL_URL.replace(/^https:\/\//, "")}
            </Link>
          </p>
        </OperationalPageHeader>
      </Container>
    </Section>
  );
}
