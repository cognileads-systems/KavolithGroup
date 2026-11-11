import { z } from "zod";
import {
  ACCEPTED_CONTENT_TYPES,
  MAX_REDIRECTS,
  MAX_URL_LENGTH,
} from "./constants.ts";
import { FETCH_ERROR_CODES } from "./errors.ts";
import { validateWebsiteUrl } from "./url-policy.ts";
import type { WebsiteUrl } from "./types.ts";

export const websiteUrlSchema = z
  .string()
  .trim()
  .min(1)
  .max(MAX_URL_LENGTH)
  .transform((value, context) => {
    const result = validateWebsiteUrl(value);
    if (!result.success) {
      context.addIssue({
        code: "custom",
        message:
          result.errorCode === "INVALID_URL"
            ? "A valid HTTP or HTTPS website URL is required."
            : "This website destination is not allowed.",
      });
      return z.NEVER;
    }
    return result.url;
  });

export const websiteFetchInputSchema = z
  .object({ url: websiteUrlSchema })
  .strict();

export const redirectRecordSchema = z.object({
  status: z.union([
    z.literal(301),
    z.literal(302),
    z.literal(303),
    z.literal(307),
    z.literal(308),
  ]),
  fromUrl: websiteUrlSchema,
  toUrl: websiteUrlSchema,
});

export const fetchDiagnosticErrorSchema = z.object({
  code: z.enum(FETCH_ERROR_CODES),
});

export const websiteFetchResultSchema = z
  .object({
    requestedUrl: websiteUrlSchema,
    finalUrl: websiteUrlSchema.nullable(),
    httpStatus: z.number().int().min(100).max(599).nullable(),
    contentType: z.string().min(1).max(256).nullable(),
    responseBytes: z.number().int().nonnegative(),
    durationMs: z.number().finite().nonnegative(),
    redirects: z.array(redirectRecordSchema).max(MAX_REDIRECTS),
    success: z.boolean(),
    error: fetchDiagnosticErrorSchema.nullable(),
  })
  .strict()
  .superRefine((result, context) => {
    if (
      result.success &&
      (result.error !== null ||
        result.finalUrl === null ||
        result.httpStatus === null)
    ) {
      context.addIssue({
        code: "custom",
        path: ["success"],
        message: "Successful results require a final URL and no diagnostic error.",
      });
    }

    if (!result.success && result.error === null) {
      context.addIssue({
        code: "custom",
        path: ["error"],
        message: "Failed results require a diagnostic error code.",
      });
    }
  });

export const acceptedContentTypeSchema = z.enum(ACCEPTED_CONTENT_TYPES);
