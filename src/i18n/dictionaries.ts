export const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
  { code: "de", label: "DE", name: "Deutsch" },
] as const;

export type Lang = (typeof LANGUAGES)[number]["code"];

/**
 * Translations keyed by the English source string.
 * English is the base language; any string without an entry falls back to English.
 */
type Dict = Record<string, string>;

const es: Dict = {
  // Navigation & chrome
  Home: "Inicio",
  Kavolith: "Kavolith",
  "CogniLeads OS": "CogniLeads OS",
  Intelligence: "Intelligence",
  Automation: "Automation",
  About: "Nosotros",
  Contact: "Contacto",
  Brands: "Marcas",
  Pages: "Páginas",
  Menu: "Menú",
  "Toggle navigation": "Alternar navegación",
  "Book a consultation": "Agenda una consultoría",
  "See our systems": "Ver nuestros sistemas",
  "Explore →": "Explorar →",
  "Select display currency": "Seleccionar moneda",
  "Select language": "Seleccionar idioma",
  "An Intelligence Systems Company engineering AI systems for revenue, operations, and workforce automation. Based in Hyderabad, India.":
    "Una empresa de sistemas de inteligencia que diseña sistemas de IA para ingresos, operaciones y automatización del trabajo. Con sede en Hyderabad, India.",
  "© 2026 Kavolith Group — Engineer Intelligence into Business.":
    "© 2026 Kavolith Group — Integra inteligencia en tu negocio.",
  "AI systems engineering": "Ingeniería de sistemas de IA",
  "AI Revenue Intelligence Platform": "Plataforma de inteligencia de ingresos con IA",
  "Enterprise AI Workforce Platform": "Plataforma empresarial de fuerza laboral con IA",
  "Automation Engineering Platform": "Plataforma de ingeniería de automatización",

  // Home
  "Kavolith Group": "Kavolith Group",
  "Engineer Intelligence": "Integra inteligencia",
  "into Business": "en tu negocio",
  "We build AI systems for revenue, operations, and workforce — the qualification pipelines, automation infrastructure, and digital employees that let a team run without manual handoffs.":
    "Construimos sistemas de IA para ingresos, operaciones y equipos: los flujos de cualificación, la infraestructura de automatización y los empleados digitales que permiten operar sin traspasos manuales.",
  "Kavolith Group is an Intelligence Systems Company that engineers AI systems for revenue, operations, and workforce automation.":
    "Kavolith Group es una empresa de sistemas de inteligencia que diseña sistemas de IA para ingresos, operaciones y automatización del trabajo.",
  "Four brands": "Cuatro marcas",
  "One group, four systems": "Un grupo, cuatro sistemas",
  "Each brand owns a distinct layer of the stack. Start where the pain is.":
    "Cada marca cubre una capa distinta del stack. Empieza donde más duele.",
  "Core services": "Servicios principales",
  "Coming Soon": "Próximamente",
  "Automation Engineering": "Ingeniería de automatización",
  "A Kavolith Company": "Una empresa de Kavolith",
  "AI systems engineering — audits, custom workflows, and the intelligence layer around them.":
    "Ingeniería de sistemas de IA: auditorías, flujos personalizados y la capa de inteligencia que los conecta.",
  "AI Revenue Intelligence Platform that scores, routes, and converts leads automatically.":
    "Plataforma de inteligencia de ingresos que puntúa, asigna y convierte leads automáticamente.",
  "Enterprise AI Workforce Platform — multilingual digital employees for compliance and ops.":
    "Plataforma empresarial de fuerza laboral con IA: empleados digitales multilingües para cumplimiento y operaciones.",
  "Automation engineering platform for lead routing, invoicing, and CRM synchronisation.":
    "Plataforma de ingeniería de automatización para asignación de leads, facturación y sincronización de CRM.",

  // Kavolith page
  "Kavolith · Core services": "Kavolith · Servicios principales",
  "What we do": "Qué hacemos",
  "Three services, in order": "Tres servicios, en orden",
  "Most engagements run in this sequence, because each stage makes the next one cheaper.":
    "La mayoría de los proyectos siguen esta secuencia, porque cada etapa abarata la siguiente.",
  "Systems audit": "Auditoría de sistemas",
  "Custom workflow builds": "Flujos de trabajo personalizados",
  "Intelligence layer": "Capa de inteligencia",
  Pricing: "Precios",
  "Engagement tiers": "Niveles de servicio",
  "Fixed build fee, with optional monthly iteration on the larger tiers.":
    "Tarifa fija de construcción, con iteración mensual opcional en los niveles superiores.",
  "Case studies": "Casos de éxito",
  "Work we've shipped": "Trabajo entregado",

  // Pricing UI
  "List price": "Precio de lista",
  "Setup list": "Lista de implementación",
  "Monthly list": "Lista mensual",
  "one-time": "pago único",
  setup: "implementación",
  "/ month": "/ mes",
  "Most common": "Más elegido",
  "Approximate conversions": "Conversiones aproximadas",
  Launchpad: "Launchpad",
  Scale: "Scale",
  "Premium / Total Control": "Premium / Control total",
  "Start with a clear map of your process and one workflow running in production.":
    "Empieza con un mapa claro de tu proceso y un flujo funcionando en producción.",
  "Connect several workflows into one operating layer, with ongoing iteration.":
    "Conecta varios flujos en una única capa operativa, con iteración continua.",
  "Run an intelligence layer across every team, with build capacity reserved for you.":
    "Opera una capa de inteligencia en todos los equipos, con capacidad de desarrollo reservada.",

  // CogniLeads OS
  "Request a deployment scope": "Solicita un alcance de implementación",
  "How it works": "Cómo funciona",
  "Four stages, no manual handoff": "Cuatro etapas, sin traspasos manuales",
  "The pipeline runs end to end without anyone re-entering data between steps.":
    "El pipeline funciona de extremo a extremo sin que nadie reintroduzca datos entre pasos.",
  "Engagement terms": "Condiciones del acuerdo",
  "Plain-language terms": "Condiciones en lenguaje claro",
  "Presale · Custom engineering": "Preventa · Ingeniería a medida",
  "scoped per deployment · approximate conversions":
    "definido por implementación · conversiones aproximadas",

  // Intelligence
  "Coming soon — presale booking open": "Próximamente: reservas de preventa abiertas",
  "Presale packages": "Paquetes de preventa",
  "Two digital employees, available on presale": "Dos empleados digitales en preventa",
  "Book a presale slot": "Reserva una plaza de preventa",
  "Reserve this package →": "Reservar este paquete →",
  "Questions about the platform": "Preguntas sobre la plataforma",

  // Automation
  "Focus areas": "Áreas de enfoque",
  "Where automation pays back fastest": "Dónde la automatización se paga más rápido",
  Packages: "Paquetes",
  "Automation packages": "Paquetes de automatización",
  "What we automate": "Qué automatizamos",
  "Automation types we build": "Tipos de automatización que construimos",
  "Proof of work": "Pruebas de trabajo",
  "Automations in production": "Automatizaciones en producción",
  "Scope an automation": "Define una automatización",

  // About / Contact
  Background: "Trayectoria",
  "Where we came from": "De dónde venimos",
  "How we work": "Cómo trabajamos",
  "Three principles": "Tres principios",
  "What happens next": "Qué pasa después",
  "Three steps": "Tres pasos",
  "We're based in Hyderabad, Telangana, and work with clients across India.":
    "Estamos en Hyderabad, Telangana, y trabajamos con clientes de toda India.",
  Name: "Nombre",
  Email: "Correo electrónico",
  Company: "Empresa",
  Message: "Mensaje",
  "Send message": "Enviar mensaje",
  Sending: "Enviando",
};

const de: Dict = {
  // Navigation & chrome
  Home: "Start",
  Kavolith: "Kavolith",
  "CogniLeads OS": "CogniLeads OS",
  Intelligence: "Intelligence",
  Automation: "Automation",
  About: "Über uns",
  Contact: "Kontakt",
  Brands: "Marken",
  Pages: "Seiten",
  Menu: "Menü",
  "Toggle navigation": "Navigation umschalten",
  "Book a consultation": "Beratung buchen",
  "See our systems": "Unsere Systeme ansehen",
  "Explore →": "Entdecken →",
  "Select display currency": "Währung auswählen",
  "Select language": "Sprache auswählen",
  "An Intelligence Systems Company engineering AI systems for revenue, operations, and workforce automation. Based in Hyderabad, India.":
    "Ein Intelligence-Systems-Unternehmen, das KI-Systeme für Umsatz, Betrieb und Workforce-Automatisierung entwickelt. Sitz in Hyderabad, Indien.",
  "© 2026 Kavolith Group — Engineer Intelligence into Business.":
    "© 2026 Kavolith Group — Intelligenz ins Geschäft einbauen.",
  "AI systems engineering": "KI-Systems-Engineering",
  "AI Revenue Intelligence Platform": "KI-Plattform für Umsatzintelligenz",
  "Enterprise AI Workforce Platform": "Enterprise-KI-Workforce-Plattform",
  "Automation Engineering Platform": "Plattform für Automatisierungs-Engineering",

  // Home
  "Kavolith Group": "Kavolith Group",
  "Engineer Intelligence": "Intelligenz einbauen",
  "into Business": "in Ihr Geschäft",
  "We build AI systems for revenue, operations, and workforce — the qualification pipelines, automation infrastructure, and digital employees that let a team run without manual handoffs.":
    "Wir bauen KI-Systeme für Umsatz, Betrieb und Teams: Qualifizierungs-Pipelines, Automatisierungs-Infrastruktur und digitale Mitarbeiter, die Arbeit ohne manuelle Übergaben laufen lassen.",
  "Kavolith Group is an Intelligence Systems Company that engineers AI systems for revenue, operations, and workforce automation.":
    "Kavolith Group ist ein Intelligence-Systems-Unternehmen, das KI-Systeme für Umsatz, Betrieb und Workforce-Automatisierung entwickelt.",
  "Four brands": "Vier Marken",
  "One group, four systems": "Eine Gruppe, vier Systeme",
  "Each brand owns a distinct layer of the stack. Start where the pain is.":
    "Jede Marke deckt eine eigene Ebene des Stacks ab. Beginnen Sie dort, wo es weh tut.",
  "Core services": "Kernleistungen",
  "Coming Soon": "Demnächst",
  "Automation Engineering": "Automatisierungs-Engineering",
  "A Kavolith Company": "Ein Unternehmen von Kavolith",
  "AI systems engineering — audits, custom workflows, and the intelligence layer around them.":
    "KI-Systems-Engineering: Audits, individuelle Workflows und die Intelligenzschicht darum herum.",
  "AI Revenue Intelligence Platform that scores, routes, and converts leads automatically.":
    "KI-Plattform für Umsatzintelligenz, die Leads automatisch bewertet, zuweist und konvertiert.",
  "Enterprise AI Workforce Platform — multilingual digital employees for compliance and ops.":
    "Enterprise-KI-Workforce-Plattform: mehrsprachige digitale Mitarbeiter für Compliance und Betrieb.",
  "Automation engineering platform for lead routing, invoicing, and CRM synchronisation.":
    "Automatisierungsplattform für Lead-Routing, Rechnungsstellung und CRM-Synchronisation.",

  // Kavolith page
  "Kavolith · Core services": "Kavolith · Kernleistungen",
  "What we do": "Was wir tun",
  "Three services, in order": "Drei Leistungen, der Reihe nach",
  "Most engagements run in this sequence, because each stage makes the next one cheaper.":
    "Die meisten Projekte laufen in dieser Reihenfolge, weil jede Stufe die nächste günstiger macht.",
  "Systems audit": "Systemaudit",
  "Custom workflow builds": "Individuelle Workflow-Entwicklung",
  "Intelligence layer": "Intelligenzschicht",
  Pricing: "Preise",
  "Engagement tiers": "Leistungsstufen",
  "Fixed build fee, with optional monthly iteration on the larger tiers.":
    "Feste Aufbaugebühr, mit optionaler monatlicher Iteration in den größeren Stufen.",
  "Case studies": "Fallstudien",
  "Work we've shipped": "Umgesetzte Projekte",

  // Pricing UI
  "List price": "Listenpreis",
  "Setup list": "Setup-Listenpreis",
  "Monthly list": "Monatlicher Listenpreis",
  "one-time": "einmalig",
  setup: "Setup",
  "/ month": "/ Monat",
  "Most common": "Am häufigsten",
  "Approximate conversions": "Ungefähre Umrechnungen",
  Launchpad: "Launchpad",
  Scale: "Scale",
  "Premium / Total Control": "Premium / Volle Kontrolle",
  "Start with a clear map of your process and one workflow running in production.":
    "Starten Sie mit einer klaren Prozesslandkarte und einem Workflow im Produktivbetrieb.",
  "Connect several workflows into one operating layer, with ongoing iteration.":
    "Verbinden Sie mehrere Workflows zu einer Betriebsschicht, mit laufender Iteration.",
  "Run an intelligence layer across every team, with build capacity reserved for you.":
    "Betreiben Sie eine Intelligenzschicht über alle Teams, mit reservierter Entwicklungskapazität.",

  // CogniLeads OS
  "Request a deployment scope": "Umsetzungsumfang anfragen",
  "How it works": "So funktioniert es",
  "Four stages, no manual handoff": "Vier Stufen, keine manuelle Übergabe",
  "The pipeline runs end to end without anyone re-entering data between steps.":
    "Die Pipeline läuft durchgängig, ohne dass Daten zwischen Schritten neu erfasst werden.",
  "Engagement terms": "Vertragsbedingungen",
  "Plain-language terms": "Bedingungen in klarer Sprache",
  "Presale · Custom engineering": "Vorverkauf · Individuelle Entwicklung",
  "scoped per deployment · approximate conversions":
    "pro Umsetzung definiert · ungefähre Umrechnungen",

  // Intelligence
  "Coming soon — presale booking open": "Demnächst – Vorverkauf geöffnet",
  "Presale packages": "Vorverkaufspakete",
  "Two digital employees, available on presale": "Zwei digitale Mitarbeiter im Vorverkauf",
  "Book a presale slot": "Vorverkaufsplatz buchen",
  "Reserve this package →": "Dieses Paket reservieren →",
  "Questions about the platform": "Fragen zur Plattform",

  // Automation
  "Focus areas": "Schwerpunkte",
  "Where automation pays back fastest": "Wo Automatisierung sich am schnellsten rechnet",
  Packages: "Pakete",
  "Automation packages": "Automatisierungspakete",
  "What we automate": "Was wir automatisieren",
  "Automation types we build": "Automatisierungsarten, die wir bauen",
  "Proof of work": "Arbeitsnachweise",
  "Automations in production": "Automatisierungen im Produktivbetrieb",
  "Scope an automation": "Automatisierung definieren",

  // About / Contact
  Background: "Hintergrund",
  "Where we came from": "Woher wir kommen",
  "How we work": "Wie wir arbeiten",
  "Three principles": "Drei Prinzipien",
  "What happens next": "Wie es weitergeht",
  "Three steps": "Drei Schritte",
  "We're based in Hyderabad, Telangana, and work with clients across India.":
    "Wir sitzen in Hyderabad, Telangana, und arbeiten mit Kunden in ganz Indien.",
  Name: "Name",
  Email: "E-Mail",
  Company: "Unternehmen",
  Message: "Nachricht",
  "Send message": "Nachricht senden",
  Sending: "Wird gesendet",
};

export const DICTIONARIES: Record<Lang, Dict> = { en: {}, es, de };
