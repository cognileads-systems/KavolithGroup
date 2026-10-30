import { Translate } from "@/i18n";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  Section,
  PhotoSection,
  PhotoLatticeSection,
  Eyebrow,
  SectionTitle,
} from "@/components/site/layout";
import photoDataviz from "@/assets/photo-dataviz.jpg";
import photoLattice from "@/assets/photo-lattice.jpg";
import { WhatsAppGhostButton, BOOKING_URL } from "@/components/site/how-we-work";
import { FaqSection, faqSchema, COGNILEADS_FAQS } from "@/components/site/faq";

import { LivePipelineDemo } from "@/components/site/live-pipeline-demo";
import {
  CurrencyToggle,
  DiscountBadge,
  DISCOUNT_CODE,
  DISCOUNT_PERCENT,
  formatMoney,
  type Currency,
} from "@/components/site/pricing";
import { breadcrumbSchema, PRICE_VALID_UNTIL } from "@/lib/seo";

const DEPLOYMENT_LIST: Record<Currency, [number, number]> = {
  INR: [120000, 250000],
  USD: [4000, 8000],
  EUR: [3650, 7300],
};

const DEPLOYMENT_NOW: Record<Currency, [number, number]> = {
  INR: [84000, 175000],
  USD: [2800, 5600],
  EUR: [2555, 5110],
};

const DEPLOYMENT_DETAILS = [
  "Custom web app + FastAPI backend engineered for your pipeline",
  "Real-time intent scoring (0–100) and priority alerting",
  "Autonomous SDR for after-hours qualification and booking",
  "Smart AI intake form with WhatsApp and UPI payment handoff",
  "Automated CRM / Google Sheets funnel with reconciliation log",
  "Single-screen lead pipeline dashboard (New → Closed)",
  "n8n automation workflows with integrated voice-chat AI agent",
  "Advanced AEO & GEO schema and GA4 analytics layer",
  "Multi-language interface (EN/Telugu/Hindi) and INR/USD/EUR handling",
  "Full schema and analytics documentation at handoff",
  "3 complimentary update rounds per year, each covering up to 3 pages or workflows.",
  "Defects in our work are fixed at no charge, always. Issues arising from outside changes, such as platform updates or third-party APIs, receive two complimentary review-and-fix passes each year. Quarterly performance report included.",
  "Security-first delivery: encrypted end to end, hardened headers, server-side credentials, and payments routed through your gateway, so card data never touches our systems.",
];


function DeploymentPriceCard() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [listLow, listHigh] = DEPLOYMENT_LIST[currency];
  const [low, high] = DEPLOYMENT_NOW[currency];

  return (
    <Translate>
      <div className="rounded-xl border border-accent/50 bg-panel p-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          Presale · Custom engineering
        </div>

        <CurrencyToggle currency={currency} onChange={setCurrency} className="mt-4" />

        <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          List price{" "}
          <span className="line-through decoration-muted-foreground/70">
            {formatMoney(currency, listLow)} – {formatMoney(currency, listHigh)}
          </span>
        </div>
        <div className="mt-1 font-display text-3xl text-accent">
          {formatMoney(currency, low)} – {formatMoney(currency, high)}
        </div>
        <div className="mt-3">
          <DiscountBadge />
        </div>
        <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          scoped per deployment · approximate conversions
        </div>

        <ul className="mt-4 space-y-2.5 border-t border-border pt-4 text-sm">
          {DEPLOYMENT_DETAILS.map((d) => (
            <li key={d} className="flex items-start gap-2.5 leading-relaxed text-muted-foreground">
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className="mt-[3px] h-3.5 w-3.5 shrink-0 text-accent"
                role="presentation"
              >
                <path
                  d="M3 8.5l3.2 3.2L13 4.8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{d}</span>
            </li>
          ))}
        </ul>



        <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
          60% advance to begin · full platform access during presale · performance-backed remaining
          balance.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          List prices are indicative pre-discount figures. {DISCOUNT_CODE} applies {DISCOUNT_PERCENT}%
          off flat across India, the US, and the EU.
        </p>
      </div>
    </Translate>
  );
}



const SITE = "https://kavolith.com";

export const Route = createFileRoute("/cognileads-os")({
  component: CogniLeadsOSPage,
  head: () => ({
    meta: [
      { title: "CogniLeads OS | AI Revenue Intelligence Platform" },
      {
        name: "description",
        content:
          "CogniLeads OS captures every inbound lead, scores intent in real time, and routes it to the right rep, with after-hours follow-up.",
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
      { property: "og:image", content: "https://kavolith.com/kavolith-og.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { name: "twitter:image", content: "https://kavolith.com/kavolith-og.png" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/cognileads-os` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema([{ name: "CogniLeads OS", path: "/cognileads-os" }]),
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
            offerCount: "2",
            priceValidUntil: PRICE_VALID_UNTIL,
          },
            },
            {
              "@type": "Product",
              "@id": `${SITE}/cognileads-os#productoffer`,
              name: "CogniLeads OS deployment",
              url: `${SITE}/cognileads-os`,
              image: "https://kavolith.com/kavolith-og.png",
              brand: { "@type": "Brand", name: "CogniLeads OS" },
              description:
                "Custom-engineered CogniLeads OS deployment, scoped per business. 60% advance to begin, performance-backed remaining balance.",
              offers: {
                "@type": "Offer",
                priceCurrency: "INR",
                price: "120000",
                priceValidUntil: PRICE_VALID_UNTIL,
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
            faqSchema(`${SITE}/cognileads-os#faq`, COGNILEADS_FAQS),
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
      "Scoring accuracy is verified against a sample you label, agreed in writing before the build. If the agreed results are not met after our tuning period, 40% comes off your remaining balance.",
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
      <PhotoLatticeSection image={photoLattice} priority enhancedLattice className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">

          <div>
            <Eyebrow>A Kavolith Company</Eyebrow>
            <h1 className="mt-5 text-4xl leading-[1.1] md:text-5xl">
              CogniLeads OS — <span className="text-accent">AI Revenue Intelligence Platform</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Every inbound lead captured, scored, routed, and followed up automatically — so your
              team spends its time on the conversations that are actually worth having.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Request a deployment scope
            </a>
            <div className="mt-4">
              <WhatsAppGhostButton />
            </div>
          </div>
          <LivePipelineDemo />
      </PhotoLatticeSection>

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

      <PhotoSection image={photoDataviz} className="pt-0">

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
      </PhotoSection>

      <FaqSection
        items={COGNILEADS_FAQS}
        subheading="How CogniLeads OS works and what to expect."
      />
    </PageShell>
  );
}
