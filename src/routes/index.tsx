import { createFileRoute } from "@tanstack/react-router";
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
          name: "CogniLeads Systems",
          url: "https://cognileadssystems.lovable.app",
          description:
            "Autonomous AI SDR infrastructure that qualifies, enriches, and matches inbound prospects within 120 seconds.",
          sameAs: ["https://www.linkedin.com/in/cognileads"],
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
            name: "CogniLeads Systems",
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


const LINKEDIN_URL = "https://www.linkedin.com/in/cognileads";

type ChatMsg = { role: "system" | "ai" | "user"; content: string };

const AUDIT_SCRIPT = [
  "Booting CogniLeads System Auditor v1.0 ...",
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
        <ContactBlock />
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
            <span className="text-cyan text-glow">CogniLeads Systems</span>
            <span className="text-muted-foreground"> // OS</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            node.status: <span className="text-cyan">online</span>
          </span>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 border border-cyan/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan transition-all hover:bg-cyan hover:text-primary-foreground glow-cyan"
          >
            <span className="h-1.5 w-1.5 bg-cyan group-hover:bg-primary-foreground" />
            Validate // LinkedIn Matrix
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
          Stop Losing{" "}
          <span className="text-cyan text-glow">60%</span> of Your Inbound Leads to Slow Follow-Ups.
        </h1>
        <p className="mt-6 max-w-xl text-sm md:text-base text-muted-foreground leading-relaxed">
          We engineer{" "}
          <span className="text-foreground">autonomous AI SDR infrastructure</span> that qualifies,
          enriches, and matches inbound prospects within{" "}
          <span className="text-cyan">120 seconds</span>. 24/7/365.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#audit"
            className="inline-flex items-center gap-2 border border-cyan bg-cyan/10 px-5 py-3 text-xs uppercase tracking-[0.2em] text-cyan glow-cyan hover:bg-cyan hover:text-primary-foreground transition-all"
          >
            &gt; Initialize System Audit
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
          <video
            className="h-full w-full object-cover opacity-80"
            autoPlay
            muted
            loop
            playsInline
            poster="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'><rect width='100%25' height='100%25' fill='%23090D16'/></svg>"
          >
            <source
              src="https://cdn.coverr.co/videos/coverr-programming-code-on-a-screen-8461/1080p.mp4"
              type="video/mp4"
            />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
               style={{ background: "repeating-linear-gradient(to bottom, transparent 0 2px, rgba(0,240,255,0.08) 2px 3px)" }} />
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
              CogniLeads System Auditor <span className="text-cyan">v1.0</span>
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
            aria-label="Response to CogniLeads system auditor"
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

function ContactBlock() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [preview, setPreview] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      source: "cognileads.systems//web",
      timestamp: new Date().toISOString(),
      lead: {
        name: String(fd.get("name") || ""),
        email: String(fd.get("email") || ""),
        company: String(fd.get("company") || ""),
        message: String(fd.get("message") || ""),
      },
      routers: ["email.alert", "make.webhook"],
    };
    setPreview(JSON.stringify(payload, null, 2));
    setState("sending");

    const WEBHOOK_URL = "YOUR_MAKE_WEBHOOK_URL_HERE";

    try {
      const r = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setState(r.ok ? "ok" : "err");
    } catch {
      setState("err");
    }
  }


  return (
    <section id="contact" className="py-12 lg:py-20 border-b border-border/60">
      <SectionHeader index="05" title="Dual-Router Lead Capture Hook" caption="POST /api/contact" />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={onSubmit} className="border border-border bg-panel/70 p-6 space-y-4">
          <Field label="operator.name" name="name" placeholder="Jane Doe" />
          <Field label="operator.email" name="email" type="email" required placeholder="jane@company.com" />
          <Field label="operator.org" name="company" placeholder="Acme Inc." />
          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
              payload.message
            </label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full bg-black/40 border border-border px-3 py-2 text-sm outline-none focus:border-cyan focus:ring-1 focus:ring-cyan"
              placeholder="Describe your inbound funnel..."
            />
          </div>
          <button
            type="submit"
            disabled={state === "sending"}
            className="w-full inline-flex items-center justify-center gap-2 border border-cyan px-5 py-3 text-xs uppercase tracking-[0.25em] text-cyan glow-cyan hover:bg-cyan hover:text-primary-foreground transition-all disabled:opacity-60"
          >
            {state === "sending"
              ? "// transmitting payload..."
              : state === "ok"
              ? "// [SUCCESS] payload routed ✓"
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
  "source": "cognileads.systems//web",
  "lead": {
    "name": "...",
    "email": "...",
    "company": "...",
    "message": "..."
  },
  "routers": ["email.alert", "make.webhook"]
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
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
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
        className="w-full bg-black/40 border border-border px-3 py-2 text-sm outline-none focus:border-cyan focus:ring-1 focus:ring-cyan"
      />
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

function Footer() {
  return (
    <footer className="pt-10 mt-6 flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
      <span>© {new Date().getFullYear()} CogniLeads Systems // OS</span>
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
