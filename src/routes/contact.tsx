import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section, Eyebrow, SectionTitle } from "@/components/site/layout";
import { ContactForm } from "@/components/site/contact-form";

const SITE = "https://kavolith.com";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Kavolith Group | Book an AI Systems Consultation" },
      {
        name: "description",
        content:
          "Tell us where your process breaks down and we'll scope an AI systems or automation engagement. Replies within one business day.",
      },
      { property: "og:title", content: "Contact Kavolith Group | Book an AI Systems Consultation" },
      {
        property: "og:description",
        content:
          "Book a consultation with Kavolith Group. We reply within one business day.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/contact` },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://kavolith.com/kavolith-og.svg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/svg+xml" },
      { name: "twitter:image", content: "https://kavolith.com/kavolith-og.svg" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/contact` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ContactPage",
              "@id": `${SITE}/contact#contact`,
              url: `${SITE}/contact`,
              about: { "@id": `${SITE}/contact#localbusiness` },
            },
            {
              "@type": "LocalBusiness",
              "@id": `${SITE}/contact#localbusiness`,
              name: "Kavolith Group",
              url: `${SITE}/`,
              priceRange: "₹₹₹",
              areaServed: "IN",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                email: "arafath@kavolith.com",
                telephone: "+919492044168",
                availableLanguage: ["English", "Telugu", "Hindi"],
                areaServed: "IN",
              },
            },
          ],
        }),
      },
    ],
  }),
});

const STEPS = [
  "You send a short description of the process and tools involved.",
  "We reply within one business day with clarifying questions or a call slot.",
  "We scope the engagement and confirm price before any build starts.",
];

function ContactPage() {
  return (
    <PageShell>
      <Section>
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] md:text-5xl">
          Tell us where the <span className="text-accent">process breaks down</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          The more specific you are about the current workflow and tools, the more useful our first
          reply will be.
        </p>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <ContactForm />
          <div>
            <SectionTitle eyebrow="What happens next" title="Three steps" />
            <ol className="mt-6 space-y-4">
              {STEPS.map((s, i) => (
                <li
                  key={s}
                  className="flex gap-4 rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
