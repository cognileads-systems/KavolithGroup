import assert from "node:assert/strict";
import test from "node:test";
import {
  fetchDiagnosticErrorSchema,
  websiteFetchInputSchema,
  websiteFetchResultSchema,
} from "../schemas.ts";

test("validates and brands valid website fetch input", () => {
  const result = websiteFetchInputSchema.safeParse({
    url: "https://example.com",
  });

  assert.equal(result.success, true);
  if (result.success) assert.equal(result.data.url, "https://example.com/");
});

test("rejects unknown fetch input keys and unsafe URLs", () => {
  assert.equal(
    websiteFetchInputSchema.safeParse({ url: "http://localhost", extra: true })
      .success,
    false,
  );
  assert.equal(
    websiteFetchInputSchema.safeParse({ url: "file:///etc/passwd" }).success,
    false,
  );
});

test("accepts structured successful and failed fetch results", () => {
  const base = {
    requestedUrl: "https://example.com",
    finalUrl: "https://example.com",
    httpStatus: 200,
    contentType: "text/html; charset=utf-8",
    responseBytes: 128,
    durationMs: 14,
    redirects: [],
  };

  assert.equal(
    websiteFetchResultSchema.safeParse({
      ...base,
      success: true,
      error: null,
    }).success,
    true,
  );
  const successfulResult = websiteFetchResultSchema.safeParse({
    ...base,
    success: true,
    error: null,
  });
  assert.equal(successfulResult.success, true);
  if (successfulResult.success) {
    assert.equal(successfulResult.data.requestedUrl, "https://example.com/");
  }
  assert.equal(
    websiteFetchResultSchema.safeParse({
      ...base,
      finalUrl: null,
      httpStatus: null,
      contentType: null,
      success: false,
      error: { code: "TIMEOUT" },
    }).success,
    true,
  );
});

test("rejects unsafe requested URLs", () => {
  const base = {
    finalUrl: "https://example.com",
    httpStatus: 200,
    contentType: "text/html; charset=utf-8",
    responseBytes: 128,
    durationMs: 14,
    redirects: [],
    success: true,
    error: null,
  };

  for (const requestedUrl of [
    "file:///etc/passwd",
    "javascript:alert(1)",
    "http://localhost",
    "https://user:password@example.com",
  ]) {
    assert.equal(
      websiteFetchResultSchema.safeParse({ ...base, requestedUrl }).success,
      false,
      requestedUrl,
    );
  }
});

test("rejects inconsistent result state and unknown diagnostic codes", () => {
  assert.equal(
    websiteFetchResultSchema.safeParse({
      requestedUrl: "https://example.com",
      finalUrl: null,
      httpStatus: null,
      contentType: null,
      responseBytes: 0,
      durationMs: 0,
      redirects: [],
      success: true,
      error: null,
    }).success,
    false,
  );
  assert.equal(fetchDiagnosticErrorSchema.safeParse({ code: "SOMETHING_ELSE" }).success, false);
});
