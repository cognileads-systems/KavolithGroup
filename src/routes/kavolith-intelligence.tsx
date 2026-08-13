import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PageShell,
  Section,
  PhotoLatticeSection,
  Eyebrow,
  SectionTitle,
} from "@/components/site/layout";
import photoLattice from "@/assets/photo-lattice.jpg";
import { WhatsAppGhostButton } from "@/components/site/how-we-work";

const SITE = "https://kavolith.com";

const FAQS = [
  {
    q: "What is Kavolith Intelligence?",
    a: "Kavolith Intelligence is an Enterprise AI Workforce Platform: multilingual digital employees that own compliance, documentation, and HR/ops processes end to end instead of just answering messages.",
  },
  {
    q: "Which languages are supported?",
    a: "Both presale packages are multilingual and operate in English, Telugu, and Hindi.",
  },
  {
    q: "When will it be available?",
    a: "The platform is in build and available on presale. Booking requires one month's advance, and presale customers are onboarded in the order their booking is confirmed.",
  },
  {
    q: "How is a digital employee different from a chatbot?",
    a: "A chatbot replies to messages. A digital employee owns a process: it collects the required inputs, validates them against your rules, updates your systems, and escalates exceptions to a human.",
  },
  {
    q: "Can it work with the systems we already use?",
    a: "Yes. Digital employees are wired into the CRM, document store, and messaging tools you already run, rather than requiring a migration.",
  },
  {
    q: "What does the advance booking cover?",
    a: "One month's advance reserves your onboarding slot and starts the scoping work — process mapping, rule definition, and language configuration — before the platform goes live.",
  },
];

const PACKAGES = [
  {
    name: "AI Compliance & Documentation Employee",
    rate: "Predefined rate",
    booking: "1-month advance booking",
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
    rate: "Predefined rate",
    booking: "1-month advance booking",
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
          "Multilingual digital employees (English, Telugu, Hindi) for compliance, documentation, and HR/ops. Coming soon — presale open.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/kavolith-intelligence` },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://kavolith.com/kavolith-og.svg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/svg+xml" },
      { name: "twitter:image", content: "https://kavolith.com/kavolith-og.svg" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/kavolith-intelligence` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
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
                priceSpecification: {
                  "@type": "PriceSpecification",
                  description: "Predefined rate, confirmed at scoping. One-month advance booking.",
                  priceCurrency: "INR",
                },
              })),
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE}/kavolith-intelligence#faq`,
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
});

function IntelligencePage() {
  return (
    <PageShell>
      <PhotoLatticeSection image={photoLattice} priority>
        <div>
          <div className="mb-7 flex flex-wrap items-center gap-3 rounded-xl border border-accent/40 bg-accent-soft px-5 py-3">
            <span className="animate-stage-pulse h-2 w-2 rounded-full bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Coming soon — presale booking open
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
            Book a presale slot
          </Link>
          <div className="mt-4">
            <WhatsAppGhostButton />
          </div>
        </div>
      </PhotoLatticeSection>

      <Section className="pt-0">
        <SectionTitle
          eyebrow="Presale packages"
          title="Two digital employees, available on presale"
          intro="Both run at a predefined rate and require one month's advance to reserve an onboarding slot."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
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
                Reserve this package →
              </Link>
              <link itemProp="availability" href="https://schema.org/PreOrder" />
            </article>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionTitle eyebrow="FAQ" title="Questions about the platform" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {FAQS.map((f) => (
            <article key={f.q} className="rounded-xl border border-border bg-surface p-6">
              <h3 className="text-base">{f.q}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
