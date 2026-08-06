/**
 * Abstract automation / robotics motif layer.
 * Circuit lines, node-and-connection graphics, and gear glyphs — used as a
 * restrained accent behind sections and as section dividers.
 */

export function CircuitBackdrop({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="circuit-grid absolute inset-0" />
      <div className="node-dots absolute inset-0" />
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
