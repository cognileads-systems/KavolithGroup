import { Translate } from "@/i18n";
import { useEffect, useState } from "react";

const STAGES = [
  { label: "Captured", detail: "Inbound form submitted" },
  { label: "Scored", detail: "Intent score computed" },
  { label: "SDR notified", detail: "Priority alert dispatched" },
  { label: "Meeting booked", detail: "Slot confirmed on calendar" },
] as const;

const WORDS = ["scores", "routes", "converts"] as const;

function LivePipelineDemoBase() {
  const [stage, setStage] = useState(0);
  const [word, setWord] = useState(0);

  useEffect(() => {
    const a = setInterval(() => setStage((s) => (s + 1) % (STAGES.length + 1)), 1600);
    const b = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 2200);
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, []);

  const active = Math.min(stage, STAGES.length - 1);

  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          live pipeline
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          it {WORDS[word]}
          <span className="animate-blink ml-1">▮</span>
        </span>
      </div>

      <div className="mt-5 rounded-lg border border-accent/30 bg-surface p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Priya Menon</div>
            <div className="font-mono text-[11px] text-muted-foreground">
              priya@northwind.co · Northwind Realty
            </div>
          </div>
          <div className="rounded-full bg-accent-soft px-2 py-1 font-mono text-[11px] text-accent">
            {active >= 1 ? "score 87" : "scoring…"}
          </div>
        </div>
        <p key={active} className="animate-rise-in mt-3 text-sm text-muted-foreground">
          {STAGES[active].detail}
        </p>
      </div>

      <ol className="mt-5 space-y-2">
        {STAGES.map((s, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <li
              key={s.label}
              className={[
                "flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-colors",
                current
                  ? "animate-stage-pulse border-accent/60 bg-accent-soft text-foreground"
                  : done
                    ? "border-border bg-surface text-foreground"
                    : "border-border bg-surface/40 text-muted-foreground",
              ].join(" ")}
            >
              <span
                className={[
                  "h-2 w-2 rounded-full",
                  current || done ? "bg-accent" : "bg-muted-foreground/40",
                ].join(" ")}
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{s.label}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function LivePipelineDemo() {
  return (
    <Translate>
      <LivePipelineDemoBase />
    </Translate>
  );
}
