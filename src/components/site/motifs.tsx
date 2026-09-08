/**
 * Abstract automation / robotics motif layer.
 * Circuit lines, node-and-connection graphics, and gear glyphs — used as a
 * restrained accent behind sections and as section dividers.
 */

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
 *  network's shape subtly reconfigures over time. */
const ALT_LINKS: Array<[number, number]> = [
  [1, 10], [3, 12], [5, 13], [7, 20], [10, 17], [12, 19], [15, 9], [18, 21],
];

/** Links that carry a travelling signal pulse. */
const SIGNAL_LINKS: Array<[number, number]> = [
  [1, 2], [4, 5], [8, 9], [16, 17], [13, 14], [19, 20],
];

/** Links whose base stroke periodically fades out (paired with ALT_LINKS). */
const FADING = new Set([1, 3, 5, 15, 18, 22, 24, 27]);

/** Deterministic CSS: small organic drift per node (larger/brighter nodes drift a
 *  touch faster and further for parallax depth), link reconfiguration, and signal
 *  pulses. Everything is gated behind prefers-reduced-motion: no-preference, so
 *  reduced-motion users see the static frame. */
function buildCss() {
  const parts: string[] = [];

  parts.push(`
@keyframes kv-drift-a { 0%,100% { transform: translate(0,0); } 25% { transform: translate(3px,-4px); } 50% { transform: translate(-2px,3px); } 75% { transform: translate(4px,2px); } }
@keyframes kv-drift-b { 0%,100% { transform: translate(0,0); } 30% { transform: translate(-4px,2px); } 60% { transform: translate(2px,4px); } 80% { transform: translate(3px,-3px); } }
@keyframes kv-drift-c { 0%,100% { transform: translate(0,0); } 20% { transform: translate(2px,3px); } 55% { transform: translate(-3px,-2px); } 85% { transform: translate(-1px,4px); } }
@keyframes kv-drift-d { 0%,100% { transform: translate(0,0); } 35% { transform: translate(4px,3px); } 65% { transform: translate(-3px,-4px); } }
@keyframes kv-link-out { 0%,42% { opacity: 1; } 50%,92% { opacity: 0; } 100% { opacity: 1; } }
@keyframes kv-link-in { 0%,42% { opacity: 0; } 50%,92% { opacity: 1; } 100% { opacity: 0; } }
`);

  NODES.forEach((n) => {
    const kf = ["a", "b", "c", "d"][n.i % 4];
    const dur = (n.big ? 13 : 19) + (n.i % 5) * 1.7;
    parts.push(
      `.kv-n-${n.i} { animation: kv-drift-${kf} ${dur}s ease-in-out ${(n.i % 7) * 0.9}s infinite; animation-timing-function: ease-in-out; }`,
    );
  });

  SIGNAL_LINKS.forEach(([a, b], i) => {
    const dx = NODES[b].x - NODES[a].x;
    const dy = NODES[b].y - NODES[a].y;
    parts.push(
      `@keyframes kv-sig-${i} { 0% { transform: translate(0,0); opacity: 0; } 15% { opacity: 0.85; } 70% { opacity: 0.7; } 100% { transform: translate(${dx}px,${dy}px); opacity: 0; } }`,
      `.kv-sig-${i} { animation: kv-sig-${i} 4.2s ease-in-out ${i * 3.1}s infinite; }`,
    );
  });

  return `@media (prefers-reduced-motion: no-preference) { ${parts.join("\n")} }`;
}

const LATTICE_CSS = buildCss();

export function NodeLattice({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      role="presentation"
      viewBox="0 0 1200 700"
      preserveAspectRatio="none"
      className={`absolute inset-0 h-full w-full ${className}`}
    >
      <style dangerouslySetInnerHTML={{ __html: LATTICE_CSS }} />

      {LINKS.map(([a, b], i) => {
        const color = i % 5 === 1 || i % 5 === 3 ? TEAL : VIOLET;
        const fading = FADING.has(i);
        return (
          <line
            key={`l-${a}-${b}`}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke={color}
            strokeOpacity={i % 2 === 0 ? 0.6 : 0.5}
            strokeWidth={1.5}
            style={
              fading
                ? {
                    animation: `kv-link-out ${12 + (i % 4) * 2}s ease-in-out ${(i % 5) * 1.4}s infinite`,
                  }
                : undefined
            }
            className={fading ? "kv-fade" : undefined}
          />
        );
      })}

      {ALT_LINKS.map(([a, b], i) => (
        <line
          key={`alt-${a}-${b}`}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke={i % 3 === 1 ? TEAL : VIOLET}
          strokeOpacity={0.4}
          strokeWidth={1.2}
          opacity={0}
          style={{
            animation: `kv-link-in ${12 + (i % 4) * 2}s ease-in-out ${(i % 5) * 1.4}s infinite`,
          }}
        />
      ))}

      {SIGNAL_LINKS.map(([a, b], i) => (
        <circle
          key={`sig-${a}-${b}`}
          cx={NODES[a].x}
          cy={NODES[a].y}
          r={3}
          fill={i % 2 === 0 ? TEAL : VIOLET}
          opacity={0}
          className={`kv-sig-${i}`}
        />
      ))}

      {NODES.map((n) => {
        const color = n.teal ? TEAL : VIOLET;
        const r = n.big ? 4 : 2.6;
        return (
          <g key={`n-${n.i}`} className={`kv-n-${n.i}`}>
            {n.big && (
              <circle cx={n.x} cy={n.y} r={r * 2} fill={color} fillOpacity={0.22} />
            )}
            <circle
              cx={n.x}
              cy={n.y}
              r={r}
              fill={color}
              fillOpacity={n.big ? 0.9 : 0.85}
              className="animate-node-pulse-strong"
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
