import { Check } from "lucide-react";

interface Tier {
  name: string;
  price: string;
  suffix?: string;
  subtitle: string;
  features: string[];
  highlight?: boolean;
  note?: string;
}

const tiers: Tier[] = [
  {
    name: "Vectra Launchpad",
    price: "₹16,000",
    subtitle: "Viral Reputation & Local Growth",
    features: [
      "High-converting landing page",
      "Local SEO & GEO foundation",
      "Review & reputation system",
      "Core brand identity setup",
    ],
  },
  {
    name: "Vectra Scale",
    price: "₹48,000",
    suffix: "+ ₹7,500/mo Care SLA",
    subtitle: "100% Launchpad fee credited",
    features: [
      "Everything in Launchpad",
      "Ongoing Care SLA & monitoring",
      "Conversion rate optimization",
      "Monthly performance reporting",
    ],
  },
  {
    name: "CogniLeads OS",
    price: "₹85,000 – ₹1,50,000",
    subtitle: "Autonomous AI Intent Pipeline",
    highlight: true,
    features: [
      "Sub-120s AI SDR pipeline",
      "Apollo + Clearbit enrichment",
      "Claude-powered lead scoring",
      "Make.com automation backend",
    ],
  },
  {
    name: "CoreForge Enterprise OS",
    price: "₹2,50,000+",
    subtitle: "Bespoke Autonomous Workforce",
    features: [
      "Multi-agent architecture",
      "Planner / Executor / Supervisor",
      "Custom CRM & systems integration",
      "Dedicated engineering sprint",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-black py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Engagement Tiers
          </h2>
          <p className="mt-4 text-neutral-400">
            Milestone-based delivery. No retainers you don't need.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                tier.highlight
                  ? "border-green-500 bg-neutral-900 shadow-lg shadow-green-500/10"
                  : "border-neutral-800 bg-neutral-950"
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-black">
                  Most Popular
                </span>
              )}

              <h3 className="font-mono text-lg font-semibold text-white">
                {tier.name}
              </h3>
              <p className="mt-1 text-sm text-neutral-400">{tier.subtitle}</p>

              <div className="mt-6">
                <span className="text-2xl font-bold text-white">{tier.price}</span>
                {tier.suffix && (
                  <div className="mt-1 text-sm text-green-400">{tier.suffix}</div>
                )}
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-neutral-300">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-8 rounded-lg py-2.5 text-center text-sm font-semibold transition-colors ${
                  tier.highlight
                    ? "bg-green-500 text-black hover:bg-green-400"
                    : "border border-neutral-700 text-white hover:bg-neutral-800"
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
