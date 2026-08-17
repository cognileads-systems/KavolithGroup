import { Section, SectionTitle } from "./layout";
import { Translate } from "@/i18n";
import { CircuitDivider } from "./motifs";

export type FaqItem = { q: string; a: string };

/** JSON-LD FAQPage node built from the exact visible FAQ copy. */
export function faqSchema(id: string, items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Always-expanded 2-column FAQ card grid with a node-lattice separator above. */
export function FaqSection({
  items,
  heading = "Frequently Asked Questions",
  subheading,
  id = "faq",
}: {
  items: FaqItem[];
  heading?: string;
  subheading?: string;
  id?: string;
}) {
  return (
    <Translate>
      <CircuitDivider />
      <Section id={id} className="pt-0">
        <SectionTitle eyebrow="FAQ" title={heading} intro={subheading} />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((f) => (
            <article key={f.q} className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-display text-base font-bold text-foreground">{f.q}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </article>
          ))}
        </div>
      </Section>
    </Translate>
  );
}

export const HOME_FAQS: FaqItem[] = [
  {
    q: "What is Kavolith Group?",
    a: "Kavolith Group is an Intelligence Systems Company based in Hyderabad, India. We build AI systems for revenue, operations, and workforce automation — across four specialist brands: Kavolith, CogniLeads OS, Kavolith Intelligence, and Kavolith Automation.",
  },
  {
    q: "Who do you work with?",
    a: "We work with early-stage and growing businesses across India and internationally — law firms, real estate developers, water treatment businesses, hospitality operators, and any organisation losing revenue to manual processes.",
  },
  {
    q: "How do I get started?",
    a: "Book a free 30-minute discovery call on WhatsApp. No commitment, no sales pitch — we listen, then give you a fixed scope and a fixed price in writing before any money changes hands.",
  },
  {
    q: "Do you work with businesses outside Hyderabad?",
    a: "Yes. All client work is delivered remotely. Hyderabad-based clients can also meet in person for discovery and handover sessions.",
  },
];

export const KAVOLITH_FAQS: FaqItem[] = [
  {
    q: "What's the difference between Launchpad, Scale, and Premium?",
    a: "Launchpad is a one-time fixed build — a fast web portal with AI intake, WhatsApp integration, and payment setup. Scale adds ongoing systems: appointment booking, a lead pipeline dashboard, and monthly check-ins. Premium adds voice-AI agents, multilingual architecture, advanced AEO/GEO optimisation, and full ongoing technical support.",
  },
  {
    q: "How long does a project take?",
    a: "Launchpad builds complete in 7–14 days. Scale projects run 3–4 weeks. Premium engagements are scoped individually but generally complete in 4–6 weeks.",
  },
  {
    q: "How does payment work?",
    a: "All projects run 40/30/30: 40% to begin, 30% at mid-project review, 30% on handover. You never pay in full before the work is done.",
  },
  {
    q: "Can I upgrade from Launchpad to Scale?",
    a: "Yes. Upgrade within 90 days and 100% of your Launchpad payment is credited toward the Scale setup fee.",
  },
  {
    q: 'What does "free bug fixes" mean exactly?',
    a: "If anything we built stops working — forms, integrations, automations — we fix it at no charge, no time limit, on all tiers. It covers technical faults in our work, not design change requests.",
  },
  {
    q: "What happens after the 30 days of post-launch support?",
    a: "Launchpad clients receive 3 free change requests (any page, any time) within 12 months. Scale and Premium clients get scheduled updates, unlimited minor changes, and monthly video check-ins — we stay active in your system, not just available.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. We accept clients internationally. Pricing is available in INR, USD, and EUR. The FOUNDER30 code applies globally.",
  },
];

export const COGNILEADS_FAQS: FaqItem[] = [
  {
    q: "What is CogniLeads OS?",
    a: "CogniLeads OS is an AI Revenue Intelligence Platform that captures, scores, and routes inbound leads automatically. It classifies each lead using a UDSC scoring rubric, sends instant replies, and alerts your team only when a lead is worth actioning — before a competitor can respond.",
  },
  {
    q: "How does UDSC scoring work?",
    a: "UDSC (Unique Demand Signal Classification) scores each lead 0–100 based on explicit purchase intent, business context, and message specificity. Leads scoring 70 or above are classified as ICP and trigger immediate priority alerts to your team via Telegram or WhatsApp.",
  },
  {
    q: "What's included in the presale engagement?",
    a: "Presale engagements are scoped between ₹1,20,000 and ₹2,50,000. They include lead capture webhook setup, AI-based intent classification, Airtable lead storage, Telegram and WhatsApp alert routing, and automated email reply sequences — configured specifically for your business.",
  },
  {
    q: "How long does setup take?",
    a: "Most deployments are live within 2–3 weeks from scope confirmation and advance payment.",
  },
  {
    q: "Does it replace my existing CRM?",
    a: "No. CogniLeads OS sits upstream of your CRM — it captures, scores, and filters leads before they reach your team or existing tools. Integration with your current CRM is part of the scoping conversation.",
  },
  {
    q: "What do I need to get started?",
    a: "A confirmed scope, 60% advance payment, and access credentials for the platforms being integrated. We handle all technical build and configuration.",
  },
];

export const INTELLIGENCE_FAQS: FaqItem[] = [
  {
    q: "What's included in the AI Compliance & Documentation Employee?",
    a: "This package deploys a RAG agent trained on your company's policies, contracts, and compliance documents. It drafts documents on request, answers policy questions accurately, and operates in English, Telugu, and Hindi.",
  },
  {
    q: "What's included in the AI HR/Ops Digital Employee?",
    a: "This package deploys an agent that handles onboarding Q&A, leave and policy lookups, and basic operations automation — reducing HR overhead for repeated queries while escalating anything requiring human judgment.",
  },
  {
    q: "How far in advance do I need to book?",
    a: "One month minimum. Advance booking reserves your onboarding slot and starts scoping work immediately — process mapping, rule definition, and language configuration begin before the platform goes live.",
  },
  {
    q: "How is a digital employee different from a chatbot?",
    a: "A chatbot replies to messages. A digital employee owns a process: it collects the required inputs, validates them against your rules, updates your systems, and escalates exceptions to a human when needed.",
  },
  {
    q: "What systems does it connect to?",
    a: "Digital employees connect to tools your business already uses — document stores, CRMs, messaging platforms, and HRMS systems. No migration required on your side.",
  },
  {
    q: "Which languages are supported?",
    a: "Both packages operate in English, Telugu, and Hindi. Additional language support is available on request during scoping.",
  },
];

export const AUTOMATION_FAQS: FaqItem[] = [
  {
    q: "What kinds of automation does Kavolith Automation build?",
    a: "We build workflow automation (multi-step business processes), CRM automation (lead capture, follow-up, pipeline tracking), invoicing automation (generation, sending, payment reminders), and WhatsApp automation (AI auto-responders, booking flows, broadcast sequences).",
  },
  {
    q: "What tools and platforms do you work with?",
    a: "Make.com, n8n, Airtable, Google Workspace, WhatsApp Business API, Supabase, and most common SaaS tools via their APIs. If you use a specific tool, ask us directly — we'll tell you immediately whether it can be automated.",
  },
  {
    q: "Do I need technical knowledge to use what you build?",
    a: "No. Automation runs through tools your team already uses — WhatsApp, email, or a simple dashboard. No coding required on your end after handover.",
  },
  {
    q: "How long does an automation project take?",
    a: "A single-workflow automation typically completes in 5–10 days. Multi-system integrations with full testing run 2–4 weeks depending on scope.",
  },
  {
    q: "What happens if an automation breaks after delivery?",
    a: "All bug fixes are free, always. If something we built stops working due to a platform change or a technical fault on our side, we fix it at no charge — no time limit.",
  },
  {
    q: "How is this different from hiring a freelance developer?",
    a: "Kavolith Automation combines process design with technical build. We don't just connect tools — we map your current workflow, identify where you're losing time or revenue, and build systems that fix those specific gaps.",
  },
];
