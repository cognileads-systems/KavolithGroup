import { Link } from "@tanstack/react-router";
import { NAV_LINKS } from "./site-nav";
import { Translate } from "@/i18n";

const BRANDS = [
  { to: "/kavolith", name: "Kavolith", note: "AI systems engineering" },
  { to: "/cognileads-os", name: "CogniLeads OS", note: "AI Revenue Intelligence Platform" },
  { to: "/kavolith-intelligence", name: "Kavolith Intelligence", note: "Enterprise AI Workforce Platform" },
  { to: "/kavolith-automation", name: "Kavolith Automation", note: "Automation Engineering Platform" },
] as const;

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/kavolithgroup" },
  { label: "Facebook", href: "https://www.facebook.com/share/1DDknf8Po1/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mohammed-arfath-59374845/" },
  { label: "WhatsApp", href: "https://wa.me/919492044168" },
] as const;

export function SiteFooter() {
  return (
    <Translate>
    <footer className="border-t border-border bg-surface/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="font-display text-base font-semibold">
            Kavolith<span className="text-accent"> Group</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            An Intelligence Systems Company engineering AI systems for revenue, operations, and
            workforce automation. Based in Hyderabad, India.
          </p>
        </div>

        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Brands
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {BRANDS.map((b) => (
              <li key={b.to}>
                <Link to={b.to} className="text-foreground transition-colors hover:text-accent">
                  {b.name}
                </Link>
                <span className="block text-xs text-muted-foreground">{b.note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Pages
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-6 py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            © 2026 Kavolith Group — Engineer Intelligence into Business.
          </p>
          <ul className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em]">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
    </Translate>
  );
}
