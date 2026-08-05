import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Section, Eyebrow, SectionTitle } from "@/components/site/layout";
import { PricingGrid, AUTOMATION_TIERS } from "@/components/site/pricing";
import { AUTOMATION_CASE_STUDIES, CaseStudyCard } from "@/components/site/case-studies";

const SITE = "https://kavolithgroup.lovable.app";

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
    ],
    links: [{ rel: "canonical", href: `${SITE}/kavolith-automation` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
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
              price: t.price.replace(/[^\d]/g, ""),
              priceCurrency: "INR",
            })),
          },
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
      <Section>
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
      </Section>

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

      <Section className="pt-0">
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
      </Section>

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
