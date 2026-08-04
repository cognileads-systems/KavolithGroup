import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/cognileads-os")({
  component: CogniLeadsOSPage,
  head: () => ({
    meta: [
      { title: "CogniLeads OS — Autonomous AI Lead Intelligence Pipeline" },
      {
        name: "description",
        content:
          "CogniLeads OS is a standalone AI Sales Intelligence Platform: FastAPI backend, Gemini real-time intent scoring, and a 24/7 autonomous AI SDR. Presale custom engineering.",
      },
      { property: "og:title", content: "CogniLeads OS — Autonomous AI Lead Intelligence Pipeline" },
      {
        property: "og:description",
        content:
          "Standalone AI Sales Intelligence Platform with Gemini intent scoring (0-100), 24/7 autonomous AI SDR, and priority alerting. Presale · Custom Engineering.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const CAPABILITIES = [
  "Custom web application tailored to your revenue motion",
  "FastAPI backend with strict Pydantic validation schemas",
  "Gemini AI real-time intent scoring engine (0-100)",
  "24/7 autonomous AI SDR & conversational qualifier",
  "Telegram / Slack high-intent priority alerts",
  "Full AEO/GEO knowledge graph schema layer",
];

const TERMS = [
  {
    ref: "TERM.01",
    title: "60% advance to begin",
    body:
      "The engagement starts once a 60% advance payment is received. The remaining balance is due after deployment.",
  },
  {
    ref: "TERM.02",
    title: "Full platform access from day one",
    body:
      "During the presale/trial period you get the complete OS: custom web app, FastAPI/Pydantic backend, Gemini AI real-time intent scoring (0-100), 24/7 autonomous AI SDR, Telegram/Slack priority alerts, and the full AEO/GEO knowledge graph schema. Nothing is held back.",
  },
  {
    ref: "TERM.03",
    title: "Performance guarantee",
    body:
      "If the results delivered post-deployment — lead-qualification accuracy and intent-scoring performance — don't match what was committed, you receive a straight 40% discount off the remaining balance.",
  },
  {
    ref: "TERM.04",
    title: "You keep the platform either way",
    body:
      "The guarantee affects payment only, never delivery. The CogniLeads OS platform stays yours regardless of the outcome.",
  },
];

function CogniLeadsOSPage() {
  return (
    <div className="min-h-screen text-foreground font-mono">
      <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur bg-[#090D16]/80">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-cyan animate-pulse-cyan" />
            <span className="text-sm tracking-widest text-foreground">
              <span className="text-cyan text-glow">CogniLeads</span>
              <span className="text-muted-foreground"> // OS</span>
            </span>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-cyan/60 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-cyan transition-colors hover:bg-cyan hover:text-primary-foreground"
          >
            <span className="h-1.5 w-1.5 bg-cyan" />
            ← Kavolith Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 pb-24">
        <section className="py-12 lg:py-20 border-b border-border/60">
          <div className="mb-6 inline-flex items-center gap-2 border border-border px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <span className="h-1.5 w-1.5 bg-cyan animate-pulse-cyan" />
            Sales Intelligence Platform // Standalone Product
          </div>
          <h1 className="max-w-4xl text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
            CogniLeads OS —{" "}
            <span className="text-cyan text-glow">
              Autonomous AI Lead Intelligence Pipeline
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground">
            CogniLeads OS is its own product — a proprietary AI Sales
            Intelligence Platform, not a Kavolith website or automation service
            tier. It ingests every inbound signal, scores buyer intent in real
            time, and runs an autonomous SDR against your pipeline around the
            clock.
          </p>
        </section>

        <section className="py-12 lg:py-16 border-b border-border/60">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-start">
            <div className="border-2 border-[#00F0FF] bg-[#0B0D10] p-6 shadow-[0_0_40px_-8px_rgba(0,240,255,0.55)]">
              <div className="inline-block border border-[#00F0FF]/50 bg-[#00F0FF]/10 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-cyan">
                Presale · Custom Engineering
              </div>
              <div className="mt-4 text-3xl font-semibold tracking-tight text-cyan">
                ₹1,20,000 – ₹2,50,000
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                scoped per deployment
              </div>
              <div className="mt-4 border-t border-[#00F0FF]/25 pt-4 text-[12px] leading-relaxed text-muted-foreground">
                60% advance to begin · full platform access during presale ·
                performance-backed remaining balance.
              </div>
            </div>

            <div className="border border-[#00F0FF]/60 bg-[#0B0D10] p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                What ships with the OS
              </h2>
              <ul className="mt-4 space-y-2 text-[12px] text-muted-foreground">
                {CAPABILITIES.map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <span className="mt-[3px] text-cyan">▸</span>
                    <span className="leading-snug">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 border-b border-border/60">
          <div className="flex items-baseline gap-4">
            <span className="text-cyan text-xs tracking-[0.3em]">02</span>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
              Engagement Terms
            </h2>
          </div>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            // Plain-language terms for the presale engagement.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {TERMS.map((t) => (
              <article
                key={t.ref}
                className="border border-[#00F0FF]/50 bg-[#0B0D10] p-5 transition-colors hover:border-[#00F0FF]"
              >
                <div className="text-[10px] uppercase tracking-[0.25em] text-cyan/80">
                  {t.ref}
                </div>
                <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground">
                  {t.title}
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                  {t.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border border-[#00F0FF]/40 bg-[#00F0FF]/5 p-6">
            <p className="max-w-2xl text-[12px] leading-relaxed text-muted-foreground">
              Ready to scope a CogniLeads OS deployment, or need a
              website/automation package instead?
            </p>
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center gap-2 border border-[#00F0FF] bg-[#00F0FF] px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[#001014] transition-colors hover:bg-[#00F0FF]/90"
            >
              &gt; open intake channel
            </Link>
          </div>
        </section>

        <footer className="pt-10 mt-6 flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>
            Engineer Intelligence into Business. © 2026 Kavolith. All rights reserved.
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-cyan animate-pulse-cyan" /> all nodes
            operational
          </span>
        </footer>
      </main>
    </div>
  );
}
