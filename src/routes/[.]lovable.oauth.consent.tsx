import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Local typed shim: the auth.oauth namespace on the Supabase client is beta.
type OAuthAuthorizationDetails = {
  client?: { name?: string; redirect_uri?: string } | null;
  redirect_url?: string;
  redirect_to?: string;
  scope?: string;
};
type OAuthResp<T> = { data: T | null; error: { message: string } | null };
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<OAuthResp<OAuthAuthorizationDetails>>;
  approveAuthorization: (id: string) => Promise<OAuthResp<OAuthAuthorizationDetails>>;
  denyAuthorization: (id: string) => Promise<OAuthResp<OAuthAuthorizationDetails>>;
};
const oauth = (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      const next = location.pathname + location.searchStr;
      throw redirect({ to: "/auth", search: { next } });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="min-h-screen flex items-center justify-center p-6 font-mono text-sm text-foreground">
      <div className="border border-border bg-panel/70 p-6 max-w-md">
        <div className="text-cyan uppercase tracking-[0.25em] text-[10px] mb-2">
          consent.error
        </div>
        <p>Could not load this authorization request:</p>
        <p className="mt-2 text-muted-foreground">{String((error as Error)?.message ?? error)}</p>
      </div>
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorization_id)
      : await oauth.denyAuthorization(authorization_id);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  const clientName = details?.client?.name ?? "an app";

  return (
    <main className="min-h-screen flex items-center justify-center p-6 font-mono">
      <div className="border border-border bg-panel/70 p-8 max-w-md w-full">
        <div className="text-[10px] uppercase tracking-[0.25em] text-cyan mb-3">
          &gt; oauth.consent
        </div>
        <h1 className="text-xl font-semibold text-foreground">
          Connect {clientName} to CogniLeads
        </h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          This lets <span className="text-foreground">{clientName}</span> use this app as
          you — it can submit leads and read the leads you have captured. This does not
          bypass CogniLeads permissions or backend policies.
        </p>
        {details?.client?.redirect_uri && (
          <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground break-all">
            redirect: <span className="text-cyan">{details.client.redirect_uri}</span>
          </p>
        )}
        {error && (
          <p role="alert" className="mt-4 text-xs text-destructive">
            {error}
          </p>
        )}
        <div className="mt-6 flex gap-3">
          <button
            disabled={busy}
            onClick={() => decide(true)}
            className="flex-1 border border-cyan bg-cyan/10 px-4 py-3 text-xs uppercase tracking-[0.25em] text-cyan glow-cyan hover:bg-cyan hover:text-primary-foreground transition-all disabled:opacity-60"
          >
            Approve
          </button>
          <button
            disabled={busy}
            onClick={() => decide(false)}
            className="flex-1 border border-border px-4 py-3 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-all disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
}
