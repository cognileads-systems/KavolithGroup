import { Link } from "@tanstack/react-router";
import { NAV_LINKS } from "./site-nav";
import { Translate } from "@/i18n";

const BRANDS = [
  { to: "/kavolith", name: "Kavolith", note: "AI systems engineering" },
  { to: "/cognileads-os", name: "CogniLeads OS", note: "AI Revenue Intelligence Platform" },
  { to: "/kavolith-intelligence", name: "Kavolith Intelligence", note: "Enterprise AI Workforce Platform" },
  { to: "/kavolith-automation", name: "Kavolith Automation", note: "Automation Engineering Platform" },
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
        <p className="mx-auto max-w-6xl font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          © 2026 Kavolith Group — Engineer Intelligence into Business.
        </p>
      </div>
    </footer>
    </Translate>
  );
}
