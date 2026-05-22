import type { ReactNode } from "react";

export function JournalResearchFigure({
  id,
  title,
  caption,
  interpretation,
  children,
}: {
  id: string;
  title: string;
  caption?: string;
  interpretation: string;
  children: ReactNode;
}) {
  const titleId = `${id}-title`;
  const interpretationId = `${id}-interpretation`;

  return (
    <figure
      className="jr-figure"
      role="group"
      aria-labelledby={titleId}
      aria-describedby={interpretationId}
    >
      <figcaption className="jr-figure__header">
        <p id={titleId} className="jr-figure__title">
          {title}
        </p>
        {caption ? <p className="jr-figure__caption">{caption}</p> : null}
      </figcaption>
      <div className="jr-figure__canvas">{children}</div>
      <div className="jr-figure__interpretation">
        <p className="jr-figure__interpretation-label">Operational interpretation</p>
        <p id={interpretationId} className="jr-figure__interpretation-text">
          {interpretation}
        </p>
      </div>
    </figure>
  );
}

export function diagramA11y(title: string, description: string) {
  return { title, description };
}
