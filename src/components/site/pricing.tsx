import { useState } from "react";

export const CURRENCIES = ["USD", "EUR", "INR"] as const;
export type Currency = (typeof CURRENCIES)[number];

export type Amount = Record<Currency, number>;
export type PricePair = { list: Amount; now: Amount };

const SYMBOL: Record<Currency, string> = { INR: "₹", USD: "$", EUR: "€" };

/** Founder discount applied flat across every region. */
export const DISCOUNT_CODE = "FOUNDER30";
export const DISCOUNT_PERCENT = 30;

export function formatMoney(currency: Currency, value: number) {
  const rounded = Math.round(value);
  const locale = currency === "INR" ? "en-IN" : "en-US";
  return `${SYMBOL[currency]}${rounded.toLocaleString(locale)}`;
}

/** Legacy anchor helper kept for the list price of range-based offers. */
export function marketRate(currency: Currency, value: number) {
  const step = currency === "INR" ? 500 : 5;
  return formatMoney(currency, Math.round(value / step) * step);
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

export function DiscountBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {DISCOUNT_CODE} · {DISCOUNT_PERCENT}% off
    </span>
  );
}

/** Struck-through list price above the discounted rate. */
export function PriceLine({
  currency,
  pair,
  label,
  suffix,
  size = "lg",
}: {
  currency: Currency;
  pair: PricePair;
  label: string;
  suffix?: string;
  size?: "lg" | "sm";
}) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}{" "}
        <span className="line-through decoration-muted-foreground/70">
          {formatMoney(currency, pair.list[currency])}
        </span>
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className={`font-display text-accent ${size === "lg" ? "text-2xl" : "text-xl"}`}>
          {formatMoney(currency, pair.now[currency])}
        </span>
        {suffix && <span className="font-mono text-[11px] text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}

export type Tier = {
  id: string;
  name: string;
  setup: PricePair;
  monthly?: PricePair;
  outcome: string;
  features: string[];
  badge?: string;
  featured?: boolean;
};

const LAUNCHPAD_SETUP: PricePair = {
  list: { INR: 46000, USD: 1000, EUR: 900 },
  now: { INR: 32200, USD: 700, EUR: 630 },
};
const SCALE_SETUP: PricePair = {
  list: { INR: 58000, USD: 3500, EUR: 3200 },
  now: { INR: 40600, USD: 2450, EUR: 2240 },
};
const SCALE_MONTHLY: PricePair = {
  list: { INR: 28500, USD: 600, EUR: 550 },
  now: { INR: 20000, USD: 420, EUR: 385 },
};
const PREMIUM_SETUP: PricePair = {
  list: { INR: 90000, USD: 8000, EUR: 7300 },
  now: { INR: 63000, USD: 5600, EUR: 5100 },
};
const PREMIUM_MONTHLY: PricePair = {
  list: { INR: 40000, USD: 1500, EUR: 1350 },
  now: { INR: 28000, USD: 1050, EUR: 945 },
};

export const KAVOLITH_TIERS: Tier[] = [
  {
    id: "launchpad",
    name: "Launchpad",
    setup: LAUNCHPAD_SETUP,
    outcome: "Start with a clear map of your process and one workflow running in production.",
    features: [
      "Initial systems audit and process map",
      "One automated workflow built and deployed",
      "Handoff documentation",
      "One free update round (up to 3 pages) within 30 days of launch",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    setup: SCALE_SETUP,
    monthly: SCALE_MONTHLY,
    outcome: "Connect several workflows into one operating layer, with ongoing iteration.",
    features: [
      "Everything in Launchpad",
      "Multi-workflow integration (3–5 connected workflows)",
      "Monthly iteration and support",
      "3 free update rounds per year (3–4 pages each)",
      "Twice-yearly free bug-fix pass",
      "Quarterly site + social profile speed & analytics report",
    ],
    badge: "Most common",
    featured: true,
  },
  {
    id: "premium",
    name: "Premium / Total Control",
    setup: PREMIUM_SETUP,
    monthly: PREMIUM_MONTHLY,
    outcome: "Run an intelligence layer across every team, with build capacity reserved for you.",
    features: [
      "Everything in Scale",
      "Full intelligence layer across teams",
      "Priority build queue",
      "3 free update rounds per year (up to 4 pages each)",
      "Twice-yearly free bug-fix pass",
      "Monthly site + profile speed & analytics report",
    ],
  },
];

export const AUTOMATION_TIERS: Tier[] = [
  {
    id: "single-flow",
    name: "Single Flow",
    setup: LAUNCHPAD_SETUP,
    outcome: "Automate the one process that costs your team the most manual hours.",
    features: [
      "Process mapping session and workflow spec",
      "One production workflow with error handling",
      "Runbook and handoff documentation",
      "One free update round (up to 3 workflow steps) within 30 days of launch",
    ],
  },
  {
    id: "ops-stack",
    name: "Ops Stack",
    setup: SCALE_SETUP,
    monthly: SCALE_MONTHLY,
    outcome: "Wire your core tools together so data stops being re-entered by hand.",
    features: [
      "Everything in Single Flow",
      "Multi-tool integration and CRM sync (3–5 connected workflows)",
      "Monitoring, alerting, and monthly iteration",
      "3 free update rounds per year (3–4 workflow changes each)",
      "Twice-yearly free bug-fix pass",
      "Quarterly automation reliability & throughput report",
    ],
    badge: "Most common",
    featured: true,
  },
  {
    id: "automation-control",
    name: "Automation Control",
    setup: PREMIUM_SETUP,
    monthly: PREMIUM_MONTHLY,
    outcome: "Operate automation as infrastructure across departments, with reserved capacity.",
    features: [
      "Everything in Ops Stack",
      "Department-wide workflow coverage",
      "Priority build queue and quarterly review",
      "3 free update rounds per year (up to 4 workflow changes each)",
      "Twice-yearly free bug-fix pass",
      "Monthly automation reliability & throughput report",
    ],
  },
];

export function PricingGrid({ tiers, note }: { tiers: Tier[]; note?: string }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <CurrencyToggle currency={currency} onChange={setCurrency} />
        <DiscountBadge />
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

            <div className="mt-4 space-y-3">
              <PriceLine
                currency={currency}
                pair={t.setup}
                label={t.monthly ? "Setup list" : "List price"}
                suffix={t.monthly ? "setup" : "one-time"}
              />
              {t.monthly && (
                <PriceLine
                  currency={currency}
                  pair={t.monthly}
                  label="Monthly list"
                  suffix="/ month"
                  size="sm"
                />
              )}
            </div>

            <div className="mt-3">
              <DiscountBadge />
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
            <meta itemProp="price" content={String(t.setup.now[currency])} />
          </article>
        ))}
      </div>
      {note && <p className="mt-5 text-sm text-muted-foreground">{note}</p>}
      <p className="mt-2 text-xs text-muted-foreground">
        List prices are indicative pre-discount figures. The {DISCOUNT_CODE} rate of{" "}
        {DISCOUNT_PERCENT}% off applies flat across India, the US, and the EU, on setup and monthly
        fees alike.
      </p>
    </div>
  );
}
