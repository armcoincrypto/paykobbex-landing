import { JR } from "@/components/journal/diagrams/diagram-tokens";

const A11Y = {
  title: "Signed webhook verification flow",
  description:
    "Transport from provider through ingress, raw-body verification boundary, idempotent apply step, and lifecycle mutation.",
};

export function WebhookVerificationFlowDiagram() {
  return (
    <svg
      className={JR.svg}
      viewBox="0 0 720 260"
      role="img"
      aria-labelledby="webhook-flow-title"
      aria-describedby="webhook-flow-desc"
    >
      <title id="webhook-flow-title">{A11Y.title}</title>
      <desc id="webhook-flow-desc">{A11Y.description}</desc>

      <defs>
        <marker id="jr-w-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" className={JR.marker} />
        </marker>
      </defs>

      <rect x="32" y="88" width="100" height="48" rx="4" className={JR.node} />
      <text x="82" y="116" textAnchor="middle" className={JR.labelStrong}>
        Provider
      </text>

      <line x1="132" y1="112" x2="168" y2="112" className={JR.edge} markerEnd="url(#jr-w-arrow)" />

      <rect x="168" y="88" width="88" height="48" rx="4" className={JR.node} />
      <text x="212" y="116" textAnchor="middle" className={JR.label}>
        Ingress
      </text>

      <line x1="256" y1="112" x2="292" y2="112" className={JR.edge} markerEnd="url(#jr-w-arrow)" />

      <rect x="292" y="72" width="136" height="88" rx="4" className={JR.lane} />
      <text x="360" y="92" textAnchor="middle" className={JR.boundaryLabel}>
        Verify boundary
      </text>
      <rect x="308" y="104" width="104" height="36" rx="3" className={JR.nodeAccent} />
      <text x="360" y="126" textAnchor="middle" className={JR.labelStrong}>
        Raw-body HMAC
      </text>

      <line x1="428" y1="112" x2="464" y2="112" className={JR.edgeAccent} markerEnd="url(#jr-w-arrow)" />

      <rect x="464" y="88" width="120" height="48" rx="4" className={JR.node} />
      <text x="524" y="108" textAnchor="middle" className={JR.label}>
        Idempotent
      </text>
      <text x="524" y="124" textAnchor="middle" className={JR.label}>
        handler
      </text>

      <line x1="584" y1="112" x2="620" y2="112" className={JR.edge} markerEnd="url(#jr-w-arrow)" />

      <rect x="620" y="88" width="72" height="48" rx="4" className={JR.nodeAccent} />
      <text x="656" y="116" textAnchor="middle" className={JR.labelStrong}>
        Lifecycle
      </text>

      <rect x="168" y="168" width="416" height="56" rx="4" className={JR.lane} />
      <text x="376" y="188" textAnchor="middle" className={JR.laneLabel}>
        Replay-safe store · dedupe key · at-least-once delivery
      </text>
      <path d="M360 160 L360 168" className={JR.edgeDashed} />
    </svg>
  );
}
