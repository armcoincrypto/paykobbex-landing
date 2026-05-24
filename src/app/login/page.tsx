"use client";

import { useEffect } from "react";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { OperationalPageHeader } from "@/components/operational/OperationalPageHeader";

export default function LoginRedirectPage() {
  useEffect(() => {
    window.location.replace("/request-access");
  }, []);

  return (
    <Section tone="default" className="ops-page ops-page-hero-band pt-10 sm:pt-16 pb-[var(--token-section-loose)]">
      <Container className="max-w-lg">
        <OperationalPageHeader
          className="ops-page-header--hero"
          eyebrow="Merchants"
          title="Request access"
          lead="Merchant portal sign-in is not available from this marketing site until your account is provisioned. Redirecting to request access — use that flow to start qualification."
        >
          <p className="mt-2">
            <Link href="/request-access" className="text-sm font-medium" conv="request_access_click">
              Continue to request access
            </Link>
          </p>
        </OperationalPageHeader>
      </Container>
    </Section>
  );
}
