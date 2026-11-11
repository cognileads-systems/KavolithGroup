import type { FetchPolicy } from "./types.ts";

export const MAX_URL_LENGTH = 2_048;
export const MAX_REDIRECTS = 3;
export const REQUEST_TIMEOUT_MS = 8_000;
export const MAX_RESPONSE_BODY_BYTES = 2 * 1_024 * 1_024;

export const ACCEPTED_CONTENT_TYPES = Object.freeze([
  "text/html",
  "application/xhtml+xml",
] as const);

/** Immutable defaults; consumers can derive an adjusted policy per deployment. */
export const DEFAULT_FETCH_POLICY: Readonly<FetchPolicy> = Object.freeze({
  maxRedirects: MAX_REDIRECTS,
  requestTimeoutMs: REQUEST_TIMEOUT_MS,
  maxResponseBodyBytes: MAX_RESPONSE_BODY_BYTES,
  acceptedContentTypes: ACCEPTED_CONTENT_TYPES,
  maxUrlLength: MAX_URL_LENGTH,
  allowedPortsByProtocol: Object.freeze({
    "http:": Object.freeze([80]),
    "https:": Object.freeze([443]),
  }),
});
