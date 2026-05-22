/**
 * Static readout regions inside the reconciliation inspect zone.
 * These must not drive plane-level inspect activation (P24.5).
 */
export const RECONCILIATION_STATIC_READOUT_SELECTOR = [
  ".settlement-intelligence__rail-meta",
  ".settlement-intelligence__depth-annotation",
  ".settlement-intelligence__masthead",
  ".settlement-intelligence__zone-rail",
  ".settlement-intelligence__topology-head",
  ".settlement-intelligence__visibility-matrix",
].join(",");

export function isReconciliationStaticReadout(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(target.closest(RECONCILIATION_STATIC_READOUT_SELECTOR));
}
