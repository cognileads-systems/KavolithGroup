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
        className="h-full w-full object-cover opacity-[0.28]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--ink) 78%, transparent) 0%, color-mix(in oklab, var(--ink) 88%, transparent) 45%, var(--ink) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 25% 20%, color-mix(in oklab, var(--accent) 22%, transparent) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
