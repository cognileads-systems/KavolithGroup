import type { FetchDiagnosticError } from "./errors.ts";

/** A URL string that has passed the core's syntactic and hostname checks. */
export type WebsiteUrl = string & { readonly __brand: "WebsiteUrl" };

export type WebsiteUrlHost =
  | { kind: "hostname"; hostname: string }
  | { kind: "ipv4"; hostname: string; address: string }
  | { kind: "ipv6"; hostname: string; address: string };

export type WebsiteFetchInput = {
  url: WebsiteUrl;
};

export type RedirectRecord = {
  status: 301 | 302 | 303 | 307 | 308;
  fromUrl: WebsiteUrl;
  toUrl: WebsiteUrl;
};

export type WebsiteFetchResult = {
  requestedUrl: WebsiteUrl;
  finalUrl: WebsiteUrl | null;
  httpStatus: number | null;
  contentType: string | null;
  responseBytes: number;
  durationMs: number;
  redirects: RedirectRecord[];
  success: boolean;
  error: FetchDiagnosticError | null;
};

export type FetchPolicy = {
  maxRedirects: number;
  requestTimeoutMs: number;
  maxResponseBodyBytes: number;
  acceptedContentTypes: readonly string[];
  maxUrlLength: number;
  allowedPortsByProtocol: Readonly<{
    "http:": readonly number[];
    "https:": readonly number[];
  }>;
};

export type AnalysisJobLifecycle =
  | "queued"
  | "running"
  | "succeeded"
  | "failed"
  | "cancelled";

/** Runtime adapter contract for future DNS resolution; core performs no DNS. */
export interface DnsResolver {
  resolve(hostname: string): Promise<readonly string[]>;
}

/** Runtime-independent IP classification policy supplied by a future transport. */
export interface IpAddressPolicy {
  isPublic(address: string): boolean;
}
