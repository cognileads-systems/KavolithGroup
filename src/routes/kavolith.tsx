import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PageShell,
  Section,
  PhotoSection,
  PhotoLatticeSection,
  Eyebrow,
  SectionTitle,
} from "@/components/site/layout";
import photoDataviz from "@/assets/photo-dataviz.jpg";
import photoNeural from "@/assets/photo-neural.jpg";

import { PricingGrid, KAVOLITH_TIERS } from "@/components/site/pricing";
import { CASE_STUDIES, CaseStudyCard } from "@/components/site/case-studies";
import { HowWeWorkCompact } from "@/components/site/how-we-work";
import { FaqSection, faqSchema, KAVOLITH_FAQS } from "@/components/site/faq";

const SITE = "https://kavolith.com";

export const Route = createFileRoute("/kavolith")({
  component: KavolithPage,
  head: () => ({
    meta: [
      { title: "Kavolith | AI Systems Engineering & Automation Services" },
      {
        name: "description",
        content:
          "Kavolith engineers AI systems and automation infrastructure for Indian businesses — systems audits, custom workflows, and a connected intelligence layer.",
      },
      { property: "og:title", content: "Kavolith | AI Systems Engineering & Automation Services" },
      {
        property: "og:description",
        content:
          "Systems audits, custom workflow builds, and a connected intelligence layer for revenue and operations teams.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/kavolith` },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://kavolith.com/kavolith-og.svg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/svg+xml" },
      { name: "twitter:image", content: "https://kavolith.com/kavolith-og.svg" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/kavolith` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
          "@type": "Service",
          "@id": `${SITE}/kavolith#service`,
          name: "Kavolith",
          url: `${SITE}/kavolith`,
          description:
            "AI systems engineering and automation services: systems audits, custom workflow builds, and connected intelligence layers.",
          areaServed: "IN",
          parentOrganization: { "@type": "Organization", name: "Kavolith Group" },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Hyderabad",
            addressRegion: "Telangana",
            addressCountry: "IN",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Kavolith engagements",
            itemListElement: KAVOLITH_TIERS.map((t) => ({
              "@type": "Offer",
              name: t.name,
              price: String(t.setup.now.INR),
              priceCurrency: "INR",
            })),
          },
            },
            {
              "@type": "LocalBusiness",
              "@id": `${SITE}/kavolith#localbusiness`,
              name: "Kavolith",
              url: `${SITE}/kavolith`,
              priceRange: "₹₹₹",
              areaServed: "IN",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                addressCountry: "IN",
              },
              parentOrganization: { "@type": "Organization", name: "Kavolith Group" },
            },
            faqSchema(`${SITE}/kavolith#faq`, KAVOLITH_FAQS),
          ],
        }),
      },
    ],
  }),
});

const SERVICES = [
  {
    title: "Systems audit",
    body: "We map how work actually moves through your business — every handoff, spreadsheet, and message thread — and identify where the time and revenue leak out.",
  },
  {
    title: "Custom workflow builds",
    body: "We design and deploy the workflows that remove those leaks: intake, routing, follow-up, reporting, wired into the tools you already run.",
  },
  {
    title: "Intelligence layer",
    body: "Once workflows are live, we connect them so data flows in one direction and your team works from a single reliable view instead of reconciling systems.",
  },
];

function KavolithPage() {
  return (
    <PageShell>
      <PhotoLatticeSection image={photoNeural} priority>
        <Eyebrow>Kavolith · Core services</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] md:text-5xl">
          AI systems engineering for businesses that{" "}
          <span className="text-accent">outgrew manual process</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Kavolith is the core services brand of Kavolith Group. We audit how your business runs,
          build the workflows that remove the manual work, and connect them into one intelligence
          layer.
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Book a consultation
        </Link>
      </PhotoLatticeSection>

      <Section className="pt-0">
        <SectionTitle
          eyebrow="What we do"
          title="Three services, in order"
          intro="Most engagements run in this sequence, because each stage makes the next one cheaper."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <article
              key={s.title}
              className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 text-lg">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <HowWeWorkCompact />
      </Section>

      <PhotoSection image={photoDataviz} className="pt-0">
        <SectionTitle
          eyebrow="Pricing"
          title="Engagement tiers"
          intro="Fixed build fee, with optional monthly iteration on the larger tiers."
        />
        <div className="mt-10">
          <PricingGrid
            tiers={KAVOLITH_TIERS}
            note="All prices in INR. Scope is confirmed after the initial consultation."
          />
        </div>
      </PhotoSection>

      <Section className="pt-0">
        <SectionTitle
          eyebrow="Case studies"
          title="Work we've shipped"
          intro="Four representative engagements, described as problem, solution, and outcome."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {CASE_STUDIES.map((c) => (
            <CaseStudyCard key={c.id} study={c} />
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
