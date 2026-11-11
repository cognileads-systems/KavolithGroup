export const FETCH_ERROR_CODES = [
  "INVALID_URL",
  "BLOCKED_DESTINATION",
  "DNS_FAILURE",
  "TIMEOUT",
  "TOO_MANY_REDIRECTS",
  "UNSUPPORTED_CONTENT_TYPE",
  "RESPONSE_TOO_LARGE",
  "UPSTREAM_FAILURE",
] as const;

export type FetchErrorCode = (typeof FETCH_ERROR_CODES)[number];

/** Stable, safe diagnostic metadata. Never place raw network errors here. */
export type FetchDiagnosticError = {
  code: FetchErrorCode;
};
