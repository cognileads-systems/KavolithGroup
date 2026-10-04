import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { LanguageSwitcher, Translate } from "@/i18n";

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/kavolith", label: "Kavolith" },
  { to: "/cognileads-os", label: "CogniLeads OS" },
  { to: "/kavolith-intelligence", label: "Intelligence" },
  { to: "/kavolith-automation", label: "Automation" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <Translate>
      <header className="sticky top-0 z-50 border-b border-border bg-ink/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="font-display text-base font-semibold tracking-tight text-foreground"
          >
            Kavolith<span className="text-accent"> Group</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.slice(1).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{
                  className: "rounded-md px-3 py-2 text-sm text-accent bg-accent-soft",
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 sm:inline-flex"
            >
              Book a consultation
            </a>
            <button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground lg:hidden"
            >
              Menu
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-border bg-surface px-6 py-3 lg:hidden">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2 text-sm text-muted-foreground hover:text-foreground"
                activeProps={{ className: "block rounded-md px-2 py-2 text-sm text-accent" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </Translate>
  );
}
