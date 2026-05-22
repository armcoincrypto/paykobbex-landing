import { JR } from "@/components/journal/diagrams/diagram-tokens";

const A11Y = {
  title: "Payment infrastructure topology",
  description:
    "Layered stack from merchant integration through ingress, policy, treasury, and settlement orchestration on selected rails.",
};

export function InfrastructureRailTopology() {
  const layers = [
    { y: 32, label: "Merchant integration", sub: "API · portal · webhooks" },
    { y: 88, label: "Ingress & verification", sub: "signed events · secrets server-side" },
    { y: 144, label: "Policy & lifecycle", sub: "Pending · Paid · Confirmed" },
    { y: 200, label: "Treasury & balances", sub: "attribution · merchant ledger view" },
    { y: 256, label: "Rail orchestration", sub: "selected networks · bounded config" },
  ];

  return (
    <svg
      className={JR.svg}
      viewBox="0 0 720 320"
      role="img"
      aria-labelledby="infra-topology-title"
      aria-describedby="infra-topology-desc"
    >
      <title id="infra-topology-title">{A11Y.title}</title>
      <desc id="infra-topology-desc">{A11Y.description}</desc>

      {layers.map((layer, i) => (
        <g key={layer.label}>
          <rect x="80" y={layer.y} width="560" height="44" rx="4" className={i === 4 ? JR.lane : JR.node} />
          <text x="104" y={layer.y + 20} className={JR.labelStrong}>
            {layer.label}
          </text>
          <text x="104" y={layer.y + 34} className={JR.label}>
            {layer.sub}
          </text>
          {i < layers.length - 1 ? (
            <line
              x1="360"
              y1={layer.y + 44}
              x2="360"
              y2={layers[i + 1].y}
              className={JR.edgeAccent}
            />
          ) : null}
        </g>
      ))}

      <line x1="48" y1="32" x2="48" y2="300" className={JR.boundary} />
      <text x="56" y="168" className={JR.boundaryLabel} transform="rotate(-90 56 168)">
        Trust boundary
      </text>
    </svg>
  );
}
