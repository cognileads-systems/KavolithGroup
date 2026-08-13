import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PageShell,
  Section,
  PhotoLatticeSection,
  Eyebrow,
  SectionTitle,
} from "@/components/site/layout";
import photoDatastream from "@/assets/photo-datastream.jpg";
import photoDataviz from "@/assets/photo-dataviz.jpg";

import { PricingGrid, AUTOMATION_TIERS } from "@/components/site/pricing";
import { AUTOMATION_CASE_STUDIES, CaseStudyCard } from "@/components/site/case-studies";

const SITE = "https://kavolith.com";

export const Route = createFileRoute("/kavolith-automation")({
  component: AutomationPage,
  head: () => ({
    meta: [
      { title: "Kavolith Automation | Workflow & Business Automation Engineering" },
      {
        name: "description",
        content:
          "Kavolith Automation engineers production workflows for lead routing, invoicing, and CRM sync — with monitoring, error handling, and documentation included.",
      },
      {
        property: "og:title",
        content: "Kavolith Automation | Workflow & Business Automation Engineering",
      },
      {
        property: "og:description",
        content:
          "Production automation for lead routing, invoicing, and CRM synchronisation, built to be monitored and maintained.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/kavolith-automation` },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://kavolith.com/kavolith-og.svg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/svg+xml" },
      { name: "twitter:image", content: "https://kavolith.com/kavolith-og.svg" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/kavolith-automation` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "@id": `${SITE}/kavolith-automation#service`,
              name: "Kavolith Automation",
              url: `${SITE}/kavolith-automation`,
              serviceType: "Business process automation engineering",
              areaServed: "IN",
              provider: { "@type": "Organization", name: "Kavolith Group" },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Automation packages",
                itemListElement: AUTOMATION_TIERS.map((t) => ({
                  "@type": "Offer",
                  name: t.name,
                  price: String(t.setup.now.INR),
                  priceCurrency: "INR",
                })),
              },
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE}/kavolith-automation#faq`,
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What kinds of processes can Kavolith Automation handle?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We automate lead routing and assignment, invoice generation and payment follow-up, CRM synchronisation, inbound enquiry capture, document collection, appointment reminders, internal approval chasing, and scheduled reporting. If your process runs on logic and repeatable steps, we can automate it.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What tools do you use to build automations?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We build on Make.com, n8n, and Python/FastAPI depending on the complexity and hosting requirements. For AI-powered workflows we integrate Gemini and other LLM APIs. We recommend the tool that costs least to maintain in the long run, not the one that is easiest to sell.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How long does automation setup take?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Single-workflow automations typically go live within one to two weeks. Multi-system builds run two to four weeks. A fixed delivery date is agreed before work begins.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need any technical knowledge to work with Kavolith Automation?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. You describe the process and the outcome you want. We handle the technical design, build, testing, and deployment. We also hand over documentation written in plain language so your team can understand what runs and why.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What if an automation breaks after launch?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Every automation we build includes error handling and monitoring so failures surface immediately rather than silently losing data. Scale and Premium packages include a monthly maintenance window. Critical failures are addressed as a priority regardless of tier.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How is automation priced?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Fixed price per engagement, agreed before work starts. Launchpad covers a single workflow build. Scale and Premium cover multi-workflow systems with ongoing monthly iteration. A 30% founding-client discount is currently available across all tiers.",
                  },
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
});

const DOMAINS = [
  {
    title: "Lead routing",
    body: "Assign every inbound lead instantly by territory and availability, and escalate anything that goes untouched.",
  },
  {
    title: "Invoicing",
    body: "Draft invoices from approved work records, deliver them on schedule, and chase outstanding balances automatically.",
  },
  {
    title: "CRM synchronisation",
    body: "Keep contacts, deals, and support records consistent across tools, with a reconciliation log for anything that fails validation.",
  },
];

const AUTOMATION_TYPES = [
  "Lead routing and instant assignment",
  "Invoice generation and payment follow-up",
  "CRM synchronisation across tools",
  "Inbound enquiry capture and qualification",
  "Document collection and validation checklists",
  "Appointment and site-visit reminders",
  "Internal approval chasing and escalation",
  "Scheduled reporting and daily digests",
];


function AutomationPage() {
  return (
    <PageShell>
      <PhotoLatticeSection image={photoDatastream} priority>
        <Eyebrow>Kavolith Automation</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] md:text-5xl">
          Automation that runs like <span className="text-accent">infrastructure</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          We engineer the workflows behind lead routing, invoicing, and CRM sync — with error
          handling, monitoring, and documentation, so they keep working after we hand them over.
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Scope an automation
        </Link>
        <div className="mt-4">
          <WhatsAppGhostButton />
        </div>
      </PhotoLatticeSection>

      <Section className="pt-0">
        <SectionTitle
          eyebrow="Focus areas"
          title="Where automation pays back fastest"
          intro="These three areas account for most of the manual hours we remove."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {DOMAINS.map((d) => (
            <article
              key={d.title}
              className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
            >
              <h3 className="text-lg">{d.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <PhotoLatticeSection image={photoDataviz} className="pt-0">
        <SectionTitle
          eyebrow="Packages"
          title="Automation packages"
          intro="Fixed build fee, with optional monthly monitoring and iteration."
        />
        <div className="mt-10">
          <PricingGrid
            tiers={AUTOMATION_TIERS}
            note="All prices in INR. Final scope is confirmed after a process mapping session."
          />
        </div>
      </PhotoLatticeSection>

      <Section className="pt-0">
        <SectionTitle
          eyebrow="What we automate"
          title="Automation types we build"
          intro="A plain list of the workflow types currently in production for clients."
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {AUTOMATION_TYPES.map((t) => (
            <li
              key={t}
              className="flex gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted-foreground"
            >
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="pt-0">
        <SectionTitle eyebrow="Proof of work" title="Automations in production" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {AUTOMATION_CASE_STUDIES.map((c) => (
            <CaseStudyCard key={c.id} study={c} />
          ))}
        </div>
      </Section>

    </PageShell>
  );
}
