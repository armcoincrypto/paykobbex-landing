/** Redact secrets from strings before logging or writing errors. */
const SECRET_PATTERNS = [
  /Bearer\s+[A-Za-z0-9._-]+/gi,
  /"private_key"\s*:\s*"[^"]+"/gi,
  /"client_email"\s*:\s*"[^"]+"/gi,
  /PLAUSIBLE_API_KEY[=:]\s*\S+/gi,
  /GSC_[A-Z_]*[=:]\s*\S+/gi,
];

export function redactSecrets(input) {
  if (input == null) return "";
  let out = String(input);
  for (const re of SECRET_PATTERNS) {
    out = out.replace(re, "[REDACTED]");
  }
  return out;
}

export function safeErrorMessage(err) {
  const msg = err instanceof Error ? err.message : String(err);
  return redactSecrets(msg);
}
