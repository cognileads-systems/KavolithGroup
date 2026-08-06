/**
 * Photographic accent layer.
 * A realistic AI / data-visualisation photograph behind a section, tinted with a
 * violet-to-ink gradient so it blends into the existing colour system.
 * Sits alongside (not instead of) the abstract circuit-node motif.
 */

export function PhotoBackdrop({
  src,
  alt = "",
  priority = false,
  className = "",
}: {
  src: string;
  alt?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 ${className}`}>
      <img
        src={src}
        alt={alt}
        width={1920}
        height={1080}
        {...(priority ? {} : { loading: "lazy" as const })}
        className="h-full w-full object-cover opacity-[0.75]"
      />
      {/* Violet duotone guard: forces any photo to a single accent hue so no
          competing colours (green/red/amber status lights) survive. */}
      <div
        className="absolute inset-0 mix-blend-color"
        style={{ background: "var(--accent)", opacity: 0.85 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--ink) 40%, transparent) 0%, color-mix(in oklab, var(--ink) 52%, transparent) 55%, color-mix(in oklab, var(--ink) 88%, transparent) 100%)",
        }}
      />
      {/* Text-legibility scrim: stronger on the left where copy sits, clearing to the right. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--ink) 72%, transparent) 0%, color-mix(in oklab, var(--ink) 45%, transparent) 55%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(65% 65% at 25% 20%, color-mix(in oklab, var(--accent) 38%, transparent) 0%, transparent 72%)",
        }}
      />
    </div>
  );
}
