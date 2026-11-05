import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage, solutionHead, InlineLink } from "@/components/site/solution-page";
import { Section, SectionTitle } from "@/components/site/layout";
import type { FaqItem } from "@/components/site/faq";

const FAQS: FaqItem[] = [
  {
    q: "Does it work with property portals?",
    a: "It can capture portal enquiries that arrive by email or form; exact connections are confirmed in the written scope.",
  },
  {
    q: "Can it work in Arabic?",
    a: "Arabic pages and replies are planned and will be added after the English version is tested.",
  },
  { q: "Who sees the leads?", a: "Your team, in a shared view you own." },
  { q: "What does it cost?", a: "Scoped on a free 30-minute call; packages are on /kavolith." },
];

const META = {
  path: "/real-estate",
  name: "Real Estate Lead Automation",
  title: "AI Lead Automation for Real Estate Teams | Kavolith Group",
  description:
    "WhatsApp and web enquiries qualified by budget, area and timeline, then handed to the right agent. Scoped on a free call.",
  serviceType: "Real estate lead automation",
  faqs: FAQS,
};

const SAMPLE = [
  ["Sample Lead A", "Area 1", "Band A", "New", "Send first reply"],
  ["Sample Lead B", "Area 2", "Band B", "Qualified", "Assign to agent"],
  ["Sample Lead C", "Area 1", "Band C", "Viewing", "Confirm viewing time"],
  ["Sample Lead D", "Area 3", "Band B", "Proposal", "Follow up on proposal"],
  ["Sample Lead E", "Area 2", "Band A", "New", "Ask for timeline"],
];

export const Route = createFileRoute("/real-estate")({
  component: Page,
  head: () => solutionHead(META),
});

function Page() {
  return (
    <SolutionPage
      eyebrow="Real estate"
      h1="Lead automation for real estate teams"
      answer="Property enquiries arrive from WhatsApp, portals and your website; we qualify them by budget, area and timeline and hand a warm lead to the right agent with the details already captured."
      getItems={[
        "One place for every enquiry, whatever the source",
        "Budget, area, property type and timeline captured in the first conversation",
        "Warm leads assigned to an agent with a next step",
        "Missed-lead alerts so nothing sits unanswered",
        "Follow-up reminders",
        "Written scope before any build",
      ]}
      steps={[
        "Send us a sample of real property enquiries.",
        "We agree in writing what makes a lead warm: budget, area, property type and timeline.",
        "Build the qualification and agent routing, test against your labelled sample.",
        "Hand over with documentation and a tuning period.",
      ]}
      extra={
        <Section className="pt-0">
          <SectionTitle eyebrow="Sample" title="Sample pipeline (invented records)" />
          <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-surface">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                <tr>
                  {["Name", "Area", "Budget band", "Stage", "Next step"].map((h) => (
                    <th key={h} className="border-b border-border px-4 py-3 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SAMPLE.map((r) => (
                  <tr key={r[0]} className="border-b border-border last:border-0">
                    {r.map((c, i) => (
                      <td key={i} className={`px-4 py-3 ${i === 3 ? "text-accent" : "text-muted-foreground"}`}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            Sample data: invented records, not a client
          </p>
        </Section>
      }
      proof={
        <>
          <p>
            The webhook, AI classification, router, Airtable record and alert flow behind our own
            contact form.{" "}
            <InlineLink to="/cognileads-os">See the sample pipeline on CogniLeads OS</InlineLink>
          </p>
          <p className="mt-2">
            Kavolith Group is based in Hyderabad, India, and works remotely with teams elsewhere.
          </p>
        </>
      }
      fits={<>Scale tier and above; scoped on a free call. See <InlineLink to="/kavolith">/kavolith</InlineLink>.</>}
      faqs={FAQS}
    />
  );
}
