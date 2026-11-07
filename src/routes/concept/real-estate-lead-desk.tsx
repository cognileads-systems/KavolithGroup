import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { PageShell, Section } from "@/components/site/layout";
import { SITE_URL } from "@/lib/seo";
import "./real-estate-lead-desk.css";

const SCENE_COPY = [
  {
    heading: "It starts with the enquiry.",
    summary: "A new property question arrives in the shared inbox.",
  },
  {
    heading: "Capture the useful details.",
    summary: "A short conversation becomes a tidy lead record for the next person.",
  },
  {
    heading: "Bring intent signals into view.",
    summary: "The sample matches the requested area, budget band and timeline.",
  },
  {
    heading: "Route the enquiry to a next step.",
    summary: "Area, budget band and intent guide the sample handoff.",
  },
  {
    heading: "Give the agent useful context.",
    summary: "The lead arrives with its details and a simple, useful next step.",
  },
] as const;

const FAQ_ITEMS = [
  {
    question: "Is the enquiry real?",
    answer: "No. The enquiry and its details are fictional and shown as sample data for this demo.",
  },
  {
    question: "Does this flow describe every delivered project?",
    answer:
      "No. The project cards describe work delivered; they do not claim every project used this enquiry flow.",
  },
] as const;

const DELIVERED_WORK = [
  {
    title: "TLEGAL · Advocate portal",
    package: "Scale",
    built: "Hand-coded site",
    automation: "One-step automation: webhook to Airtable",
  },
  {
    title: "RO business",
    package: "Premium / Total Control",
    built: "Website",
    automation: "Automation Control tier",
  },
  {
    title: "Real estate firm",
    package: "Total Control + Launchpad",
    built: "Two sites",
    automation: "Ops Stack on both",
  },
  {
    title: "Dental clinic",
    package: "Ops Stack",
    built: "WordPress site, about 15 pages",
    automation: "Ops Stack",
  },
  {
    title: "Gym",
    package: "Launchpad",
    built: "Website",
  },
] as const;

export const Route = createFileRoute("/concept/real-estate-lead-desk")({
  component: RealEstateLeadDeskPage,
  head: () => ({
    meta: [
      { title: "Real Estate Lead Desk — Concept Build | Kavolith Group" },
      {
        name: "description",
        content: "From first message to a clear next step",
      },
      { name: "robots", content: "noindex" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${SITE_URL}/concept/real-estate-lead-desk#webpage`,
              url: `${SITE_URL}/concept/real-estate-lead-desk`,
              name: "From first message to a clear next step",
              description: "From first message to a clear next step",
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/concept/real-estate-lead-desk#faq`,
              mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: { "@type": "Answer", text: answer },
              })),
            },
          ],
        }),
      },
    ],
  }),
});

function RealEstateLeadDeskPage() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const desktop = window.matchMedia("(min-width: 768px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let revertContext: (() => void) | null = null;
    let killTrigger: (() => void) | null = null;
    let observer: IntersectionObserver | null = null;
    let workObserver: IntersectionObserver | null = null;
    let generation = 0;

    const clearAnimations = () => {
      generation += 1;
      observer?.disconnect();
      observer = null;
      workObserver?.disconnect();
      workObserver = null;
      document.querySelectorAll(".lead-work-card").forEach((card) => {
        card.classList.remove("lead-work-enhanced", "is-visible");
      });
      killTrigger?.();
      killTrigger = null;
      revertContext?.();
      revertContext = null;
      stage.classList.remove("lead-story-enhanced", "lead-mobile-enhanced", "lead-work-enhanced");
      stage
        .querySelectorAll<SVGElement>(
          "[data-ribbon-track], [data-ribbon-trail], [data-route-branch]",
        )
        .forEach((path) => {
          path.style.removeProperty("stroke-dasharray");
          path.style.removeProperty("stroke-dashoffset");
        });
    };

    const setup = () => {
      clearAnimations();
      const currentGeneration = generation;
      if (reducedMotion.matches) return;

      const workCards = Array.from(document.querySelectorAll<HTMLElement>(".lead-work-card"));
      if ("IntersectionObserver" in window && workCards.length > 0) {
        workCards.forEach((card) => card.classList.add("lead-work-enhanced"));
        workObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-visible");
              workObserver?.unobserve(entry.target);
            });
          },
          { threshold: 0.12 },
        );
        workCards.forEach((card) => {
          const bounds = card.getBoundingClientRect();
          if (bounds.bottom <= 0 || (bounds.top < window.innerHeight && bounds.bottom > 0)) {
            card.classList.add("is-visible");
          } else {
            workObserver?.observe(card);
          }
        });
      }

      if (!desktop.matches) {
        if (!("IntersectionObserver" in window)) return;

        stage.classList.add("lead-mobile-enhanced");
        const panels = Array.from(stage.querySelectorAll<HTMLElement>(".lead-card-panel"));
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            });
          },
          { threshold: 0.18 },
        );
        panels.forEach((panel) => {
          const bounds = panel.getBoundingClientRect();
          if (bounds.bottom <= 0 || (bounds.top < window.innerHeight && bounds.bottom > 0)) {
            panel.classList.add("is-visible");
          } else {
            observer?.observe(panel);
          }
        });
        return;
      }

      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
        .then(([gsapModule, scrollTriggerModule]) => {
          if (currentGeneration !== generation) return;

          const { gsap } = gsapModule;
          const { ScrollTrigger } = scrollTriggerModule;
          gsap.registerPlugin(ScrollTrigger);

          const ribbon = stage.querySelector<SVGSVGElement>(".lead-ribbon-svg");
          const track = stage.querySelector<SVGPathElement>("[data-ribbon-track]");
          const trail = stage.querySelector<SVGPathElement>("[data-ribbon-trail]");
          const card = stage.querySelector<HTMLElement>("[data-lead-card]");
          const glow = stage.querySelector<HTMLElement>("[data-active-glow]");
          const headlines = Array.from(
            stage.querySelectorAll<HTMLElement>("[data-scene-headline]"),
          );
          const panels = Array.from(stage.querySelectorAll<HTMLElement>(".lead-card-panel"));
          const fields = Array.from(stage.querySelectorAll<HTMLElement>(".lead-capture-field"));
          const routePaths = Array.from(
            stage.querySelectorAll<SVGPathElement>("[data-route-branch]"),
          );
          const scoreRing = stage.querySelector<SVGCircleElement>("[data-score-ring]");

          if (!ribbon || !track || !trail || !card || panels.length !== SCENE_COPY.length) {
            console.error("The concept lead story is missing required animation elements.");
            return;
          }

          const pathLength = track.getTotalLength();
          const routeLength = 100;
          track.style.strokeDasharray = `${pathLength}`;
          track.style.strokeDashoffset = `${pathLength}`;
          trail.style.strokeDasharray = `${pathLength * 0.16} ${pathLength}`;
          trail.style.strokeDashoffset = `${pathLength}`;
          routePaths.forEach((path) => {
            path.style.strokeDasharray = `${routeLength}`;
            path.style.strokeDashoffset = `${routeLength}`;
          });
          stage.classList.add("lead-story-enhanced");

          const motion = { progress: 0 };
          const context = gsap.context(() => {
            gsap.set(panels, { autoAlpha: 0, scale: 0.97, y: 8 });
            gsap.set(panels[0], { autoAlpha: 1, scale: 1, y: 0 });
            gsap.set(headlines, { autoAlpha: 0, y: 8 });
            gsap.set(headlines[0], { autoAlpha: 1, y: 0 });
            gsap.set(fields, { autoAlpha: 0, x: -14 });
            if (scoreRing) gsap.set(scoreRing, { strokeDashoffset: 100 });

            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: stage,
                pin: true,
                start: "top top+=80",
                end: () => `+=${window.innerHeight * 4.5}`,
                scrub: 0.8,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            });
            const trigger = timeline.scrollTrigger;
            if (trigger) killTrigger = () => trigger.kill();

            const updateHero = () => {
              const stageBounds = stage.getBoundingClientRect();
              const ribbonBounds = ribbon.getBoundingClientRect();
              const viewBox = ribbon.viewBox.baseVal;
              const point = track.getPointAtLength(pathLength * motion.progress);
              const x =
                ribbonBounds.left -
                stageBounds.left +
                (point.x / viewBox.width) * ribbonBounds.width;
              const y =
                ribbonBounds.top -
                stageBounds.top +
                (point.y / viewBox.height) * ribbonBounds.height;
              const tilt = motion.progress * Math.PI * 2;

              gsap.set(card, {
                x: x - card.offsetWidth / 2,
                y: y - card.offsetHeight / 2,
                scale: Math.min(1, Math.max(0.68, stage.clientHeight / 700)),
                rotationX: Math.sin(tilt) * 4,
                rotationY: Math.cos(tilt) * 4,
              });

              const offset = pathLength * (1 - motion.progress);
              track.style.strokeDashoffset = `${offset}`;
              trail.style.strokeDashoffset = `${offset + pathLength * 0.16}`;

              if (glow) {
                const heading = headlines[Math.min(4, Math.round(motion.progress * 4))];
                const headingBounds = heading.getBoundingClientRect();
                gsap.set(glow, {
                  x:
                    headingBounds.left -
                    stageBounds.left +
                    headingBounds.width / 2 -
                    glow.offsetWidth / 2,
                  y:
                    headingBounds.top -
                    stageBounds.top +
                    headingBounds.height / 2 -
                    glow.offsetHeight / 2,
                });
              }
            };

            timeline.eventCallback("onUpdate", () => {
              const activeIndex = Math.min(SCENE_COPY.length - 1, Math.round(motion.progress * 4));
              headlines.forEach((scene, index) => {
                scene.classList.toggle("is-active", index === activeIndex);
              });
              updateHero();
            });

            const sceneDuration = 1;
            for (let index = 0; index < panels.length - 1; index += 1) {
              const transitionAt = (index + 1) * sceneDuration - 0.18;
              timeline.to(
                panels[index],
                { autoAlpha: 0, scale: 0.97, y: -8, duration: 0.18 },
                transitionAt,
              );
              timeline.to(
                panels[index + 1],
                { autoAlpha: 1, scale: 1, y: 0, duration: 0.24, ease: "power2.out" },
                transitionAt + 0.08,
              );
            }

            for (let index = 0; index < 4; index += 1) {
              timeline.to(
                motion,
                {
                  progress: (index + 1) / 4,
                  duration: sceneDuration,
                  ease: "power3.out",
                  onUpdate: updateHero,
                },
                index * sceneDuration,
              );
              timeline.to(
                headlines[index],
                { autoAlpha: 0, y: -5, duration: 0.2, ease: "power2.out" },
                (index + 1) * sceneDuration - 0.14,
              );
              timeline.to(
                headlines[index + 1],
                { autoAlpha: 1, y: 0, duration: 0.24, ease: "power2.out" },
                (index + 1) * sceneDuration,
              );
            }

            timeline.to(
              fields,
              { autoAlpha: 1, x: 0, duration: 0.22, stagger: 0.12, ease: "power2.out" },
              1.05,
            );
            if (scoreRing) {
              timeline.to(
                scoreRing,
                { strokeDashoffset: 22, duration: 0.72, ease: "power2.out" },
                2.12,
              );
            }
            routePaths.forEach((path, index) => {
              timeline.to(
                path,
                {
                  strokeDashoffset: 0,
                  duration: 0.42,
                  ease: "power2.out",
                },
                3.08 + index * 0.1,
              );
            });
            timeline.to("[data-lattice-backdrop]", { y: -36, duration: 4, ease: "power2.out" }, 0);

            updateHero();
          }, stage);

          revertContext = () => context.revert();
          ScrollTrigger.refresh();
        })
        .catch((error: unknown) => {
          if (currentGeneration !== generation) return;
          console.error("Unable to load the concept story animation.", error);
          stage.classList.remove("lead-story-enhanced");
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
      <Section className="pb-8 pt-16 md:pt-24">
        <div className="mx-auto max-w-5xl">
          <h1 className="max-w-3xl text-4xl leading-[1.08] md:text-6xl">
            From first message to a clear next step
          </h1>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-teal">
            Sample data
          </p>
        </div>
      </Section>

      <Section className="py-8 md:py-12">
        <div ref={stageRef} className="lead-story-stage mx-auto max-w-5xl" data-story-stage>
          <div className="lead-lattice-backdrop" data-lattice-backdrop aria-hidden="true" />
          <div className="lead-active-glow" data-active-glow aria-hidden="true" />

          <div className="lead-stage-headlines hidden md:flex" aria-hidden="true">
            {SCENE_COPY.map(({ heading, summary }, index) => (
              <div
                key={heading}
                className={`lead-headline-scene${index === 0 ? " is-active" : ""}`}
                data-scene-headline
                data-scene-index={index}
              >
                <h2>{heading}</h2>
                <p>{summary}</p>
              </div>
            ))}
          </div>

          <svg
            className="lead-ribbon-svg"
            viewBox="0 0 1000 560"
            role="img"
            aria-label="From first message to a clear next step"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="lead-ribbon-gradient" x1="0" x2="1">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#5eead4" />
              </linearGradient>
              <filter id="lead-ribbon-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              className="lead-ribbon-track"
              data-ribbon-track
              d="M 260 280 C 350 280 340 190 425 190 S 510 280 520 280 S 595 370 675 370 S 740 280 750 280"
              fill="none"
              stroke="url(#lead-ribbon-gradient)"
              strokeLinecap="round"
              strokeWidth="3"
            />
            <path
              className="lead-ribbon-trail"
              data-ribbon-trail
              d="M 260 280 C 350 280 340 190 425 190 S 510 280 520 280 S 595 370 675 370 S 740 280 750 280"
              fill="none"
              stroke="#5eead4"
              strokeLinecap="round"
              strokeWidth="4"
              filter="url(#lead-ribbon-glow)"
            />
            <g className="lead-route-branches" aria-hidden="true">
              <path data-route-branch d="M 610 360 C 680 360 685 325 760 325" pathLength="100" />
              <path data-route-branch d="M 610 360 C 680 360 685 360 760 360" pathLength="100" />
              <path data-route-branch d="M 610 360 C 680 360 685 395 760 395" pathLength="100" />
            </g>
            {[
              [260, 280],
              [425, 190],
              [520, 280],
              [675, 370],
              [750, 280],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} className="lead-ribbon-node" cx={cx} cy={cy} r="9" />
            ))}
          </svg>

          <div className="lead-moving-card" data-lead-card>
            <article className="lead-card-panel" data-card-panel="message">
              <h2>It starts with the enquiry.</h2>
              <p className="lead-card-sample-label">Sample data</p>
              <blockquote>
                Hi, I&apos;m looking for a 2-bedroom apartment near Moonstone Quarter. Could you
                share a few options in my range?
              </blockquote>
            </article>

            <article className="lead-card-panel" data-card-panel="capture">
              <h2>Capture the useful details.</h2>
              <dl className="lead-capture-fields">
                {[
                  ["Name", "Sample lead"],
                  ["Area", "Moonstone Quarter (fictional)"],
                  ["Budget band", "AED 1.6M–2.0M"],
                  ["Timeline", "This season"],
                ].map(([label, value]) => (
                  <div key={label} className="lead-capture-field">
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </article>

            <article className="lead-card-panel" data-card-panel="score">
              <h2>Bring intent signals into view.</h2>
              <div className="lead-score-wrap">
                <svg className="lead-score-ring" viewBox="0 0 120 120" aria-hidden="true">
                  <circle className="lead-score-ring-track" cx="60" cy="60" r="48" />
                  <circle
                    className="lead-score-ring-fill"
                    data-score-ring
                    cx="60"
                    cy="60"
                    r="48"
                    pathLength="100"
                  />
                </svg>
                <p className="lead-score-value">78 / 100</p>
              </div>
              <p className="lead-score-note">Sample data, illustrative only</p>
            </article>

            <article className="lead-card-panel" data-card-panel="route">
              <h2>Route the enquiry to a next step.</h2>
              <ul className="lead-destinations">
                {["General inbox", "Property specialist", "Follow-up queue"].map((destination) => (
                  <li key={destination}>{destination}</li>
                ))}
              </ul>
            </article>

            <article className="lead-card-panel" data-card-panel="handoff">
              <h2>Give the agent useful context.</h2>
              <p className="lead-handoff">Ask about preferred viewing times.</p>
            </article>
          </div>
        </div>
      </Section>

      <Section className="py-10 md:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl">Delivered work</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {DELIVERED_WORK.map((project) => (
              <article
                key={project.title}
                className="lead-work-card overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <figure className="border-b border-border bg-panel">
                  <svg
                    className="lead-work-placeholder"
                    viewBox="0 0 640 280"
                    role="img"
                    aria-label="Neutral SVG placeholder — project screenshot not supplied."
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="638"
                      height="278"
                      rx="18"
                      fill="#14121c"
                      stroke="rgba(250,250,248,.09)"
                      strokeWidth="2"
                    />
                    <path
                      d="M 40 74 H 600 M 40 110 H 440 M 40 210 H 600"
                      stroke="rgba(250,250,248,.08)"
                      strokeWidth="2"
                    />
                    <rect
                      x="40"
                      y="138"
                      width="172"
                      height="48"
                      rx="8"
                      fill="rgba(167,139,250,.12)"
                      stroke="#a78bfa"
                    />
                    <rect
                      x="232"
                      y="138"
                      width="128"
                      height="48"
                      rx="8"
                      fill="rgba(94,234,212,.08)"
                      stroke="#5eead4"
                    />
                    <circle cx="570" cy="162" r="14" fill="#5eead4" />
                  </svg>
                  <figcaption className="px-5 pb-4 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    Neutral SVG placeholder — project screenshot not supplied.
                  </figcaption>
                </figure>
                <div className="p-5 md:p-6">
                  <h3 className="font-display text-xl">{project.title}</h3>
                  <dl className="mt-5 space-y-4 text-sm">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                        Package:
                      </dt>
                      <dd className="mt-1 text-foreground">{project.package}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                        What was built:
                      </dt>
                      <dd className="mt-1 text-foreground">{project.built}</dd>
                    </div>
                    {"automation" in project && (
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                          Automation:
                        </dt>
                        <dd className="mt-1 text-foreground">{project.automation}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl">Questions about this concept</h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {FAQ_ITEMS.map(({ question, answer }) => (
              <article key={question} className="py-5">
                <h3 className="text-lg">{question}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
