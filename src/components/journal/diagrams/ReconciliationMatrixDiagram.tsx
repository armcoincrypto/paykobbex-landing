import { JR } from "@/components/journal/diagrams/diagram-tokens";

const A11Y = {
  title: "Reconciliation alignment matrix",
  description:
    "Three planes—commerce, provider lifecycle, and finance records—with mapping lanes and exception branches.",
};

export function ReconciliationMatrixDiagram() {
  const rows = ["Commerce", "Provider", "Finance"];
  const cols = ["Expected", "Observed", "Posted"];

  return (
    <svg
      className={JR.svg}
      viewBox="0 0 720 300"
      role="img"
      aria-labelledby="recon-matrix-title"
      aria-describedby="recon-matrix-desc"
    >
      <title id="recon-matrix-title">{A11Y.title}</title>
      <desc id="recon-matrix-desc">{A11Y.description}</desc>

      <defs>
        <pattern id="jr-grid-recon" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" className={JR.grid} fill="none" />
        </pattern>
      </defs>
      <rect x="24" y="24" width="672" height="252" fill="url(#jr-grid-recon)" opacity="0.35" rx="4" />

      {cols.map((col, ci) => (
        <text key={col} x={180 + ci * 160} y="52" textAnchor="middle" className={JR.labelStrong}>
          {col}
        </text>
      ))}

      {rows.map((row, ri) => (
        <g key={row}>
          <text x="56" y={100 + ri * 72} textAnchor="middle" className={JR.laneLabel}>
            {row}
          </text>
          {cols.map((_, ci) => (
            <rect
              key={`${row}-${ci}`}
              x={100 + ci * 160}
              y={72 + ri * 72}
              width="140"
              height="56"
              rx="3"
              className={ri === 2 && ci === 2 ? JR.nodeAccent : JR.node}
            />
          ))}
          <line
            x1="100"
            y1={128 + ri * 72}
            x2="580"
            y2={128 + ri * 72}
            className={JR.boundary}
            opacity={ri < 2 ? 1 : 0}
          />
        </g>
      ))}

      <path d="M240 200 L400 128" className={JR.edgeDashed} />
      <text x="310" y="168" className={JR.label}>
        mapping
      </text>

      <rect x="500" y="220" width="160" height="44" rx="3" className={JR.nodeMuted} />
      <text x="580" y="238" textAnchor="middle" className={JR.label}>
        Exception queue
      </text>
      <text x="580" y="254" textAnchor="middle" className={JR.label}>
        human review
      </text>
      <path d="M520 200 L560 220" className={JR.edgeDashed} />

      <line x1="24" y1="200" x2="100" y2="200" className={JR.boundary} strokeDasharray="3 3" />
      <text x="32" y="192" className={JR.boundaryLabel}>
        Ops / finance
      </text>
    </svg>
  );
}
