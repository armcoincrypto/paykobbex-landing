import type { ReactNode } from "react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { GuideInstrument } from "@/components/operational/GuideInstrument";
import { OperationalPageHeader } from "@/components/operational/OperationalPageHeader";
import type { GuideSlug } from "@/lib/guides-meta";

/** Unified guide page shell — header, instrument, editorial body. */
export function GuideLayout({
  slug,
  title,
  lead,
  definitions,
  children,
}: {
  slug: GuideSlug;
  title: string;
  lead: ReactNode;
  definitions?: ReactNode;
  children: ReactNode;
}) {
  const headingId = `guide-heading-${slug}`;

  return (
    <Section
      tone="default"
      className="ops-page ops-page-hero-band ops-detail-shell pt-10 sm:pt-16 pb-[var(--token-section-loose)]"
    >
      <Container className="max-w-content">
        <div className="ops-guide-grid">
          <OperationalPageHeader
            eyebrow="Guide"
            title={title}
            lead={lead}
            className="ops-page-header--hero ops-guide-header"
          >
            {definitions}
          </OperationalPageHeader>
          <GuideInstrument slug={slug} labelledBy={headingId} className="ops-guide-instrument-slot" />
          <div className="ops-guide-body space-y-10">{children}</div>
        </div>
      </Container>
    </Section>
  );
}
