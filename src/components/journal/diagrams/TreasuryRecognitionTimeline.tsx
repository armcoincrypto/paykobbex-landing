import { JR } from "@/components/journal/diagrams/diagram-tokens";

const A11Y = {
  title: "Recognition timeline",
  description:
    "Progression from on-chain detection through provisional policy state to treasury recognition, with chain and books tracks separated.",
};

export function TreasuryRecognitionTimeline() {
  return (
    <svg
      className={JR.svg}
      viewBox="0 0 720 200"
      role="img"
      aria-labelledby="treasury-timeline-title"
      aria-describedby="treasury-timeline-desc"
    >
      <title id="treasury-timeline-title">{A11Y.title}</title>
      <desc id="treasury-timeline-desc">{A11Y.description}</desc>

      <defs>
        <marker id="jr-t-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" className={JR.marker} />
        </marker>
      </defs>

      <line x1="48" y1="100" x2="672" y2="100" className={JR.edge} markerEnd="url(#jr-t-arrow)" />
      <text x="48" y="72" className={JR.laneLabel}>
        Chain track
      </text>
      <text x="48" y="138" className={JR.laneLabel}>
        Books track
      </text>

      {[
        { x: 80, label: "Detection", sub: "observation" },
        { x: 260, label: "Provisional", sub: "policy review" },
        { x: 440, label: "Confirmed", sub: "operational" },
        { x: 600, label: "Recognition", sub: "treasury" },
      ].map((m) => (
        <g key={m.label}>
          <line x1={m.x} y1="88" x2={m.x} y2="112" className={JR.boundary} />
          <circle cx={m.x} cy="100" r="5" className={JR.nodeAccent} />
          <text x={m.x} y="56" textAnchor="middle" className={JR.labelStrong}>
            {m.label}
          </text>
          <text x={m.x} y="156" textAnchor="middle" className={JR.label}>
            {m.sub}
          </text>
        </g>
      ))}

      <rect x="80" y="118" width="360" height="24" rx="2" className={JR.lane} opacity="0.6" />
      <text x="260" y="134" textAnchor="middle" className={JR.label}>
        lag / review window
      </text>
      <line x1="440" y1="112" x2="600" y2="112" className={JR.edgeAccent} markerEnd="url(#jr-t-arrow)" />
    </svg>
  );
}
