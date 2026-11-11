import assert from "node:assert/strict";
import test from "node:test";
import {
  DnsResolverError,
  resolvePublicAddresses,
  type DnsLookup,
} from "../dns-resolver.ts";

type LookupOutcome = readonly string[] | Error;

function fakeLookup(ipv4: LookupOutcome, ipv6: LookupOutcome): DnsLookup {
  return {
    resolve4: async () => unwrap(ipv4),
    resolve6: async () => unwrap(ipv6),
  };
}

function unwrap(outcome: LookupOutcome): readonly string[] {
  if (outcome instanceof Error) throw outcome;
  return outcome;
}

function dnsError(code: string): NodeJS.ErrnoException {
  const error = new Error(`injected ${code}`) as NodeJS.ErrnoException;
  error.code = code;
  return error;
}

async function assertResolverError(
  operation: Promise<unknown>,
  code: DnsResolverError["code"],
  reason?: string,
  dnsCode?: string,
): Promise<void> {
  await assert.rejects(operation, (error: unknown) => {
    assert.ok(error instanceof DnsResolverError);
    assert.equal(error.code, code);
    if (reason !== undefined) assert.equal(error.reason, reason);
    if (dnsCode !== undefined) assert.equal(error.dnsCode, dnsCode);
    return true;
  });
}

test("resolves and returns IPv4-only answers", async () => {
  const result = await resolvePublicAddresses(
    "example.test",
    fakeLookup(["8.8.8.8", "1.1.1.1"], dnsError("ENODATA")),
  );
  assert.deepEqual(result, {
    hostname: "example.test",
    addresses: [
      { address: "8.8.8.8", family: 4 },
      { address: "1.1.1.1", family: 4 },
    ],
  });
});

test("resolves and returns IPv6-only answers", async () => {
  const result = await resolvePublicAddresses(
    "example.test",
    fakeLookup(dnsError("ENODATA"), ["2606:4700:4700::1111"]),
  );
  assert.deepEqual(result.addresses, [
    { address: "2606:4700:4700:0:0:0:0:1111", family: 6 },
  ]);
});

test("resolves dual-stack answers in deterministic IPv4-then-IPv6 order", async () => {
  const result = await resolvePublicAddresses(
    "example.test",
    fakeLookup(["8.8.8.8"], ["2606:4700:4700::1111"]),
  );
  assert.deepEqual(result.addresses, [
    { address: "8.8.8.8", family: 4 },
    { address: "2606:4700:4700:0:0:0:0:1111", family: 6 },
  ]);
});

test("accepts ENODATA for IPv4 when IPv6 answers are valid", async () => {
  const result = await resolvePublicAddresses(
    "example.test",
    fakeLookup(dnsError("ENODATA"), ["2606:4700:4700::1111"]),
  );
  assert.equal(result.addresses.length, 1);
  assert.equal(result.addresses[0]?.family, 6);
});

test("accepts ENODATA for IPv6 when IPv4 answers are valid", async () => {
  const result = await resolvePublicAddresses(
    "example.test",
    fakeLookup(["8.8.8.8"], dnsError("ENODATA")),
  );
  assert.deepEqual(result.addresses, [{ address: "8.8.8.8", family: 4 }]);
});

test("rejects when both families have no records", async () => {
  await assertResolverError(
    resolvePublicAddresses("example.test", fakeLookup(dnsError("ENODATA"), dnsError("ENODATA"))),
    "DNS_FAILURE",
    "NO_ADDRESS_RECORDS",
  );
});

test("rejects public IPv4 mixed with private IPv6", async () => {
  await assertResolverError(
    resolvePublicAddresses("example.test", fakeLookup(["8.8.8.8"], ["fd00::1"])),
    "BLOCKED_DESTINATION",
    "Outside currently allocated IPv6 global-unicast prefixes.",
  );
});

test("rejects private IPv4 mixed with public IPv6", async () => {
  await assertResolverError(
    resolvePublicAddresses("example.test", fakeLookup(["10.0.0.1"], ["2606:4700:4700::1111"])),
    "BLOCKED_DESTINATION",
    "RFC 1918 private-use network.",
  );
});

test("rejects loopback answers", async () => {
  await assertResolverError(
    resolvePublicAddresses("example.test", fakeLookup(["127.0.0.1"], dnsError("ENODATA"))),
    "BLOCKED_DESTINATION",
    "IPv4 loopback.",
  );
});

test("rejects link-local answers", async () => {
  await assertResolverError(
    resolvePublicAddresses("example.test", fakeLookup(dnsError("ENODATA"), ["fe80::1"])),
    "BLOCKED_DESTINATION",
    "Outside currently allocated IPv6 global-unicast prefixes.",
  );
});

test("rejects reserved and documentation answers", async () => {
  await assertResolverError(
    resolvePublicAddresses("example.test", fakeLookup(["192.0.2.1"], dnsError("ENODATA"))),
    "BLOCKED_DESTINATION",
    "Documentation (TEST-NET-1).",
  );
});

test("rejects malformed IPv4 responses", async () => {
  await assertResolverError(
    resolvePublicAddresses("example.test", fakeLookup(["999.1.1.1"], dnsError("ENODATA"))),
    "DNS_FAILURE",
    "MALFORMED_IPV4_ADDRESS",
  );
});

test("rejects malformed IPv6 responses", async () => {
  await assertResolverError(
    resolvePublicAddresses("example.test", fakeLookup(dnsError("ENODATA"), ["2001:::1"])),
    "DNS_FAILURE",
    "MALFORMED_IPV6_ADDRESS",
  );
});

test("fails closed on temporary resolver failures", async () => {
  await assertResolverError(
    resolvePublicAddresses("example.test", fakeLookup(["8.8.8.8"], dnsError("ETIMEOUT"))),
    "DNS_FAILURE",
    "IPV6_RESOLUTION_FAILED",
    "ETIMEOUT",
  );
  await assertResolverError(
    resolvePublicAddresses("example.test", fakeLookup(dnsError("EAI_AGAIN"), ["2606:4700::1"])),
    "DNS_FAILURE",
    "IPV4_RESOLUTION_FAILED",
    "EAI_AGAIN",
  );
});

test("treats ENOTFOUND as a DNS failure, not as a missing-family record", async () => {
  await assertResolverError(
    resolvePublicAddresses("example.test", fakeLookup(dnsError("ENOTFOUND"), ["2606:4700::1"])),
    "DNS_FAILURE",
    "IPV4_RESOLUTION_FAILED",
    "ENOTFOUND",
  );
});

test("fails closed on unexpected resolver errors without exposing their messages", async () => {
  await assertResolverError(
    resolvePublicAddresses("example.test", fakeLookup(["8.8.8.8"], new Error("sensitive resolver detail"))),
    "DNS_FAILURE",
    "IPV6_RESOLUTION_FAILED",
  );
});

test("rejects empty successful responses as malformed", async () => {
  await assertResolverError(
    resolvePublicAddresses("example.test", fakeLookup([], ["2606:4700::1"])),
    "DNS_FAILURE",
    "MALFORMED_IPV4_RESPONSE",
  );
});

test("checks every answer and rejects a later unsafe address", async () => {
  await assertResolverError(
    resolvePublicAddresses("example.test", fakeLookup(["8.8.8.8", "127.0.0.1"], dnsError("ENODATA"))),
    "BLOCKED_DESTINATION",
    "IPv4 loopback.",
  );
});

test("deduplicates normalized addresses while preserving stable order", async () => {
  const result = await resolvePublicAddresses(
    "example.test",
    fakeLookup(["8.8.8.8", "8.8.8.8", "1.1.1.1"], ["2606:4700::1", "2606:4700:0:0:0:0:0:1"]),
  );
  assert.deepEqual(result.addresses, [
    { address: "8.8.8.8", family: 4 },
    { address: "1.1.1.1", family: 4 },
    { address: "2606:4700:0:0:0:0:0:1", family: 6 },
  ]);
});

test("normalizes IPv4-mapped IPv6 answers and deduplicates them against A records", async () => {
  const result = await resolvePublicAddresses(
    "example.test",
    fakeLookup(["8.8.8.8"], ["::ffff:8.8.8.8"]),
  );
  assert.deepEqual(result.addresses, [{ address: "8.8.8.8", family: 4 }]);
});

test("rejects an address whose syntax does not match the queried record family", async () => {
  await assertResolverError(
    resolvePublicAddresses("example.test", fakeLookup(["2606:4700::1"], dnsError("ENODATA"))),
    "DNS_FAILURE",
    "MALFORMED_IPV4_ADDRESS",
  );
  await assertResolverError(
    resolvePublicAddresses("example.test", fakeLookup(dnsError("ENODATA"), ["8.8.8.8"])),
    "DNS_FAILURE",
    "MALFORMED_IPV6_ADDRESS",
  );
});

test("rejects malformed runtime DNS results including null and non-string records", async () => {
  const nullResult: DnsLookup = {
    resolve4: async () => null as unknown as readonly string[],
    resolve6: async () => ["2606:4700::1"],
  };
  await assertResolverError(
    resolvePublicAddresses("example.test", nullResult),
    "DNS_FAILURE",
    "MALFORMED_IPV4_RESPONSE",
  );

  const nonStringResult: DnsLookup = {
    resolve4: async () => [8] as unknown as readonly string[],
    resolve6: async () => ["2606:4700::1"],
  };
  await assertResolverError(
    resolvePublicAddresses("example.test", nonStringResult),
    "DNS_FAILURE",
    "MALFORMED_IPV4_ADDRESS",
  );
});

test("runs the other family lookup when one resolver throws synchronously", async () => {
  let ipv6LookupRan = false;
  const lookup: DnsLookup = {
    resolve4: () => { throw dnsError("EAI_AGAIN"); },
    resolve6: async () => {
      ipv6LookupRan = true;
      return ["2606:4700::1"];
    },
  };

  await assertResolverError(
    resolvePublicAddresses("example.test", lookup),
    "DNS_FAILURE",
    "IPV4_RESOLUTION_FAILED",
    "EAI_AGAIN",
  );
  assert.equal(ipv6LookupRan, true);
});

test("rejects invalid hostnames before invoking the lookup", async () => {
  let calls = 0;
  const lookup: DnsLookup = {
    resolve4: async () => { calls += 1; return ["8.8.8.8"]; },
    resolve6: async () => { calls += 1; return ["2606:4700::1"]; },
  };
  await assertResolverError(resolvePublicAddresses("bad hostname", lookup), "DNS_FAILURE", "INVALID_HOSTNAME");
  assert.equal(calls, 0);
});

test("rejects hostnames with overlong labels and names beyond DNS length limits", async () => {
  const tooLongLabel = `${"a".repeat(64)}.example`;
  const tooLongName = `${"a".repeat(63)}.${"b".repeat(63)}.${"c".repeat(63)}.${"d".repeat(62)}`;

  for (const hostname of [tooLongLabel, tooLongName]) {
    await assertResolverError(
      resolvePublicAddresses(hostname, fakeLookup(["8.8.8.8"], ["2606:4700::1"])),
      "DNS_FAILURE",
      "INVALID_HOSTNAME",
    );
  }
});

test("accepts the DNS hostname length boundary and rejects an extra trailing byte", async () => {
  const maxLengthHostname = `${"a".repeat(63)}.${"b".repeat(63)}.${"c".repeat(63)}.${"d".repeat(61)}.`;
  const overLimitHostname = `${"a".repeat(63)}.${"b".repeat(63)}.${"c".repeat(63)}.${"d".repeat(62)}.`;

  const result = await resolvePublicAddresses(
    maxLengthHostname,
    fakeLookup(["8.8.8.8"], dnsError("ENODATA")),
  );
  assert.equal(result.hostname, maxLengthHostname);

  await assertResolverError(
    resolvePublicAddresses(overLimitHostname, fakeLookup(["8.8.8.8"], ["2606:4700::1"])),
    "DNS_FAILURE",
    "INVALID_HOSTNAME",
  );
});

test("rejects hostnames with empty labels", async () => {
  await assertResolverError(
    resolvePublicAddresses("example..test", fakeLookup(["8.8.8.8"], ["2606:4700::1"])),
    "DNS_FAILURE",
    "INVALID_HOSTNAME",
  );
});
