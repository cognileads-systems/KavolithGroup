import { Translate } from "@/i18n";
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
    name: "Kavolith Launchpad",
    setup: LAUNCHPAD_SETUP,
    outcome: "Start with a clear map of your process and one workflow running in production.",
    features: [
      "Sub-300ms React/Tailwind web portal (dark/light mode)",
      "Domain, SSL & cloud hosting included",
      "Smart AI interactive intake form",
      "WhatsApp catalogue & UPI instant payment integration",
      "AEO & GEO LocalBusiness JSON-LD schema",
      "Google Maps optimization & automated Google Sheets funnel",
      "GA4 analytics setup + 3 free annual updates",
      "GBP Top-3 map-pack strategy",
      "Google Workspace domain email setup",
    ],
  },
  {
    id: "scale",
    name: "Kavolith Scale",
    setup: SCALE_SETUP,
    monthly: SCALE_MONTHLY,
    outcome: "Connect several workflows into one operating layer, with ongoing iteration.",
    features: [
      "Everything in Launchpad + multi-page architecture",
      "Automated online appointment & calendar booking",
      "WhatsApp AI auto-responder (drip FAQs & pricing)",
      "Single-screen lead pipeline dashboard (New → Closed)",
      "GBP Top-3 map-pack strategy",
      "Google Workspace domain email setup",
      "100% of Launchpad amount paid credited toward this upgrade as loyalty credit (if upgrading within 90 days)",
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
      "Advanced AEO & GEO optimization suite",
      "n8n automation workflows with integrated voice-chat AI agent",
      "Official Google Workspace account included (1 year, 1 seat)",
      "4 scheduled feature/content updates per year",
      "Minimum 4-page multi-language AI-translated website",
      "4-currency storefront support (INR/USD/EUR)",
      "Custom .com domain included",
      "Built on hardened, bot/vulnerability-protected infrastructure",
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
      "Process mapping session and written workflow spec",
      "One production workflow with retry and error handling",
      "Smart AI intake form feeding the workflow",
      "WhatsApp notification & UPI payment link step",
      "Automated Google Sheets / CRM record funnel",
      "Runbook and handoff documentation",
      "GA4 event tracking on the automated path",
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
      "Everything in Single Flow + multi-tool architecture",
      "Multi-tool integration and CRM sync (3–5 connected workflows)",
      "Automated appointment & calendar booking flow",
      "WhatsApp AI auto-responder (drip FAQs & pricing)",
      "Single-screen lead pipeline dashboard (New → Closed)",
      "Monitoring, alerting, and monthly iteration",
      "Quarterly automation reliability & throughput report",
      "100% of Single Flow amount paid credited as loyalty credit (if upgrading within 90 days)",
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
      "n8n automation workflows with integrated voice-chat AI agent",
      "Official Google Workspace account included (1 year, 1 seat)",
      "4 scheduled workflow/feature updates per year",
      "Multi-language automated messaging (EN/Telugu/Hindi)",
      "4-currency payment handling (INR/USD/EUR)",
      "Priority build queue and quarterly review",
      "Built on hardened, bot/vulnerability-protected infrastructure",
    ],
  },
];

/** Small checkmark used for itemized deliverables. */
function CheckIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="mt-[3px] h-3.5 w-3.5 shrink-0 text-accent"
      role="presentation"
    >
      <path
        d="M3 8.5l3.2 3.2L13 4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


function PricingGridBase({ tiers, note }: { tiers: Tier[]; note?: string }) {
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

export function PricingGrid({ ...props }: Parameters<typeof PricingGridBase>[0]) {
  return (
    <Translate>
      <PricingGridBase {...props} />
    </Translate>
  );
}
