import assert from "node:assert/strict";
import test from "node:test";
import { validateWebsiteUrl } from "../url-policy.ts";

test("accepts HTTP and HTTPS URLs using their standard ports", () => {
  for (const input of ["http://example.com", "https://example.com/path"]) {
    assert.equal(validateWebsiteUrl(input).success, true, input);
  }
});

test("rejects malformed and non-HTTP(S) URLs", () => {
  for (const input of ["", "not a URL", "ftp://example.com", "javascript:alert(1)"]) {
    assert.deepEqual(validateWebsiteUrl(input), {
      success: false,
      errorCode: "INVALID_URL",
    });
  }
});

test("rejects URL credentials", () => {
  for (const input of [
    "https://user:password@example.com",
    "https://@example.com",
  ]) {
    assert.deepEqual(validateWebsiteUrl(input), {
      success: false,
      errorCode: "BLOCKED_DESTINATION",
    });
  }
});

test("rejects localhost names and common aliases", () => {
  for (const hostname of [
    "localhost",
    "sub.localhost",
    "localhost.localdomain",
    "localhost6",
    "localhost6.localdomain6",
    "local",
    "ip6-localhost",
    "ip6-loopback",
    "loopback",
    "printer.local",
  ]) {
    assert.equal(
      validateWebsiteUrl(`http://${hostname}`).success,
      false,
      hostname,
    );
  }
});

test("rejects unsupported ports", () => {
  for (const input of ["http://example.com:8080", "https://example.com:80"]) {
    assert.deepEqual(validateWebsiteUrl(input), {
      success: false,
      errorCode: "BLOCKED_DESTINATION",
    });
  }
});

test("identifies IPv4 and IPv6 literals and blocks them by default", () => {
  const ipv4 = validateWebsiteUrl("http://93.184.216.34");
  assert.equal(ipv4.success, false);
  if (!ipv4.success) {
    assert.equal(ipv4.errorCode, "BLOCKED_DESTINATION");
    assert.deepEqual(ipv4.host, {
      kind: "ipv4",
      hostname: "93.184.216.34",
      address: "93.184.216.34",
    });
  }

  const ipv6 = validateWebsiteUrl("https://[2001:db8::1]");
  assert.equal(ipv6.success, false);
  if (!ipv6.success) {
    assert.equal(ipv6.errorCode, "BLOCKED_DESTINATION");
    assert.deepEqual(ipv6.host, {
      kind: "ipv6",
      hostname: "2001:db8::1",
      address: "2001:db8::1",
    });
  }
});

test("permits an IP literal only when an explicit IP policy accepts it", () => {
  const result = validateWebsiteUrl("https://93.184.216.34", {
    ipAddressPolicy: { isPublic: (address) => address === "93.184.216.34" },
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.deepEqual(result.host, {
      kind: "ipv4",
      hostname: "93.184.216.34",
      address: "93.184.216.34",
    });
  }
});

test("identifies IPv6 literals after an explicit IP policy accepts them", () => {
  const result = validateWebsiteUrl("https://[2606:4700:4700::1111]", {
    ipAddressPolicy: {
      isPublic: (address) => address === "2606:4700:4700::1111",
    },
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.deepEqual(result.host, {
      kind: "ipv6",
      hostname: "2606:4700:4700::1111",
      address: "2606:4700:4700::1111",
    });
  }
});

test("rejects URLs that exceed the configured maximum length", () => {
  assert.deepEqual(
    validateWebsiteUrl(`https://example.com/${"a".repeat(20)}`, {
      policy: {
        maxUrlLength: 10,
        allowedPortsByProtocol: {
          "http:": [80],
          "https:": [443],
        },
      },
    }),
    { success: false, errorCode: "INVALID_URL" },
  );
});
