import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Section, Eyebrow, SectionTitle } from "@/components/site/layout";
import { LivePipelineDemo } from "@/components/site/live-pipeline-demo";
import {
  CurrencyToggle,
  formatMoney,
  marketRate,
  type Currency,
} from "@/components/site/pricing";

const DEPLOYMENT_RANGE: Record<Currency, [number, number]> = {
  INR: [120000, 250000],
  USD: [1450, 3020],
  EUR: [1340, 2790],
};

function DeploymentPriceCard() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [low, high] = DEPLOYMENT_RANGE[currency];

  return (
    <div className="rounded-xl border border-accent/50 bg-panel p-6">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        Presale · Custom engineering
      </div>

      <CurrencyToggle currency={currency} onChange={setCurrency} className="mt-4" />

      <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        Market rate{" "}
        <span className="line-through decoration-muted-foreground/70">
          {marketRate(currency, low)} – {marketRate(currency, high)}
        </span>
      </div>
      <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        Our rate
      </div>
      <div className="mt-1 font-display text-3xl text-accent">
        {formatMoney(currency, low)} – {formatMoney(currency, high)}
      </div>
      <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        scoped per deployment · approximate conversions
      </div>
      <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
        60% advance to begin · full platform access during presale · performance-backed remaining
        balance.
      </p>
      <p className="mt-3 text-xs text-muted-foreground">
        Market-rate figures are indicative agency-pricing placeholders for comparison, not verified
        or sourced quotes.
      </p>
    </div>
  );
}


const SITE = "https://kavolithgroup.lovable.app";

export const Route = createFileRoute("/cognileads-os")({
  component: CogniLeadsOSPage,
  head: () => ({
    meta: [
      { title: "CogniLeads OS | AI Revenue Intelligence Platform" },
      {
        name: "description",
        content:
          "CogniLeads OS is an AI Revenue Intelligence Platform that captures every inbound lead, scores intent in real time, routes it to the right rep, and books meetings 24/7.",
      },
      { property: "og:title", content: "CogniLeads OS | AI Revenue Intelligence Platform" },
      {
        property: "og:description",
        content:
          "Capture, score, route, and convert inbound leads automatically. A Kavolith Company.",
      },
      { property: "og:type", content: "product" },
      { property: "og:url", content: `${SITE}/cognileads-os` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/cognileads-os` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
          "@type": "SoftwareApplication",
          "@id": `${SITE}/cognileads-os#product`,
          name: "CogniLeads OS",
          url: `${SITE}/cognileads-os`,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description:
            "AI Revenue Intelligence Platform that captures, scores, routes, and converts inbound leads automatically.",
          publisher: { "@type": "Organization", name: "Kavolith Group" },
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "INR",
            lowPrice: "120000",
            highPrice: "250000",
          },
            },
            {
              "@type": "Product",
              "@id": `${SITE}/cognileads-os#productoffer`,
              name: "CogniLeads OS deployment",
              url: `${SITE}/cognileads-os`,
              brand: { "@type": "Brand", name: "CogniLeads OS" },
              description:
                "Custom-engineered CogniLeads OS deployment, scoped per business. 60% advance to begin, performance-backed remaining balance.",
              offers: {
                "@type": "Offer",
                priceCurrency: "INR",
                price: "120000",
                priceSpecification: {
                  "@type": "PriceSpecification",
                  minPrice: "120000",
                  maxPrice: "250000",
                  priceCurrency: "INR",
                  description: "Scoped per deployment. 60% advance to begin.",
                },
                availability: "https://schema.org/PreOrder",
                seller: { "@type": "Organization", name: "Kavolith Group" },
              },
            },
          ],
        }),
      },
    ],
  }),
});

const CAPABILITIES = [
  {
    title: "Capture every signal",
    body: "Forms, ads, chat, and referral sources feed one pipeline, so nothing arrives in a channel nobody is watching.",
  },
  {
    title: "Score intent in real time",
    body: "Each lead is scored 0–100 from what they said and who they are, within seconds of submission.",
  },
  {
    title: "Route to the right rep",
    body: "High-intent leads are assigned by territory and availability, with an instant priority alert.",
  },
  {
    title: "Convert around the clock",
    body: "An autonomous SDR qualifies, answers, and books meetings outside working hours.",
  },
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
      "During the presale period you get the complete platform: custom web app, FastAPI backend, real-time intent scoring, autonomous SDR, priority alerting, and the full schema layer. Nothing is held back.",
  },
  {
    ref: "TERM.03",
    title: "Performance guarantee",
    body:
      "If post-deployment qualification accuracy and intent-scoring performance don't match what was committed, you receive a 40% discount off the remaining balance.",
  },
  {
    ref: "TERM.04",
    title: "You keep the platform either way",
    body:
      "The guarantee affects payment only, never delivery. The platform stays yours regardless of the outcome.",
  },
];

function CogniLeadsOSPage() {
  return (
    <PageShell>
      <div className="relative overflow-hidden">
        <div className="blob right-[8%] top-[-100px] h-[340px] w-[340px]" />
        <Section className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Eyebrow>A Kavolith Company</Eyebrow>
            <h1 className="mt-5 text-4xl leading-[1.1] md:text-5xl">
              CogniLeads OS — <span className="text-accent">AI Revenue Intelligence Platform</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Every inbound lead captured, scored, routed, and followed up automatically — so your
              team spends its time on the conversations that are actually worth having.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Request a deployment scope
            </Link>
          </div>
          <LivePipelineDemo />
        </Section>
      </div>

      <Section className="pt-0">
        <SectionTitle
          eyebrow="How it works"
          title="Four stages, no manual handoff"
          intro="The pipeline runs end to end without anyone re-entering data between steps."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {CAPABILITIES.map((c, i) => (
            <article
              key={c.title}
              className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                stage {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 text-lg">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-start">
          <DeploymentPriceCard />


          <div>
            <SectionTitle eyebrow="Engagement terms" title="Plain-language terms" />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {TERMS.map((t) => (
                <article
                  key={t.ref}
                  className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                    {t.ref}
                  </div>
                  <h3 className="mt-2 text-base">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
