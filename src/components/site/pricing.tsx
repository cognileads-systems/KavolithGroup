import { Translate } from "@/i18n";
import { useState } from "react";

export const CURRENCIES = ["USD", "EUR", "INR"] as const;
export type Currency = (typeof CURRENCIES)[number];

export type Amount = Record<Currency, number>;
export type PricePair = { list: Amount; now: Amount };
/** Some regions are quoted as a monthly band rather than a single figure. */
export type RangeAmount = Record<Currency, [number, number]>;
export type RangePair = { list: RangeAmount; now: RangeAmount };

const SYMBOL: Record<Currency, string> = { INR: "₹", USD: "$", EUR: "€" };

/** Founder discount applied flat across every region. */
export const DISCOUNT_CODE = "FOUNDER30";
export const DISCOUNT_PERCENT = 30;

export function formatMoney(currency: Currency, value: number) {
  const rounded = Math.round(value);
  const locale = currency === "INR" ? "en-IN" : "en-US";
  return `${SYMBOL[currency]}${rounded.toLocaleString(locale)}`;
}

export function formatRange(currency: Currency, [low, high]: [number, number]) {
  return low === high
    ? formatMoney(currency, low)
    : `${formatMoney(currency, low)} – ${formatMoney(currency, high)}`;
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
    <Translate>
      <span
        className={`inline-flex items-center gap-2 rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent ${className}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {DISCOUNT_CODE} · {DISCOUNT_PERCENT}% off
      </span>
    </Translate>
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
  pair: PricePair | RangePair;
  label: string;
  suffix?: string;
  size?: "lg" | "sm";
}) {
  const show = (v: number | [number, number]) =>
    Array.isArray(v) ? formatRange(currency, v) : formatMoney(currency, v);
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}{" "}
        <span className="line-through decoration-muted-foreground/70">
          {show(pair.list[currency])}
        </span>
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className={`font-display text-accent ${size === "lg" ? "text-2xl" : "text-xl"}`}>
          {show(pair.now[currency])}
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
  monthly?: RangePair;
  outcome: string;
  /** Process-level proof line: what the running system does, no metrics. */
  proof?: string;
  features: string[];
  badge?: string;
  featured?: boolean;
};


const LAUNCHPAD_SETUP: PricePair = {
  list: { INR: 46000, USD: 1000, EUR: 900 },
  now: { INR: 32200, USD: 700, EUR: 630 },
};
const SCALE_SETUP: PricePair = {
  list: { INR: 78500, USD: 3500, EUR: 3200 },
  now: { INR: 55000, USD: 2450, EUR: 2240 },
};
const SCALE_MONTHLY: RangePair = {
  list: { INR: [10000, 21500], USD: [600, 600], EUR: [550, 550] },
  now: { INR: [7000, 15000], USD: [420, 420], EUR: [385, 385] },
};
const PREMIUM_SETUP: PricePair = {
  list: { INR: 112300, USD: 7150, EUR: 6500 },
  now: { INR: 78600, USD: 5000, EUR: 4550 },
};
const PREMIUM_MONTHLY: RangePair = {
  list: { INR: [14300, 35700], USD: [1500, 1500], EUR: [1350, 1350] },
  now: { INR: [10000, 25000], USD: [1050, 1050], EUR: [945, 945] },
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

/** Automation is a separate product line: workflow/AI only, no website or portal build. */
const SINGLE_FLOW_SETUP: PricePair = {
  list: { INR: 40000, USD: 860, EUR: 785 },
  now: { INR: 28000, USD: 600, EUR: 550 },
};
const OPS_STACK_SETUP: PricePair = {
  list: { INR: 92900, USD: 2000, EUR: 1830 },
  now: { INR: 65000, USD: 1400, EUR: 1280 },
};
const OPS_STACK_MONTHLY: RangePair = {
  list: { INR: [11430, 21430], USD: [250, 465], EUR: [230, 420] },
  now: { INR: [8000, 15000], USD: [175, 325], EUR: [160, 295] },
};
const AUTOMATION_CONTROL_SETUP: PricePair = {
  list: { INR: 157150, USD: 3430, EUR: 3070 },
  now: { INR: 110000, USD: 2400, EUR: 2150 },
};
const AUTOMATION_CONTROL_MONTHLY: RangePair = {
  list: { INR: [21430, 42860], USD: [465, 930], EUR: [420, 840] },
  now: { INR: [15000, 30000], USD: [325, 650], EUR: [295, 590] },
};

export const AUTOMATION_TIERS: Tier[] = [
  {
    id: "single-flow",
    name: "Single Flow",
    setup: SINGLE_FLOW_SETUP,
    outcome:
      "One production automation with one clear outcome — for example, an inbox triage system that reads incoming mail, drafts replies for human approval, sends only pre-approved messages, and flags anything needing a real decision.",
    proof: "Inbox triage runs unattended; only pre-flagged messages wait for a human decision.",
    features: [
      "Process mapping session and written workflow spec",
      "One production workflow with retry and error handling",
      "AI drafting step with human approval before anything sends",
      "Rules for what auto-sends and what gets flagged for a decision",
      "Notification step to email or WhatsApp",
      "Automated record log to Google Sheets or your CRM",
      "Runbook and handoff documentation",
      "One free update round (up to 3 workflow steps) within 30 days of launch",
    ],
  },
  {
    id: "ops-stack",
    name: "Ops Stack",
    setup: OPS_STACK_SETUP,
    monthly: OPS_STACK_MONTHLY,
    outcome:
      "Multiple connected workflows operating as one system — for example, a lead-scoring agent that tracks and scores inbound messages by intent, connected WhatsApp and Gmail automation, and a daily end-of-day summary delivered on Telegram or WhatsApp.",
    proof:
      "Inbound messages are scored by intent as they arrive, and the day closes with a summary of what is done and what is pending.",
    features: [
      "Everything in Single Flow + multi-workflow architecture",
      "Lead-scoring agent that classifies inbound messages by intent",
      "Connected WhatsApp and Gmail automation across one pipeline",
      "3–5 connected workflows with shared data and CRM sync",
      "Daily end-of-day summary report via Telegram or WhatsApp",
      "Single-screen pipeline view (New → Closed)",
      "Monitoring, alerting, and monthly iteration",
      "100% of Single Flow amount paid credited as loyalty credit (if upgrading within 90 days)",
    ],
    badge: "Most common",
    featured: true,
  },
  {
    id: "automation-control",
    name: "Automation Control",
    setup: AUTOMATION_CONTROL_SETUP,
    monthly: AUTOMATION_CONTROL_MONTHLY,
    outcome:
      "Department-level automation with reserved build capacity — everything in Ops Stack plus multi-step agents, such as an itinerary and logistics agent that processes filled forms, runs accessibility-specific research, and generates day-by-day plans and packing lists.",
    proof:
      "Submitted forms turn into researched day-by-day plans and packing lists without a coordinator assembling them by hand.",
    features: [
      "Everything in Ops Stack",
      "Department-wide workflow coverage",
      "Multi-step agent workflows with research and document generation steps",
      "Accessibility-aware research steps (for example, venue access requirements)",
      "Automatic day-by-day plan and checklist generation",
      "Multi-language automated messaging (EN/Telugu/Hindi)",
      "Reserved build capacity and priority queue",
      "Quarterly reliability review and 4 scheduled workflow updates per year",
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

            {t.proof && (
              <div className="mt-4 rounded-lg border border-border bg-panel/60 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  In production
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.proof}</p>
              </div>
            )}


            <ul className="mt-5 space-y-2.5 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 leading-relaxed text-muted-foreground">
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>


            <meta itemProp="priceCurrency" content={currency} />
            <meta itemProp="price" content={String(t.setup.now[currency])} />
          </article>
        ))}
      </div>
      <p className="mt-5 text-sm text-muted-foreground">
        <span>All prices shown in {currency}.</span>
        {note ? <span> {note}</span> : null}
      </p>
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
      {PricingGridBase(props)}
    </Translate>
  );
}
