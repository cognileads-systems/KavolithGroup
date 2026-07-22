import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VectraSyn // Autonomous AI SDR & Lead Infrastructure" },
      { name: "description", content: "We engineer autonomous AI SDR infrastructure that qualifies, enriches, and matches inbound prospects within 120 seconds. 24/7/365." },
      { property: "og:title", content: "VectraSyn // Autonomous AI SDR & Lead Infrastructure" },
      { property: "og:description", content: "We engineer autonomous AI SDR infrastructure that qualifies, enriches, and matches inbound prospects within 120 seconds. 24/7/365." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "VectraSyn // Autonomous AI SDR & Lead Infrastructure" },
      { name: "twitter:description", content: "We engineer autonomous AI SDR infrastructure that qualifies, enriches, and matches inbound prospects within 120 seconds. 24/7/365." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/577318cd-eff3-48a0-879a-b3177a7b3107" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/577318cd-eff3-48a0-879a-b3177a7b3107" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg",
      },
      {
        rel: "canonical",
        href: "https://cognileadssystems.lovable.app/",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://cognileadssystems.lovable.app/#organization",
              name: "VectraSyn",
              url: "https://cognileadssystems.lovable.app/",
              logo: "https://cognileadssystems.lovable.app/favicon.svg",
              image:
                "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/577318cd-eff3-48a0-879a-b3177a7b3107",
              slogan: "We Sync Work and Forge Systems",
              description:
                "VectraSyn engineers autonomous AI SDR infrastructure that qualifies, enriches, and matches inbound prospects within 120 seconds — 24/7/365.",
              areaServed: "Global",
              knowsAbout: [
                "AI Automation",
                "Lead Intelligence Infrastructure",
                "AEO/GEO Local SEO",
                "FastAPI Systems",
              ],
            },
            {
              "@type": "LocalBusiness",
              "@id": "https://cognileadssystems.lovable.app/#localbusiness",
              name: "VectraSyn",
              slogan: "We Sync Work and Forge Systems",
              url: "https://cognileadssystems.lovable.app/",
              image:
                "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/577318cd-eff3-48a0-879a-b3177a7b3107",
              priceRange: "₹₹₹",
              areaServed: "Global",
              knowsAbout: [
                "AI Automation",
                "Lead Intelligence Infrastructure",
                "AEO/GEO Local SEO",
                "FastAPI Systems",
              ],
              makesOffer: [
                {
                  "@type": "Offer",
                  price: "16000",
                  priceCurrency: "INR",
                  itemOffered: { "@type": "Service", name: "Vectra Launchpad" },
                },
                {
                  "@type": "Offer",
                  price: "48000",
                  priceCurrency: "INR",
                  itemOffered: { "@type": "Service", name: "Vectra Scale" },
                },
                {
                  "@type": "Offer",
                  price: "85000",
                  priceCurrency: "INR",
                  itemOffered: { "@type": "Service", name: "CogniLeads OS" },
                },
              ],
            },
            {
              "@type": "WebApplication",
              "@id": "https://cognileadssystems.lovable.app/#webapp",
              name: "VectraSyn Intelligence OS",
              url: "https://cognileadssystems.lovable.app/",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              provider: { "@id": "https://cognileadssystems.lovable.app/#organization" },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
            },
            {
              "@type": "ProfessionalService",
              "@id": "https://cognileadssystems.lovable.app/#service",
              name: "Autonomous AI SDR Infrastructure",
              url: "https://cognileadssystems.lovable.app/",
              provider: { "@id": "https://cognileadssystems.lovable.app/#organization" },
              areaServed: "Global",
              serviceType: "AI SDR Infrastructure",
              description:
                "Design, deploy, and operate autonomous inbound SDR pipelines: qualification kernel, enrichment layer, dual-router dispatch, and plain-text lead ledger.",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "VectraSyn Deployments",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI SDR Infrastructure" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Multi-Agent Workflows" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Workflow Automation" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conversion Rate Optimization" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Next.js Engineering" } },
                ],
              },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
