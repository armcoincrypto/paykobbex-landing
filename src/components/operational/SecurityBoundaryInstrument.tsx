import { FlowArrow } from "@/components/diagrams/FlowArrow";
import { FlowStep } from "@/components/diagrams/FlowStep";

/** Compact verification boundary — for guide frames (no duplicate headings). */
export function SecurityBoundaryInstrument() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
        <FlowStep title="Inbound POST" subtitle="Raw body · signature header" />
        <FlowArrow direction="right" className="hidden sm:block" />
        <FlowArrow direction="down" className="sm:hidden" />
        <FlowStep title="Verify (server)" subtitle="Owner: merchant engineering" />
        <FlowArrow direction="right" className="hidden sm:block" />
        <FlowArrow direction="down" className="sm:hidden" />
        <FlowStep title="Apply (idempotent)" subtitle="Owner: your consumer" />
      </div>
      <div className="rounded-lg border border-dashed border-border-strong/50 bg-canvas/50 px-3 py-2.5 text-center">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
          Not here
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Browsers, mobile apps, and public sites must{" "}
          <strong className="text-primary">not</strong> hold API keys or webhook secrets.
        </p>
      </div>
    </div>
  );
}
