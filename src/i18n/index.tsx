import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DICTIONARIES, LANGUAGES, type Lang } from "./dictionaries";

export { LANGUAGES, type Lang };

const STORAGE_KEY = "kavolith.lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (s: string) => string };

const LanguageContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (s) => s });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && stored in DICTIONARIES) setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const t = useCallback(
    (s: string) => {
      const dict = DICTIONARIES[lang];
      const parts = /^(\s*)([\s\S]*?)(\s*)$/.exec(s);
      if (!parts) return s;
      const [, lead, body, tail] = parts as unknown as [string, string, string, string];
      if (!body) return s;
      // JSX text nodes wrap across lines; dictionary keys are single-line
      const hit = dict[body] ?? dict[body.replace(/\s+/g, " ")];
      if (!hit) return s;
      return `${lead}${hit}${tail}`;
    },
    [lang],
  );


  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useT() {
  return useContext(LanguageContext).t;
}

const TRANSLATED_PROPS = [
  "title",
  "intro",
  "eyebrow",
  "note",
  "label",
  "placeholder",
  "aria-label",
];

function walk(node: ReactNode, t: (s: string) => string): ReactNode {
  if (typeof node === "string") return t(node);
  if (Array.isArray(node)) {
    return Children.map(node, (child) => walk(child, t));
  }
  if (isValidElement(node)) {
    const props = { ...(node.props as Record<string, unknown>) };
    for (const key of TRANSLATED_PROPS) {
      if (typeof props[key] === "string") props[key] = t(props[key] as string);
    }
    if (props["children"] !== undefined) props["children"] = walk(props["children"] as ReactNode, t);
    return cloneElement(node, props);
  }
  return node;
}

/** Translates string content in the rendered element tree beneath it. */
export function Translate({ children }: { children: ReactNode }) {
  const { lang, t } = useLanguage();
  if (lang === "en") return <>{children}</>;
  return <>{walk(children, t)}</>;
}

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <div
      role="group"
      aria-label="Select language"
      className={`inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1 ${className}`}
    >
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          aria-pressed={lang === l.code}
          title={l.name}
          onClick={() => setLang(l.code)}
          className={[
            "rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors",
            lang === l.code
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
