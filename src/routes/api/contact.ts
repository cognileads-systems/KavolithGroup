import { createFileRoute } from "@tanstack/react-router";

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  audit_transcript?: Array<{ role: string; content: string }>;
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: ContactPayload;
        try {
          body = (await request.json()) as ContactPayload;
        } catch {
          return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
        }

        if (!body.email || !body.message) {
          return Response.json({ ok: false, error: "missing_fields" }, { status: 400 });
        }

        const payload = {
          source: "cognileads.systems//web",
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

        // 1) Email alert framework (server log + optional Resend if configured)
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
                subject: `[CogniLeads] New inbound lead: ${body.email}`,
                text: JSON.stringify(payload, null, 2),
              }),
            });
            results.email = { status: r.status };
          } catch (e) {
            results.email = { error: String(e) };
          }
        } else {
          console.log("[CogniLeads] contact submission:", JSON.stringify(payload));
          results.email = { status: "logged" };
        }

        // 2) Fallback / dual-router: forward to Make.com webhook
        const makeUrl = process.env.MAKE_WEBHOOK_URL;
        if (makeUrl) {
          try {
            const r = await fetch(makeUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            results.make = { status: r.status };
          } catch (e) {
            results.make = { error: String(e) };
          }
        } else {
          results.make = { status: "not_configured" };
        }

        return Response.json({ ok: true, payload, results });
      },
    },
  },
});
