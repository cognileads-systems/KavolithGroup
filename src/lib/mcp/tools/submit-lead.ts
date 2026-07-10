import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "submit_lead",
  title: "Submit Lead",
  description:
    "Capture a new inbound lead in the signed-in user's CogniLeads pipeline. Use for prospect names, emails, companies, and inbound messages.",
  inputSchema: {
    name: z.string().trim().optional().describe("Prospect name."),
    email: z.string().trim().email().describe("Prospect email address."),
    company: z.string().trim().optional().describe("Prospect company / organization."),
    message: z.string().trim().min(1).describe("Inbound message or context about the lead."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ name, email, company, message }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const { data, error } = await supabaseForUser(ctx)
      .from("leads")
      .insert({ user_id: ctx.getUserId(), name, email, company, message })
      .select()
      .single();
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: `Lead saved (id ${data.id}).` }],
      structuredContent: { lead: data },
    };
  },
});
