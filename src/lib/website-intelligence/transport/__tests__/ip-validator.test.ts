import assert from "node:assert/strict";
import test from "node:test";
import { classifyIpAddress, isPublicIpAddress } from "../ip-validator.ts";

test("accepts representative global IPv4 and IPv6 unicast addresses", () => {
  for (const address of ["8.8.8.8", "1.1.1.1", "2606:4700:4700::1111", "2001:4860:4860::8888", "2001:200::1"]) {
    assert.equal(isPublicIpAddress(address), true, address);
  }
});

test("rejects private IPv4 and IPv6 ranges", () => {
  for (const address of ["10.0.0.1", "172.16.0.1", "192.168.1.1", "fc00::1", "fdff:ffff::1"]) {
    assert.equal(isPublicIpAddress(address), false, address);
  }
});

test("rejects loopback, link-local, multicast, and unspecified addresses", () => {
  for (const address of [
    "127.0.0.1", "127.255.255.255", "::1", "169.254.1.1", "fe80::1",
    "224.0.0.1", "239.255.255.255", "ff02::1", "0.0.0.0", "::",
  ]) {
    assert.equal(isPublicIpAddress(address), false, address);
  }
});

test("rejects reserved, shared, documentation, benchmarking, and protocol ranges", () => {
  for (const address of [
    "100.64.0.0", "100.127.255.255", "192.0.0.9", "192.0.0.10", "192.0.2.1",
    "192.31.196.1", "192.52.193.1", "192.88.99.1", "192.175.48.1",
    "198.18.0.0", "198.19.255.255", "198.51.100.1", "203.0.113.1",
    "240.0.0.1", "255.255.255.255", "2001:2::1", "2001:db8::1", "2001::1",
    "2002::1", "3fff::1", "100::1", "64:ff9b:1::1", "5f00::1", "2620:4f:8000::1",
  ]) {
    assert.equal(isPublicIpAddress(address), false, address);
  }
});

test("classifies cloud metadata endpoints as non-public", () => {
  assert.equal(isPublicIpAddress("169.254.169.254"), false);
  assert.equal(isPublicIpAddress("fd00:ec2::254"), false);
});

test("normalizes IPv4-mapped IPv6 and applies the embedded IPv4 policy", () => {
  const publicMapped = classifyIpAddress("::ffff:8.8.8.8");
  assert.equal(publicMapped.valid, true);
  assert.equal(publicMapped.family, 4);
  assert.equal(publicMapped.normalizedAddress, "8.8.8.8");
  assert.equal(publicMapped.isPublic, true);

  for (const address of ["::ffff:127.0.0.1", "::ffff:10.0.0.1", "::ffff:169.254.169.254"]) {
    const result = classifyIpAddress(address);
    assert.equal(result.valid, true, address);
    assert.equal(result.family, 4, address);
    assert.equal(result.isPublic, false, address);
  }
});

test("rejects IPv6 zone identifiers", () => {
  const result = classifyIpAddress("fe80::1%eth0");
  assert.equal(result.valid, false);
  assert.equal(result.reason, "IPV6_ZONE_IDENTIFIER");
});

test("rejects malformed addresses without trying prefix classification", () => {
  for (const address of ["", "localhost", "8.8.8", "256.1.1.1", "1.2.3.4.5", "gggg::1", "2001:::1"]) {
    const result = classifyIpAddress(address);
    assert.equal(result.valid, false, address);
    assert.equal(result.reason, "MALFORMED_ADDRESS", address);
    assert.equal(result.isPublic, false, address);
  }
});

test("checks inclusive boundaries around important IPv4 and IPv6 ranges", () => {
  const cases: ReadonlyArray<readonly [string, boolean]> = [
    ["9.255.255.255", true], ["10.0.0.0", false], ["10.255.255.255", false], ["11.0.0.0", true],
    ["172.15.255.255", true], ["172.16.0.0", false], ["172.31.255.255", false], ["172.32.0.0", true],
    ["169.253.255.255", true], ["169.254.0.0", false], ["169.254.255.255", false], ["169.255.0.0", true],
    ["198.17.255.255", true], ["198.18.0.0", false], ["198.19.255.255", false], ["198.20.0.0", true],
    ["1999:ffff:ffff:ffff:ffff:ffff:ffff:ffff", false], ["2000::", false],
    ["2001:1ff:ffff:ffff:ffff:ffff:ffff:ffff", false], ["2001:200::", true],
    ["2001:2::", false],
    ["2001:db7:ffff:ffff:ffff:ffff:ffff:ffff", true], ["2001:db8::", false],
    ["2001:db8:ffff:ffff:ffff:ffff:ffff:ffff", false], ["2001:db9::", true],
    ["2500::", false], ["2600::", true], ["2d00::", false],
    ["3ffe:ffff:ffff:ffff:ffff:ffff:ffff:ffff", false], ["3fff::", false],
    ["3fff:f:ffff:ffff:ffff:ffff:ffff:ffff", false], ["3fff:10::", false],
    ["3fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", false], ["4000::", false],
  ];

  for (const [address, expected] of cases) {
    assert.equal(isPublicIpAddress(address), expected, address);
  }
});

test("provides an auditable rejection reason", () => {
  const result = classifyIpAddress("198.18.0.1");
  assert.equal(result.valid, true);
  assert.equal(result.reason, "RFC 2544 benchmarking range.");
});
