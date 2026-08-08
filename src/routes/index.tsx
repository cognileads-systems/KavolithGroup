import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Section, Eyebrow, SectionTitle } from "@/components/site/layout";

const SITE = "https://kavolith.com";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Kavolith Group | Engineer Intelligence into Business" },
      {
        name: "description",
        content:
          "Kavolith Group is an AI systems company in India engineering AI systems for revenue, operations, and workforce automation across four specialist brands.",
      },
      { property: "og:title", content: "Kavolith Group | Engineer Intelligence into Business" },
      {
        property: "og:description",
        content:
          "An AI systems company in India building intelligence systems for revenue, operations, and workforce automation.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${SITE}/#organization`,
              name: "Kavolith Group",
              url: `${SITE}/`,
              slogan: "Engineer Intelligence into Business",
              description:
                "Kavolith Group is an Intelligence Systems Company that engineers AI systems for revenue, operations, and workforce automation.",
              areaServed: "IN",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                addressCountry: "IN",
              },
              knowsAbout: [
                "AI systems engineering",
                "AI revenue intelligence",
                "Workflow automation",
                "Enterprise AI workforce platforms",
              ],
              subOrganization: [
                { "@type": "Organization", name: "Kavolith", url: `${SITE}/kavolith` },
                { "@type": "Organization", name: "CogniLeads OS", url: `${SITE}/cognileads-os` },
                {
                  "@type": "Organization",
                  name: "Kavolith Intelligence",
                  url: `${SITE}/kavolith-intelligence`,
                },
                {
                  "@type": "Organization",
                  name: "Kavolith Automation",
                  url: `${SITE}/kavolith-automation`,
                },
              ],
            },
            {
              "@type": "WebSite",
              "@id": `${SITE}/#website`,
              url: `${SITE}/`,
              name: "Kavolith Group",
              publisher: { "@id": `${SITE}/#organization` },
              inLanguage: "en",
            },
          ],
        }),
      },
    ],
  }),
});

const BRAND_TILES = [
  {
    to: "/kavolith" as const,
    name: "Kavolith",
    kicker: "Core services",
    pitch: "AI systems engineering — audits, custom workflows, and the intelligence layer around them.",
  },
  {
    to: "/cognileads-os" as const,
    name: "CogniLeads OS",
    kicker: "A Kavolith Company",
    pitch: "AI Revenue Intelligence Platform that scores, routes, and converts leads automatically.",
  },
  {
    to: "/kavolith-intelligence" as const,
    name: "Kavolith Intelligence",
    kicker: "Coming Soon",
    pitch: "Enterprise AI Workforce Platform — multilingual digital employees for compliance and ops.",
  },
  {
    to: "/kavolith-automation" as const,
    name: "Kavolith Automation",
    kicker: "Automation Engineering",
    pitch: "Automation engineering platform for lead routing, invoicing, and CRM synchronisation.",
  },
];

function HomePage() {
  return (
    <PageShell>
      <div className="relative overflow-hidden">
        <div className="blob left-[10%] top-[-120px] h-[380px] w-[380px]" />
        <div className="blob right-[5%] top-[40px] h-[300px] w-[300px] opacity-20" />

        <Section className="relative">
          <Eyebrow>Kavolith Group</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.08] md:text-6xl">
            Engineer Intelligence <span className="text-accent">into Business</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            We build AI systems for revenue, operations, and workforce — the qualification pipelines,
            automation infrastructure, and digital employees that let a team run without manual
            handoffs.
          </p>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-foreground">
            Kavolith Group is an Intelligence Systems Company that engineers AI systems for revenue,
            operations, and workforce automation.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Book a consultation
            </Link>
            <a
              href="#systems"
              className="rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              See our systems
            </a>
          </div>
        </Section>
      </div>

      <Section id="systems" className="pt-0">
        <SectionTitle
          eyebrow="Four brands"
          title="One group, four systems"
          intro="Each brand owns a distinct layer of the stack. Start where the pain is."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {BRAND_TILES.map((b) => (
            <article
              key={b.to}
              className="flex flex-col justify-between rounded-xl border border-border bg-surface p-7 transition-colors hover:border-accent/40"
            >
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {b.kicker}
                </div>
                <h3 className="mt-3 text-xl">{b.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{b.pitch}</p>
              </div>
              <Link
                to={b.to}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-accent-soft px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Explore →
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
