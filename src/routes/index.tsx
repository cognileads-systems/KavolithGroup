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
          name: "VectraSyn",
          url: "https://cognileadssystems.lovable.app",
          description:
            "Autonomous AI SDR infrastructure that qualifies, enriches, and matches inbound prospects within 120 seconds.",
          sameAs: [
            "https://www.linkedin.com/company/vectrasyn-group",
            "https://www.facebook.com/vectrasyngroup",
            "https://www.instagram.com/vectrasyngroup",
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
            name: "VectraSyn",
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
const FACEBOOK_URL = "https://www.facebook.com/vectrasyngroup";
const INSTAGRAM_URL = "https://www.instagram.com/vectrasyngroup";

type ChatMsg = { role: "system" | "ai" | "user"; content: string };

const AUDIT_SCRIPT = [
  "Booting VectraSyn System Auditor v1.0 ...",
  "[OK] Neural qualification kernel online.",
  "Question 01 // What is your current monthly inbound lead volume?",
  "Question 02 // Average response time to a new inbound lead (in minutes)?",
  "Question 03 // Which CRM / stack is your revenue team running today?",
  "Question 04 // Which qualification signals matter most: ICP fit, intent, or budget?",
  "Question 05 // Ready to deploy an autonomous SDR pipeline? [Y/N]",
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
            <span className="text-cyan text-glow">VectraSyn</span>
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
            aria-label="VectraSyn on Instagram"
            className="group inline-flex items-center gap-2 border border-cyan/40 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-cyan/90 transition-all hover:bg-cyan hover:text-primary-foreground"
          >
            <span className="h-1.5 w-1.5 bg-cyan group-hover:bg-primary-foreground" />
            IG
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="VectraSyn on Facebook"
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
        <div className="mb-6 inline-flex items-center gap-2 border border-border px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="h-1.5 w-1.5 bg-cyan animate-pulse-cyan" />
          System Log // Live SDR Infrastructure
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
          Stop Losing 60% of Your Inbound Leads to{" "}
          <span className="text-cyan text-glow">Slow Follow-Ups.</span>
        </h1>
        <p className="mt-6 max-w-xl text-sm md:text-base text-muted-foreground leading-relaxed">
          <span className="text-foreground">VectraSyn</span> engineers autonomous inbound lead
          infrastructure that qualifies, enriches, and routes enterprise prospects into your
          central CRM within <span className="text-cyan">120 seconds</span>. 24/7/365.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-cyan bg-cyan/10 px-5 py-3 text-xs uppercase tracking-[0.2em] text-cyan glow-cyan hover:bg-cyan hover:text-primary-foreground transition-all"
          >
            &gt; Join Corporate Waitlist
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-border px-5 py-3 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground hover:border-cyan/60 transition-all"
          >
            Deploy Contact Payload
          </a>
        </div>
        <dl className="mt-12 grid grid-cols-3 gap-4 text-xs">
          {[
            { k: "response.avg", v: "< 120s" },
            { k: "uptime.sla", v: "99.98%" },
            { k: "pipelines", v: "Autonomous" },
          ].map((s) => (
            <div key={s.k} className="border border-border p-4 bg-panel/60">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.k}
              </div>
              <div className="mt-2 text-cyan text-lg">{s.v}</div>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative border border-border bg-panel/60 p-3">
        <div className="flex items-center justify-between border-b border-border pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-destructive/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
            <span className="h-2 w-2 rounded-full bg-cyan" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            stream // pipeline.mp4
          </span>
        </div>
        <div className="relative aspect-video w-full overflow-hidden border border-border bg-black">
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(ellipse at 30% 40%, rgba(0,240,255,0.18), transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(0,240,255,0.10), transparent 55%), #05080F",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "repeating-linear-gradient(to bottom, transparent 0 2px, rgba(0,240,255,0.10) 2px 3px)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent" />
          <div className="absolute left-3 top-3 text-[10px] uppercase tracking-[0.25em] text-cyan text-glow">
            &gt; System Pipeline Demonstration Log // Booting...
          </div>
          <div className="absolute bottom-3 right-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-cyan">
            <span className="h-1.5 w-1.5 bg-cyan animate-blink" /> REC
          </div>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <div>frame.rate 60fps</div>
          <div>node.count 42</div>
          <div>latency 12ms</div>
          <div className="text-cyan">stream: LIVE</div>
        </div>
      </div>
    </section>
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
              VectraSyn System Auditor <span className="text-cyan">v1.0</span>
            </span>
          </div>
          <SessionId />
        </div>

        <div className="relative h-[420px] overflow-y-auto p-5 space-y-3 text-sm">
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
            aria-label="Response to VectraSyn system auditor"
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
      "source": "vectrasyn.systems//web",
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
  "Source": "vectrasyn.systems//web"
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
        <span className="text-cyan text-xs tracking-[0.3em]">{index}</span>
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{caption}</span>
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
    name: "Vectra Launchpad",
    subBrand: "VectraSyn Express",
    tagline: "The Viral Reputation & Local Growth Engine",
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
    name: "Vectra Scale",
    subBrand: "VectraSyn Express",
    tagline: "Automated Growth & Operations Engine",
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
    name: "Premium / Total Control",
    subBrand: "VectraSyn Express",
    tagline: "Full-Scale AEO/GEO Automation & Global Operations Command",
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
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            currency:
          </span>
          <div className="flex border border-[#00F0FF]/40">
            {CURRENCIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                aria-pressed={currency === c}
                className={[
                  "px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-colors focus:outline-none focus:ring-1 focus:ring-cyan",
                  currency === c
                    ? "bg-[#00F0FF] text-[#001014]"
                    : "text-cyan/80 hover:bg-cyan/10",
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
                "group relative flex flex-col rounded-none bg-[#0B0D10] p-6 transition-all duration-300",
                featured
                  ? "border-2 border-[#00F0FF] shadow-[0_0_40px_-8px_rgba(0,240,255,0.55)] lg:-translate-y-2 lg:scale-[1.02]"
                  : "border border-[#00F0FF]/60 hover:border-[#00F0FF] hover:-translate-y-0.5 hover:shadow-[0_0_24px_-4px_rgba(0,240,255,0.45)]",
              ].join(" ")}
            >
              <meta itemProp="sku" content={t.id} />
              <meta itemProp="category" content="Enterprise AI Package" />
              <div itemProp="brand" itemScope itemType="https://schema.org/Organization" className="hidden">
                <meta itemProp="name" content="VectraSyn" />
              </div>
              <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="hidden">
                <meta itemProp="availability" content="https://schema.org/InStock" />
                <meta itemProp="priceCurrency" content={currency} />
                <meta itemProp="price" content={p.value} />
                <meta itemProp="seller" content="VectraSyn" />
              </div>

              {featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 border border-[#00F0FF] bg-[#00F0FF] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#001014]">
                  ★ Most Popular
                </div>
              )}

              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span className="text-cyan">0{i + 1}</span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-cyan" />
                  {featured ? "featured" : "ready"}
                </span>
              </div>

              <div className="mt-4">
                <div className="text-[10px] uppercase tracking-[0.25em] text-cyan/80">
                  {t.subBrand}
                </div>
                <h3
                  itemProp="name"
                  className="mt-1 text-2xl font-semibold tracking-tight text-foreground"
                >
                  {t.name}
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground" itemProp="description">
                  {t.tagline}
                </p>
              </div>

              <div className="mt-5 border-y border-[#00F0FF]/25 py-4">
                {t.badge && (
                  <div className="mb-2 inline-block border border-[#00F0FF]/50 bg-[#00F0FF]/10 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-cyan">
                    {t.badge}
                  </div>
                )}
                <div className="flex items-baseline gap-3">
                  {p.regular && (
                    <span className="text-lg text-muted-foreground line-through decoration-muted-foreground/70">
                      {p.regular}
                    </span>
                  )}
                  <span className="text-3xl font-semibold tracking-tight text-cyan">
                    {p.price}
                  </span>
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {p.note}
                </div>
                {t.note && (
                  <div className="mt-3 border border-[#00F0FF]/40 bg-[#00F0FF]/5 px-2 py-1.5 text-[10px] leading-snug text-cyan/90">
                    {t.note}
                  </div>
                )}
              </div>

              <ul className="mt-5 flex-1 space-y-2 text-[12px] text-muted-foreground">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-[3px] text-cyan">▸</span>
                    <span className="leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={scrollToContact}
                className={[
                  "mt-6 w-full rounded-md px-3 py-2.5 text-left text-[12px] transition-colors focus:outline-none focus:ring-1 focus:ring-cyan",
                  featured
                    ? "border border-[#00F0FF] bg-[#00F0FF] text-[#001014] hover:bg-[#00F0FF]/90"
                    : "border border-cyan/50 bg-cyan/5 text-cyan hover:bg-cyan/15",
                ].join(" ")}
                aria-label={`Request ${t.name} deployment`}
              >
                {t.cta}
                <span className="ml-1 animate-pulse-cyan">_</span>
              </button>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border border-[#00F0FF]/40 bg-[#00F0FF]/5 p-5">
        <p className="max-w-2xl text-[12px] leading-relaxed text-muted-foreground">
          Looking for a proprietary AI Sales Platform instead of a
          website/automation package? →{" "}
          <span className="text-cyan">CogniLeads OS is now its own product.</span>
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
      <span>We sync work and forge systems. © 2026 VectraSyn. All rights reserved.</span>
      <span className="flex items-center gap-2">
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
    title: "Inbound Qualification Kernel",
    caption: "// qualify → enrich → route in <120s",
    body:
      "Deterministic scoring rubric layered over an LLM classifier. Deduplicates on email + company domain, enriches firmographics, then routes to the correct pipeline lane. Zero manual triage.",
    kpis: [
      { k: "ttq", v: "< 120s" },
      { k: "accuracy", v: "94%" },
      { k: "manual.ops", v: "0" },
    ],
  },
  {
    id: "sop-02-icp-matching",
    ref: "SOP.02",
    title: "ICP Matching Matrix",
    caption: "// intent × fit × timing",
    body:
      "Codified ICP as a scoring surface: firmographic fit, technographic signals, and behavioral intent are combined into a single priority index. High-fit leads jump the queue automatically.",
    kpis: [
      { k: "precision", v: "0.91" },
      { k: "recall", v: "0.87" },
      { k: "lanes", v: "04" },
    ],
  },
  {
    id: "sop-03-dual-router",
    ref: "SOP.03",
    title: "Dual-Router Dispatch",
    caption: "// email.alert + make.webhook",
    body:
      "Every qualified lead fans out to two independent routers: an operator email alert and a Make.com workflow that syncs to CRM, ledger, and outreach sequencer. Fail-open, retried on the queue.",
    kpis: [
      { k: "routers", v: "02" },
      { k: "delivery", v: "99.8%" },
      { k: "retries", v: "3x" },
    ],
  },
  {
    id: "sop-04-ledger-sync",
    ref: "SOP.04",
    title: "Ledger Sync Protocol",
    caption: "// plain-text Google Sheets ledger",
    body:
      "Authoritative lead ledger written in flat schema: Lead Name, Email, Company, Message, Category, Status, Intent Signal, Priority Action, Source. Human-auditable, agent-writable, no proprietary lock-in.",
    kpis: [
      { k: "columns", v: "09" },
      { k: "schema", v: "flat" },
      { k: "audit", v: "human" },
    ],
  },
  {
    id: "sop-05-observability",
    ref: "SOP.05",
    title: "Observability & Failover",
    caption: "// heartbeat + queue-based retries",
    body:
      "Every node emits a heartbeat and structured event. Failures are captured to a dead-letter queue with automated retry policies; operator gets a terminal-style digest of any pipeline drift.",
    kpis: [
      { k: "uptime", v: "99.95%" },
      { k: "dlq", v: "auto" },
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
        // Five procedural guides that operate the VectraSyn infrastructure.
        Each SOP is version-controlled, agent-executable, and human-auditable.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PLAYBOOKS.map((p, i) => (
          <article
            key={p.id}
            className="group relative overflow-hidden border border-border/60 bg-[#0A1120] p-5 transition-all duration-300 hover:border-cyan/60 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <span className="text-cyan">{p.ref}</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-cyan" />
                doc.{String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
              {p.title}
            </h3>
            <div className="mt-1 text-[11px] text-cyan/80">{p.caption}</div>
            <p className="mt-4 text-[12px] leading-relaxed text-muted-foreground">
              {p.body}
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border/60 pt-3">
              {p.kpis.map((m) => (
                <div key={m.k}>
                  <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                    {m.k}
                  </div>
                  <div className="mt-0.5 text-sm text-cyan">{m.v}</div>
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
    a: "It's a stack of digital-employee workflows that qualify, enrich, and route inbound leads without a human SDR in the loop. VectraSyn combines a neural qualification kernel, a Make.com orchestration layer, and a plain-text ledger so revenue teams get 24/7 inbound coverage with sub-120-second time-to-qualified.",
  },
  {
    q: "How fast does VectraSyn qualify and route an inbound lead?",
    a: "Median time-to-qualified is under 120 seconds. The kernel deduplicates on email + company domain, enriches firmographics, scores fit and intent, then dispatches to the operator email router and the Make.com workflow router in parallel.",
  },
  {
    q: "Do you replace my CRM or sales team?",
    a: "No. VectraSyn is infrastructure that sits in front of your CRM and sales team. It removes manual triage on inbound, and hands closers pre-qualified, pre-enriched, priority-ranked leads. Your CRM remains the system of record.",
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
    q: "Can VectraSyn integrate with my existing stack?",
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

