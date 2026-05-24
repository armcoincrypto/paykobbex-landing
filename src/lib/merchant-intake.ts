import { CONTACT_EMAIL } from "@/lib/site";

export const MAILTO_MAX_CHARS = 1800;
export const MIN_USE_CASE = 20;
export const MIN_ORG = 2;

export const volumeOptions = [
  { value: "", label: "Select a rough range (optional)" },
  { value: "Under ~USD 50k / month (crypto volume)", label: "Under ~USD 50k / month" },
  { value: "~USD 50k–250k / month", label: "~USD 50k–250k / month" },
  { value: "~USD 250k–1M / month", label: "~USD 250k–1M / month" },
  { value: "~USD 1M+ / month", label: "~USD 1M+ / month" },
  { value: "Prefer to describe in operational notes", label: "Prefer to describe in notes" },
] as const;

export const integrationTypeOptions = [
  { value: "", label: "Select integration approach" },
  { value: "Server-side API (checkout calls your backend)", label: "Server-side API" },
  { value: "API + merchant portal for operations", label: "API + merchant portal" },
  { value: "Portal-heavy with API for payment creation", label: "Portal-heavy operations" },
  { value: "Architecture review / evaluating fit", label: "Evaluating fit" },
] as const;

export type MerchantIntakeFields = {
  company: string;
  website: string;
  contactEmail: string;
  reach: string;
  useCase: string;
  volume: string;
  currencies: string;
  integrationType: string;
  targetMarkets: string;
  payoutRequirements: string;
  operationalNotes: string;
  techContact: string;
};

export function buildIntakeLines(fields: MerchantIntakeFields): string[] {
  return [
    "Kobbopay — merchant access inquiry",
    "",
    `Company / business: ${fields.company || "—"}`,
    `Website: ${fields.website || "—"}`,
    `Contact email: ${fields.contactEmail || "—"}`,
    `Telegram / alternate contact: ${fields.reach || "—"}`,
    "",
    "Business model & use case:",
    fields.useCase || "—",
    "",
    "Expected monthly volume (ballpark):",
    fields.volume || "—",
    "",
    "Primary settlement currencies / assets:",
    fields.currencies || "—",
    "",
    "Integration type:",
    fields.integrationType || "—",
    "",
    "Target markets / regions:",
    fields.targetMarkets || "—",
    "",
    "Payout requirements:",
    fields.payoutRequirements || "—",
    "",
    "Technical contact:",
    fields.techContact || "—",
    "",
    "Operational notes (optional):",
    fields.operationalNotes || "—",
    "",
    "---",
    "Do not include API keys, webhook secrets, private keys, or seed phrases in email.",
  ];
}

export function buildMailtoHref(fields: MerchantIntakeFields): string {
  const subject = encodeURIComponent("Kobbopay — merchant access inquiry");
  const body = encodeURIComponent(buildIntakeLines(fields).join("\n"));
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export function isIntakeComplete(fields: MerchantIntakeFields): boolean {
  const hasOrg =
    fields.company.trim().length >= MIN_ORG || fields.website.trim().length >= MIN_ORG;
  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.contactEmail.trim());
  const hasUseCase = fields.useCase.trim().length >= MIN_USE_CASE;
  const hasIntegration = fields.integrationType.trim().length > 0;
  return hasOrg && hasEmail && hasUseCase && hasIntegration;
}

export function intakeMailtoSafe(fields: MerchantIntakeFields): boolean {
  if (!isIntakeComplete(fields)) return false;
  return buildMailtoHref(fields).length <= MAILTO_MAX_CHARS;
}

export type IntakeValidationField = keyof MerchantIntakeFields | "org";

export type IntakeValidationIssue = {
  field: IntakeValidationField;
  message: string;
};

export function getIntakeValidationIssues(fields: MerchantIntakeFields): IntakeValidationIssue[] {
  const issues: IntakeValidationIssue[] = [];
  const hasOrg =
    fields.company.trim().length >= MIN_ORG || fields.website.trim().length >= MIN_ORG;

  if (!hasOrg) {
    issues.push({ field: "org", message: "Enter a company name or website." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.contactEmail.trim())) {
    issues.push({ field: "contactEmail", message: "Enter a valid contact email." });
  }
  if (fields.useCase.trim().length < MIN_USE_CASE) {
    issues.push({
      field: "useCase",
      message: `Describe your use case (${MIN_USE_CASE}+ characters).`,
    });
  }
  if (!fields.integrationType.trim()) {
    issues.push({ field: "integrationType", message: "Select an integration type." });
  }
  return issues;
}

export function fieldHasIssue(
  field: IntakeValidationField,
  issues: IntakeValidationIssue[],
): boolean {
  return issues.some((issue) => issue.field === field);
}
