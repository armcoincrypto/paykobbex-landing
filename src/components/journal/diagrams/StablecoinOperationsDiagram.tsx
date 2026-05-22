import { JR } from "@/components/journal/diagrams/diagram-tokens";

const A11Y = {
  title: "Stablecoin operational flow",
  description:
    "Network abstraction, treasury lanes, settlement versus payout paths for USDT business operations.",
};

export function StablecoinOperationsDiagram() {
  return (
    <svg
      className={JR.svg}
      viewBox="0 0 720 280"
      role="img"
      aria-labelledby="stablecoin-ops-title"
      aria-describedby="stablecoin-ops-desc"
    >
      <title id="stablecoin-ops-title">{A11Y.title}</title>
      <desc id="stablecoin-ops-desc">{A11Y.description}</desc>

      <defs>
        <marker id="jr-s-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" className={JR.marker} />
        </marker>
      </defs>

      <rect x="24" y="32" width="672" height="48" rx="4" className={JR.lane} />
      <text x="40" y="52" className={JR.laneLabel}>
        Network abstraction (configured rail)
      </text>
      <rect x="200" y="44" width="320" height="28" rx="3" className={JR.node} />
      <text x="360" y="62" textAnchor="middle" className={JR.label}>
        USDT · selected network · merchant context
      </text>

      <rect x="24" y="100" width="320" height="72" rx="4" className={JR.lane} />
      <text x="40" y="120" className={JR.laneLabel}>
        Treasury lane
      </text>
      <rect x="48" y="132" width="120" height="28" rx="3" className={JR.node} />
      <text x="108" y="150" textAnchor="middle" className={JR.label}>
        Attribution
      </text>
      <line x1="168" y1="146" x2="200" y2="146" className={JR.edge} markerEnd="url(#jr-s-arrow)" />
      <rect x="200" y="132" width="120" height="28" rx="3" className={JR.nodeAccent} />
      <text x="260" y="150" textAnchor="middle" className={JR.labelStrong}>
        Recognition
      </text>

      <rect x="376" y="100" width="320" height="72" rx="4" className={JR.lane} />
      <text x="392" y="120" className={JR.laneLabel}>
        Settlement vs payout
      </text>
      <rect x="400" y="132" width="120" height="28" rx="3" className={JR.nodeMuted} />
      <text x="460" y="150" textAnchor="middle" className={JR.label}>
        Settlement
      </text>
      <rect x="540" y="132" width="120" height="28" rx="3" className={JR.node} />
      <text x="600" y="150" textAnchor="middle" className={JR.label}>
        Payout request
      </text>

      <line x1="360" y1="136" x2="376" y2="136" className={JR.edgeDashed} />
      <text x="364" y="128" className={JR.label}>
        ≠
      </text>

      <rect x="24" y="196" width="672" height="56" rx="4" className={JR.lane} />
      <text x="40" y="216" className={JR.laneLabel}>
        Reconciliation close
      </text>
      <rect x="240" y="212" width="240" height="28" rx="3" className={JR.nodeAccent} />
      <text x="360" y="230" textAnchor="middle" className={JR.labelStrong}>
        Period alignment · exceptions
      </text>
    </svg>
  );
}
