import { JR } from "@/components/journal/diagrams/diagram-tokens";

const A11Y = {
  title: "Settlement lifecycle map",
  description:
    "Three operational layers: chain detection, policy confirmation, and merchant books finality, separated by policy boundaries.",
};

export function SettlementLifecycleDiagram() {
  return (
    <svg
      className={JR.svg}
      viewBox="0 0 720 280"
      role="img"
      aria-labelledby="settlement-lifecycle-title"
      aria-describedby="settlement-lifecycle-desc"
    >
      <title id="settlement-lifecycle-title">{A11Y.title}</title>
      <desc id="settlement-lifecycle-desc">{A11Y.description}</desc>

      <defs>
        <pattern id="jr-grid-settlement" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" className={JR.grid} fill="none" />
        </pattern>
        <marker id="jr-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" className={JR.marker} />
        </marker>
      </defs>
      <rect width="720" height="280" fill="url(#jr-grid-settlement)" opacity="0.4" />

      {/* Lanes */}
      <rect x="24" y="28" width="672" height="56" rx="4" className={JR.lane} />
      <text x="40" y="48" className={JR.laneLabel}>
        Chain / rail observation
      </text>
      <rect x="120" y="44" width="140" height="28" rx="3" className={JR.node} />
      <text x="190" y="62" textAnchor="middle" className={JR.label}>
        Detection
      </text>
      <line x1="260" y1="58" x2="320" y2="58" className={JR.edge} markerEnd="url(#jr-arrow)" />
      <rect x="320" y="44" width="160" height="28" rx="3" className={JR.nodeMuted} />
      <text x="400" y="62" textAnchor="middle" className={JR.label}>
        Explorer signal
      </text>

      <line x1="24" y1="96" x2="696" y2="96" className={JR.boundary} strokeDasharray="4 4" />
      <text x="40" y="108" className={JR.boundaryLabel}>
        Policy boundary
      </text>

      <rect x="24" y="112" width="672" height="56" rx="4" className={JR.lane} />
      <text x="40" y="132" className={JR.laneLabel}>
        Merchant policy
      </text>
      <rect x="120" y="128" width="120" height="28" rx="3" className={JR.nodeMuted} />
      <text x="180" y="146" textAnchor="middle" className={JR.label}>
        Provisional
      </text>
      <line x1="240" y1="142" x2="300" y2="142" className={JR.edgeAccent} markerEnd="url(#jr-arrow)" />
      <rect x="300" y="128" width="140" height="28" rx="3" className={JR.nodeAccent} />
      <text x="370" y="146" textAnchor="middle" className={JR.labelStrong}>
        Confirmed
      </text>
      <text x="480" y="146" className={JR.label}>
        (policy gate)
      </text>

      <line x1="24" y1="180" x2="696" y2="180" className={JR.boundary} />
      <text x="40" y="192" className={JR.boundaryLabel}>
        Books / reconciliation boundary
      </text>

      <rect x="24" y="196" width="672" height="56" rx="4" className={JR.lane} />
      <text x="40" y="216" className={JR.laneLabel}>
        Finance recognition
      </text>
      <rect x="200" y="212" width="200" height="28" rx="3" className={JR.nodeAccent} />
      <text x="300" y="230" textAnchor="middle" className={JR.labelStrong}>
        Books finality
      </text>
      <text x="420" y="230" className={JR.label}>
        reconciliation-owned
      </text>

      <line x1="190" y1="72" x2="190" y2="128" className={JR.edgeDashed} />
      <line x1="370" y1="156" x2="300" y2="212" className={JR.edgeDashed} />
      <text x="198" y="100" className={JR.label}>
        not final
      </text>
    </svg>
  );
}
