import type { ReactNode } from "react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { OperationalPageHeader } from "@/components/operational/OperationalPageHeader";

/** Playbook page shell — procedural workflow authority surface. */
export function PlaybookLayout({
  title,
  lead,
  definitions,
  children,
}: {
  title: string;
  lead: ReactNode;
  definitions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Section
      tone="default"
      className="ops-page ops-page-hero-band ops-detail-shell pt-10 sm:pt-16 pb-[var(--token-section-loose)]"
    >
      <Container className="max-w-content">
        <OperationalPageHeader
          eyebrow="Playbook"
          title={title}
          lead={lead}
          className="ops-page-header--hero"
        >
          {definitions}
        </OperationalPageHeader>
        <div className="ops-detail-body space-y-10">{children}</div>
      </Container>
    </Section>
  );
}
