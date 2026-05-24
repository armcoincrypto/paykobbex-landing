import { Link } from "@/components/primitives/link";
import { GuideSection } from "@/components/guides/GuideSection";
import { ProductionRealityNote } from "@/components/realism";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import type { OperationalLinkGroup } from "@/lib/operational-links";

export type ReferenceTable = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

export type ReferenceSection = {
  id: string;
  title: string;
  index: string;
  paragraphs: string[];
  table?: ReferenceTable;
};

export type ReferenceDocument = {
  sections: ReferenceSection[];
  related: OperationalLinkGroup;
};

function ReferenceTableView({ table }: { table: ReferenceTable }) {
  return (
    <div className="ops-table-scroll">
      {table.caption ? <p className="ops-table-scroll__caption">{table.caption}</p> : null}
      <table className="ops-table">
        <thead>
          <tr>
            {table.headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RelatedPanel({ related }: { related: OperationalLinkGroup }) {
  return (
    <VerificationFramePanel label="Related operational systems" sublabel="Implementation graph">
      <ul className="space-y-2 text-sm text-muted">
        {related.guides.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
        {related.playbooks.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
        {related.articles.map((l) => (
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

export function ReferenceView({ document }: { document: ReferenceDocument }) {
  return (
    <>
      {document.sections.map((section) => (
        <GuideSection key={section.id} id={section.id} title={section.title} index={section.index}>
          {section.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="text-sm leading-relaxed text-muted sm:text-body">
              {p}
            </p>
          ))}
          {section.table ? <ReferenceTableView table={section.table} /> : null}
        </GuideSection>
      ))}
      <ProductionRealityNote compact />
      <RelatedPanel related={document.related} />
    </>
  );
}
