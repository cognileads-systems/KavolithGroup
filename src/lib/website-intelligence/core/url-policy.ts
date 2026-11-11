import { DEFAULT_FETCH_POLICY } from "./constants.ts";
import type {
  FetchPolicy,
  IpAddressPolicy,
  WebsiteUrl,
  WebsiteUrlHost,
} from "./types.ts";
import type { FetchErrorCode } from "./errors.ts";

export type WebsiteUrlValidation =
  | {
      success: true;
      url: WebsiteUrl;
      host: WebsiteUrlHost;
    }
  | {
      success: false;
      errorCode: Extract<FetchErrorCode, "INVALID_URL" | "BLOCKED_DESTINATION">;
      host?: WebsiteUrlHost;
    };

/**
 * Performs runtime-independent URL syntax and hostname checks only.
 * It does not resolve DNS or establish that a hostname resolves publicly.
 * The fetch transport must validate and pin every resolved address before
 * connecting, and must re-run this policy for every redirect destination.
 *
 * IP literals are identified but blocked by default until a transport supplies
 * an explicit IP policy. This is deliberately fail-closed for literal hosts.
 */
export function validateWebsiteUrl(
  input: string,
  options: {
    policy?: Pick<FetchPolicy, "maxUrlLength" | "allowedPortsByProtocol">;
    ipAddressPolicy?: IpAddressPolicy;
  } = {},
): WebsiteUrlValidation {
  const policy = options.policy ?? DEFAULT_FETCH_POLICY;
  const trimmed = input.trim();

  if (!trimmed || trimmed.length > policy.maxUrlLength) {
    return { success: false, errorCode: "INVALID_URL" };
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { success: false, errorCode: "INVALID_URL" };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { success: false, errorCode: "INVALID_URL" };
  }

  const rawAuthority = trimmed.match(/^https?:\/\/([^/?#]*)/i)?.[1] ?? "";
  if (parsed.username || parsed.password || rawAuthority.includes("@")) {
    return { success: false, errorCode: "BLOCKED_DESTINATION" };
  }

  const serializedHostname = parsed.hostname.toLowerCase();
  const hostname = serializedHostname.startsWith("[") && serializedHostname.endsWith("]")
    ? serializedHostname.slice(1, -1)
    : serializedHostname.replace(/\.$/, "");
  const literal = identifyIpLiteral(hostname);
  if (!hostname || isLocalHostname(hostname)) {
    return { success: false, errorCode: "BLOCKED_DESTINATION" };
  }

  const allowedPorts = policy.allowedPortsByProtocol[parsed.protocol];
  if (parsed.port && !allowedPorts.includes(Number(parsed.port))) {
    return { success: false, errorCode: "BLOCKED_DESTINATION" };
  }

  if (literal) {
    if (!options.ipAddressPolicy?.isPublic(literal.address)) {
      return {
        success: false,
        errorCode: "BLOCKED_DESTINATION",
        host: { kind: literal.kind, hostname, address: literal.address },
      };
    }
  }

  parsed.hostname = hostname.includes(":") ? `[${hostname}]` : hostname;
  return {
    success: true,
    url: parsed.toString() as WebsiteUrl,
    host: literal
      ? { kind: literal.kind, hostname, address: literal.address }
      : { kind: "hostname", hostname },
  };
}

function isLocalHostname(hostname: string): boolean {
  const host = hostname.replace(/\.$/, "");
  const aliases = new Set([
    "localhost",
    "localhost.localdomain",
    "localhost.local",
    "localhost6",
    "localhost6.localdomain6",
    "local",
    "ip6-localhost",
    "ip6-loopback",
    "loopback",
  ]);

  return (
    aliases.has(host) ||
    host.endsWith(".localhost") ||
    host.endsWith(".local")
  );
}

/** URL canonicalization handles legacy IPv4 spellings before this check. */
function identifyIpLiteral(
  hostname: string,
): { kind: "ipv4" | "ipv6"; address: string } | null {
  const ipv4Octets = hostname.split(".");
  if (
    ipv4Octets.length === 4 &&
    ipv4Octets.every((octet) => /^\d{1,3}$/.test(octet) && Number(octet) <= 255)
  ) {
    return { kind: "ipv4", address: hostname };
  }

  if (hostname.includes(":") && /^[0-9a-f:.]+$/i.test(hostname)) {
    return { kind: "ipv6", address: hostname };
  }

  return null;
}
