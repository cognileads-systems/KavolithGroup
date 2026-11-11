import "@tanstack/react-start/server-only";
import { isIP } from "node:net";
import { resolve4, resolve6 } from "node:dns/promises";
import { classifyIpAddress, type IpFamily } from "./ip-validator.ts";

export type ResolvedPublicAddress = {
  address: string;
  family: IpFamily;
};

export type PublicDnsResolution = {
  hostname: string;
  addresses: readonly ResolvedPublicAddress[];
};

export type DnsResolverErrorCode = "DNS_FAILURE" | "BLOCKED_DESTINATION";

/** Safe transport-layer failure; raw resolver messages are intentionally omitted. */
export class DnsResolverError extends Error {
  readonly code: DnsResolverErrorCode;
  readonly reason: string;
  readonly dnsCode: string | undefined;

  constructor(
    code: DnsResolverErrorCode,
    reason: string,
    dnsCode?: string,
  ) {
    super(reason);
    this.name = "DnsResolverError";
    this.code = code;
    this.reason = reason;
    this.dnsCode = dnsCode;
  }
}

/** Small seam for deterministic tests. Production uses node:dns/promises below. */
export interface DnsLookup {
  resolve4(hostname: string): Promise<readonly string[]>;
  resolve6(hostname: string): Promise<readonly string[]>;
}

const nodeDnsLookup: DnsLookup = { resolve4, resolve6 };

/**
 * Resolves both address families independently and returns only classified
 * public addresses. This lookup step does not pin or establish a connection.
 */
export async function resolvePublicAddresses(
  hostname: string,
  lookup: DnsLookup = nodeDnsLookup,
): Promise<PublicDnsResolution> {
  if (!isValidDnsHostname(hostname)) {
    throw new DnsResolverError("DNS_FAILURE", "INVALID_HOSTNAME");
  }

  const [ipv4Result, ipv6Result] = await Promise.allSettled([
    Promise.resolve().then(() => lookup.resolve4(hostname)),
    Promise.resolve().then(() => lookup.resolve6(hostname)),
  ]);

  const ipv4 = extractFamilyResult(ipv4Result, 4);
  const ipv6 = extractFamilyResult(ipv6Result, 6);

  if (ipv4.length === 0 && ipv6.length === 0) {
    throw new DnsResolverError("DNS_FAILURE", "NO_ADDRESS_RECORDS");
  }

  const addresses = new Map<string, ResolvedPublicAddress>();
  validateAndAdd(ipv4, 4, addresses);
  validateAndAdd(ipv6, 6, addresses);

  return { hostname, addresses: [...addresses.values()] };
}

function extractFamilyResult(
  result: PromiseSettledResult<readonly string[]>,
  family: IpFamily,
): readonly string[] {
  if (result.status === "fulfilled") {
    if (!Array.isArray(result.value) || result.value.length === 0) {
      throw new DnsResolverError("DNS_FAILURE", `MALFORMED_IPV${family}_RESPONSE`);
    }
    return result.value;
  }

  const dnsCode = getDnsErrorCode(result.reason);
  // ENODATA means this RR type has no records. ENOTFOUND is not equivalent:
  // it can indicate a nonexistent name or other resolver-level failure.
  if (dnsCode === "ENODATA") return [];
  throw new DnsResolverError(
    "DNS_FAILURE",
    `IPV${family}_RESOLUTION_FAILED`,
    dnsCode,
  );
}

function validateAndAdd(
  records: readonly string[],
  recordFamily: IpFamily,
  addresses: Map<string, ResolvedPublicAddress>,
): void {
  for (const address of records) {
    if (typeof address !== "string" || isIP(address) !== recordFamily) {
      throw new DnsResolverError(
        "DNS_FAILURE",
        `MALFORMED_IPV${recordFamily}_ADDRESS`,
      );
    }

    const classification = classifyIpAddress(address);
    if (!classification.valid) {
      throw new DnsResolverError(
        "DNS_FAILURE",
        classification.reason,
      );
    }
    if (!classification.isPublic) {
      throw new DnsResolverError(
        "BLOCKED_DESTINATION",
        classification.reason ?? "NON_PUBLIC_ADDRESS",
      );
    }

    // Mapped IPv6 answers are normalized by the shared classifier to IPv4.
    const normalized = {
      address: classification.normalizedAddress,
      family: classification.family,
    };
    addresses.set(`${normalized.family}:${normalized.address}`, normalized);
  }
}

function getDnsErrorCode(error: unknown): string | undefined {
  if (error === null || typeof error !== "object" || !("code" in error)) {
    return undefined;
  }
  const code = error.code;
  return typeof code === "string" ? code : undefined;
}

function isValidDnsHostname(hostname: string): boolean {
  if (
    typeof hostname !== "string" ||
    hostname.length === 0 ||
    hostname.length > 254 ||
    isIP(hostname) !== 0
  ) {
    return false;
  }

  const absoluteName = hostname.endsWith(".");
  const name = absoluteName ? hostname.slice(0, -1) : hostname;
  if (!name || name.length > 253) return false;

  return name.split(".").every(
    (label) =>
      label.length > 0 &&
      label.length <= 63 &&
      /^[a-z\d](?:[a-z\d-]*[a-z\d])?$/i.test(label),
  );
}
