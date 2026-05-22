import type { JournalHubSlug } from "@/lib/journal/types";
import { JR } from "@/components/journal/diagrams/diagram-tokens";

const HUB_A11Y: Record<JournalHubSlug, { title: string; description: string }> = {
  "settlement-operations": {
    title: "Settlement hub — finality rail",
    description: "Ledger close line with policy boundary between detection and books.",
  },
  "webhook-security": {
    title: "Webhook hub — signed transport chain",
    description: "Verification nodes along a delivery chain.",
  },
  reconciliation: {
    title: "Reconciliation hub — alignment grid",
    description: "Accounting grid with commerce and finance planes.",
  },
  "payment-infrastructure": {
    title: "Infrastructure hub — layered topology",
    description: "Stacked operational layers from integration to rails.",
  },
  "stablecoin-operations": {
    title: "Stablecoin hub — treasury lanes",
    description: "Treasury flow lanes with network partition.",
  },
};

export function HubResearchDiagram({ hubSlug }: { hubSlug: JournalHubSlug }) {
  const a11y = HUB_A11Y[hubSlug];

  return (
    <svg
      className={`${JR.svg} jr-diagram__svg--hub`}
      viewBox="0 0 400 160"
      role="img"
      aria-labelledby={`hub-diagram-${hubSlug}-title`}
      aria-describedby={`hub-diagram-${hubSlug}-desc`}
    >
      <title id={`hub-diagram-${hubSlug}-title`}>{a11y.title}</title>
      <desc id={`hub-diagram-${hubSlug}-desc`}>{a11y.description}</desc>

      {hubSlug === "settlement-operations" && <SettlementHubMotif />}
      {hubSlug === "webhook-security" && <WebhookHubMotif />}
      {hubSlug === "reconciliation" && <ReconciliationHubMotif />}
      {hubSlug === "payment-infrastructure" && <InfrastructureHubMotif />}
      {hubSlug === "stablecoin-operations" && <StablecoinHubMotif />}
    </svg>
  );
}

function SettlementHubMotif() {
  return (
    <g>
      <line x1="24" y1="120" x2="376" y2="120" className={JR.edgeAccent} />
      <line x1="24" y1="80" x2="376" y2="80" className={JR.boundary} strokeDasharray="4 4" />
      <rect x="60" y="48" width="80" height="24" rx="3" className={JR.node} />
      <text x="100" y="64" textAnchor="middle" className={JR.label}>
        Detect
      </text>
      <rect x="260" y="96" width="100" height="24" rx="3" className={JR.nodeAccent} />
      <text x="310" y="112" textAnchor="middle" className={JR.labelStrong}>
        Books close
      </text>
      <text x="200" y="72" textAnchor="middle" className={JR.boundaryLabel}>
        finality rail
      </text>
    </g>
  );
}

function WebhookHubMotif() {
  return (
    <g>
      {[80, 160, 240, 320].map((x, i) => (
        <g key={x}>
          <rect x={x - 28} y="64" width="56" height="32" rx="3" className={i === 2 ? JR.nodeAccent : JR.node} />
          {i < 3 ? <line x1={x + 28} y1="80" x2={x + 52} y2="80" className={JR.edge} /> : null}
        </g>
      ))}
      <text x="200" y="48" textAnchor="middle" className={JR.laneLabel}>
        signed chain
      </text>
    </g>
  );
}

function ReconciliationHubMotif() {
  return (
    <g>
      <pattern id="hub-recon-grid" width="16" height="16" patternUnits="userSpaceOnUse">
        <path d="M16 0 L0 0 0 16" className={JR.grid} fill="none" />
      </pattern>
      <rect x="40" y="40" width="320" height="96" fill="url(#hub-recon-grid)" opacity="0.5" rx="4" />
      <line x1="40" y1="88" x2="360" y2="88" className={JR.boundary} />
      <line x1="200" y1="40" x2="200" y2="136" className={JR.boundary} />
    </g>
  );
}

function InfrastructureHubMotif() {
  return (
    <g>
      {[48, 80, 112].map((y, i) => (
        <rect key={y} x="80" y={y} width="240" height="22" rx="3" className={i === 2 ? JR.nodeAccent : JR.node} />
      ))}
      <line x1="56" y1="48" x2="56" y2="134" className={JR.boundary} />
    </g>
  );
}

function StablecoinHubMotif() {
  return (
    <g>
      <rect x="48" y="56" width="140" height="48" rx="4" className={JR.lane} />
      <text x="118" y="84" textAnchor="middle" className={JR.label}>
        Treasury
      </text>
      <rect x="212" y="56" width="140" height="48" rx="4" className={JR.lane} />
      <text x="282" y="84" textAnchor="middle" className={JR.label}>
        Network
      </text>
      <line x1="188" y1="80" x2="212" y2="80" className={JR.edgeDashed} />
    </g>
  );
}
