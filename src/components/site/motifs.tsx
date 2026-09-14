/**
 * Abstract automation / robotics motif layer.
 * Circuit lines, node-and-connection graphics, and gear glyphs — used as a
 * restrained accent behind sections and as section dividers.
 */

import { useEffect, useState } from "react";

const VIOLET = "#A78BFA";
const TEAL = "#5EEAD4";

/** Deterministic node lattice: 60/40 violet-to-teal nodes with glow halos and
 *  two-toned connection lines. Values are intentionally bold and visible. */
const NODES = [
  [80, 120], [230, 60], [360, 190], [520, 100], [660, 240], [800, 140],
  [940, 60], [1080, 200], [140, 320], [300, 420], [460, 340], [620, 460],
  [760, 380], [900, 300], [1040, 420], [200, 560], [380, 620], [540, 540],
  [700, 640], [860, 560], [1010, 640], [1130, 520],
].map(([x, y], i) => ({ x, y, i, teal: i % 5 === 1 || i % 5 === 3, big: i % 3 === 0 }));

const LINKS: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
  [0, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [7, 14],
  [8, 15], [15, 16], [16, 17], [17, 18], [18, 19], [19, 20], [20, 21], [14, 21],
  [2, 10], [4, 12], [6, 13], [9, 16], [11, 18], [13, 19],
];

/** Alternate connections that fade in while nearby base links fade out, so the
 *  network's shape visibly reconfigures every few seconds. */
const ALT_LINKS: Array<[number, number]> = [
  [1, 10], [3, 12], [5, 13], [7, 20], [10, 17], [12, 19], [15, 9], [18, 21],
];

/** Links that carry a travelling signal pulse (several, staggered). */
const SIGNAL_LINKS: Array<[number, number]> = [
  [1, 2], [4, 5], [8, 9], [16, 17], [13, 14], [19, 20], [9, 10], [17, 18], [5, 6], [20, 21],
];

/** Base links whose stroke periodically fades out (paired with ALT_LINKS). */
const FADING = new Set([1, 3, 5, 15, 18, 22, 24, 27]);

/** Deterministic per-node drift path: 4 waypoints in a small looping range.
 *  Bigger/brighter nodes drift slightly faster and further (parallax depth). */
function makeDrift(amplitudeMultiplier: number) {
  return NODES.map((n) => {
  const s = n.i + 3;
  const amp = (n.big ? 9 : 6) * amplitudeMultiplier;
  const off = (k: number) => {
    const v = ((s * (k * 31 + 17)) % 21) / 10 - 1; // -1..1 deterministic
    return Math.round(v * amp * 10) / 10;
  };
  const pts: Array<[number, number]> = [
    [0, 0],
    [off(1), off(2)],
    [off(3), off(4)],
    [off(5), off(6)],
    [0, 0],
  ];
    return {
      pts,
      dur: (n.big ? 7 : 9) + (n.i % 5) * 0.6,
      begin: -((n.i % 8) * 0.9),
    };
  });
}

const STANDARD_DRIFT = makeDrift(1);
const ENHANCED_DRIFT = makeDrift(3.5);

const CYCLE_CSS = `
@keyframes kv-link-out { 0%,35% { opacity: var(--kv-o); } 50%,85% { opacity: 0; } 100% { opacity: var(--kv-o); } }
@keyframes kv-link-in { 0%,35% { opacity: 0; } 50%,85% { opacity: 0.45; } 100% { opacity: 0; } }
`;

function nodeAnim(i: number, drift: typeof STANDARD_DRIFT) {
  const d = drift[i];
  return {
    values: d.pts.map(([dx, dy]) => `${dx} ${dy}`).join(";"),
    dur: `${d.dur}s`,
    begin: `${d.begin}s`,
  };
}

/** Absolute endpoint value list for one end of a line, following that node. */
function endValues(i: number, axis: "x" | "y", drift: typeof STANDARD_DRIFT) {
  const n = NODES[i];
  const base = axis === "x" ? n.x : n.y;
  return drift[i].pts.map((p) => base + (axis === "x" ? p[0] : p[1])).join(";");
}

function LineDrift({ a, b, drift }: { a: number; b: number; drift: typeof STANDARD_DRIFT }) {
  return (
    <>
      <animate attributeName="x1" values={endValues(a, "x", drift)} dur={`${drift[a].dur}s`} begin={`${drift[a].begin}s`} repeatCount="indefinite" />
      <animate attributeName="y1" values={endValues(a, "y", drift)} dur={`${drift[a].dur}s`} begin={`${drift[a].begin}s`} repeatCount="indefinite" />
      <animate attributeName="x2" values={endValues(b, "x", drift)} dur={`${drift[b].dur}s`} begin={`${drift[b].begin}s`} repeatCount="indefinite" />
      <animate attributeName="y2" values={endValues(b, "y", drift)} dur={`${drift[b].dur}s`} begin={`${drift[b].begin}s`} repeatCount="indefinite" />
    </>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export function NodeLattice({
  className = "",
  enhanced = true,
}: {
  className?: string;
  enhanced?: boolean;
}) {
  const reduced = useReducedMotion();
  const animate = !reduced;
  const drift = enhanced ? ENHANCED_DRIFT : STANDARD_DRIFT;

  return (
    <svg
      aria-hidden
      role="presentation"
      viewBox="0 0 1200 700"
      preserveAspectRatio="none"
      className={`absolute inset-0 h-full w-full ${className}`}
    >
      <style dangerouslySetInnerHTML={{ __html: CYCLE_CSS }} />

      {LINKS.map(([a, b], i) => {
        const color = i % 5 === 1 || i % 5 === 3 ? TEAL : VIOLET;
        const fading = animate && FADING.has(i);
        const o = i % 2 === 0 ? 0.6 : 0.5;
        return (
          <line
            key={`l-${a}-${b}`}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke={color}
            strokeWidth={1.5}
            opacity={o}
            style={
              fading
                ? ({
                    ["--kv-o" as string]: String(o),
                    animation: `kv-link-out ${6 + (i % 3)}s ease-in-out ${(i % 4) * 1.3}s infinite`,
                  } as React.CSSProperties)
                : undefined
            }
          >
            {animate && <LineDrift a={a} b={b} drift={drift} />}
          </line>
        );
      })}

      {animate &&
        ALT_LINKS.map(([a, b], i) => (
          <line
            key={`alt-${a}-${b}`}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke={i % 3 === 1 ? TEAL : VIOLET}
            strokeWidth={enhanced ? 1.7 : 1.2}
            opacity={0}
            style={{
              animation: `kv-link-in ${6 + (i % 3)}s ease-in-out ${(i % 4) * 1.3}s infinite`,
            }}
          >
            <LineDrift a={a} b={b} drift={drift} />
          </line>
        ))}

      {animate &&
        SIGNAL_LINKS.map(([a, b], i) => (
          <circle
            key={`sig-${a}-${b}-${i}`}
            r={enhanced ? 4.6 : 3.2}
            cx={NODES[a].x}
            cy={NODES[a].y}
            fill={i % 2 === 0 ? TEAL : VIOLET}
            opacity={enhanced ? 1 : 0.85}
          >
            <animate
              attributeName="cx"
              values={`${NODES[a].x};${NODES[b].x}`}
              dur="3.4s"
              begin={`${(i % 5) * 0.85 + Math.floor(i / 5) * 0.4}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values={`${NODES[a].y};${NODES[b].y}`}
              dur="3.4s"
              begin={`${(i % 5) * 0.85 + Math.floor(i / 5) * 0.4}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
               values={enhanced ? "0;1;0.95;0" : "0;0.9;0.85;0"}
              dur="3.4s"
              begin={`${(i % 5) * 0.85 + Math.floor(i / 5) * 0.4}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

      {NODES.map((n) => {
        const color = n.teal ? TEAL : VIOLET;
        const r = n.big ? 4 : 2.6;
        const a = nodeAnim(n.i, drift);
        return (
          <g key={`n-${n.i}`}>
            {animate && (
              <animateTransform
                attributeName="transform"
                type="translate"
                values={a.values}
                dur={a.dur}
                begin={a.begin}
                repeatCount="indefinite"
              />
            )}
            {n.big && <circle cx={n.x} cy={n.y} r={r * 2} fill={color} fillOpacity={0.22} />}
            <circle
              cx={n.x}
              cy={n.y}
              r={r}
              fill={color}
              fillOpacity={n.big ? 0.9 : 0.85}
              className={animate ? "animate-node-pulse-strong" : undefined}
              style={{ animationDelay: `${(n.i % 6) * 0.3}s` }}
            />
          </g>
        );
      })}
    </svg>
  );
}

export function CircuitBackdrop({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <NodeLattice />
    </div>
  );
}



/** Thin node-and-connection line used between sections.
 *  Violet is dominant; roughly every third node/branch is teal-cyan. */
export function CircuitDivider({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`mx-auto max-w-6xl px-6 ${className}`}>
      <svg viewBox="0 0 1200 24" className="h-6 w-full" role="presentation">
        <line
          x1="0"
          y1="12"
          x2="1200"
          y2="12"
          stroke="var(--accent)"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
        <line
          x1="360"
          y1="12"
          x2="600"
          y2="12"
          stroke="var(--teal)"
          strokeOpacity="0.28"
          strokeWidth="1"
        />
        {[120, 360, 600, 840, 1080].map((x, i) => {
          const hue = i % 3 === 1 ? "var(--teal)" : "var(--accent)";
          return (
            <g key={x}>
              <line
                x1={x}
                y1="12"
                x2={x}
                y2={i % 2 === 0 ? 2 : 22}
                stroke={hue}
                strokeOpacity="0.22"
                strokeWidth="1"
              />
              <circle
                cx={x}
                cy="12"
                r="2.5"
                fill={hue}
                className="animate-node-pulse"
                style={{ animationDelay: `${i * 0.35}s` }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Small pulsing node glyph for labels and eyebrows. */
export function NodeGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      className={`h-3 w-3 shrink-0 ${className}`}
      role="presentation"
    >
      <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeOpacity="0.5" />
      <line x1="6" y1="1" x2="6" y2="11" stroke="var(--teal)" strokeOpacity="0.45" />
      <circle cx="6" cy="6" r="2" fill="currentColor" className="animate-node-pulse" />
    </svg>
  );
}


/** Abstract gear / actuator mark, used sparingly as a section corner accent. */
export function GearMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 48"
      className={`h-10 w-10 text-accent/40 ${className}`}
      role="presentation"
    >
      <circle cx="24" cy="24" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        return (
          <line
            key={i}
            x1={24 + Math.cos(a) * 11}
            y1={24 + Math.sin(a) * 11}
            x2={24 + Math.cos(a) * 16}
            y2={24 + Math.sin(a) * 16}
            stroke="currentColor"
            strokeWidth="1.2"
          />
        );
      })}
    </svg>
  );
}
