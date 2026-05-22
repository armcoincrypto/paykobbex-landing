import type { ComponentType } from "react";
import { SettlementLifecycleDiagram } from "@/components/journal/diagrams/SettlementLifecycleDiagram";
import { TreasuryRecognitionTimeline } from "@/components/journal/diagrams/TreasuryRecognitionTimeline";
import { WebhookVerificationFlowDiagram } from "@/components/journal/diagrams/WebhookVerificationFlowDiagram";
import { ReconciliationMatrixDiagram } from "@/components/journal/diagrams/ReconciliationMatrixDiagram";
import { StablecoinOperationsDiagram } from "@/components/journal/diagrams/StablecoinOperationsDiagram";
import { InfrastructureRailTopology } from "@/components/journal/diagrams/InfrastructureRailTopology";
import { JournalResearchFigure } from "@/components/journal/diagrams/JournalResearchFigure";

export type ArticleDiagramSpec = {
  id: string;
  title: string;
  caption?: string;
  interpretation: string;
  Diagram: ComponentType;
};

export const JOURNAL_ARTICLE_DIAGRAMS: Record<string, ArticleDiagramSpec[]> = {
  "payment-detection-vs-settlement-finality": [
    {
      id: "fig-settlement-lifecycle",
      title: "Settlement lifecycle map",
      caption: "Detection, policy confirmation, and books finality as separate operational layers.",
      interpretation:
        "Engineering should never write directly to a “final” flag from chain visibility alone. Detection feeds policy; policy feeds reconciliation; only finance-owned gates should mark books finality.",
      Diagram: SettlementLifecycleDiagram,
    },
    {
      id: "fig-recognition-timeline",
      title: "Detection → recognition timeline",
      caption: "Chain track and books track with intentional lag between operational confirmation and treasury recognition.",
      interpretation:
        "Treasury recognition is allowed to trail explorer confirmation. The diagram makes that lag explicit so teams do not collapse timelines in support tooling or webhook handlers.",
      Diagram: TreasuryRecognitionTimeline,
    },
  ],
  "verify-crypto-webhooks-safely": [
    {
      id: "fig-webhook-verify",
      title: "Signed webhook verification flow",
      caption: "Ingress, raw-body verification boundary, idempotent apply, and lifecycle mutation.",
      interpretation:
        "Verification is a hard gate on exact bytes. Handlers that parse JSON before HMAC compare inherit subtle forgery and reorder bugs—treat verify as a separate trust zone from business logic.",
      Diagram: WebhookVerificationFlowDiagram,
    },
  ],
  "usdt-business-payments": [
    {
      id: "fig-stablecoin-ops",
      title: "Stablecoin operational lifecycle",
      caption: "Network abstraction, treasury lane, and settlement versus payout distinction.",
      interpretation:
        "USDT operational simplicity is not treasury simplicity. Network context, attribution, and payout requests belong in separate lanes with distinct controls and audit language.",
      Diagram: StablecoinOperationsDiagram,
    },
  ],
  "reliable-reconciliation-flows": [
    {
      id: "fig-recon-matrix",
      title: "Reconciliation alignment matrix",
      caption: "Commerce, provider, and finance planes with mapping lanes and exception branches.",
      interpretation:
        "Healthy reconciliation is explainable links between planes—not a single dashboard green state. Exceptions are first-class branches with owners, not silent adjustments.",
      Diagram: ReconciliationMatrixDiagram,
    },
  ],
  "production-grade-crypto-payment-infrastructure": [
    {
      id: "fig-infra-topology",
      title: "Infrastructure topology",
      caption: "Merchant integration through policy, treasury, and rail orchestration layers.",
      interpretation:
        "Production-grade infrastructure is layered trust boundaries. Secrets, verification, lifecycle, and treasury each live in a layer with explicit contracts—not a monolithic “payment widget.”",
      Diagram: InfrastructureRailTopology,
    },
  ],
};

export function getArticleDiagrams(slug: string): ArticleDiagramSpec[] {
  return JOURNAL_ARTICLE_DIAGRAMS[slug] ?? [];
}

export function ArticleDiagramFigure({ spec }: { spec: ArticleDiagramSpec }) {
  const { Diagram } = spec;
  return (
    <JournalResearchFigure
      id={spec.id}
      title={spec.title}
      caption={spec.caption}
      interpretation={spec.interpretation}
    >
      <Diagram />
    </JournalResearchFigure>
  );
}
