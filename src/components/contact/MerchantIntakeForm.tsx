"use client";

import { useId, useMemo, useState } from "react";
import { Link } from "@/components/primitives/link";
import { CONTACT_EMAIL } from "@/lib/site";
import { cn } from "@/lib/cn";
import { buttonClass } from "@/components/primitives/button-styles";

const volumeOptions = [
  { value: "", label: "Select a rough range (optional)" },
  { value: "Under ~USD 50k / month (crypto volume)", label: "Under ~USD 50k / month" },
  { value: "~USD 50k–250k / month", label: "~USD 50k–250k / month" },
  { value: "~USD 250k–1M / month", label: "~USD 250k–1M / month" },
  { value: "~USD 1M+ / month", label: "~USD 1M+ / month" },
  { value: "Prefer to describe in use case", label: "Prefer to describe in use case" },
] as const;

/** Many clients truncate mailto URLs; stay conservative to avoid silent drops. */
const MAILTO_MAX_CHARS = 1800;

const MIN_USE_CASE = 20;
const MIN_REACH = 3;
const MIN_ORG = 2;

function buildIntakeLines(fields: {
  company: string;
  website: string;
  useCase: string;
  volume: string;
  rails: string;
  techContact: string;
  reach: string;
}) {
  return [
    "Kobbopay — merchant access inquiry",
    "",
    `Company / project: ${fields.company || "—"}`,
    `Website: ${fields.website || "—"}`,
    "",
    "Use case:",
    fields.useCase || "—",
    "",
    "Expected monthly volume (ballpark):",
    fields.volume || "—",
    "",
    "Required rails (networks, assets, regions):",
    fields.rails || "—",
    "",
    "Technical contact:",
    fields.techContact || "—",
    "",
    "Preferred follow-up (Telegram @handle or email):",
    fields.reach || "—",
    "",
    "---",
    "Do not include API keys, webhook secrets, private keys, or seed phrases in email.",
  ];
}

function buildMailtoHref(fields: Parameters<typeof buildIntakeLines>[0]) {
  const lines = buildIntakeLines(fields);
  const subject = encodeURIComponent("Kobbopay — merchant access inquiry");
  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export function MerchantIntakeForm({ className }: { className?: string }) {
  const baseId = useId();
  const copyStatusId = `${baseId}-copy-status`;
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [useCase, setUseCase] = useState("");
  const [volume, setVolume] = useState("");
  const [rails, setRails] = useState("");
  const [techContact, setTechContact] = useState("");
  const [reach, setReach] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const fields = useMemo(
    () => ({
      company,
      website,
      useCase,
      volume,
      rails,
      techContact,
      reach,
    }),
    [company, website, useCase, volume, rails, techContact, reach],
  );

  const plainBody = useMemo(() => buildIntakeLines(fields).join("\n"), [fields]);

  const mailtoHref = useMemo(() => buildMailtoHref(fields), [fields]);

  const hasOrg = company.trim().length >= MIN_ORG || website.trim().length >= MIN_ORG;
  const intakeComplete =
    hasOrg &&
    reach.trim().length >= MIN_REACH &&
    useCase.trim().length >= MIN_USE_CASE;

  const hrefTooLong = mailtoHref.length > MAILTO_MAX_CHARS;
  const mailtoSafe = intakeComplete && !hrefTooLong;
  const fallbackMailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Kobbopay — merchant access inquiry")}`;

  const copyPlain = async () => {
    if (!intakeComplete) return;
    try {
      await navigator.clipboard.writeText(plainBody);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 2500);
    } catch {
      setCopyStatus("error");
      window.setTimeout(() => setCopyStatus("idle"), 4000);
    }
  };

  return (
    <div className={cn("space-y-4 sm:space-y-5", className)}>
      <p className="text-sm leading-relaxed text-muted">
        Complete the fields below, then open email or copy the text. We never ask for wallet data,
        API secrets, or private keys in this form. After you send, review continues per{" "}
        <Link href="/onboarding" className="text-primary">
          onboarding expectations
        </Link>{" "}
        — not automated provisioning.
      </p>

      <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
        <div className="sm:col-span-2">
          <label htmlFor={`${baseId}-company`} className="text-xs font-medium text-primary">
            Company or project name {!website.trim() ? "(required if no website)" : "(optional)"}
          </label>
          <input
            id={`${baseId}-company`}
            name="company"
            autoComplete="organization"
            className="mt-1.5 w-full min-h-11 rounded-md border border-border-subtle bg-canvas px-3 py-2 text-base text-primary shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-focus sm:text-sm"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Acme Ltd"
          />
        </div>
        <div>
          <label htmlFor={`${baseId}-website`} className="text-xs font-medium text-primary">
            Website {!company.trim() ? "(required if no company name)" : "(optional)"}
          </label>
          <input
            id={`${baseId}-website`}
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            className="mt-1.5 w-full min-h-11 rounded-md border border-border-subtle bg-canvas px-3 py-2 text-base text-primary shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-focus sm:text-sm"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label htmlFor={`${baseId}-reach`} className="text-xs font-medium text-primary">
            How we should reply (required)
          </label>
          <p id={`${baseId}-reach-hint`} className="mt-0.5 text-[11px] leading-snug text-muted">
            Work email, or Telegram <span className="font-mono">@handle</span> — not a wallet
            address.
          </p>
          <input
            id={`${baseId}-reach`}
            name="reach"
            autoComplete="off"
            aria-describedby={`${baseId}-reach-hint`}
            className="mt-1.5 w-full min-h-11 rounded-md border border-border-subtle bg-canvas px-3 py-2 text-base text-primary shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-focus sm:text-sm"
            value={reach}
            onChange={(e) => setReach(e.target.value)}
            placeholder="ops@company.com or @yourteam on Telegram"
            required
            inputMode="text"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${baseId}-usecase`} className="text-xs font-medium text-primary">
            Use case (required, {MIN_USE_CASE}+ characters)
          </label>
          <textarea
            id={`${baseId}-usecase`}
            name="useCase"
            rows={4}
            className="mt-1.5 w-full min-h-[6.5rem] resize-y rounded-md border border-border-subtle bg-canvas px-3 py-2 text-base text-primary shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-focus sm:text-sm"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            placeholder="Who pays whom, typical ticket size, countries, and what you need from the API."
            required
            minLength={MIN_USE_CASE}
          />
        </div>
        <div>
          <label htmlFor={`${baseId}-volume`} className="text-xs font-medium text-primary">
            Expected monthly volume
          </label>
          <select
            id={`${baseId}-volume`}
            name="volume"
            className="mt-1.5 w-full min-h-11 rounded-md border border-border-subtle bg-canvas px-3 py-2 text-base text-primary shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-focus sm:text-sm"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          >
            {volumeOptions.map((o) => (
              <option key={o.value || "empty"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${baseId}-tech`} className="text-xs font-medium text-primary">
            Technical contact
          </label>
          <input
            id={`${baseId}-tech`}
            name="techContact"
            autoComplete="name"
            className="mt-1.5 w-full min-h-11 rounded-md border border-border-subtle bg-canvas px-3 py-2 text-base text-primary shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-focus sm:text-sm"
            value={techContact}
            onChange={(e) => setTechContact(e.target.value)}
            placeholder="Name and work email for engineering"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${baseId}-rails`} className="text-xs font-medium text-primary">
            Required rails
          </label>
          <textarea
            id={`${baseId}-rails`}
            name="rails"
            rows={2}
            className="mt-1.5 w-full resize-y rounded-md border border-border-subtle bg-canvas px-3 py-2 text-base text-primary shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-focus sm:text-sm"
            value={rails}
            onChange={(e) => setRails(e.target.value)}
            placeholder="Chains, assets, and any settlement or compliance constraints we should know."
          />
        </div>
      </div>

      {!intakeComplete ? (
        <p className="text-xs text-muted">
          Fill in company <strong className="text-primary">or</strong> website, a{" "}
          {MIN_USE_CASE}+ character use case, and how we should reply — then you can open email or
          copy the text.
        </p>
      ) : null}

      {intakeComplete && hrefTooLong ? (
        <p className="text-sm text-amber-800 dark:text-amber-200">
          This request is too long for a one-tap mailto link on some devices. Use{" "}
          <strong className="text-primary">Copy request text</strong>, paste into your email app,
          and send to <span className="font-mono">{CONTACT_EMAIL}</span>.
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {mailtoSafe ? (
          <Link
            href={mailtoHref}
            variant="button-primary"
            className="no-underline sm:inline-flex"
            conv="contact_click"
          >
            Open email with this request
          </Link>
        ) : intakeComplete ? (
          <button type="button" className={buttonClass("primary")} onClick={() => void copyPlain()}>
            Copy request text
          </button>
        ) : (
          <button type="button" disabled className={cn(buttonClass("primary"), "opacity-50")}>
            Open email with this request
          </button>
        )}

        {mailtoSafe ? (
          <button
            type="button"
            className={buttonClass("secondary")}
            onClick={() => void copyPlain()}
          >
            Copy request text
          </button>
        ) : intakeComplete ? (
          <Link
            href={fallbackMailto}
            variant="button-secondary"
            className="no-underline sm:inline-flex"
            conv="contact_click"
          >
            Open email (subject only)
          </Link>
        ) : null}

        <p id={copyStatusId} className="sr-only" aria-live="polite">
          {copyStatus === "copied"
            ? "Request text copied to clipboard."
            : copyStatus === "error"
              ? "Could not copy. Select the text manually or use the fallback instructions below."
              : ""}
        </p>
      </div>

      {copyStatus === "copied" ? (
        <p className="text-xs font-medium text-accent" aria-hidden>
          Copied — paste into your mail app and send.
        </p>
      ) : null}
      {copyStatus === "error" ? (
        <p className="text-xs font-medium text-amber-700 dark:text-amber-300" aria-hidden>
          Clipboard blocked — use the manual instructions below.
        </p>
      ) : null}

      <p className="text-xs leading-relaxed text-muted">
        Requires company <span className="lowercase">or</span> website, a short use case, and a
        reply path from a company-controlled mailbox. Access stays subject to approval.
      </p>

      <div
        className="rounded-md border border-border-subtle/90 bg-surface-elevated/50 px-3 py-2.5 text-xs leading-relaxed text-muted"
        role="note"
      >
        <strong className="text-primary">After you send:</strong> we review fit and operational
        detail as capacity allows. Incomplete intake may delay follow-up. If approved, environment
        materials and portal access are issued per your configuration — not via this static site.
      </div>

      <div className="rounded-md border border-border-subtle bg-canvas/80 px-3 py-3 text-sm leading-relaxed text-muted">
        <strong className="text-primary">If your email app does not open</strong> (common on some
        mobile browsers or strict mail clients), send the same details manually to{" "}
        <Link
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-mono text-primary no-underline hover:underline"
          conv="contact_click"
        >
          {CONTACT_EMAIL}
        </Link>{" "}
        with subject line{" "}
        <span className="font-mono text-xs text-primary">
          Kobbopay — merchant access inquiry
        </span>
        . You can also use <strong className="text-primary">Copy request text</strong> once the form
        is complete.
      </div>
    </div>
  );
}
