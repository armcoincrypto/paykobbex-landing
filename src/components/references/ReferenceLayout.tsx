import type { ReactNode } from "react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { OperationalPageHeader } from "@/components/operational/OperationalPageHeader";

/** Integration reference page shell — decision models and operational matrices. */
export function ReferenceLayout({
  title,
  lead,
  children,
}: {
  title: string;
  lead: ReactNode;
  children: ReactNode;
}) {
  return (
    <Section
      tone="default"
      className="ops-page ops-page-hero-band ops-detail-shell pt-10 sm:pt-16 pb-[var(--token-section-loose)]"
    >
      <Container className="max-w-content">
        <OperationalPageHeader
          eyebrow="Integration reference"
          title={title}
          lead={lead}
          className="ops-page-header--hero"
        />
        <div className="ops-detail-body space-y-10">{children}</div>
      </Container>
    </Section>
  );
}
