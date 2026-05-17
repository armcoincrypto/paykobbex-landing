import type { ReactNode } from "react";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";

/** Code sample inside verification frame — expensive technical documentation feel. */
export function CodeInstrumentPanel({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <VerificationFramePanel label="Integration sketch" sublabel={label} className="ops-code-frame">
      {children}
    </VerificationFramePanel>
  );
}
