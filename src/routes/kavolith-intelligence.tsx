import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Section, Eyebrow, SectionTitle } from "@/components/site/layout";

const SITE = "https://kavolithgroup.lovable.app";

const FAQS = [
  {
    q: "What is Kavolith Intelligence?",
    a: "Kavolith Intelligence is an Enterprise AI Workforce Platform: multilingual digital employees that handle intake, verification, and follow-up work inside regulated business processes.",
  },
  {
    q: "When will it be available?",
    a: "The platform is in build. Presale packages are open now, and presale customers are onboarded in the order their scope is confirmed.",
  },
  {
    q: "Which languages are supported?",
    a: "The first release targets English, Hindi, Telugu, Tamil, and Marathi, with additional Indian languages added based on presale demand.",
  },
  {
    q: "How is it different from a chatbot?",
    a: "A chatbot answers messages. A digital employee owns a process end to end — collecting the required inputs, validating them against your rules, updating your systems, and escalating exceptions to a human.",
  },
  {
    q: "Can it work with our existing systems?",
    a: "Yes. Digital employees are wired into the CRM, document store, and messaging tools you already run, rather than requiring you to migrate.",
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
          "Kavolith Intelligence is an Enterprise AI Workforce Platform of multilingual digital employees for compliance-heavy operations. Presale packages open now.",
      },
      {
        property: "og:title",
        content: "Kavolith Intelligence | Enterprise AI Workforce Platform",
      },
      {
        property: "og:description",
        content:
          "Multilingual digital employees for regulated, compliance-heavy operations. Presale packages open now.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/kavolith-intelligence` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/kavolith-intelligence` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${SITE}/kavolith-intelligence#faq`,
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

const PRESALE = [
  {
    name: "Pilot Seat",
    price: "₹45,000",
    outcome: "Put one digital employee on one process and measure it before committing further.",
    features: ["One digital employee", "Single process scope", "Two languages"],
  },
  {
    name: "Department",
    price: "₹1,10,000",
    outcome: "Cover a full department's intake and verification workload.",
    features: ["Up to four digital employees", "Multi-process coverage", "Four languages"],
    featured: true,
  },
  {
    name: "Enterprise Presale",
    price: "From ₹2,40,000",
    outcome: "Reserve capacity across teams with compliance review built into the rollout.",
    features: ["Unlimited process scope", "Compliance review", "Priority onboarding"],
  },
];

function IntelligencePage() {
  return (
    <PageShell>
      <div className="relative overflow-hidden">
        <div className="blob left-[6%] top-[-120px] h-[360px] w-[360px]" />
        <Section className="relative">
          <Eyebrow>Coming Soon · Presale open</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] md:text-5xl">
            Kavolith Intelligence — <span className="text-accent">Enterprise AI Workforce</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Multilingual digital employees that own compliance-heavy processes end to end: collect
            the inputs, validate against your rules, update your systems, escalate the exceptions.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Join the presale
          </Link>
        </Section>
      </div>

      <Section className="pt-0">
        <SectionTitle
          eyebrow="Presale packages"
          title="Reserve capacity before launch"
          intro="Presale customers are onboarded in the order their scope is confirmed."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {PRESALE.map((p) => (
            <article
              key={p.name}
              className={[
                "flex flex-col rounded-xl border p-6 transition-colors",
                p.featured
                  ? "border-accent/60 bg-panel"
                  : "border-border bg-surface hover:border-accent/40",
              ].join(" ")}
            >
              <h3 className="text-lg">{p.name}</h3>
              <div className="mt-4 font-display text-2xl text-accent">{p.price}</div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.outcome}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2 text-muted-foreground">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
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
