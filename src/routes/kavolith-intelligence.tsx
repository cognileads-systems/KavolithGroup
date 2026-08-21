import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  PageShell,
  Section,
  PhotoLatticeSection,
  Eyebrow,
  SectionTitle,
} from "@/components/site/layout";
import photoLattice from "@/assets/photo-lattice.jpg";
import { WhatsAppGhostButton } from "@/components/site/how-we-work";
import { FaqSection, faqSchema, INTELLIGENCE_FAQS } from "@/components/site/faq";
import { breadcrumbSchema, PRICE_VALID_UNTIL } from "@/lib/seo";
import {
  CurrencyToggle,
  DiscountBadge,
  DISCOUNT_CODE,
  DISCOUNT_PERCENT,
  PriceLine,
  type Currency,
  type RangePair,
} from "@/components/site/pricing";

const SITE = "https://kavolith.com";

/** Founding-client reservation pricing: list figures are pre-FOUNDER30 anchors. */
const INTELLIGENCE_SETUP: RangePair = {
  list: { INR: [114300, 214300], USD: [1360, 2570], EUR: [1240, 2360] },
  now: { INR: [80000, 150000], USD: [950, 1800], EUR: [870, 1650] },
};
const INTELLIGENCE_MONTHLY: RangePair = {
  list: { INR: [21430, 42860], USD: [250, 500], EUR: [230, 460] },
  now: { INR: [15000, 30000], USD: [175, 350], EUR: [160, 320] },
};



const PACKAGES = [
  {
    name: "AI Compliance & Documentation Employee",
    rate: "Founding-client rate",
    booking: "1-month advance reservation",

    outcome:
      "Hand over the document-heavy part of compliance work — collection, validation, and filing — to a digital employee that never loses track of a pending item.",
    features: [
      "Multilingual: English, Telugu, Hindi",
      "Collects and validates required documents against your rules",
      "Maintains a complete audit trail of every submission",
      "Escalates exceptions and missing items to a named human owner",
    ],
    featured: true,
  },
  {
    name: "AI HR/Ops Digital Employee",
    rate: "Founding-client rate",
    booking: "1-month advance reservation",

    outcome:
      "Cover the repetitive HR and operations workload — onboarding, requests, and internal follow-ups — without adding headcount.",
    features: [
      "Multilingual: English, Telugu, Hindi",
      "Runs onboarding and offboarding checklists end to end",
      "Handles routine employee requests and status questions",
      "Chases pending approvals and reports what is stuck",
    ],
  },
];

export const Route = createFileRoute("/kavolith-intelligence")({
  component: IntelligencePage,
  head: () => ({
    meta: [
      { title: "Kavolith Intelligence | Enterprise AI Workforce Platform" },
      {
        name: "description",
        content:
          "Kavolith Intelligence is an Enterprise AI Workforce Platform of multilingual digital employees for compliance, documentation, and HR/ops. Presale open now.",
      },
      {
        property: "og:title",
        content: "Kavolith Intelligence | Enterprise AI Workforce Platform",
      },
      {
        property: "og:description",
        content:
          "Multilingual digital employees (English, Telugu, Hindi) for compliance, documentation, and HR/ops. Coming soon — reserve a build slot at the founding-client rate.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/kavolith-intelligence` },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://kavolith.com/kavolith-og.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { name: "twitter:image", content: "https://kavolith.com/kavolith-og.png" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/kavolith-intelligence` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema([{ name: "Kavolith Intelligence", path: "/kavolith-intelligence" }]),
            {
              "@type": "SoftwareApplication",
              "@id": `${SITE}/kavolith-intelligence#app`,
              name: "Kavolith Intelligence",
              url: `${SITE}/kavolith-intelligence`,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              inLanguage: ["en", "te", "hi"],
              description:
                "Enterprise AI Workforce Platform of multilingual digital employees for compliance, documentation, and HR/ops processes.",
              publisher: { "@type": "Organization", name: "Kavolith Group" },
              offers: PACKAGES.map((p) => ({
                "@type": "Offer",
                name: p.name,
                availability: "https://schema.org/PreOrder",
                priceCurrency: "INR",
                priceValidUntil: PRICE_VALID_UNTIL,
                priceSpecification: [
                  {
                    "@type": "PriceSpecification",
                    description:
                      "Founding-client setup fee, confirmed at scoping. One-month advance reservation.",
                    priceCurrency: "INR",
                    minPrice: INTELLIGENCE_SETUP.now.INR[0],
                    maxPrice: INTELLIGENCE_SETUP.now.INR[1],
                  },
                  {
                    "@type": "UnitPriceSpecification",
                    description: "Monthly run-and-iterate fee at the founding-client rate.",
                    priceCurrency: "INR",
                    minPrice: INTELLIGENCE_MONTHLY.now.INR[0],
                    maxPrice: INTELLIGENCE_MONTHLY.now.INR[1],
                    unitText: "MONTH",
                  },
                ],
              })),

            },
            faqSchema(`${SITE}/kavolith-intelligence#faq`, INTELLIGENCE_FAQS),
          ],
        }),
      },
    ],
  }),
});

function IntelligencePage() {
  const [currency, setCurrency] = useState<Currency>("INR");
  return (
    <PageShell>
      <PhotoLatticeSection image={photoLattice} priority>
        <div>
          <div className="mb-7 flex flex-wrap items-center gap-3 rounded-xl border border-accent/40 bg-accent-soft px-5 py-3">
            <span className="animate-stage-pulse h-2 w-2 rounded-full bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Coming soon — reservations open at the founding-client rate
            </span>
          </div>

          <Eyebrow>Kavolith Intelligence</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] md:text-5xl">
            Enterprise <span className="text-accent">AI Workforce Platform</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Multilingual digital employees — English, Telugu, and Hindi — that own compliance,
            documentation, and HR/ops processes end to end: collect the inputs, validate against your
            rules, update your systems, escalate the exceptions.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Reserve your build slot
          </Link>

          <div className="mt-4">
            <WhatsAppGhostButton />
          </div>
        </div>
      </PhotoLatticeSection>

      <Section className="pt-0">
        <SectionTitle
          eyebrow="Reservation packages"
          title="Two digital employees, open for reservation"
          intro="Reserve your build slot — the founding-client rate is locked in now, and delivery begins once your selected package enters the build queue."
        />

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CurrencyToggle currency={currency} onChange={setCurrency} />
          <DiscountBadge />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Approximate conversions
          </span>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {PACKAGES.map((p) => (
            <article
              key={p.name}
              itemScope
              itemType="https://schema.org/Product"
              className={[
                "flex flex-col rounded-xl border p-7 transition-colors",
                p.featured
                  ? "border-accent/60 bg-panel"
                  : "border-border bg-surface hover:border-accent/40",
              ].join(" ")}
            >
              <h3 className="text-xl" itemProp="name">
                {p.name}
              </h3>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-accent-soft px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  {p.rate}
                </span>
                <span className="rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {p.booking}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <PriceLine
                  currency={currency}
                  pair={INTELLIGENCE_SETUP}
                  label="Setup list"
                  suffix="setup"
                />
                <PriceLine
                  currency={currency}
                  pair={INTELLIGENCE_MONTHLY}
                  label="Monthly list"
                  suffix="/ month"
                  size="sm"
                />
              </div>

              <div className="mt-3">
                <DiscountBadge />
              </div>

              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground" itemProp="description">
                {p.outcome}
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2 text-muted-foreground">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-7 inline-flex w-fit rounded-lg bg-accent-soft px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Reserve this build slot →
              </Link>
              <meta itemProp="priceCurrency" content={currency} />
              <meta itemProp="price" content={String(INTELLIGENCE_SETUP.now[currency][0])} />
              <link itemProp="availability" href="https://schema.org/PreOrder" />
            </article>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          List prices are indicative pre-discount figures. The {DISCOUNT_CODE} rate of{" "}
          {DISCOUNT_PERCENT}% off applies flat across India, the US, and the EU, on setup and monthly
          fees alike. Final figure inside the band is confirmed at scoping.
        </p>
      </Section>


      <FaqSection
        items={INTELLIGENCE_FAQS}
        subheading="Package details, booking process, and how digital employees work."
      />
    </PageShell>
  );
}
