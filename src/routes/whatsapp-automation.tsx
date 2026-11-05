import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage, solutionHead, InlineLink } from "@/components/site/solution-page";
import type { FaqItem } from "@/components/site/faq";

const FAQS: FaqItem[] = [
  {
    q: "Do I need the WhatsApp Business API?",
    a: "Not always. Many small businesses start with WhatsApp Business plus a click-to-chat link and a capture workflow; we recommend the API only when volume or compliance needs it, and say so in the written scope.",
  },
  {
    q: "Will it sound like a robot?",
    a: "Replies are written with you, kept short, and anything outside the agreed rules is handed to a person.",
  },
  {
    q: "Can it book appointments?",
    a: "Yes, through a booking link or calendar connection inside the conversation.",
  },
  { q: "Who owns the accounts?", a: "You do. Accounts and workflows are set up in your name." },
];

const META = {
  path: "/whatsapp-automation",
  name: "WhatsApp Automation",
  title: "WhatsApp Automation for Small Businesses | Kavolith Group",
  description:
    "Automatic replies, enquiry capture and booking flows on WhatsApp, built around how your business actually answers customers. Scoped on a free call.",
  serviceType: "WhatsApp automation",
  faqs: FAQS,
};

export const Route = createFileRoute("/whatsapp-automation")({
  component: Page,
  head: () => solutionHead(META),
});

function Page() {
  return (
    <SolutionPage
      eyebrow="WhatsApp automation"
      h1="WhatsApp automation that answers, captures and routes every enquiry"
      answer="We connect your WhatsApp number to a workflow that replies to common questions, captures the lead details, and alerts your team so enquiries do not wait until morning."
      getItems={[
        "Instant first reply to common questions",
        "Lead details captured into Airtable or Google Sheets",
        "Alert to your team on Telegram, email or WhatsApp",
        "Appointment booking link inside the chat",
        "Handover to a human for anything unusual",
        "Written scope and handover documentation",
      ]}
      steps={[
        "Map your current replies and questions on a free call.",
        "Write the reply rules and the handover rules together.",
        "Build and test the workflow on Make.com or n8n.",
        "Hand over with documentation and a 30-day support window.",
      ]}
      proof="Our own lead pipeline captures every enquiry, classifies intent with AI and routes it to the right channel."
      fits={
        <>
          WhatsApp AI auto-responder is part of the Scale tier. Scoped on a free call; see{" "}
          <InlineLink to="/kavolith">/kavolith</InlineLink> for tiers.
        </>
      }
      faqs={FAQS}
    />
  );
}
