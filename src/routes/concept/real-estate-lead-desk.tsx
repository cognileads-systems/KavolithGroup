import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/site/layout";
import { SITE_URL } from "@/lib/seo";
import "./real-estate-lead-desk.css";

const FAQ_ITEMS = [
  {
    question: "Is the enquiry real?",
    answer:
      "No. The enquiry and its details are fictional and shown as sample data for this demo.",
  },
  {
    question: "Does this flow describe every delivered project?",
    answer:
      "No. The project cards describe work delivered; they do not claim every project used this enquiry flow.",
  },
] as const;

const DELIVERED_WORK = [
  {
    title: "TLEGAL · Advocate portal",
    package: "Scale",
    built: "Hand-coded site",
    automation: "One-step automation: webhook to Airtable",
  },
  {
    title: "RO business",
    package: "Premium / Total Control",
    built: "Website",
    automation: "Automation Control tier",
  },
  {
    title: "Real estate firm",
    package: "Total Control + Launchpad",
    built: "Two sites",
    automation: "Ops Stack on both",
  },
  {
    title: "Dental clinic",
    package: "Ops Stack",
    built: "WordPress site, about 15 pages",
    automation: "Ops Stack",
  },
  {
    title: "Gym",
    package: "Launchpad",
    built: "Website",
    automation: "Single Flow automation",
  },
] as const;

export const Route = createFileRoute("/concept/real-estate-lead-desk")({
  component: RealEstateLeadDeskPage,
  head: () => ({
    meta: [
      { title: "Real Estate Lead Desk — Concept Build | Kavolith Group" },
      {
        name: "description",
        content: "From first message to a clear next step",
      },
      { name: "robots", content: "noindex" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${SITE_URL}/concept/real-estate-lead-desk#webpage`,
              url: `${SITE_URL}/concept/real-estate-lead-desk`,
              name: "From first message to a clear next step",
              description: "From first message to a clear next step",
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/concept/real-estate-lead-desk#faq`,
              mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: { "@type": "Answer", text: answer },
              })),
            },
          ],
        }),
      },
    ],
  }),
});

function RealEstateLeadDeskPage() {
  return (
    <PageShell>
      <Section className="pb-8 pt-16 md:pt-24">
        <div className="mx-auto max-w-5xl">
          <h1 className="max-w-3xl text-4xl leading-[1.08] md:text-6xl">
            From first message to a clear next step
          </h1>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-teal">
            Sample data
          </p>
        </div>
      </Section>

      <Section className="py-8 md:py-12">
        <div className="mx-auto max-w-5xl">
          <article className="lead-story-scene">
            <h2 className="text-2xl md:text-3xl">It starts with the enquiry.</h2>
            <blockquote className="mt-6 max-w-3xl rounded-2xl border border-teal/20 bg-surface p-6 text-lg leading-relaxed text-foreground md:p-8">
              Hi, I&apos;m looking for a 2-bedroom apartment near Moonstone Quarter. Could you share a
              few options in my range?
            </blockquote>
          </article>

          <article className="lead-story-scene">
            <h2 className="text-2xl md:text-3xl">Capture the useful details.</h2>
            <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {[
                ["Name", "Sample lead"],
                ["Area", "Moonstone Quarter (fictional)"],
                ["Budget band", "AED 1.6M–2.0M"],
                ["Timeline", "This season"],
              ].map(([label, value]) => (
                <div key={label} className="bg-surface p-5 md:p-6">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="mt-3 text-base text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </article>

          <article className="lead-story-scene">
            <h2 className="text-2xl md:text-3xl">Bring intent signals into view.</h2>
            <div className="mt-6 max-w-xl rounded-2xl border border-border bg-surface p-6 md:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Intent score
              </p>
              <p className="mt-4 font-display text-5xl text-accent">78 / 100</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-teal">
                Sample data, illustrative only
              </p>
            </div>
          </article>

          <article className="lead-story-scene">
            <h2 className="text-2xl md:text-3xl">Route the enquiry to a next step.</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {["General inbox", "Property specialist", "Follow-up queue"].map((destination) => (
                <li
                  key={destination}
                  className="rounded-xl border border-border bg-surface p-5 text-sm text-foreground"
                >
                  {destination}
                </li>
              ))}
            </ul>
          </article>

          <article className="lead-story-scene">
            <h2 className="text-2xl md:text-3xl">Give the agent useful context.</h2>
            <div className="mt-6 max-w-xl rounded-2xl border border-teal/25 bg-teal/5 p-6 md:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-teal">
                Sample lead
              </p>
              <p className="mt-5 text-base text-foreground">
                Ask about preferred viewing times.
              </p>
            </div>
          </article>
        </div>
      </Section>

      <Section className="py-10 md:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl">Delivered work</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {DELIVERED_WORK.map((project) => (
              <article
                key={project.title}
                className="overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <div
                  role="img"
                  aria-label="Neutral SVG placeholder — project screenshot not supplied."
                  className="grid aspect-[16/7] place-items-center border-b border-border bg-panel px-5 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
                >
                  Neutral SVG placeholder — project screenshot not supplied.
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="font-display text-xl">{project.title}</h3>
                  <dl className="mt-5 space-y-4 text-sm">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                        Package:
                      </dt>
                      <dd className="mt-1 text-foreground">{project.package}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                        What was built:
                      </dt>
                      <dd className="mt-1 text-foreground">{project.built}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                        Automation:
                      </dt>
                      <dd className="mt-1 text-foreground">{project.automation}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl">Questions about this concept</h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {FAQ_ITEMS.map(({ question, answer }) => (
              <article key={question} className="py-5">
                <h3 className="text-lg">{question}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
