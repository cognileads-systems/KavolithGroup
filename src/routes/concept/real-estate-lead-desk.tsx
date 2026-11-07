import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { BOOKING_URL } from "@/components/site/how-we-work";
import { CARE_WHATSAPP_URL } from "@/components/site/solution-page";
import { PageShell, Section } from "@/components/site/layout";
import { Translate, useLanguage, useT } from "@/i18n";
import { SITE_URL } from "@/lib/seo";
import "./real-estate-lead-desk.css";

const SCENE_COPY = [
  {
    id: "arrive",
    heading: "Arrive",
    problem: "Enquiries come from WhatsApp, portals and your site, at any hour.",
    solution: "Every one lands in one place the moment it arrives.",
  },
  {
    id: "capture",
    heading: "Capture",
    problem: "Details end up scattered across chats.",
    solution: "Budget, area, property type and timeline are captured into one record.",
  },
  {
    id: "score",
    heading: "Score",
    problem: "Hot and cold leads look the same.",
    solution: "Each enquiry gets an intent score, so the right lead is called first.",
  },
  {
    id: "qualify",
    heading: "Qualify and assign",
    problem: "Leads wait for someone to sort them.",
    solution:
      "The lead is qualified and assigned by category: site visit, office meeting or villa selection.",
  },
  {
    id: "respond",
    heading: "Respond",
    problem: "Replies are late or inconsistent.",
    solution:
      "An automated message goes out by email and WhatsApp, and your team is alerted on Telegram.",
  },
  {
    id: "book",
    heading: "Book",
    problem: "Booking a visit takes many messages.",
    solution:
      "The buyer chooses a site visit, office meeting or villa viewing on a booking page, and the slot is set.",
  },
  {
    id: "handoff",
    heading: "Handoff",
    problem: "The right person finds out too late.",
    solution: "The concerned team receives the lead with the details and the booking attached.",
  },
  {
    id: "value",
    heading: "What could this be worth to you?",
    problem: "",
    solution: "",
  },
  {
    id: "always-on",
    heading: "Always on",
    problem: "",
    solution: "",
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
  {
    question: "Are the value figures real?",
    answer:
      "They are calculated only from the numbers you enter. They are not a promise of results.",
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
            {
              "@type": "Service",
              "@id": `${SITE_URL}/concept/real-estate-lead-desk#service`,
              name: "From first message to a clear next step",
              provider: {
                "@type": "Organization",
                name: "Kavolith Group",
              },
            },
          ],
        }),
      },
    ],
  }),
});

function RealEstateLeadDeskPage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();

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
      stage.classList.remove("lead-story-enhanced", "lead-mobile-enhanced");
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
          { threshold: 0.12 },
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

          if (
            !ribbon ||
            !track ||
            !trail ||
            !card ||
            panels.length !== SCENE_COPY.length ||
            headlines.length !== SCENE_COPY.length
          ) {
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
                end: () => `+=${window.innerHeight * (SCENE_COPY.length - 0.5)}`,
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
                const heading =
                  headlines[
                    Math.min(
                      SCENE_COPY.length - 1,
                      Math.round(motion.progress * (SCENE_COPY.length - 1)),
                    )
                  ];
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
              const activeIndex = Math.min(
                SCENE_COPY.length - 1,
                Math.round(motion.progress * (SCENE_COPY.length - 1)),
              );
              headlines.forEach((scene, index) => {
                scene.classList.toggle("is-active", index === activeIndex);
              });
              updateHero();
            });

            for (let index = 0; index < panels.length - 1; index += 1) {
              const transitionAt = index + 1 - 0.18;
              timeline.to(
                panels[index],
                { autoAlpha: 0, scale: 0.97, y: -8, duration: 0.18, ease: "power2.out" },
                transitionAt,
              );
              timeline.to(
                panels[index + 1],
                { autoAlpha: 1, scale: 1, y: 0, duration: 0.24, ease: "power2.out" },
                transitionAt + 0.08,
              );
              timeline.to(
                motion,
                {
                  progress: (index + 1) / (SCENE_COPY.length - 1),
                  duration: 1,
                  ease: "power3.out",
                  onUpdate: updateHero,
                },
                index,
              );
              timeline.to(
                headlines[index],
                { autoAlpha: 0, y: -5, duration: 0.2, ease: "power2.out" },
                index + 1 - 0.14,
              );
              timeline.to(
                headlines[index + 1],
                { autoAlpha: 1, y: 0, duration: 0.24, ease: "power2.out" },
                index + 1,
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
            timeline.to("[data-lattice-backdrop]", { y: -36, duration: 8, ease: "power2.out" }, 0);

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
  }, [lang]);

  return (
    <PageShell>
      <Translate>
        <Section className="pb-8 pt-16 md:pt-24">
          <div className="mx-auto max-w-5xl">
            <h1 className="max-w-3xl text-4xl leading-[1.08] md:text-6xl">
              From first message to a clear next step
            </h1>
            <p className="mt-6 font-mono text-[11px] tracking-[0.14em] text-teal">Sample data</p>
          </div>
        </Section>
      </Translate>

      <Section className="py-8 md:py-12">
        <LeadStoryStage stageRef={stageRef}>
          <Translate>
            <div className="lead-lattice-backdrop" data-lattice-backdrop aria-hidden="true" />
            <div className="lead-active-glow" data-active-glow aria-hidden="true" />

            <div className="lead-stage-headlines hidden md:grid" aria-hidden="true">
              {SCENE_COPY.map((scene, index) => (
                <div
                  key={scene.id}
                  className={`lead-headline-scene${index === 0 ? " is-active" : ""}`}
                  data-scene-headline
                  data-scene-index={index}
                >
                  <h2>{scene.heading}</h2>
                  {scene.problem && <p className="lead-problem">{scene.problem}</p>}
                  {scene.solution && <p className="lead-solution">{scene.solution}</p>}
                </div>
              ))}
            </div>

            <svg
              className="lead-ribbon-svg"
              viewBox="0 0 1000 560"
              role="img"
              aria-label="Enquiry journey ribbon"
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
                d="M 300 280 C 330 280 320 190 350 190 S 390 280 410 280 S 440 370 460 370 S 490 280 515 280 S 545 190 570 190 S 600 280 620 280 S 650 370 675 370 S 700 280 720 280"
                fill="none"
                stroke="url(#lead-ribbon-gradient)"
                strokeLinecap="round"
                strokeWidth="3"
              />
              <path
                className="lead-ribbon-trail"
                data-ribbon-trail
                d="M 300 280 C 330 280 320 190 350 190 S 390 280 410 280 S 440 370 460 370 S 490 280 515 280 S 545 190 570 190 S 600 280 620 280 S 650 370 675 370 S 700 280 720 280"
                fill="none"
                stroke="#5eead4"
                strokeLinecap="round"
                strokeWidth="4"
                filter="url(#lead-ribbon-glow)"
              />
              <g className="lead-route-branches" aria-hidden="true">
                <path data-route-branch d="M 460 370 C 505 370 520 325 565 325" pathLength="100" />
                <path data-route-branch d="M 460 370 C 505 370 520 370 565 370" pathLength="100" />
                <path data-route-branch d="M 460 370 C 505 370 520 415 565 415" pathLength="100" />
              </g>
              {[
                [300, 280],
                [350, 190],
                [410, 280],
                [460, 370],
                [515, 280],
                [570, 190],
                [620, 280],
                [675, 370],
                [720, 280],
              ].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} className="lead-ribbon-node" cx={cx} cy={cy} r="8" />
              ))}
            </svg>

            <div className="lead-moving-card" data-lead-card>
              {SCENE_COPY.map((scene) => (
                <article key={scene.id} className="lead-card-panel" data-card-panel={scene.id}>
                  <header className="lead-panel-copy">
                    <h2>{scene.heading}</h2>
                    {scene.problem && <p className="lead-problem">{scene.problem}</p>}
                    {scene.solution && <p className="lead-solution">{scene.solution}</p>}
                  </header>

                  {scene.id === "arrive" && (
                    <div className="lead-demo-message">
                      <p className="lead-card-sample-label">Sample data</p>
                      <blockquote>
                        Hi, I&apos;m looking for a 2-bedroom apartment near Moonstone Quarter. Could
                        you share a few options in my range?
                      </blockquote>
                    </div>
                  )}

                  {scene.id === "capture" && (
                    <div>
                      <p className="lead-card-sample-label">Sample data</p>
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
                    </div>
                  )}

                  {scene.id === "score" && (
                    <div className="lead-score-panel">
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
                    </div>
                  )}

                  {scene.id === "qualify" && (
                    <ul className="lead-category-list">
                      {["Site visits", "Office meetings", "Villa selection"].map((category) => (
                        <li key={category}>{category}</li>
                      ))}
                    </ul>
                  )}

                  {scene.id === "respond" && (
                    <div className="lead-response-previews">
                      {["Email preview", "WhatsApp message", "Telegram alert"].map((channel) => (
                        <div key={channel} className="lead-response-preview">
                          <span>{channel}</span>
                          <span className="lead-card-sample-label">Sample data</span>
                        </div>
                      ))}
                      <p className="lead-whatsapp-footnote">
                        WhatsApp messages need a WhatsApp Business setup.
                      </p>
                    </div>
                  )}

                  {scene.id === "book" && (
                    <div className="lead-booking-preview">
                      <p className="lead-card-sample-label">Sample data</p>
                      <p className="lead-booking-date">A fictional weekday in spring</p>
                    </div>
                  )}

                  {scene.id === "handoff" && (
                    <ul className="lead-team-lanes">
                      {["Site visits", "Office meetings", "Villa selection"].map((lane) => (
                        <li key={lane}>{lane}</li>
                      ))}
                    </ul>
                  )}

                  {scene.id === "value" && <ValueCalculator />}

                  {scene.id === "always-on" && (
                    <ul className="lead-always-on">
                      {[
                        "Runs around the clock.",
                        "Less manual sorting for your team.",
                        "A CRM record builds itself from every enquiry.",
                      ].map((statement) => (
                        <li key={statement}>{statement}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </Translate>
        </LeadStoryStage>
      </Section>

      <Translate>
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

        <Section className="pb-16 pt-8 md:pb-24">
          <div className="mx-auto flex max-w-5xl flex-wrap gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Book a consultation
            </a>
            <a
              href={CARE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent"
            >
              Message us on WhatsApp
            </a>
          </div>
        </Section>
      </Translate>
    </PageShell>
  );
}

function LeadStoryStage({
  stageRef,
  children,
}: {
  stageRef: { current: HTMLDivElement | null };
  children: ReactNode;
}) {
  return (
    <div ref={stageRef} className="lead-story-stage mx-auto max-w-5xl" data-story-stage>
      {children}
    </div>
  );
}

function ValueCalculator() {
  const t = useT();
  const [values, setValues] = useState({
    enquiries: "",
    lateOrMissed: "",
    dealValue: "",
    conversion: "",
  });
  const [currency, setCurrency] = useState("AED");

  const parseValue = (value: string) => {
    if (value.trim() === "") return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
  };
  const enquiries = parseValue(values.enquiries);
  const lateOrMissed = parseValue(values.lateOrMissed);
  const dealValue = parseValue(values.dealValue);
  const conversion = parseValue(values.conversion);
  const isValid =
    enquiries !== null &&
    lateOrMissed !== null &&
    lateOrMissed <= 100 &&
    dealValue !== null &&
    conversion !== null &&
    conversion <= 100;
  const recoveredValue = isValid
    ? enquiries * (lateOrMissed / 100) * dealValue * (conversion / 100)
    : null;

  const updateValue = (key: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="lead-calculator">
      <div className="lead-calculator-grid">
        <label>
          <span>{t("Enquiries per month")}</span>
          <input
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            placeholder={t("Example: monthly total")}
            value={values.enquiries}
            onChange={(event) => updateValue("enquiries", event.currentTarget.value)}
          />
        </label>
        <label>
          <span>{t("Share answered late or missed (%)")}</span>
          <input
            type="number"
            min="0"
            max="100"
            step="any"
            inputMode="decimal"
            placeholder={t("Example: late share")}
            value={values.lateOrMissed}
            onChange={(event) => updateValue("lateOrMissed", event.currentTarget.value)}
          />
        </label>
        <label>
          <span>{t("Average deal value")}</span>
          <input
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            placeholder={t("Example: deal value")}
            value={values.dealValue}
            onChange={(event) => updateValue("dealValue", event.currentTarget.value)}
          />
        </label>
        <label>
          <span>{t("Share of recovered enquiries that would convert (%)")}</span>
          <input
            type="number"
            min="0"
            max="100"
            step="any"
            inputMode="decimal"
            placeholder={t("Example: recovery share")}
            value={values.conversion}
            onChange={(event) => updateValue("conversion", event.currentTarget.value)}
          />
        </label>
        <label className="lead-currency-label">
          <span>{t("Currency label")}</span>
          <select
            aria-label={t("Currency label")}
            value={currency}
            onChange={(event) => setCurrency(event.currentTarget.value)}
          >
            <option value="AED">AED</option>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>
        </label>
      </div>
      <output className="lead-calculator-result" aria-live="polite">
        {recoveredValue === null
          ? ""
          : `${t("Illustrative recovered value per month:")} ${currency} ${new Intl.NumberFormat(
              undefined,
              { maximumFractionDigits: 2 },
            ).format(recoveredValue)}`}
      </output>
      <p className="lead-calculator-caveat">
        {t("Based only on the numbers you entered. Not a prediction or a guarantee.")}
      </p>
    </div>
  );
}
