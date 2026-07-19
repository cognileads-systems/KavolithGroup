import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const transcriptEntrySchema = z.object({
  role: z.string().max(50),
  content: z.string().max(4000),
});

const contactSchema = z.object({
  name: z.string().trim().max(100).optional().nullable(),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(150).optional().nullable(),
  message: z.string().trim().min(1).max(4000),
  audit_transcript: z.array(transcriptEntrySchema).max(50).optional(),
});

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return Response.json({ ok: false }, { status: 400 });
        }

        const parsed = contactSchema.safeParse(raw);
        if (!parsed.success) {
          console.warn("[VectraSyn] contact validation failed:", parsed.error.flatten());
          return Response.json({ ok: false }, { status: 400 });
        }
        const body = parsed.data;

        const payload = {
          source: "vectrasyn.systems//web",
          received_at: new Date().toISOString(),
          lead: {
            name: body.name ?? null,
            email: body.email,
            company: body.company ?? null,
            message: body.message,
          },
          audit_transcript: body.audit_transcript ?? [],
        };

        const results: Record<string, unknown> = {};
        let hadFailure = false;

        // 1) Email alert framework
        const resendKey = process.env.RESEND_API_KEY;
        const alertTo = process.env.CONTACT_ALERT_EMAIL;
        const alertFrom = process.env.CONTACT_ALERT_FROM;
        if (resendKey && alertTo && alertFrom) {
          try {
            const r = await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${resendKey}`,
              },
              body: JSON.stringify({
                from: alertFrom,
                to: [alertTo],
                subject: `[VectraSyn] New inbound lead: ${body.email}`,
                text: JSON.stringify(payload, null, 2),
              }),
            });
            results.email = { status: r.status };
            if (!r.ok) hadFailure = true;
          } catch (e) {
            results.email = { error: String(e) };
            hadFailure = true;
          }
        } else {
          results.email = { status: "logged" };
        }

        // 2) Make.com webhook
        const makeUrl = process.env.MAKE_WEBHOOK_URL;
        if (makeUrl) {
          try {
            const r = await fetch(makeUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            results.make = { status: r.status };
            if (!r.ok) hadFailure = true;
          } catch (e) {
            results.make = { error: String(e) };
            hadFailure = true;
          }
        } else {
          results.make = { status: "not_configured" };
        }

        console.log(
          "[VectraSyn] contact submission:",
          JSON.stringify({ payload, results }),
        );

        return Response.json({ ok: !hadFailure });
      },
    },
  },
});
