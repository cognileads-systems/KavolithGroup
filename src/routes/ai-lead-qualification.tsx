import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage, solutionHead, InlineLink } from "@/components/site/solution-page";
import type { FaqItem } from "@/components/site/faq";

const FAQS: FaqItem[] = [
  {
    q: "How is the score decided?",
    a: "By rules we agree with you, tested against a sample of your own enquiries, not a black box.",
  },
  {
    q: "Does it contact leads automatically?",
    a: "Not unless you ask for it. The default is alert and suggested reply to a human.",
  },
  {
    q: "What tools does it use?",
    a: "Typically Make.com or n8n, an AI model, and Airtable or Google Sheets.",
  },
  { q: "How long does a build take?", a: "Depends on scope; stated in writing before any payment." },
];

const META = {
  path: "/ai-lead-qualification",
  name: "AI Lead Qualification",
  title: "AI Lead Qualification and Routing | Kavolith Group",
  description:
    "Score every enquiry by intent and route hot leads to a person first. Built on the same pipeline we run ourselves.",
  serviceType: "AI lead qualification and routing",
  faqs: FAQS,
};

export const Route = createFileRoute("/ai-lead-qualification")({
  component: Page,
  head: () => solutionHead(META),
});

function Page() {
  return (
    <SolutionPage
      eyebrow="AI lead qualification"
      h1="AI lead qualification, so the right lead gets the first call"
      answer="Every enquiry is read when it arrives, scored for intent, and routed: hot leads alert you immediately, warm ones get a follow-up, and spam is handled without taking your time."
      getItems={[
        "Intent score on every lead",
        "Three routes: hot, warm, spam",
        "Instant alert with a suggested reply",
        "Every lead logged in Airtable with its score and reason",
        "Rules tuned against a sample you label",
        "Written scope agreed before the build",
      ]}
      steps={[
        "Send us a sample of real enquiries.",
        "We agree what counts as hot, warm and spam in writing.",
        "Build the scoring and routing, test against your labelled sample.",
        "Hand over with documentation and a tuning period.",
      ]}
      proof={
        <>
          The webhook, AI classification, router, Airtable record and alert flow behind our own
          contact form.{" "}
          <InlineLink to="/cognileads-os">See the sample pipeline on CogniLeads OS</InlineLink>
        </>
      }
      fits={
        <>
          Single Flow to Ops Stack on{" "}
          <InlineLink to="/kavolith-automation">/kavolith-automation</InlineLink>; full platform on{" "}
          <InlineLink to="/cognileads-os">/cognileads-os</InlineLink>. Scoped on a free call.
        </>
      }
      faqs={FAQS}
    />
  );
}
