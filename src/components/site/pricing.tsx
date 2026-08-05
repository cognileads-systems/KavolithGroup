export type Tier = {
  id: string;
  name: string;
  price: string;
  recurring?: string;
  outcome: string;
  features: string[];
  badge?: string;
  featured?: boolean;
};

export const KAVOLITH_TIERS: Tier[] = [
  {
    id: "launchpad",
    name: "Launchpad",
    price: "₹23,000",
    recurring: "one-time",
    outcome: "Start with a clear map of your process and one workflow running in production.",
    features: [
      "Initial systems audit",
      "One automated workflow built and deployed",
      "Handoff documentation",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    price: "₹58,000",
    recurring: "+ ₹10,000 / month",
    outcome: "Connect several workflows into one operating layer, with ongoing iteration.",
    features: [
      "Everything in Launchpad",
      "Multi-workflow integration",
      "Monthly iteration and support",
    ],
    badge: "Most common",
    featured: true,
  },
  {
    id: "premium",
    name: "Premium / Total Control",
    price: "₹90,000",
    recurring: "+ ₹15,000 / month",
    outcome: "Run an intelligence layer across every team, with build capacity reserved for you.",
    features: [
      "Everything in Scale",
      "Full intelligence layer across teams",
      "Priority build queue",
    ],
  },
];

export const AUTOMATION_TIERS: Tier[] = [
  {
    id: "single-flow",
    name: "Single Flow",
    price: "₹23,000",
    recurring: "one-time",
    outcome: "Automate the one process that costs your team the most manual hours.",
    features: [
      "Process mapping session",
      "One production workflow with error handling",
      "Runbook and handoff documentation",
    ],
  },
  {
    id: "ops-stack",
    name: "Ops Stack",
    price: "₹58,000",
    recurring: "+ ₹10,000 / month",
    outcome: "Wire your core tools together so data stops being re-entered by hand.",
    features: [
      "Everything in Single Flow",
      "Multi-tool integration and CRM sync",
      "Monitoring, alerting, and monthly iteration",
    ],
    badge: "Most common",
    featured: true,
  },
  {
    id: "automation-control",
    name: "Automation Control",
    price: "₹90,000",
    recurring: "+ ₹15,000 / month",
    outcome: "Operate automation as infrastructure across departments, with reserved capacity.",
    features: [
      "Everything in Ops Stack",
      "Department-wide workflow coverage",
      "Priority build queue and quarterly review",
    ],
  },
];

export function PricingGrid({ tiers, note }: { tiers: Tier[]; note?: string }) {
  return (
    <div>
      <div className="grid gap-5 md:grid-cols-3">
        {tiers.map((t) => (
          <article
            key={t.id}
            itemScope
            itemType="https://schema.org/Product"
            className={[
              "flex flex-col rounded-xl border p-6 transition-colors",
              t.featured
                ? "border-accent/60 bg-panel"
                : "border-border bg-surface hover:border-accent/40",
            ].join(" ")}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg" itemProp="name">
                {t.name}
              </h3>
              {t.badge && (
                <span className="rounded-full bg-accent-soft px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  {t.badge}
                </span>
              )}
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-2xl text-accent">{t.price}</span>
              {t.recurring && (
                <span className="font-mono text-[11px] text-muted-foreground">{t.recurring}</span>
              )}
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Limited-time rate
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.outcome}</p>

            <ul className="mt-5 space-y-2 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex gap-2 text-muted-foreground">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <meta itemProp="priceCurrency" content="INR" />
            <meta itemProp="price" content={t.price.replace(/[^\d]/g, "")} />
          </article>
        ))}
      </div>
      {note && <p className="mt-5 text-sm text-muted-foreground">{note}</p>}
    </div>
  );
}
