import { Link } from "@/components/primitives/link";
import { Container } from "@/components/primitives/Container";
import { JsonLd } from "@/components/seo/JsonLd";

export type JournalAuthoritySection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

export function JournalAuthorityPage({
  eyebrow,
  title,
  lead,
  sections,
  jsonLd,
  footerLinks,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  sections: JournalAuthoritySection[];
  jsonLd: Record<string, unknown>;
  footerLinks?: Array<{ href: string; label: string }>;
}) {
  return (
    <>
      <JsonLd id={`ld-json-${eyebrow.replace(/\s+/g, "-").toLowerCase()}`} data={jsonLd} />

      <div className="journal-publication journal-authority">
        <div className="journal-publication__frame" aria-hidden="true" />
        <div className="journal-publication__atmosphere" aria-hidden="true" />
        <Container className="journal-publication__container journal-authority__container">
          <header className="journal-authority__intro">
            <p className="journal-masthead__eyebrow">{eyebrow}</p>
            <h1 className="journal-authority__title">{title}</h1>
            <p className="journal-authority__lead">{lead}</p>
          </header>

          <div className="journal-authority__body">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="journal-authority__section"
                aria-labelledby={`${section.id}-heading`}
              >
                <h2 id={`${section.id}-heading`} className="journal-authority__section-title">
                  {section.title}
                </h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)} className="journal-authority__p">
                    {p}
                  </p>
                ))}
                {section.list ? (
                  <ul className="journal-authority__list">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {footerLinks?.length ? (
            <footer className="journal-authority__footer">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="journal-index__footer-link no-underline" muted>
                  {link.label}
                </Link>
              ))}
            </footer>
          ) : null}
        </Container>
      </div>
    </>
  );
}
