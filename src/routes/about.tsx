import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PageShell,
  Section,
  PhotoSection,
  Eyebrow,
  SectionTitle,
} from "@/components/site/layout";
import photoNeural from "@/assets/photo-neural.jpg";

const SITE = "https://kavolithgroup.lovable.app";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Kavolith Group | An Intelligence Systems Company" },
      {
        name: "description",
        content:
          "Kavolith Group is an Intelligence Systems Company based in Hyderabad, engineering AI systems for revenue, operations, and workforce automation.",
      },
      { property: "og:title", content: "About Kavolith Group | An Intelligence Systems Company" },
      {
        property: "og:description",
        content:
          "Who we are, how we work, and why we build AI systems as infrastructure rather than experiments.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/about` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/about` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
          "@type": "AboutPage",
          "@id": `${SITE}/about#about`,
          url: `${SITE}/about`,
          about: {
            "@type": "Organization",
            name: "Kavolith Group",
            slogan: "Engineer Intelligence into Business",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Hyderabad",
              addressRegion: "Telangana",
              addressCountry: "IN",
            },
          },
            },
            {
              "@type": "Person",
              "@id": `${SITE}/about#founder`,
              name: "Arfath",
              jobTitle: "Founder",
              worksFor: { "@type": "Organization", name: "Kavolith Group" },
              knowsAbout: [
                "AI systems engineering",
                "Business process automation",
                "Revenue operations",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                addressCountry: "IN",
              },
            },
          ],
        }),
      },
    ],
  }),
});

const PRINCIPLES = [
  {
    title: "Systems, not experiments",
    body: "We ship things that run in production with monitoring and documentation, not demos that need us in the room to work.",
  },
  {
    title: "Start where it hurts",
    body: "The first build targets the process costing the most manual hours, so the engagement pays for itself before it expands.",
  },
  {
    title: "Own the whole path",
    body: "Intake, scoring, routing, follow-up, and reporting are one system. We build across the whole path rather than a single step.",
  },
];

function AboutPage() {
  return (
    <PageShell>
      <Section>
        <Eyebrow>About</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] md:text-5xl">
          An <span className="text-accent">Intelligence Systems Company</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Kavolith Group engineers AI systems for revenue, operations, and workforce automation. We
          work with businesses in India that have outgrown spreadsheets and message threads but
          don't want a year-long enterprise rollout.
        </p>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Background" title="Where we came from" />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Kavolith started from consulting work on inbound revenue processes — legal
                practices, real-estate builders, water purification businesses, and neighbourhood
                retail. The same pattern showed up everywhere: enquiries arrived faster than the
                team could answer them, and the follow-up depended on whoever remembered.
              </p>
              <p>
                Rather than adding another dashboard, we started building the missing plumbing:
                one intake path, automatic qualification, deterministic routing, and follow-up that
                doesn't rely on memory. That work grew into four brands covering revenue
                intelligence, workforce, and automation engineering.
              </p>
              <p>
                We're based in Hyderabad, Telangana, and work with clients across India.
              </p>
            </div>
          </div>

          <div>
            <SectionTitle eyebrow="How we work" title="Three principles" />
            <div className="mt-6 space-y-4">
              {PRINCIPLES.map((p) => (
                <article key={p.title} className="rounded-xl border border-border bg-surface p-6">
                  <h3 className="text-base">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-accent/40 bg-panel p-7">
          <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            If your team is losing time to manual handoffs, the first conversation is a systems
            audit — not a sales pitch.
          </p>
          <Link
            to="/contact"
            className="rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Book a consultation
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}
