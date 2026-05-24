import { Link } from "@/components/primitives/link";
import { GuideSection } from "@/components/guides/GuideSection";
import { ProductionRealityNote } from "@/components/realism";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import type { OperationalLinkGroup } from "@/lib/operational-links";

export type PlaybookBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; text: string };

export type PlaybookSection = {
  id: string;
  title: string;
  index: string;
  blocks: PlaybookBlock[];
};

export type PlaybookDocument = {
  sections: PlaybookSection[];
  related: OperationalLinkGroup;
};

function PlaybookBlocks({ blocks }: { blocks: PlaybookBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "p") {
          return (
            <p key={i} className="text-sm leading-relaxed text-muted sm:text-body">
              {block.text}
            </p>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-body">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol key={i} className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-body">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          );
        }
        return (
          <VerificationFramePanel key={i} label={block.title} sublabel="Operational note" className="mt-2">
            <p className="text-sm leading-relaxed text-muted">{block.text}</p>
          </VerificationFramePanel>
        );
      })}
    </>
  );
}

function OperationalLinksPanel({ related }: { related: OperationalLinkGroup }) {
  return (
    <VerificationFramePanel label="Related operational systems" sublabel="Cross-links" className="ops-related-links">
      {related.usedDuring?.length ? (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-primary">Used during</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
            {related.usedDuring.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {related.failureRelationships?.length ? (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-primary">Failure relationships</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
            {related.failureRelationships.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <ul className="space-y-2 text-sm text-muted">
        {related.guides.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
            {l.reason ? ` — ${l.reason}` : null}
          </li>
        ))}
        {related.references.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
        {related.articles.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
        {related.playbooks.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
        {related.glossary.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </VerificationFramePanel>
  );
}

export function PlaybookView({ document }: { document: PlaybookDocument }) {
  return (
    <>
      {document.sections.map((section) => (
        <GuideSection key={section.id} id={section.id} title={section.title} index={section.index}>
          <PlaybookBlocks blocks={section.blocks} />
        </GuideSection>
      ))}
      <ProductionRealityNote compact />
      <OperationalLinksPanel related={document.related} />
    </>
  );
}
