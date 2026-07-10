import { auth, defineMcp } from "@lovable.dev/mcp-js";
import submitLead from "./tools/submit-lead";
import listMyLeads from "./tools/list-my-leads";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "cognileads-systems-mcp",
  title: "CogniLeads Systems",
  version: "0.1.0",
  instructions:
    "Tools for CogniLeads Systems. Signed-in users can submit inbound leads to their own pipeline and list the leads they have captured.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [submitLead, listMyLeads],
});
