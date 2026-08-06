import type { ReactNode } from "react";
import { SiteNav } from "./site-nav";
import { SiteFooter } from "./site-footer";
import { CircuitBackdrop, CircuitDivider, NodeGlyph } from "./motifs";
import { Translate } from "@/i18n";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-ink text-foreground">
      <CircuitBackdrop className="fixed opacity-60" />
      <div className="relative">
        <SiteNav />
        <main>
          <Translate>{children}</Translate>
        </main>
        <CircuitDivider className="pb-6" />
        <SiteFooter />
      </div>
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-6 py-16 md:py-24 ${className}`}>
      {children}
    </section>
  );
}

/** Section with a realistic photographic backdrop under a violet-tinted overlay. */
export function PhotoSection({
  children,
  image,
  priority = false,
  className = "",
  id,
}: {
  children: ReactNode;
  image: string;
  priority?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <div className="relative isolate overflow-hidden">
      <PhotoBackdrop src={image} priority={priority} />
      <Section id={id} className={className}>
        {children}
      </Section>
    </div>
  );
}


export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
      <NodeGlyph />
      {children}
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-2xl md:text-3xl">{title}</h2>
      {intro && <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{intro}</p>}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40 ${className}`}
    >
      {children}
    </div>
  );
}
