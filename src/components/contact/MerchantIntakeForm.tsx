"use client";

import { useId, useMemo, useRef, useState, type ChangeEvent } from "react";
import { Link } from "@/components/primitives/link";
import { CONTACT_EMAIL } from "@/lib/site";
import { cn } from "@/lib/cn";
import { buttonClass } from "@/components/primitives/button-styles";
import {
  buildIntakeLines,
  buildMailtoHref,
  fieldHasIssue,
  getIntakeValidationIssues,
  integrationTypeOptions,
  intakeMailtoSafe,
  MIN_USE_CASE,
  volumeOptions,
  type IntakeValidationIssue,
  type MerchantIntakeFields,
} from "@/lib/merchant-intake";

function RequiredMark() {
  return (
    <span className="merchant-intake__required" aria-hidden="true">
      *
    </span>
  );
}

export function MerchantIntakeForm({ className }: { className?: string }) {
  const baseId = useId();
  const summaryRef = useRef<HTMLDivElement>(null);
  const [fields, setFields] = useState<MerchantIntakeFields>({
    company: "",
    website: "",
    contactEmail: "",
    reach: "",
    useCase: "",
    volume: "",
    currencies: "",
    integrationType: "",
    targetMarkets: "",
    payoutRequirements: "",
    operationalNotes: "",
    techContact: "",
  });
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [validationIssues, setValidationIssues] = useState<IntakeValidationIssue[]>([]);
  const [actionStatus, setActionStatus] = useState<"idle" | "copied" | "copy-error" | "email-opened">(
    "idle",
  );

  const set =
    (key: keyof MerchantIntakeFields) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      setValidationIssues((prev) =>
        prev.filter((issue) => {
          if (issue.field === key) return false;
          if (issue.field === "org" && (key === "company" || key === "website")) return false;
          return true;
        }),
      );
    };

  const plainBody = useMemo(() => buildIntakeLines(fields).join("\n"), [fields]);
  const mailtoHref = useMemo(() => buildMailtoHref(fields), [fields]);
  const mailtoSafe = intakeMailtoSafe(fields);
  const fallbackMailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Kobbopay — merchant access inquiry")}`;

  const orgRequired = fields.company.trim().length < 2 && fields.website.trim().length < 2;
  const showOrgError = fieldHasIssue("org", validationIssues);
  const showEmailError = fieldHasIssue("contactEmail", validationIssues);
  const showUseCaseError = fieldHasIssue("useCase", validationIssues);
  const showIntegrationError = fieldHasIssue("integrationType", validationIssues);

  const prepareSummary = () => {
    const issues = getIntakeValidationIssues(fields);
    setValidationIssues(issues);
    setActionStatus("idle");

    if (issues.length > 0) {
      setSummaryVisible(false);
      return;
    }

    setSummaryVisible(true);
    window.requestAnimationFrame(() => {
      summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(plainBody);
      setActionStatus("copied");
    } catch {
      setActionStatus("copy-error");
    }
  };

  const onEmailOpen = () => {
    setActionStatus("email-opened");
  };

  return (
    <div className={cn("merchant-intake", className)}>
      {validationIssues.length > 0 ? (
        <div className="merchant-intake__errors" role="alert">
          <p className="merchant-intake__errors-title">Complete required fields</p>
          <ul className="merchant-intake__errors-list">
            {validationIssues.map((issue) => (
              <li key={`${issue.field}-${issue.message}`}>{issue.message}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="merchant-intake__groups">
        <fieldset className="merchant-intake__group">
          <legend className="merchant-intake__legend">Organization</legend>
          <div className="merchant-intake__grid">
            <div className="merchant-intake__field merchant-intake__field--span2">
              <label htmlFor={`${baseId}-company`} className="merchant-intake__label">
                Business / company name
                {orgRequired ? <RequiredMark /> : null}
              </label>
              <input
                id={`${baseId}-company`}
                name="company"
                autoComplete="organization"
                className={cn("merchant-intake__input", showOrgError && "merchant-intake__input--error")}
                value={fields.company}
                onChange={set("company")}
                placeholder="Acme Ltd"
                aria-invalid={showOrgError}
              />
            </div>
            <div className="merchant-intake__field">
              <label htmlFor={`${baseId}-website`} className="merchant-intake__label">
                Website
                {orgRequired ? <RequiredMark /> : null}
              </label>
              <input
                id={`${baseId}-website`}
                name="website"
                type="text"
                inputMode="url"
                autoComplete="url"
                className={cn("merchant-intake__input", showOrgError && "merchant-intake__input--error")}
                value={fields.website}
                onChange={set("website")}
                placeholder="https://example.com"
                aria-invalid={showOrgError}
              />
            </div>
            <div className="merchant-intake__field">
              <label htmlFor={`${baseId}-email`} className="merchant-intake__label">
                Contact email
                <RequiredMark />
              </label>
              <input
                id={`${baseId}-email`}
                name="contactEmail"
                type="email"
                autoComplete="email"
                className={cn("merchant-intake__input", showEmailError && "merchant-intake__input--error")}
                value={fields.contactEmail}
                onChange={set("contactEmail")}
                placeholder="ops@company.com"
                aria-invalid={showEmailError}
                required
              />
            </div>
            <div className="merchant-intake__field merchant-intake__field--span2">
              <label htmlFor={`${baseId}-reach`} className="merchant-intake__label">
                Telegram / alternate contact
              </label>
              <input
                id={`${baseId}-reach`}
                name="reach"
                autoComplete="off"
                className="merchant-intake__input"
                value={fields.reach}
                onChange={set("reach")}
                placeholder="@yourteam on Telegram"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="merchant-intake__group">
          <legend className="merchant-intake__legend">Integration</legend>
          <div className="merchant-intake__grid">
            <div className="merchant-intake__field merchant-intake__field--span2">
              <label htmlFor={`${baseId}-usecase`} className="merchant-intake__label">
                Business model &amp; use case
                <RequiredMark />
              </label>
              <textarea
                id={`${baseId}-usecase`}
                name="useCase"
                rows={3}
                className={cn(
                  "merchant-intake__textarea",
                  showUseCaseError && "merchant-intake__input--error",
                )}
                value={fields.useCase}
                onChange={set("useCase")}
                placeholder="Who pays whom, typical ticket size, and what you need from the API."
                aria-invalid={showUseCaseError}
                required
                minLength={MIN_USE_CASE}
              />
            </div>
            <div className="merchant-intake__field">
              <label htmlFor={`${baseId}-integration`} className="merchant-intake__label">
                Integration type
                <RequiredMark />
              </label>
              <select
                id={`${baseId}-integration`}
                name="integrationType"
                className={cn(
                  "merchant-intake__input",
                  showIntegrationError && "merchant-intake__input--error",
                )}
                value={fields.integrationType}
                onChange={set("integrationType")}
                aria-invalid={showIntegrationError}
                required
              >
                {integrationTypeOptions.map((o) => (
                  <option key={o.value || "empty"} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="merchant-intake__field">
              <label htmlFor={`${baseId}-volume`} className="merchant-intake__label">
                Expected monthly volume
              </label>
              <select
                id={`${baseId}-volume`}
                name="volume"
                className="merchant-intake__input"
                value={fields.volume}
                onChange={set("volume")}
              >
                {volumeOptions.map((o) => (
                  <option key={o.value || "empty"} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="merchant-intake__field merchant-intake__field--span2">
              <label htmlFor={`${baseId}-currencies`} className="merchant-intake__label">
                Primary settlement currencies / assets
              </label>
              <input
                id={`${baseId}-currencies`}
                name="currencies"
                className="merchant-intake__input"
                value={fields.currencies}
                onChange={set("currencies")}
                placeholder="e.g. USDT (TRC20), USDC"
              />
            </div>
            <div className="merchant-intake__field">
              <label htmlFor={`${baseId}-markets`} className="merchant-intake__label">
                Target markets / regions
              </label>
              <input
                id={`${baseId}-markets`}
                name="targetMarkets"
                className="merchant-intake__input"
                value={fields.targetMarkets}
                onChange={set("targetMarkets")}
                placeholder="Countries or regions you serve"
              />
            </div>
            <div className="merchant-intake__field">
              <label htmlFor={`${baseId}-tech`} className="merchant-intake__label">
                Technical contact
              </label>
              <input
                id={`${baseId}-tech`}
                name="techContact"
                autoComplete="name"
                className="merchant-intake__input"
                value={fields.techContact}
                onChange={set("techContact")}
                placeholder="Engineering lead — name and email"
              />
            </div>
            <div className="merchant-intake__field merchant-intake__field--span2">
              <label htmlFor={`${baseId}-payout`} className="merchant-intake__label">
                Payout requirements
              </label>
              <textarea
                id={`${baseId}-payout`}
                name="payoutRequirements"
                rows={2}
                className="merchant-intake__textarea"
                value={fields.payoutRequirements}
                onChange={set("payoutRequirements")}
                placeholder="Outbound settlement frequency, treasury controls, dual approval needs."
              />
            </div>
            <div className="merchant-intake__field merchant-intake__field--span2">
              <label htmlFor={`${baseId}-notes`} className="merchant-intake__label">
                Operational notes
              </label>
              <textarea
                id={`${baseId}-notes`}
                name="operationalNotes"
                rows={2}
                className="merchant-intake__textarea"
                value={fields.operationalNotes}
                onChange={set("operationalNotes")}
                placeholder="Reconciliation approach, compliance constraints, timeline context."
              />
            </div>
          </div>
        </fieldset>
      </div>

      <div className="merchant-intake__actions">
        <button type="button" className={buttonClass("primary")} onClick={prepareSummary}>
          Prepare review summary
        </button>
      </div>

      {summaryVisible ? (
        <div ref={summaryRef} className="merchant-intake__summary" aria-live="polite">
          <div className="merchant-intake__summary-head">
            <h3 className="merchant-intake__summary-title">Review summary</h3>
            <p className="merchant-intake__summary-lead">
              Copy this text and send from your company mailbox, or open an email draft.
            </p>
          </div>
          <pre className="merchant-intake__summary-body">{plainBody}</pre>
          <div className="merchant-intake__summary-actions">
            <button type="button" className={buttonClass("primary")} onClick={() => void copySummary()}>
              Copy request summary
            </button>
            {mailtoSafe ? (
              <Link
                href={mailtoHref}
                variant="button-secondary"
                className="no-underline"
                conv="contact_click"
                onClick={onEmailOpen}
              >
                Open email draft
              </Link>
            ) : (
              <Link
                href={fallbackMailto}
                variant="button-secondary"
                className="no-underline"
                conv="contact_click"
                onClick={onEmailOpen}
              >
                Open email draft (subject only)
              </Link>
            )}
          </div>
          <p className="merchant-intake__summary-fallback">
            Send to{" "}
            <Link href={`mailto:${CONTACT_EMAIL}`} className="font-mono" conv="contact_click">
              {CONTACT_EMAIL}
            </Link>
            {!mailtoSafe ? (
              <span className="merchant-intake__summary-note">
                {" "}
                — draft may omit body on some devices; prefer copy.
              </span>
            ) : null}
          </p>
          {actionStatus === "copied" ? (
            <p className="merchant-intake__status merchant-intake__status--success" role="status">
              Summary copied — paste into your mail app and send to {CONTACT_EMAIL}.
            </p>
          ) : null}
          {actionStatus === "copy-error" ? (
            <p className="merchant-intake__status merchant-intake__status--warn" role="status">
              Could not copy automatically — select the summary text above and copy manually.
            </p>
          ) : null}
          {actionStatus === "email-opened" ? (
            <p className="merchant-intake__status merchant-intake__status--success" role="status">
              Email draft opened — review the message and send when ready.
            </p>
          ) : null}
          <div className="merchant-intake__success" role="note">
            <p className="merchant-intake__success-title">After you send</p>
            <ul className="merchant-intake__success-list">
              <li>Onboarding review initiated</li>
              <li>Merchant enablement review if aligned</li>
              <li>Integration coordination — reviewed enablement, not instant keys</li>
            </ul>
          </div>
        </div>
      ) : null}

      <p className="merchant-intake__footer-note">
        Never send API keys, webhook secrets, or private keys.{" "}
        <Link href="/onboarding">Onboarding expectations</Link>.
      </p>
    </div>
  );
}
