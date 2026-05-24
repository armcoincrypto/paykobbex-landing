"use client";

import { GLOSSARY_TERMS } from "@/lib/glossary-terms";

/** Mobile term jump — native select, minimal client surface. */
export function GlossaryTermJump() {
  return (
    <label className="ops-glossary-term-jump">
      <span className="sr-only">Jump to glossary term</span>
      <select
        defaultValue=""
        aria-label="Jump to glossary term"
        onChange={(event) => {
          const value = event.currentTarget.value;
          if (!value) {
            return;
          }
          window.location.hash = value;
          event.currentTarget.value = "";
        }}
      >
        <option value="">Jump to term…</option>
        {GLOSSARY_TERMS.map((entry) => (
          <option key={entry.id} value={entry.id}>
            {entry.term}
          </option>
        ))}
      </select>
    </label>
  );
}
