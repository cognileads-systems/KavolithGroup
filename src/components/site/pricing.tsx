import { useState } from "react";

export const CURRENCIES = ["USD", "EUR", "INR"] as const;
export type Currency = (typeof CURRENCIES)[number];

export type Amount = Record<Currency, number>;

const SYMBOL: Record<Currency, string> = { INR: "₹", USD: "$", EUR: "€" };

/** Placeholder anchor multiplier — marketing reference only, not a sourced claim. */
export const MARKET_MULTIPLIER = 2.2;

export function formatMoney(currency: Currency, value: number) {
  const rounded = Math.round(value);
  const locale = currency === "INR" ? "en-IN" : "en-US";
  return `${SYMBOL[currency]}${rounded.toLocaleString(locale)}`;
}

export function marketRate(currency: Currency, value: number) {
  const raw = value * MARKET_MULTIPLIER;
  const step = currency === "INR" ? 500 : 5;
  return formatMoney(currency, Math.round(raw / step) * step);
}

export function CurrencyToggle({
  currency,
  onChange,
  className = "",
}: {
  currency: Currency;
  onChange: (c: Currency) => void;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label="Select display currency"
      className={`inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1 ${className}`}
    >
      {CURRENCIES.map((c) => (
        <button
          key={c}
          type="button"
          aria-pressed={currency === c}
          onClick={() => onChange(c)}
          className={[
            "rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors",
            currency === c
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

/** Struck-through market reference beside the real rate. */
export function PriceAnchor({
  currency,
  amount,
  suffix,
  size = "lg",
}: {
  currency: Currency;
  amount: number;
  suffix?: string;
  size?: "lg" | "sm";
}) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        Market rate{" "}
        <span className="line-through decoration-muted-foreground/70">
          {marketRate(currency, amount)}
        </span>
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          Our rate
        </span>
        <span className={`font-display text-accent ${size === "lg" ? "text-2xl" : "text-xl"}`}>
          {formatMoney(currency, amount)}
        </span>
        {suffix && <span className="font-mono text-[11px] text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}

export type Tier = {
  id: string;
  name: string;
  oneTime: Amount;
  monthly?: Amount;
  outcome: string;
  features: string[];
  badge?: string;
  featured?: boolean;
};

const TIER_PRICES = {
  small: { oneTime: { INR: 23000, USD: 280, EUR: 260 } as Amount },
  mid: {
    oneTime: { INR: 58000, USD: 700, EUR: 645 } as Amount,
    monthly: { INR: 10000, USD: 120, EUR: 110 } as Amount,
  },
  large: {
    oneTime: { INR: 90000, USD: 1090, EUR: 1000 } as Amount,
    monthly: { INR: 15000, USD: 180, EUR: 165 } as Amount,
  },
};

export const KAVOLITH_TIERS: Tier[] = [
  {
    id: "launchpad",
    name: "Launchpad",
    ...TIER_PRICES.small,
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
    ...TIER_PRICES.mid,
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
    ...TIER_PRICES.large,
    outcome: "Run an intelligence layer across every team, with build capacity reserved for you.",
    features: ["Everything in Scale", "Full intelligence layer across teams", "Priority build queue"],
  },
];

export const AUTOMATION_TIERS: Tier[] = [
  {
    id: "single-flow",
    name: "Single Flow",
    ...TIER_PRICES.small,
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
    ...TIER_PRICES.mid,
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
    ...TIER_PRICES.large,
    outcome: "Operate automation as infrastructure across departments, with reserved capacity.",
    features: [
      "Everything in Ops Stack",
      "Department-wide workflow coverage",
      "Priority build queue and quarterly review",
    ],
  },
];

export function PricingGrid({ tiers, note }: { tiers: Tier[]; note?: string }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <CurrencyToggle currency={currency} onChange={setCurrency} />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Approximate conversions
        </span>
      </div>

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

            <div className="mt-4">
              <PriceAnchor
                currency={currency}
                amount={t.oneTime[currency]}
                suffix={t.monthly ? undefined : "one-time"}
              />
              {t.monthly && (
                <div className="mt-2 font-mono text-[11px] text-muted-foreground">
                  + {formatMoney(currency, t.monthly[currency])} / month
                </div>
              )}
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
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

            <meta itemProp="priceCurrency" content={currency} />
            <meta itemProp="price" content={String(t.oneTime[currency])} />
          </article>
        ))}
      </div>
      {note && <p className="mt-5 text-sm text-muted-foreground">{note}</p>}
      <p className="mt-2 text-xs text-muted-foreground">
        Market-rate figures are indicative agency-pricing placeholders for comparison, not verified
        or sourced quotes.
      </p>
    </div>
  );
}
