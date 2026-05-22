import { cn } from "@/lib/cn";

export type OperationalPrinciple = {
  title: string;
  body: string;
  zone?: "reconcile";
};

const principleMeta: ReadonlyArray<{
  tags: readonly [string, string];
  group: "lifecycle" | "webhook" | "review" | "reconcile" | "withdrawal";
}> = [
  { tags: ["ENGINEERING", "LIFECYCLE"], group: "lifecycle" },
  { tags: ["ENGINEERING", "WEBHOOK"], group: "webhook" },
  { tags: ["OPERATIONS", "POLICY"], group: "review" },
  { tags: ["SETTLEMENT", "POLICY"], group: "reconcile" },
  { tags: ["FINANCE", "SETTLEMENT"], group: "reconcile" },
  { tags: ["OPERATIONS", "TREASURY"], group: "withdrawal" },
];

/** P18 — operational principles matrix (homepage ops architecture). */
export function OperationalPrinciplesMatrix({
  principles,
  className,
  embedded = false,
}: {
  principles: readonly OperationalPrinciple[];
  className?: string;
  embedded?: boolean;
}) {
  return (
    <section
      className={cn("ops-principles-matrix", embedded && "ops-principles-matrix--embedded", className)}
      aria-labelledby={embedded ? undefined : "ops-principles-matrix-heading"}
    >
      {!embedded ? (
      <header className="ops-principles-matrix__head">
        <span className="ops-principles-matrix__system-index" aria-hidden="true">
          05
        </span>
        <div>
          <h3 id="ops-principles-matrix-heading" className="ops-principles-matrix__title">
            Operational principles
          </h3>
          <p className="ops-principles-matrix__meta">
            How engineering, finance, and operations align on the same system
          </p>
        </div>
      </header>
      ) : null}

      <ol className="ops-principles-matrix__grid list-none p-0 m-0">
        {principles.map((principle, i) => {
          const meta = principleMeta[i];
          return (
            <li
              key={principle.title}
              className={cn(
                "ops-principles-matrix__card",
                meta.group === "reconcile" && "ops-principles-matrix__card--reconcile",
              )}
              data-ops-zone={principle.zone}
            >
              <div className="ops-principles-matrix__card-head">
                <span className="ops-principles-matrix__index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="ops-principles-matrix__tags" aria-hidden="true">
                  <span className="ops-principles-matrix__tag">{meta.tags[0]}</span>
                  <span className="ops-principles-matrix__tag">{meta.tags[1]}</span>
                </div>
              </div>
              <h4 className="ops-principles-matrix__card-title">{principle.title}</h4>
              <p className="ops-principles-matrix__card-body">{principle.body}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
