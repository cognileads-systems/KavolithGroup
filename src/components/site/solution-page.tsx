import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { PageShell, Section, PhotoLatticeSection, Eyebrow, SectionTitle } from "./layout";
import { BOOKING_URL } from "./how-we-work";
import { FaqSection, faqSchema, type FaqItem } from "./faq";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import photoDatastream from "@/assets/photo-datastream.jpg";

export const CARE_WHATSAPP_URL =
  "https://wa.me/919492044168?text=Hi%20Kavolith!%20I%27d%20like%20to%20learn%20more.";

export type SolutionMeta = {
  path: string;
  name: string;
  title: string;
  description: string;
  serviceType: string;
  faqs: FaqItem[];
};

export function solutionHead(m: SolutionMeta) {
  const url = `${SITE_URL}${m.path}`;
  return {
    meta: [
      { title: m.title },
      { name: "description", content: m.description },
      { property: "og:title", content: m.title },
      { property: "og:description", content: m.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: m.title },
      { name: "twitter:description", content: m.description },
      { property: "og:image", content: `${SITE_URL}/kavolith-og.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: `${SITE_URL}/kavolith-og.png` },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema([{ name: m.name, path: m.path }]),
            {
              "@type": "Service",
              "@id": `${url}#service`,
              name: m.name,
              url,
              description: m.description,
              serviceType: m.serviceType,
              areaServed: "remote",
              provider: { "@type": "Organization", name: "Kavolith Group", url: SITE_URL },
            },
            faqSchema(`${url}#faq`, m.faqs),
          ],
        }),
      },
    ],
  };
}

export function SolutionPage({
  eyebrow,
  h1,
  answer,
  getItems,
  steps,
  proof,
  fits,
  faqs,
  extra,
}: {
  eyebrow: string;
  h1: ReactNode;
  answer: string;
  getItems: string[];
  steps: string[];
  proof: ReactNode;
  fits: ReactNode;
  faqs: FaqItem[];
  extra?: ReactNode;
}) {
  return (
    <PageShell>
      <PhotoLatticeSection image={photoDatastream} priority enhancedLattice>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] md:text-5xl">{h1}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{answer}</p>
      </PhotoLatticeSection>

      <Section className="pt-0">
        <SectionTitle eyebrow="Deliverables" title="What do you get?" />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {getItems.map((t) => (
            <li
              key={t}
              className="flex gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted-foreground"
            >
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="pt-0">
        <SectionTitle eyebrow="Process" title="How does it work?" />
        <ol className="mt-8 grid gap-5 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s} className="rounded-xl border border-border bg-surface p-6">
              <div className="font-mono text-xs text-accent">STEP {String(i + 1).padStart(2, "0")}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s}</p>
            </li>
          ))}
        </ol>
      </Section>

      {extra}

      <Section className="pt-0">
        <div className="rounded-xl border border-accent/40 bg-surface p-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            Running in our own operations
          </div>
          <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{proof}</div>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Where does it fit in our packages? </span>
          {fits}
        </p>
      </Section>

      <FaqSection items={faqs} />

      <Section className="pt-0">
        <div className="flex flex-wrap gap-4">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Book a free 30-min call
          </a>
          <a
            href={CARE_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/60"
          >
            Message us on WhatsApp
          </a>
        </div>
      </Section>
    </PageShell>
  );
}

export function InlineLink({ to, children }: { to: "/kavolith" | "/kavolith-automation" | "/cognileads-os"; children: ReactNode }) {
  return (
    <Link to={to} className="text-accent underline-offset-4 hover:underline">
      {children}
    </Link>
  );
}
