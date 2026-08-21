import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    next: typeof s.next === "string" ? s.next : "",
  }),
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Access Kavolith // Operator Authentication" },
      {
        name: "description",
        content:
          "Sign in or provision a Kavolith operator account to access the autonomous AI SDR control plane.",
      },
      { property: "og:title", content: "Access Kavolith // Operator Authentication" },
      {
        property: "og:description",
        content: "Operator authentication for the Kavolith AI SDR control plane.",
      },
      { property: "og:url", content: "https://kavolith.com/auth" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "https://kavolith.com/auth" }],
  }),
});


function isSafeRelative(path: string) {
  return path.startsWith("/") && !path.startsWith("//");
}

function AuthPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const returnTo = isSafeRelative(next) ? next : "/";

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.href = returnTo;
    });
  }, [returnTo]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fn =
      mode === "signin"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: window.location.origin + returnTo },
          });
    const { error } = await fn;
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    window.location.href = returnTo;
  }

  async function onGoogle() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + returnTo,
    });
    if (result.error) {
      setError(result.error.message ?? "Google sign-in failed.");
      return;
    }
    if (result.redirected) return;
    window.location.href = returnTo;
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 font-mono text-foreground">
      <div className="border border-border bg-panel/70 p-8 max-w-md w-full">
        <div className="text-[10px] uppercase tracking-[0.25em] text-cyan mb-3">
          &gt; operator.auth
        </div>
        <h1 className="text-xl font-semibold">
          {mode === "signin" ? "Access Kavolith" : "Provision Operator"}
        </h1>
        <p className="mt-2 text-xs text-muted-foreground uppercase tracking-[0.2em]">
          {mode === "signin" ? "authenticate to continue" : "create a new operator account"}
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
              operator.email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-border px-3 py-2 text-sm outline-none focus:border-cyan focus:ring-1 focus:ring-cyan"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
              operator.password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-border px-3 py-2 text-sm outline-none focus:border-cyan focus:ring-1 focus:ring-cyan"
            />
          </div>
          {error && (
            <p role="alert" className="text-xs text-destructive">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="w-full border border-cyan bg-cyan/10 px-4 py-3 text-xs uppercase tracking-[0.25em] text-cyan glow-cyan hover:bg-cyan hover:text-primary-foreground transition-all disabled:opacity-60"
          >
            {busy
              ? "// transmitting..."
              : mode === "signin"
              ? "&gt; sign in"
              : "&gt; create account"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
        </div>

        <button
          onClick={onGoogle}
          className="w-full border border-border px-4 py-3 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground hover:border-cyan/60 transition-all"
        >
          &gt; continue with google
        </button>

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 w-full text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-cyan transition-colors"
        >
          {mode === "signin"
            ? "no account? // provision operator"
            : "have an account? // sign in"}
        </button>
      </div>
    </main>
  );
}
