import { Translate } from "@/i18n";
import { Link } from "@tanstack/react-router";
import { SectionTitle } from "./layout";

export const WA_BOOK =
  "https://wa.me/919492044168?text=Hi%20Kavolith!%20I%27d%20like%20to%20book%20a%20free%20discovery%20call.";
export const WA_LEARN =
  "https://wa.me/919492044168?text=Hi%20Kavolith!%20I%27d%20like%20to%20learn%20more.";
export const BOOKING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2WpZS3N0ceXAlLkph41Yz38GWFnOyicZfYc2ZtgN2NbpZLV-C8U5ARABDluIO_-XcACST-ypqg";

const STEPS_FULL = [
  {
    title: "Discovery",
    body: "A free 30-minute call. You explain your business, we explain what we can build. No commitment, no sales pitch.",
  },
  {
    title: "Scope Lock",
    body: "We sign an NDA. You get a fixed scope and a fixed price in writing. What you see is what you pay.",
  },
  {
    title: "Build in Milestones",
    body: "40% to begin. 30% at mid-project review. 30% on handover. You pay as progress happens — not before.",
  },
  {
    title: "Handover + Stay Close",
    body: "30 days of hands-on support after launch. Free bug fixes. Free changes within your tier. We don't disappear.",
  },
];

const STEPS_COMPACT = [
  { title: "Discovery", body: "Free 30-minute call. No pitch, no pressure." },
  { title: "Scope Lock", body: "NDA signed. Fixed scope + fixed price in writing." },
  {
    title: "Build in Milestones",
    body: "40% → 30% → 30%. Real progress before you pay in full.",
  },
  {
    title: "Handover + Stay Close",
    body: "30 days support. Free bug fixes. Monthly check-ins on Scale and Premium.",
  },
];

export function WhatsAppCTA({ className = "" }: { className?: string }) {
  return (
    <Translate>
      <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
        <a
          href={WA_BOOK}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          Book a free call on WhatsApp
        </a>
        <Link
          to="/contact"
          className="rounded-lg border border-accent px-5 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent-soft"
        >
          Send us a message
        </Link>
      </div>
    </Translate>
  );
}

export function WhatsAppGhostButton({ className = "" }: { className?: string }) {
  return (
    <Translate>
      <a
        href={WA_LEARN}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex rounded-lg border border-accent px-5 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent-soft ${className}`}
      >
        Questions? Chat on WhatsApp →
      </a>
    </Translate>
  );
}

export function WhatsAppInline({ prompt }: { prompt: string }) {
  return (
    <Translate>
      <p className="mt-6 font-sans text-sm text-muted-foreground">
        {prompt}{" "}
        <a
          href={WA_LEARN}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal underline-offset-4 hover:underline"
        >
          → {prompt.startsWith("Want") ? "WhatsApp me" : "Message us on WhatsApp"}
        </a>
      </p>
    </Translate>
  );
}

function StepGrid({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <article key={s.title}>
          <div className="font-mono text-[32px] leading-none text-teal">
            {String(i + 1).padStart(2, "0")}
          </div>
          <h3 className="mt-4 font-display text-lg font-bold text-foreground">{s.title}</h3>
          <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">{s.body}</p>
        </article>
      ))}
    </div>
  );
}

export function HowWeWork() {
  return (
    <Translate>
      <SectionTitle
        eyebrow="Process"
        title="How We Work"
        intro="Four steps from first conversation to live system. No surprises, no hidden costs."
      />
      {StepGrid({ steps: STEPS_FULL })}
      <WhatsAppCTA className="mt-12" />
    </Translate>
  );
}

const AFTER_DELIVERY = [
  {
    label: "Free changes",
    launchpad: "3 requests, any page, 12 months",
    scale: "4 scheduled/year + unlimited minor changes",
    premium: "Monthly scheduled + unlimited changes",
  },
  {
    label: "Bug fixes",
    launchpad: "Free, always",
    scale: "Free, always",
    premium: "Free, always",
  },
  {
    label: "Monthly check-in",
    launchpad: "—",
    scale: "Video call + PDF audit report",
    premium: "Video call + PDF audit + performance report",
  },
];

export function HowWeWorkCompact() {
  return (
    <Translate>
      <SectionTitle
        eyebrow="Process"
        title="How We Work"
        intro="Four steps. One fixed price. Ongoing support."
      />
      {StepGrid({ steps: STEPS_COMPACT })}

      <div className="mt-12 overflow-x-auto rounded-xl border border-border bg-panel">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr>
              <th className="px-5 py-4 font-display text-sm font-semibold text-foreground" />
              {["Launchpad", "Scale", "Premium"].map((t) => (
                <th
                  key={t}
                  className="border-l border-teal/60 px-5 py-4 font-display text-sm font-semibold text-foreground"
                >
                  {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AFTER_DELIVERY.map((r) => (
              <tr key={r.label} className="border-t border-border">
                <th className="px-5 py-4 text-sm font-medium text-foreground">{r.label}</th>
                <td className="border-l border-teal/60 px-5 py-4 text-sm text-muted-foreground">
                  {r.launchpad}
                </td>
                <td className="border-l border-teal/60 px-5 py-4 text-sm text-muted-foreground">
                  {r.scale}
                </td>
                <td className="border-l border-teal/60 px-5 py-4 text-sm text-muted-foreground">
                  {r.premium}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <WhatsAppCTA className="mt-12" />
    </Translate>
  );
}
