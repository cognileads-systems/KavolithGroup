import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BOOKING_URL } from "@/components/site/how-we-work";
import { PageShell, Section } from "@/components/site/layout";
import { CARE_WHATSAPP_URL } from "@/components/site/solution-page";
import "./real-estate-lead-desk.css";

export const Route = createFileRoute("/concept/real-estate-lead-desk")({
  component: RealEstateLeadDeskPage,
  head: () => ({
    meta: [
      { title: "Real Estate Lead Desk — Concept Build | Kavolith Group" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function RealEstateLeadDeskPage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [staticFallback, setStaticFallback] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const desktop = window.matchMedia("(min-width: 768px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | null = null;
    let revertContext: (() => void) | null = null;
    let killTrigger: (() => void) | null = null;
    let generation = 0;

    const clearAnimations = () => {
      generation += 1;
      observer?.disconnect();
      observer = null;
      killTrigger?.();
      killTrigger = null;
      revertContext?.();
      revertContext = null;
    };

    const setup = () => {
      clearAnimations();
      const currentGeneration = generation;
      const scenes = Array.from(stage.querySelectorAll<HTMLElement>(".concept-stage-scene"));

      if (reducedMotion.matches) return;

      if (!desktop.matches) {
        if (!("IntersectionObserver" in window)) {
          scenes.forEach((scene) => scene.classList.add("is-visible"));
          return;
        }

        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer?.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.18 },
        );
        scenes.forEach((scene) => observer?.observe(scene));
        return;
      }

      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
        .then(([gsapModule, scrollTriggerModule]) => {
          if (currentGeneration !== generation) return;

          const { gsap } = gsapModule;
          const { ScrollTrigger } = scrollTriggerModule;
          gsap.registerPlugin(ScrollTrigger);

          const context = gsap.context(() => {
            gsap.set(scenes, { autoAlpha: 0, y: 20 });
            if (scenes[0]) gsap.set(scenes[0], { autoAlpha: 1, y: 0 });

            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: stage,
                pin: true,
                start: "top top+=80",
                end: () => `+=${window.innerHeight * 4}`,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            });

            const trigger = timeline.scrollTrigger;
            if (trigger) killTrigger = () => trigger.kill();

            for (let index = 0; index < scenes.length - 1; index += 1) {
              const position = index + 0.7;
              timeline.to(scenes[index], { autoAlpha: 0, y: -16, duration: 0.35 }, position);
              timeline.to(
                scenes[index + 1],
                { autoAlpha: 1, y: 0, duration: 0.45 },
                position + 0.12,
              );
            }

            timeline.fromTo(
              ".story-capture-field",
              { x: 18, autoAlpha: 0 },
              { x: 0, autoAlpha: 1, duration: 0.3, stagger: 0.12 },
              1.95,
            );
            timeline.fromTo(
              ".story-score-fill",
              { scaleX: 0 },
              { scaleX: 1, duration: 0.65, transformOrigin: "left center" },
              2.15,
            );
            timeline.fromTo(
              ".story-route-line",
              { strokeDashoffset: 100 },
              { strokeDashoffset: 0, duration: 0.7 },
              3.2,
            );
            timeline.fromTo(
              ".story-agent-card",
              { x: -34, autoAlpha: 0 },
              { x: 0, autoAlpha: 1, duration: 0.6 },
              4.3,
            );
          }, stage);

          revertContext = () => context.revert();
        })
        .catch((error: unknown) => {
          if (currentGeneration !== generation) return;
          console.error("Unable to load the concept story animation.", error);
          setStaticFallback(true);
        });
    };

    desktop.addEventListener("change", setup);
    reducedMotion.addEventListener("change", setup);
    setup();

    return () => {
      desktop.removeEventListener("change", setup);
      reducedMotion.removeEventListener("change", setup);
      clearAnimations();
    };
  }, []);

  return (
    <PageShell>
      <Section className="pb-10 pt-16 md:pt-24">
        <div className="mx-auto max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal" />
            Concept build
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.08] md:text-6xl">
            One property enquiry.
            <span className="block text-accent">A clearer next step.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Follow a sample message as it moves from inbox to an agent queue.
          </p>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-teal">
            Concept build. Sample data, not a client.
          </p>
        </div>
      </Section>

      <Section className="py-8 md:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                A sample lead journey
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl">From first message to handoff</h2>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Scroll to move the sample
            </p>
          </div>

          <div
            ref={stageRef}
            className={`concept-story-stage grid gap-4 md:block md:h-[min(68vh,660px)] md:min-h-[560px] ${
              staticFallback ? "concept-story-static" : ""
            }`}
          >
            <article className="concept-stage-scene rounded-2xl border border-border bg-surface p-5 md:absolute md:inset-0 md:p-8">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Inbox · New enquiry
                </span>
                <span className="rounded-full border border-teal/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-teal">
                  Arrived
                </span>
              </div>
              <div className="grid gap-8 pt-7 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-12 md:pt-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    Enquiry arrives
                  </p>
                  <h3 className="mt-3 text-2xl">A message, ready to be understood.</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    A new property question arrives in the shared inbox.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-ink p-4 md:p-6">
                  <div className="flex items-center gap-3 border-b border-border pb-4">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-teal/10 font-display text-sm text-teal">
                      S
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">Sample contact</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        WhatsApp · New message
                      </p>
                    </div>
                  </div>
                  <p className="story-message mt-5 max-w-md rounded-xl rounded-tl-sm border border-teal/20 bg-teal/5 px-4 py-3 text-sm leading-relaxed text-foreground">
                    Hi, I’m looking for a home near North Quay. Could you share a few options in my
                    range?
                  </p>
                  <p className="mt-4 text-right font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Sample message
                  </p>
                </div>
              </div>
            </article>

            <article className="concept-stage-scene rounded-2xl border border-border bg-surface p-5 md:absolute md:inset-0 md:p-8">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Lead record · Sample
                </span>
                <span className="rounded-full border border-accent/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                  Captured
                </span>
              </div>
              <div className="grid gap-8 pt-7 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-12 md:pt-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    Details captured
                  </p>
                  <h3 className="mt-3 text-2xl">The useful details take shape.</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    A short conversation becomes a tidy lead record for the next person.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-ink p-4 md:p-6">
                  {[
                    ["Name", "Sample lead"],
                    ["Area", "North Quay"],
                    ["Budget band", "$420k – $520k"],
                    ["Timeline", "This season"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="story-capture-field flex items-center justify-between gap-4 border-b border-border py-4 last:border-b-0"
                    >
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        {label}
                      </span>
                      <span className="text-right text-sm text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="concept-stage-scene rounded-2xl border border-border bg-surface p-5 md:absolute md:inset-0 md:p-8">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Qualification · Sample
                </span>
                <span className="rounded-full border border-teal/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-teal">
                  Scored
                </span>
              </div>
              <div className="grid gap-8 pt-7 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-12 md:pt-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    Intent score
                  </p>
                  <h3 className="mt-3 text-2xl">A clear signal, not a mystery.</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    The sample matches the requested area, budget band and timeline.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-ink p-5 md:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      Purchase intent
                    </span>
                    <span className="rounded-full bg-teal/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-teal">
                      Hot
                    </span>
                  </div>
                  <div
                    className="mt-6 h-2 overflow-hidden rounded-full bg-white/10"
                    role="img"
                    aria-label="High intent signal"
                  >
                    <div className="story-score-fill h-full w-[82%] origin-left rounded-full bg-gradient-to-r from-accent to-teal" />
                  </div>
                  <div className="mt-4 flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span>Low intent</span>
                    <span>High intent</span>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2 font-mono text-[9px] uppercase tracking-wider">
                    <span className="rounded-full bg-teal/10 px-2.5 py-1 text-teal">Hot · selected</span>
                    <span className="rounded-full border border-border px-2.5 py-1 text-muted-foreground">
                      Warm
                    </span>
                    <span className="rounded-full border border-border px-2.5 py-1 text-muted-foreground">
                      Spam
                    </span>
                  </div>
                </div>
              </div>
            </article>

            <article className="concept-stage-scene rounded-2xl border border-border bg-surface p-5 md:absolute md:inset-0 md:p-8">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Routing · Sample
                </span>
                <span className="rounded-full border border-accent/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                  Routed
                </span>
              </div>
              <div className="grid gap-8 pt-7 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-12 md:pt-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    Matching the next step
                  </p>
                  <h3 className="mt-3 text-2xl">The right destination gets the details.</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    Area, budget band and intent guide the sample handoff.
                  </p>
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_36px_minmax(0,1fr)] items-center gap-2 rounded-2xl border border-border bg-ink p-3 sm:gap-4 sm:p-5">
                  <div className="rounded-xl border border-accent/30 bg-accent/5 p-3">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                      Enquiry
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-foreground">North Quay · Hot</p>
                  </div>
                  <svg
                    aria-hidden="true"
                    className="h-12 w-full overflow-visible text-teal"
                    viewBox="0 0 40 48"
                    preserveAspectRatio="none"
                  >
                    <path
                      className="story-route-line"
                      d="M 0 24 H 40"
                      fill="none"
                      pathLength="100"
                      stroke="currentColor"
                      strokeDasharray="100"
                      strokeDashoffset="100"
                      strokeWidth="2"
                    />
                  </svg>
                  <div className="space-y-2">
                    <div className="rounded-lg border border-border px-2.5 py-2 font-mono text-[9px] uppercase tracking-wide text-muted-foreground">
                      General inbox
                    </div>
                    <div className="rounded-lg border border-teal/40 bg-teal/5 px-2.5 py-2 font-mono text-[9px] uppercase tracking-wide text-teal">
                      Property specialist
                    </div>
                    <div className="rounded-lg border border-border px-2.5 py-2 font-mono text-[9px] uppercase tracking-wide text-muted-foreground">
                      Follow-up queue
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article className="concept-stage-scene rounded-2xl border border-border bg-surface p-5 md:absolute md:inset-0 md:p-8">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Agent queue · Sample
                </span>
                <span className="rounded-full border border-teal/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-teal">
                  Handed off
                </span>
              </div>
              <div className="grid gap-8 pt-7 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-12 md:pt-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    Ready for an agent
                  </p>
                  <h3 className="mt-3 text-2xl">A person picks up with context.</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    The lead arrives with its details and a simple, useful next step.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-ink p-4 md:p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Assigned to · Property specialist
                  </div>
                  <div className="story-agent-card mt-5 rounded-xl border border-teal/25 bg-teal/5 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">Sample lead</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          North Quay · $420k – $520k · Hot
                        </p>
                      </div>
                      <span className="rounded-full bg-teal/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-teal">
                        New
                      </span>
                    </div>
                    <div className="mt-4 border-t border-border pt-4">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
                        Next step
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground">
                        Ask about preferred viewing times.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </Section>

      <Section className="pt-8 md:pt-12">
        <div className="mx-auto max-w-5xl border-t border-border pt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Concept build. Sample data, not a client.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
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
        </div>
      </Section>
    </PageShell>
  );
}
