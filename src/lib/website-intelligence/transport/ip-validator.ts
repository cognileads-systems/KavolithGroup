import { isIP } from "node:net";

export type IpFamily = 4 | 6;

export type IpClassification =
  | {
      valid: true;
      family: IpFamily;
      address: string;
      normalizedAddress: string;
      isPublic: boolean;
      reason: string | null;
    }
  | {
      valid: false;
      family: null;
      address: string;
      normalizedAddress: null;
      isPublic: false;
      reason: "MALFORMED_ADDRESS" | "IPV6_ZONE_IDENTIFIER";
    };

type CidrRule = { cidr: string; reason: string };

/*
 * Policy source: IANA IPv4 Special-Purpose Address Registry and IPv6
 * Special-Purpose Address Registries (last updated 2025-10-09) and IANA IPv6
 * Global Unicast Address Space registry (last updated 2025-10-10). This is a
 * pinned, auditable snapshot, not a live registry fetch. Review the registries
 * when updating this policy.
 *
 * IPv4 rules cover all special-purpose blocks in the registry, including
 * globally reachable protocol anycast exceptions. We intentionally reject
 * those exceptions for arbitrary website destinations. 224/4 and 240/4 are
 * also rejected for multicast and reserved/future-use space; 255.255.255.255
 * is covered by 240/4. Metadata services at 169.254.169.254 and other
 * link-local metadata endpoints are covered by 169.254/16.
 */
const IPV4_REJECTED: readonly CidrRule[] = [
  { cidr: "0.0.0.0/8", reason: "This-network and current-network addresses are not global destinations." },
  { cidr: "10.0.0.0/8", reason: "RFC 1918 private-use network." },
  { cidr: "100.64.0.0/10", reason: "RFC 6598 shared address space is not globally reachable." },
  { cidr: "127.0.0.0/8", reason: "IPv4 loopback." },
  { cidr: "169.254.0.0/16", reason: "IPv4 link-local, including cloud metadata addresses." },
  { cidr: "172.16.0.0/12", reason: "RFC 1918 private-use network." },
  { cidr: "192.0.0.0/24", reason: "IANA IETF protocol assignments; protocol-specific exceptions are excluded." },
  { cidr: "192.0.2.0/24", reason: "Documentation (TEST-NET-1)." },
  { cidr: "192.31.196.0/24", reason: "IANA AS112 special-purpose range; excluded by policy." },
  { cidr: "192.52.193.0/24", reason: "IANA AMT special-purpose range; excluded by policy." },
  { cidr: "192.88.99.0/24", reason: "Deprecated 6to4 relay and special-purpose range." },
  { cidr: "192.168.0.0/16", reason: "RFC 1918 private-use network." },
  { cidr: "192.175.48.0/24", reason: "IANA AS112 special-purpose range; excluded by policy." },
  { cidr: "198.18.0.0/15", reason: "RFC 2544 benchmarking range." },
  { cidr: "198.51.100.0/24", reason: "Documentation (TEST-NET-2)." },
  { cidr: "203.0.113.0/24", reason: "Documentation (TEST-NET-3)." },
  { cidr: "224.0.0.0/4", reason: "IPv4 multicast." },
  { cidr: "240.0.0.0/4", reason: "Reserved/future-use and limited broadcast addresses." },
];

/*
 * IPv6 is positively limited to currently allocated prefixes in IANA's IPv6
 * Global Unicast Address Space registry, then special-purpose assignments in
 * those prefixes are excluded. Unallocated parts of 2000::/3 are reserved for
 * future allocation and therefore do not pass this policy. This also rejects
 * IPv4-compatible, ULA, link-local, multicast, mapped, discard-only,
 * documentation, transition, benchmarking and reserved space. The broad
 * 2001::/23 rule intentionally excludes its more-specific anycast exceptions.
 */
const IPV6_ALLOCATED_UNICAST: readonly string[] = [
  "2001:200::/23", "2001:400::/23", "2001:600::/23", "2001:800::/22",
  "2001:c00::/23", "2001:e00::/23", "2001:1200::/23", "2001:1400::/22",
  "2001:1800::/23", "2001:1a00::/23", "2001:1c00::/22", "2001:2000::/19",
  "2001:4000::/23", "2001:4200::/23", "2001:4400::/23", "2001:4600::/23",
  "2001:4800::/23", "2001:4a00::/23", "2001:4c00::/23", "2001:5000::/20",
  "2001:8000::/19", "2001:a000::/20", "2001:b000::/20", "2003::/18",
  "2400::/12", "2410::/12", "2600::/12", "2610::/23", "2620::/23",
  "2630::/12", "2800::/12", "2a00::/12", "2a10::/12", "2c00::/12",
];
const IPV6_REJECTED: readonly CidrRule[] = [
  { cidr: "2001::/23", reason: "IANA IETF protocol assignments; protocol-specific exceptions are excluded." },
  { cidr: "2001:2::/48", reason: "IANA IPv6 benchmarking prefix." },
  { cidr: "2001:db8::/32", reason: "Documentation prefix." },
  { cidr: "2002::/16", reason: "6to4 transition prefix." },
  { cidr: "2620:4f:8000::/48", reason: "IANA AS112 service anycast; excluded as protocol-specific space." },
  { cidr: "3ffe::/16", reason: "Deprecated 6bone experimental prefix." },
  { cidr: "3fff::/20", reason: "Documentation prefix." },
];

export function classifyIpAddress(address: string): IpClassification {
  if (address.includes(":") && address.includes("%")) {
    return {
      valid: false,
      family: null,
      address,
      normalizedAddress: null,
      isPublic: false,
      reason: "IPV6_ZONE_IDENTIFIER",
    };
  }

  const family = isIP(address);
  if (family !== 4 && family !== 6) {
    return {
      valid: false,
      family: null,
      address,
      normalizedAddress: null,
      isPublic: false,
      reason: "MALFORMED_ADDRESS",
    };
  }

  if (family === 4) return classifyV4(address);

  const parsed = parseV6(address);
  const mappedV4 = getMappedV4(parsed);
  if (mappedV4 !== null) return classifyV4(mappedV4, address);

  const rejected = findMatchingRule(parsed, IPV6_REJECTED);
  const globalUnicast = IPV6_ALLOCATED_UNICAST.some((cidr) => inCidr(parsed, cidr));
  return {
    valid: true,
    family: 6,
    address,
    normalizedAddress: formatV6(parsed),
    isPublic: globalUnicast && rejected === null,
    reason: rejected?.reason ?? (globalUnicast ? null : "Outside currently allocated IPv6 global-unicast prefixes."),
  };
}

export function isPublicIpAddress(address: string): boolean {
  const result = classifyIpAddress(address);
  return result.valid && result.isPublic;
}

function classifyV4(address: string, originalAddress = address): IpClassification {
  const value = parseV4(address);
  const rule = findMatchingRule(value, IPV4_REJECTED);
  return {
    valid: true,
    family: 4,
    address: originalAddress,
    normalizedAddress: formatV4(value),
    isPublic: rule === null,
    reason: rule?.reason ?? null,
  };
}

function findMatchingRule(value: bigint, rules: readonly CidrRule[]): CidrRule | null {
  return rules.find(({ cidr }) => inCidr(value, cidr)) ?? null;
}

function inCidr(value: bigint, cidr: string): boolean {
  const [networkText, prefixText] = cidr.split("/");
  const network = networkText.includes(":") ? parseV6(networkText) : parseV4(networkText);
  const bits = networkText.includes(":") ? 128 : 32;
  const prefix = Number(prefixText);
  const shift = BigInt(bits - prefix);
  return (value >> shift) === (network >> shift);
}

function parseV4(address: string): bigint {
  return address.split(".").reduce((value, part) => (value << 8n) | BigInt(part), 0n);
}

function parseV6(address: string): bigint {
  let value = address.toLowerCase();
  if (value.includes(".")) {
    const separator = value.lastIndexOf(":");
    const ipv4 = parseV4(value.slice(separator + 1));
    value = `${value.slice(0, separator)}:${Number((ipv4 >> 16n) & 0xffffn).toString(16)}:${Number(ipv4 & 0xffffn).toString(16)}`;
  }

  const halves = value.split("::");
  const left = halves[0] ? halves[0].split(":") : [];
  const right = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  const zeros = halves.length === 2 ? 8 - left.length - right.length : 0;
  const words = [...left, ...Array(zeros).fill("0"), ...right];
  return words.reduce((result, word) => (result << 16n) | BigInt(`0x${word || "0"}`), 0n);
}

function getMappedV4(value: bigint): string | null {
  if ((value >> 32n) !== 0xffffn) return null;
  const v4 = value & 0xffff_ffffn;
  return [24n, 16n, 8n, 0n].map((shift) => Number((v4 >> shift) & 0xffn)).join(".");
}

function formatV4(value: bigint): string {
  return [24n, 16n, 8n, 0n].map((shift) => Number((value >> shift) & 0xffn)).join(".");
}

function formatV6(value: bigint): string {
  const words = Array.from({ length: 8 }, (_, index) => {
    const shift = BigInt((7 - index) * 16);
    return Number((value >> shift) & 0xffffn).toString(16);
  });
  return words.join(":");
}
