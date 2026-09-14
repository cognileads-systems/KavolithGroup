import { Translate } from "@/i18n";
import { SectionTitle } from "./layout";

export type ProofItem = {
  id: string;
  tag: string;
  title: string;
  status: string;
  summary: string;
  facts: string[];
  link?: { href: string; label: string };
};

/**
 * Verifiable proof of work only. No metrics, outcomes, or client counts that
 * cannot be checked directly. CogniLeads OS is stated as architecture, not a
 * live client deployment.
 */
export const PROOF_ITEMS: ProofItem[] = [
  {
    id: "tlegal",
    tag: "Client build · Live",
    title: "TLEGAL — Advocate Portal",
    status: "Live in production",
    summary:
      "A hand-coded client portal for a legal and property practice, with structured case intake backed by Airtable.",
    facts: [
      "Hand-coded on TanStack Start, React 19, Bun, and Tailwind CSS v4",
      "Airtable-backed case intake",
      "Built to comply with India's DPDP Act 2023",
    ],
    link: { href: "https://tlegal.org.in", label: "tlegal.org.in" },
  },
  {
    id: "automation-pipeline",
    tag: "Automation · In production",
    title: "Kavolith Automation — lead capture pipeline",
    status: "Running in production",
    summary:
      "A webhook-triggered Make.com pipeline that captures inbound leads, classifies them with AI, and routes each one automatically.",
    facts: [
      "Webhook-triggered lead capture",
      "AI classification step on every inbound lead",
      "Auto-routing to Airtable, Telegram, and email",
    ],
  },
  {
    id: "cognileads-architecture",
    tag: "Architecture · Not a client deployment",
    title: "CogniLeads OS — platform architecture",
    status: "Capability, not yet a live client deployment",
    summary:
      "The revenue-intelligence platform we have engineered in-house. Presented as architecture and capability; it is not running for a client yet.",
    facts: [
      "130+ files across the codebase",
      "40+ modules",
      "FastAPI backend",
    ],
  },
];

function ProofOfWorkBase() {
  return (
    <div>
      <SectionTitle
        eyebrow="Proof of work"
        title="What we have actually built"
        intro="Real systems, stated plainly. Where something is architecture rather than a client deployment, we say so."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {PROOF_ITEMS.map((item) => (
          <article
            key={item.id}
            className="flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              {item.tag}
            </div>
            <h3 className="mt-3 text-lg">{item.title}</h3>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {item.status}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>

            <ul className="mt-4 space-y-2 text-sm">
              {item.facts.map((f) => (
                <li key={f} className="flex items-start gap-2.5 leading-relaxed text-muted-foreground">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {item.link && (
              <a
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-accent-soft px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Visit {item.link.label} →
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export function ProofOfWork() {
  return (
    <Translate>
      <ProofOfWorkBase />
    </Translate>
  );
}
