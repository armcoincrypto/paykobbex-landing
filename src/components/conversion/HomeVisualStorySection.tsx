import { LifecycleDiagram } from "@/components/diagrams/LifecycleDiagram";
import { DiagramFrame } from "@/components/diagrams/DiagramFrame";
import { FlowArrow } from "@/components/diagrams/FlowArrow";

/** Static reconciliation relationship — commerce / provider / finance planes. */
export function ReconciliationRelationshipDiagram({
  labelledBy,
}: {
  labelledBy?: string;
}) {
  return (
    <DiagramFrame
      caption="Figure: three-plane reconciliation (conceptual — matchers connect planes)."
      labelledBy={labelledBy}
    >
      <div className="mx-auto grid max-w-2xl gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
        <div className="conversion-plane rounded-lg border border-border-subtle/90 bg-canvas/40 px-4 py-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-accent">Commerce</p>
          <p className="mt-1 text-xs text-muted">Orders · fulfillment</p>
        </div>
        <FlowArrow direction="right" className="hidden sm:block" />
        <div className="conversion-plane conversion-plane--accent rounded-lg border border-accent/25 bg-surface-elevated/60 px-4 py-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-accent">Provider</p>
          <p className="mt-1 text-xs text-muted">Lifecycle · webhooks</p>
        </div>
        <FlowArrow direction="right" className="hidden sm:block" />
        <div className="conversion-plane rounded-lg border border-border-subtle/90 bg-canvas/40 px-4 py-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-accent">Finance</p>
          <p className="mt-1 text-xs text-muted">Recognition · posting</p>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted">
        Exception queues capture matcher failures — not silent rewrites.
      </p>
    </DiagramFrame>
  );
}

export function HomeVisualStorySection({ headingId }: { headingId: string }) {
  return (
    <div className="conversion-visual-story grid gap-10 lg:grid-cols-2 lg:gap-12">
      <div>
        <h3 className="text-h3 font-semibold text-primary">Payment lifecycle</h3>
        <p className="mt-2 text-sm text-muted">
          Explicit states your integration and finance teams can align on.
        </p>
        <LifecycleDiagram variant="compact" className="mt-4" diagramLabelledBy={headingId} settle={false} />
      </div>
      <div>
        <h3 className="text-h3 font-semibold text-primary">Reconciliation model</h3>
        <p className="mt-2 text-sm text-muted">
          Three planes stay distinct — matchers connect them with auditable exceptions.
        </p>
        <ReconciliationRelationshipDiagram labelledBy={`${headingId}-reconciliation`} />
      </div>
    </div>
  );
}
