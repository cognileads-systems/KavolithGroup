import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { property: "og:url", content: "https://cognileadssystems.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://cognileadssystems.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Kavolith",
          url: "https://cognileadssystems.lovable.app",
          description:
            "Autonomous AI SDR infrastructure that qualifies, enriches, and matches inbound prospects within 120 seconds.",
          sameAs: [
            "https://www.linkedin.com/company/vectrasyn-group",
            "https://www.facebook.com/vectrasyn",
            "https://www.instagram.com/vectrasyn",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Autonomous AI SDR Infrastructure",
          provider: {
            "@type": "Organization",
            name: "Kavolith",
            url: "https://cognileadssystems.lovable.app",
          },
          serviceType: "AI-powered Digital Employee Workflows & Automation Infrastructure",
          areaServed: "Global",
          description:
            "Engineered AI SDR workflows: 24/7 inbound qualification, enrichment, and routing in under 120 seconds.",
        }),
      },
    ],
  }),
});


const LINKEDIN_URL = "https://www.linkedin.com/company/vectrasyn-group";
const FACEBOOK_URL = "https://www.facebook.com/vectrasyn";
const INSTAGRAM_URL = "https://www.instagram.com/vectrasyn";

type ChatMsg = { role: "system" | "ai" | "user"; content: string };

const AUDIT_SCRIPT = [
  "Booting Kavolith System Auditor v1.0 // Enterprise AI Diagnostic ...",
  "[OK] Neural qualification kernel online.",
  "AI // Question 01 // What is your average monthly inbound lead volume?",
  "AI // Question 02 // What is your current lead response latency (in minutes)?",
  "AI // Question 03 // Which CRM and sales automation stack does your team run?",
  "AI // Question 04 // What is your primary bottleneck: Lead Qualification, AEO Search Visibility, or Manual Follow-Ups?",
  "AI // Question 05 // Ready to deploy an autonomous multi-agent pipeline? [Y/N]",
];

function Index() {
  return (
    <div className="min-h-screen text-foreground font-mono">
      <NavBar />
      <main className="mx-auto max-w-[1400px] px-6 pb-24">
        <Hero />
        <AuditTerminal />
        <ArchitectureTabs />
        <PlaybookRepository />
        <ContactBlock />
        <TemplateMatrix />
        <FAQBlock />
        <Footer />
      </main>
    </div>
  );
}

function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur bg-[#090D16]/80">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-cyan animate-pulse-cyan" />
          <span className="text-sm tracking-widest text-foreground">
            <span className="text-cyan text-glow">Kavolith</span>
            <span className="text-muted-foreground"> // OS</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            node.status: <span className="text-cyan">online</span>
          </span>
          <Link
            to="/cognileads-os"
            className="inline-flex items-center gap-2 border border-cyan/40 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-cyan/90 transition-colors hover:bg-cyan/10"
          >
            CogniLeads OS
          </Link>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 border border-cyan/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan transition-all hover:bg-cyan hover:text-primary-foreground glow-cyan"
          >
            <span className="h-1.5 w-1.5 bg-cyan group-hover:bg-primary-foreground" />
            Validate // LinkedIn Matrix
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Kavolith on Instagram"
            className="group inline-flex items-center gap-2 border border-cyan/40 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-cyan/90 transition-all hover:bg-cyan hover:text-primary-foreground"
          >
            <span className="h-1.5 w-1.5 bg-cyan group-hover:bg-primary-foreground" />
            IG
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Kavolith on Facebook"
            className="group inline-flex items-center gap-2 border border-cyan/40 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-cyan/90 transition-all hover:bg-cyan hover:text-primary-foreground"
          >
            <span className="h-1.5 w-1.5 bg-cyan group-hover:bg-primary-foreground" />
            FB
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 lg:py-20 border-b border-border/60">
      <div>
        <div className="mb-6 inline-flex items-center gap-2 border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="h-1.5 w-1.5 bg-violet animate-pulse-cyan" />
          System Log // Live SDR Infrastructure
        </div>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
          Stop Losing 60% of Your Inbound Leads to{" "}
          <span className="text-gradient-intelligence">Slow Follow-Ups.</span>
        </h1>
        <p className="mt-6 max-w-xl text-sm md:text-base text-muted-foreground leading-relaxed">
          <span className="text-foreground">Kavolith</span> engineers autonomous inbound lead
          infrastructure that qualifies, enriches, and routes enterprise prospects into your
          central CRM within <span className="text-cyan">120 seconds</span>. 24/7/365.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="border-gradient-intelligence inline-flex items-center gap-2 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-all hover:shadow-[0_0_28px_-6px_oklch(0.72_0.19_305/0.65)]"
          >
            &gt; Join Corporate Waitlist
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-border px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground hover:border-violet/60 transition-all"
          >
            Deploy Contact Payload
          </a>
        </div>
        <dl className="mt-12 grid grid-cols-3 gap-4 text-xs">
          {[
            { k: "response.avg", v: "< 120s" },
            { k: "uptime.sla", v: "99.98%" },
            { k: "pipelines", v: "Always-On" },
          ].map((s) => (
            <div key={s.k} className="border border-border p-4 bg-panel/60">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.k}
              </div>
              <div className="mt-2 font-mono text-cyan text-lg">{s.v}</div>
            </div>
          ))}
        </dl>
      </div>

      <NeuralConstellation />
    </section>
  );
}

const NODES = [
  { id: 0, x: 84, y: 128 },
  { id: 1, x: 168, y: 62 },
  { id: 2, x: 172, y: 200 },
  { id: 3, x: 268, y: 108 },
  { id: 4, x: 266, y: 246 },
  { id: 5, x: 366, y: 58 },
  { id: 6, x: 372, y: 176 },
  { id: 7, x: 464, y: 122 },
  { id: 8, x: 458, y: 252 },
  { id: 9, x: 552, y: 180 },
] as const;

const EDGES: Array<[number, number]> = [
  [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [3, 6],
  [4, 6], [4, 8], [5, 7], [6, 7], [6, 8], [7, 9], [8, 9],
];

function NeuralConstellation() {
  return (
    <div className="relative border border-border bg-panel/60 p-3">
      <div className="flex items-center justify-between border-b border-border pb-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-violet" />
          <span className="h-2 w-2 rounded-full bg-violet/50" />
          <span className="h-2 w-2 rounded-full bg-cyan" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          neural.graph // intelligence.mesh
        </span>
      </div>

      <div className="relative aspect-video w-full overflow-hidden border border-border bg-[#05080F]">
        <style>{`
          @keyframes synapse-fire {
            0%, 100% { stroke-opacity: 0.12; }
            45%      { stroke-opacity: 0.9; }
          }
          @keyframes synapse-travel {
            0%   { stroke-dashoffset: 220; opacity: 0; }
            10%  { opacity: 1; }
            85%  { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 0; }
          }
          @keyframes node-breathe {
            0%, 100% { r: 4; opacity: 0.55; }
            50%      { r: 6.5; opacity: 1; }
          }
          @keyframes halo-breathe {
            0%, 100% { opacity: 0.05; transform: scale(0.9); }
            50%      { opacity: 0.35; transform: scale(1.25); }
          }
          .nc-edge { animation: synapse-fire 4.2s ease-in-out infinite; }
          .nc-spark {
            stroke-dasharray: 26 220;
            animation: synapse-travel 4.2s linear infinite;
          }
          .nc-node { animation: node-breathe 3.6s ease-in-out infinite; transform-box: fill-box; }
          .nc-halo { animation: halo-breathe 3.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          @media (prefers-reduced-motion: reduce) {
            .nc-edge, .nc-spark, .nc-node, .nc-halo { animation: none; }
          }
        `}</style>

        <svg
          viewBox="0 0 640 320"
          className="h-full w-full"
          role="img"
          aria-label="Animated neural network graph representing the Kavolith intelligence mesh"
        >
          <defs>
            <linearGradient id="nc-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.72 0.19 305)" />
              <stop offset="100%" stopColor="oklch(0.88 0.19 200)" />
            </linearGradient>
            <radialGradient id="nc-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.72 0.19 305)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="oklch(0.88 0.19 200)" stopOpacity="0" />
            </radialGradient>
            <filter id="nc-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          <ellipse cx="320" cy="160" rx="250" ry="140" fill="url(#nc-glow)" opacity="0.35" />

          {EDGES.map(([a, b], i) => {
            const from = NODES[a];
            const to = NODES[b];
            const delay = `${(i % 7) * 0.55}s`;
            return (
              <g key={`e-${i}`}>
                <line
                  className="nc-edge"
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="url(#nc-grad)"
                  strokeWidth="1.2"
                  style={{ animationDelay: delay }}
                />
                <line
                  className="nc-spark"
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="url(#nc-grad)"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  filter="url(#nc-blur)"
                  style={{ animationDelay: delay }}
                />
              </g>
            );
          })}

          {NODES.map((n, i) => (
            <g key={n.id}>
              <circle
                className="nc-halo"
                cx={n.x}
                cy={n.y}
                r="14"
                fill="url(#nc-grad)"
                style={{ animationDelay: `${(i % 5) * 0.7}s` }}
              />
              <circle
                className="nc-node"
                cx={n.x}
                cy={n.y}
                r="4"
                fill="url(#nc-grad)"
                style={{ animationDelay: `${(i % 5) * 0.7}s` }}
              />
            </g>
          ))}
        </svg>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent" />
        <div className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.25em] text-violet">
          &gt; intelligence.mesh // 10 nodes // 14 synapses
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <div>infer.rate 60hz</div>
        <div>node.count 42</div>
        <div>latency 12ms</div>
        <div className="text-cyan">mesh: LIVE</div>
      </div>
    </div>
  );
}

function AuditTerminal() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step >= AUDIT_SCRIPT.length) return;
    const t = setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: step < 2 ? "system" : "ai",
          content: AUDIT_SCRIPT[step],
        },
      ]);
      setStep((s) => s + 1);
    }, step === 0 ? 400 : 1100);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", content: input.trim() },
      { role: "ai", content: "// Response captured. Cross-referencing ICP + intent matrix ..." },
    ]);
    setInput("");
  }

  return (
    <section id="audit" className="py-12 lg:py-20 border-b border-border/60">
      <SectionHeader index="03" title="Live Qualification Interface" caption="agent.terminal" />
      <div className="mt-8 border border-border bg-panel/70">
        <div className="flex items-center justify-between border-b border-border px-4 py-2 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-cyan" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Kavolith System Auditor <span className="text-cyan">v1.0</span> // Enterprise AI Diagnostic
            </span>
          </div>
          <SessionId />
        </div>

        <div className="relative h-[420px] overflow-y-auto p-5 space-y-3 font-mono text-sm">
          {messages.map((m, i) => (
            <div key={i} className="flex gap-3">
              <span
                className={
                  "shrink-0 text-[10px] uppercase tracking-[0.2em] pt-1 " +
                  (m.role === "user"
                    ? "text-yellow-400"
                    : m.role === "ai"
                    ? "text-cyan"
                    : "text-muted-foreground")
                }
              >
                {m.role === "user" ? "usr //" : m.role === "ai" ? "ai  //" : "sys //"}
              </span>
              <p
                className={
                  "leading-relaxed " +
                  (m.role === "system" ? "text-muted-foreground" : "text-foreground")
                }
              >
                {m.content}
              </p>
            </div>
          ))}
          {step < AUDIT_SCRIPT.length && (
            <div className="flex items-center gap-2 text-cyan text-xs">
              <span className="h-2 w-2 bg-cyan animate-blink" /> processing...
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={submit} className="border-t border-border p-3 flex items-center gap-3 bg-black/40">
          <span className="text-cyan text-sm">&gt;</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type response to auditor..."
            aria-label="Response to Kavolith system auditor"
            className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground/60"
          />

          <button
            type="submit"
            className="inline-flex items-center gap-2 border border-cyan px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-cyan glow-cyan animate-pulse-cyan hover:bg-cyan hover:text-primary-foreground transition-all"
          >
            <span className="h-1.5 w-1.5 bg-cyan" /> Initialize Audit
          </button>
        </form>
      </div>
    </section>
  );
}

function ArchitectureTabs() {
  const tabs = [
    {
      key: "n8n",
      label: "n8n Production Node Pipeline",
      caption: "workflow.json // 42 nodes",
    },
    {
      key: "make",
      label: "Make.com Complex Scenario Architecture",
      caption: "scenario.map // 17 modules",
    },
    {
      key: "fastapi",
      label: "Python FastAPI Endpoint Backend Data Payload",
      caption: "POST /api/v1/lead/enrich",
    },
  ];
  const [active, setActive] = useState(tabs[0].key);
  const current = tabs.find((t) => t.key === active)!;

  return (
    <section className="py-12 lg:py-20 border-b border-border/60">
      <SectionHeader index="04" title="Proof Matrix // Technical Architecture" caption="live.embed.slots" />
      <div className="mt-8 border border-border bg-panel/60">
        <div className="flex flex-wrap items-center border-b border-border">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={
                "px-4 py-3 text-[11px] uppercase tracking-[0.2em] border-r border-border transition-all " +
                (active === t.key
                  ? "text-cyan bg-cyan/5 border-b-2 border-b-cyan"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {t.label}
            </button>
          ))}
          <div className="ml-auto px-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hidden md:block">
            {current.caption}
          </div>
        </div>

        {active === "n8n" ? (
          <PipelineDiagram />
        ) : (
          <div className="relative aspect-[16/8] bg-black/50 overflow-hidden">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(0,240,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,240,255,0.08) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
              <div className="h-10 w-10 border border-cyan/60 flex items-center justify-center text-cyan animate-pulse-cyan">
                [ ]
              </div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                Awaiting embed // {current.label}
              </div>
              <div className="text-[10px] text-muted-foreground/60 max-w-md">
                Container reserved. Drop workflow canvas, scenario map, or endpoint payload here.
              </div>
            </div>
          </div>
        )}


        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-border text-[10px] uppercase tracking-[0.2em]">
          {[
            ["build", "verified"],
            ["deploy", "prod"],
            ["region", "us-east-1"],
            ["revision", "0.4.2"],
          ].map(([k, v]) => (
            <div key={k} className="px-4 py-3 border-r border-border last:border-r-0">
              <span className="text-muted-foreground">{k} </span>
              <span className="text-cyan">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type PipelineNode = {
  id: string;
  label: string;
  caption: string;
  metrics: { k: string; v: string }[];
};

const PIPELINE_NODES: PipelineNode[] = [
  {
    id: "input",
    label: "input.payload",
    caption: "source: web",
    metrics: [
      { k: "ingest.rate", v: "1.2k/hr" },
      { k: "schema", v: "v3.1" },
    ],
  },
  {
    id: "dedupe",
    label: "deduping_router",
    caption: "cross-reference",
    metrics: [
      { k: "dedupe.hit", v: "18%" },
      { k: "lookup", v: "< 40ms" },
    ],
  },
  {
    id: "enrich",
    label: "enrichment.api",
    caption: "apollo & clearbit",
    metrics: [
      { k: "latency", v: "< 500ms" },
      { k: "match.rate", v: "94%" },
    ],
  },
  {
    id: "icp",
    label: "icp_classifier.ai",
    caption: "gpt-4o engine",
    metrics: [
      { k: "model", v: "gpt-4o" },
      { k: "confidence", v: "0.91" },
    ],
  },
  {
    id: "score",
    label: "scoring.engine",
    caption: "tier allocation",
    metrics: [
      { k: "tiers", v: "A / B / C" },
      { k: "throughput", v: "800/min" },
    ],
  },
  {
    id: "outgest",
    label: "crm_outgest",
    caption: "slack & email dispatch",
    metrics: [
      { k: "channels", v: "slack + smtp" },
      { k: "success", v: "99.98%" },
    ],
  },
];

function PipelineDiagram() {
  return (
    <div className="relative bg-[#0A1120] overflow-hidden">
      <style>{`
        @keyframes pipeline-flow {
          0%   { left: 0%;   opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes pipeline-flow-vert {
          0%   { top: 0%;   opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .pipe-line-h {
          position: relative;
          height: 2px;
          background: linear-gradient(90deg, rgba(56,189,248,0.15), rgba(56,189,248,0.55), rgba(56,189,248,0.15));
          box-shadow: 0 0 8px rgba(56,189,248,0.35);
        }
        .pipe-pulse-h {
          position: absolute;
          top: 50%;
          width: 10px;
          height: 10px;
          margin-top: -5px;
          border-radius: 9999px;
          background: #38BDF8;
          box-shadow: 0 0 12px #38BDF8, 0 0 24px rgba(56,189,248,0.6);
          animation: pipeline-flow 2.8s linear infinite;
        }
        .pipe-line-v {
          position: relative;
          width: 2px;
          background: linear-gradient(180deg, rgba(56,189,248,0.15), rgba(56,189,248,0.55), rgba(56,189,248,0.15));
          box-shadow: 0 0 8px rgba(56,189,248,0.35);
        }
        .pipe-pulse-v {
          position: absolute;
          left: 50%;
          width: 10px;
          height: 10px;
          margin-left: -5px;
          border-radius: 9999px;
          background: #38BDF8;
          box-shadow: 0 0 12px #38BDF8, 0 0 24px rgba(56,189,248,0.6);
          animation: pipeline-flow-vert 2.2s linear infinite;
        }
      `}</style>

      {/* grid backdrop */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(56,189,248,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* corner ticks */}
      <div className="absolute left-2 top-2 text-[10px] uppercase tracking-[0.25em] text-[#38BDF8]/80">
        &gt; pipeline.render // live
      </div>
      <div className="absolute right-2 top-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#10B981]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
        status: healthy
      </div>

      <div className="relative px-4 py-10 md:px-8 md:py-14">
        {/* Desktop / tablet: horizontal flow */}
        <div className="hidden md:flex items-stretch gap-0">
          {PIPELINE_NODES.map((n, i) => (
            <div key={n.id} className="flex items-center flex-1 min-w-0 last:flex-none">
              <PipelineCard node={n} index={i} />
              {i < PIPELINE_NODES.length - 1 && (
                <div className="flex-1 min-w-[24px] px-1">
                  <div className="pipe-line-h">
                    <span
                      className="pipe-pulse-h"
                      style={{ animationDelay: `${i * 0.45}s` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical flow */}
        <div className="flex md:hidden flex-col items-stretch">
          {PIPELINE_NODES.map((n, i) => (
            <div key={n.id} className="flex flex-col items-stretch">
              <PipelineCard node={n} index={i} />
              {i < PIPELINE_NODES.length - 1 && (
                <div className="self-center h-10 py-1">
                  <div className="pipe-line-v h-full">
                    <span
                      className="pipe-pulse-v"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PipelineCard({ node, index }: { node: PipelineNode; index: number }) {
  return (
    <div className="group relative flex-none w-full md:w-[168px] lg:w-[180px]">
      <div
        className="
          relative border border-[#38BDF8]/25 bg-[#0F1A2E]/80 backdrop-blur-sm
          px-3 py-3 transition-all duration-200
          hover:border-[#38BDF8] hover:bg-[#132340]
          hover:shadow-[0_0_24px_rgba(56,189,248,0.35)]
          hover:-translate-y-0.5 cursor-default
          before:content-[''] before:absolute before:-top-px before:-left-px before:w-2 before:h-2 before:border-t before:border-l before:border-[#38BDF8]
          after:content-[''] after:absolute after:-bottom-px after:-right-px after:w-2 after:h-2 after:border-b after:border-r after:border-[#38BDF8]
        "
      >
        <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-[#38BDF8]/70">
          <span>node.{String(index).padStart(2, "0")}</span>
          <span className="flex items-center gap-1 text-[#10B981]">
            <span className="h-1 w-1 rounded-full bg-[#10B981] animate-pulse" />
            ok
          </span>
        </div>
        <div className="mt-2 text-[13px] leading-tight text-foreground font-mono break-all">
          [{node.label}]
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground break-all">
          // {node.caption}
        </div>

        {/* hover micro-metrics dropdown */}
        <div
          className="
            pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 z-20
            w-[220px] max-w-[80vw]
            opacity-0 translate-y-1 transition-all duration-200
            group-hover:opacity-100 group-hover:translate-y-0
          "
        >
          <div className="border border-[#38BDF8]/60 bg-[#0A1120]/95 backdrop-blur px-3 py-2 shadow-[0_0_20px_rgba(56,189,248,0.35)]">
            <div className="text-[9px] uppercase tracking-[0.25em] text-[#38BDF8] mb-1">
              micro.metrics
            </div>
            {node.metrics.map((m) => (
              <div
                key={m.k}
                className="flex items-center justify-between gap-3 text-[10px] font-mono"
              >
                <span className="text-muted-foreground">{m.k}</span>
                <span className="text-[#10B981]">{m.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



function ContactBlock() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [preview, setPreview] = useState<string>("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const operatorName = String(fd.get("name") || "").trim();
    const operatorEmail = String(fd.get("email") || "").trim();
    const operatorOrg = String(fd.get("company") || "").trim();
    const payloadMessage = String(fd.get("message") || "").trim();

    const nextErrors: typeof errors = {};
    if (!operatorName) nextErrors.name = "operator.name required";
    if (!operatorEmail) nextErrors.email = "operator.email required";
    else if (!EMAIL_RE.test(operatorEmail)) nextErrors.email = "invalid email format";
    if (!payloadMessage) nextErrors.message = "payload.message required";

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setState("idle");
      return;
    }
    setErrors({});

    const payload = {
      "name": operatorName,
      "email": operatorEmail,
      "company": operatorOrg,
      "message": payloadMessage,
      "source": "kavolith.com//web",
    };


    setPreview(JSON.stringify(payload, null, 2));
    setState("sending");

    const form = e.currentTarget;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: operatorName,
          email: operatorEmail,
          company: operatorOrg,
          message: payloadMessage,
        }),
      });
      const json = await response.json();
      if (response.ok && json?.ok === true) {
        form.reset();
        setState("ok");
      } else {
        setState("err");
      }
    } catch (err) {
      console.warn("[vectrasyn] dispatch failed", err);
      setState("err");
    }
  }


  return (
    <section id="contact" className="py-12 lg:py-20 border-b border-border/60">
      <SectionHeader index="05" title="Dual-Router Lead Capture Hook" caption="POST /api/contact" />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={onSubmit} noValidate className="border border-border bg-panel/70 p-6 space-y-4">
          <Field label="operator.name" name="name" placeholder="Jane Doe" required error={errors.name} />
          <Field label="operator.email" name="email" type="email" required placeholder="jane@company.com" error={errors.email} />
          <Field label="operator.org" name="company" placeholder="Acme Inc." />
          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
              payload.message
            </label>
            <textarea
              name="message"
              rows={5}
              aria-invalid={!!errors.message}
              className="w-full bg-black/40 border border-border px-3 py-2 text-sm outline-none focus:border-cyan focus:ring-1 focus:ring-cyan aria-[invalid=true]:border-destructive"
              placeholder="Describe your inbound funnel..."
            />
            {errors.message && (
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-destructive">// {errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={state === "sending"}
            aria-busy={state === "sending"}
            className="w-full inline-flex items-center justify-center gap-2 border border-cyan px-5 py-3 text-xs uppercase tracking-[0.25em] text-cyan glow-cyan hover:bg-cyan hover:text-primary-foreground transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-cyan"
          >
            {state === "sending"
              ? "> Routing Data..."
              : state === "err"
              ? "// [ERR] retry transmission"
              : "> Execute Payload"}
          </button>
          {state === "ok" && (
            <div className="border border-cyan/60 bg-cyan/5 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-cyan glow-cyan">
              <span className="animate-blink mr-2">▮</span>
              [SUCCESS] Payload routed to pipeline successfully.
            </div>
          )}
          {state === "err" && (
            <div className="border border-destructive/60 bg-destructive/10 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-destructive">
              [ERR] Transmission failed. Verify webhook endpoint.
            </div>
          )}
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            router.1 email.alert // router.2 make.webhook
          </p>

        </form>

        <div className="border border-border bg-black/60 p-6 overflow-hidden">
          <div className="flex items-center justify-between border-b border-border pb-2 mb-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              outbound.payload.json
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-cyan">
              {state === "ok" ? "200 OK" : state === "sending" ? "PENDING" : state === "err" ? "500 ERR" : "AWAITING"}
            </span>
          </div>
          <pre className="text-xs text-cyan/90 whitespace-pre-wrap min-h-[240px]">
{preview ||
`{
  "Lead Name": "...",
  "Email": "...",
  "Company": "...",
  "Message": "...",
  "Category": "",
  "Status": "New",
  "Intent Signal": "",
  "Priority Action": "",
  "Source": "kavolith.com//web"
}`}
          </pre>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        aria-invalid={!!error}
        className="w-full bg-black/40 border border-border px-3 py-2 text-sm outline-none focus:border-cyan focus:ring-1 focus:ring-cyan aria-[invalid=true]:border-destructive"
      />
      {error && (
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-destructive">// {error}</p>
      )}
    </div>
  );
}

function SectionHeader({ index, title, caption }: { index: string; title: string; caption: string }) {
  return (
    <div className="flex items-end justify-between border-b border-border/60 pb-3">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-violet text-xs tracking-[0.3em]">{index}</span>
        <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{caption}</span>
    </div>
  );
}

const CURRENCIES = ["INR", "USD", "EUR", "GBP"] as const;
type Currency = (typeof CURRENCIES)[number];

type TierPrice = {
  regular?: string;
  price: string;
  note: string;
  value: string;
};

const TIERS = [
  {
    id: "vectra-launchpad",
    name: "Kavolith Launchpad",
    subBrand: "Kavolith Express",
    tagline: "The Viral Reputation & Local Growth Engine",
    outcome:
      "Get a production-ready site with automated lead capture live in under 2 weeks.",
    featured: false,
    badge: null as string | null,
    note: null as string | null,
    prices: {
      INR: { regular: "₹28,000", price: "₹23,000", note: "One-Time Setup", value: "23000" },
      USD: { price: "$799", note: "One-Time Setup", value: "799" },
      EUR: { price: "€749", note: "One-Time Setup", value: "749" },
      GBP: { price: "£649", note: "One-Time Setup", value: "649" },
    } as Record<Currency, TierPrice>,
    features: [
      "Sub-300ms React/Tailwind Web Portal (Dark/Light mode)",
      "Domain, SSL & Cloud Hosting Included",
      "Smart AI Interactive Intake Form",
      "WhatsApp Catalogue & UPI Instant Payment Integration",
      "AEO & GEO LocalBusiness JSON-LD Schema",
      "Google Maps Optimization & Automated Google Sheets Funnel",
      "GA4 Analytics Setup + 3 Free Annual Updates",
    ],
    cta: "> deploy --tier=launchpad",
  },
  {
    id: "vectra-scale",
    name: "Kavolith Scale",
    subBrand: "Kavolith Express",
    tagline: "Automated Growth & Operations Engine",
    outcome:
      "A full automation stack — booking, WhatsApp/CRM sync, and a live lead dashboard — plus ongoing care.",
    featured: true,
    badge: null as string | null,
    note:
      "100% of the amount actually paid for Launchpad (₹23,000 during the current offer) credited toward this upgrade, as a loyalty credit.",
    prices: {
      INR: { price: "₹58,000", note: "One-Time + ₹10,000/mo Care Plan", value: "58000" },
      USD: { price: "$2,499", note: "One-Time + $349/mo Care Plan", value: "2499" },
      EUR: { price: "€2,299", note: "One-Time + €329/mo Care Plan", value: "2299" },
      GBP: { price: "£1,999", note: "One-Time + £289/mo Care Plan", value: "1999" },
    } as Record<Currency, TierPrice>,
    features: [
      "Everything in Launchpad + Multi-Page Architecture",
      "Automated Online Appointment & Calendar Booking",
      "WhatsApp AI Auto-Responder (Drip FAQs & Pricing)",
      "Single-Screen Lead Pipeline Dashboard (New ➔ Closed)",
      "GBP Top-3 Map-Pack Dominance Strategy",
      "Google Workspace Domain Email Setup",
    ],
    cta: "> deploy --tier=scale",
  },
  {
    id: "vectra-premium",
    name: "Kavolith Premium / Total Control",
    subBrand: "Kavolith Express",
    tagline: "Full-Scale AEO/GEO Automation & Global Operations Command",
    outcome:
      "Multi-language, multi-currency, voice-AI automation — enterprise-grade capability at accessible pricing.",
    featured: false,
    badge: "Founding Client Rate — Limited Cohort",
    note: null as string | null,
    prices: {
      INR: {
        regular: "₹1,95,000",
        price: "₹90,000",
        note: "Founding Client Rate — One-Time + ₹15,000/mo",
        value: "90000",
      },
      USD: { regular: "$4,499", price: "$2,099", note: "One-Time + $419/mo", value: "2099" },
      EUR: { regular: "€4,199", price: "€1,949", note: "One-Time + €389/mo", value: "1949" },
      GBP: { regular: "£3,599", price: "£1,649", note: "One-Time + £339/mo", value: "1649" },
    } as Record<Currency, TierPrice>,
    features: [
      "Everything in Scale",
      "Advanced AEO & GEO optimization suite",
      "n8n automation workflows with integrated voice-chat AI agent",
      "Official Google Workspace account included (1 year, 1 seat)",
      "4 scheduled feature/content updates per year",
      "Minimum 4-page multi-language AI-translated website",
      "4-currency storefront support (INR/USD/EUR/GBP)",
      "Custom .com domain included",
      "Built on TanStack + Next.js with hardened bot/vulnerability security",
      "Premium customer care — dedicated human support team, no chatbots",
    ],
    cta: "> deploy --tier=premium",
  },
] as const;


function TemplateMatrix() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <section id="templates" className="py-12 lg:py-20 border-b border-border/60">
      <SectionHeader
        index="06"
        title="Enterprise Package Architecture"
        caption="GET /pricing/tiers"
      />
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <p className="max-w-2xl text-sm text-muted-foreground">
          // Three-tier deployment matrix. From viral local growth to full-scale
          AEO/GEO automation — pick the layer that matches your ops maturity.
        </p>
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="Select display currency"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            currency:
          </span>
          <div className="flex border border-violet/40">
            {CURRENCIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                aria-pressed={currency === c}
                className={[
                  "px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors focus:outline-none focus:ring-1 focus:ring-violet",
                  currency === c
                    ? "bg-violet text-[#0B0D10]"
                    : "text-violet/80 hover:bg-violet/10",
                ].join(" ")}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
        {TIERS.map((t, i) => {
          const featured = t.featured;
          const p = t.prices[currency];
          return (
            <article
              key={t.id}
              itemScope
              itemType="https://schema.org/Product"
              className={[
                "group relative flex flex-col rounded-none p-6 transition-all duration-300",
                featured
                  ? "border-gradient-intelligence shadow-[0_0_44px_-10px_oklch(0.72_0.19_305/0.55)] lg:-translate-y-2 lg:scale-[1.02]"
                  : "bg-[#0B0D10] border border-violet/40 hover:border-violet hover:-translate-y-0.5 hover:shadow-[0_0_24px_-4px_oklch(0.72_0.19_305/0.45)]",
              ].join(" ")}
            >
              <meta itemProp="sku" content={t.id} />
              <meta itemProp="category" content="Enterprise AI Package" />
              <div itemProp="brand" itemScope itemType="https://schema.org/Organization" className="hidden">
                <meta itemProp="name" content="Kavolith" />
              </div>
              <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="hidden">
                <meta itemProp="availability" content="https://schema.org/InStock" />
                <meta itemProp="priceCurrency" content={currency} />
                <meta itemProp="price" content={p.value} />
                <meta itemProp="seller" content="Kavolith" />
              </div>

              {featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet to-cyan px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#0B0D10]">
                  ★ Most Popular
                </div>
              )}

              <p className="mb-4 border-l-2 border-cyan/60 pl-3 text-[12px] leading-relaxed text-foreground/80">
                {t.outcome}
              </p>


              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span className="text-violet">0{i + 1}</span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet animate-pulse-cyan" />
                  {featured ? "featured" : "ready"}
                </span>
              </div>

              <div className="mt-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan/80">
                  {t.subBrand}
                </div>
                <h3
                  itemProp="name"
                  className="mt-1 font-display text-2xl font-semibold tracking-tight text-foreground"
                >
                  {t.name}
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground" itemProp="description">
                  {t.tagline}
                </p>
              </div>

              <div className="mt-5 border-y border-violet/25 py-4">
                {t.badge && (
                  <div className="mb-2 inline-block border border-violet/50 bg-violet/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-violet">
                    {t.badge}
                  </div>
                )}
                <div className="flex items-baseline gap-3">
                  {p.regular && (
                    <span className="font-mono text-lg text-muted-foreground line-through decoration-muted-foreground/70">
                      {p.regular}
                    </span>
                  )}
                  <span className="font-mono text-3xl font-semibold tracking-tight text-gradient-intelligence">
                    {p.price}
                  </span>
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {p.note}
                </div>
                {t.note && (
                  <div className="mt-3 border border-cyan/40 bg-cyan/5 px-2 py-1.5 text-[10px] leading-snug text-cyan/90">
                    {t.note}
                  </div>
                )}
              </div>

              <ul className="mt-5 flex-1 space-y-2 text-[12px] text-muted-foreground">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-[3px] text-violet">▸</span>
                    <span className="leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={scrollToContact}
                className={[
                  "mt-6 w-full rounded-md px-3 py-2.5 text-left font-mono text-[12px] transition-all focus:outline-none focus:ring-1 focus:ring-violet",
                  featured
                    ? "bg-gradient-to-r from-violet to-cyan text-[#0B0D10] hover:opacity-90"
                    : "border border-violet/50 bg-violet/5 text-violet hover:bg-violet/15",
                ].join(" ")}
                aria-label={`Request ${t.name} deployment`}
              >
                {t.cta}
                <span className="ml-1 animate-blink">_</span>
              </button>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border border-[#00F0FF]/40 bg-[#00F0FF]/5 p-5">
        <p className="max-w-2xl text-[12px] leading-relaxed text-muted-foreground">
          Looking for a proprietary AI Sales Platform instead of a
          website/automation package? →{" "}
          <span className="text-cyan">CogniLeads OS is now its own product.</span>{" "}
          <span className="ml-1 inline-flex items-center gap-1 border border-cyan/50 bg-cyan/10 px-2 py-[2px] align-middle text-[9px] uppercase tracking-[0.2em] text-cyan">
            <span className="h-1 w-1 bg-cyan" />
            A Kavolith Company
          </span>
        </p>
        <Link
          to="/cognileads-os"
          className="inline-flex items-center gap-2 border border-cyan/60 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-cyan transition-colors hover:bg-cyan hover:text-primary-foreground"
        >
          <span className="h-1.5 w-1.5 bg-cyan" />
          Explore CogniLeads OS
        </Link>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer className="pt-10 mt-6 flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
      <span>Engineer Intelligence into Business. © 2026 Kavolith. All rights reserved.</span>
      <span className="flex items-center gap-4">
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="Kavolith on LinkedIn" className="text-cyan/80 transition-colors hover:text-cyan">
          LinkedIn
        </a>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Kavolith on Instagram" className="text-cyan/80 transition-colors hover:text-cyan">
          Instagram
        </a>
        <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Kavolith on Facebook" className="text-cyan/80 transition-colors hover:text-cyan">
          Facebook
        </a>
        <span className="h-1.5 w-1.5 bg-cyan animate-pulse-cyan" /> all nodes operational
      </span>
    </footer>
  );
}

function SessionId() {
  const [id, setId] = useState<string>("--------");
  useEffect(() => {
    setId(Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, "0"));
  }, []);
  return (
    <span className="text-[10px] uppercase tracking-[0.2em] text-cyan">
      session.id: 0x{id}
    </span>
  );
}

const PLAYBOOKS = [
  {
    id: "sop-01-inbound-qualification",
    ref: "SOP.01",
    title: "Applied AI Intake Kernel",
    caption: "// intent-scoring ➔ semantic-enrichment ➔ real-time routing",
    body:
      "Deterministic LLM classification model layered over real-time lead feeds. Deduplicates, extracts firmographics, and routes leads to active pipelines in under 120 seconds.",
    kpis: [
      { k: "ttq", v: "< 120s" },
      { k: "accuracy", v: "96%" },
      { k: "manual.ops", v: "0" },
    ],
  },
  {
    id: "sop-02-icp-matching",
    ref: "SOP.02",
    title: "AEO & Intent-Classified ICP Engine",
    caption: "// firmographic-fit × intent-signals × timing",
    body:
      "Synthesizes search intent, technographics, and behavioral metadata into a real-time priority index. High-value enterprise prospects auto-bypass manual queues.",
    kpis: [
      { k: "precision", v: "0.94" },
      { k: "recall", v: "0.89" },
      { k: "pipeline.lanes", v: "04" },
    ],
  },
  {
    id: "sop-03-dual-router",
    ref: "SOP.03",
    title: "Fault-Tolerant Webhook Dispatch",
    caption: "// secure-proxy ➔ n8n/make-pipeline ➔ crm-sync",
    body:
      "Every verified submission fans out to encrypted webhook endpoints and operator alerts. Backed by automated exponential backoff and retry queues.",
    kpis: [
      { k: "active.routers", v: "02" },
      { k: "delivery", v: "99.9%" },
      { k: "retries", v: "3x" },
    ],
  },
  {
    id: "sop-04-ledger-sync",
    ref: "SOP.04",
    title: "Real-Time Multi-Currency Ledger Sync",
    caption: "// automated-airtable ➔ sheets ➔ crm-ledger",
    body:
      "Authoritative lead and transaction ledger written in real-time. Dynamically tracks lead conversions, client tiers, and regional currencies (INR/USD/EUR/GBP).",
    kpis: [
      { k: "currencies", v: "04" },
      { k: "schema", v: "flat" },
      { k: "audit", v: "human" },
    ],
  },
  {
    id: "sop-05-observability",
    ref: "SOP.05",
    title: "Hardened Endpoint Observability",
    caption: "// token-validation ➔ rate-limiting ➔ zero-spam",
    body:
      "Server-side proxy authentication blocks bot flooding, rate-limits public endpoints, and maintains 24/7 pipeline health monitoring.",
    kpis: [
      { k: "uptime", v: "99.95%" },
      { k: "spam", v: "zero" },
      { k: "alerts", v: "24/7" },
    ],
  },
] as const;

function PlaybookRepository() {
  return (
    <section id="playbooks" className="py-12 lg:py-20 border-b border-border/60">
      <SectionHeader
        index="04.5"
        title="Playbook & SOP Repository"
        caption="GET /playbooks/sop"
      />
      <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
        // Five procedural guides that operate the Kavolith infrastructure.
        Each SOP is version-controlled, agent-executable, and human-auditable.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PLAYBOOKS.map((p, i) => (
          <article
            key={p.id}
            className="group relative overflow-hidden border border-border/60 bg-[#0A1120] p-5 transition-all duration-300 hover:border-violet/60 hover:shadow-[0_0_24px_-8px_oklch(0.72_0.19_305/0.5)] hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <span className="text-cyan">{p.ref}</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet animate-pulse-cyan" />
                doc.{String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-foreground">
              {p.title}
            </h3>
            <div className="mt-1 font-mono text-[11px] text-cyan/80">{p.caption}</div>

            <p className="mt-4 text-[12px] leading-relaxed text-muted-foreground">
              {p.body}
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border/60 pt-3">
              {p.kpis.map((m) => (
                <div key={m.k}>
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                    {m.k}
                  </div>
                  <div className="mt-0.5 font-mono text-sm text-cyan">{m.v}</div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "What is autonomous AI SDR infrastructure?",
    a: "It's a stack of digital-employee workflows that qualify, enrich, and route inbound leads without a human SDR in the loop. Kavolith combines a neural qualification kernel, a Make.com orchestration layer, and a plain-text ledger so revenue teams get 24/7 inbound coverage with sub-120-second time-to-qualified.",
  },
  {
    q: "How fast does Kavolith qualify and route an inbound lead?",
    a: "Median time-to-qualified is under 120 seconds. The kernel deduplicates on email + company domain, enriches firmographics, scores fit and intent, then dispatches to the operator email router and the Make.com workflow router in parallel.",
  },
  {
    q: "Do you replace my CRM or sales team?",
    a: "No. Kavolith is infrastructure that sits in front of your CRM and sales team. It removes manual triage on inbound, and hands closers pre-qualified, pre-enriched, priority-ranked leads. Your CRM remains the system of record.",
  },
  {
    q: "How is lead data stored and audited?",
    a: "Authoritative lead data is written to a plain-text Google Sheets ledger with a flat, human-readable schema: Lead Name, Email, Company, Message, Category, Status, Intent Signal, Priority Action, Source. Every write is agent-attributable and human-auditable.",
  },
  {
    q: "What happens if a workflow fails mid-run?",
    a: "Every node emits a heartbeat and structured event. Failures are captured to a dead-letter queue with automated retries. The operator gets a terminal-style digest of any pipeline drift, so nothing silently disappears.",
  },
  {
    q: "Can Kavolith integrate with my existing stack?",
    a: "Yes. The Make.com router speaks to any HTTP-addressable system — CRMs, outreach sequencers, Slack, custom internal APIs. The MCP layer additionally exposes tools that AI agents (Claude, Cursor, custom) can call to submit or query leads directly.",
  },
] as const;

function FAQBlock() {
  return (
    <section id="faq" className="py-12 lg:py-20 border-b border-border/60">
      <SectionHeader index="07" title="FAQ // Operator Questions" caption="GET /faq" />
      <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
        // Common questions from revenue and RevOps operators evaluating
        autonomous SDR infrastructure.
      </p>

      <div className="mt-8 divide-y divide-border/60 border border-border/60 bg-[#0A1120]">
        {FAQS.map((f, i) => (
          <details
            key={f.q}
            className="group px-5 py-4 open:bg-cyan/[0.03] transition-colors"
          >
            <summary className="flex cursor-pointer items-start justify-between gap-4 list-none">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-cyan">
                  Q.{String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium tracking-tight text-foreground">
                  {f.q}
                </span>
              </div>
              <span className="text-cyan/80 text-lg leading-none transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 pl-[3.25rem] text-[13px] leading-relaxed text-muted-foreground">
              {f.a}
            </p>
          </details>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </section>
  );
}

