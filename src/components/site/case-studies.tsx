import { Translate } from "@/i18n";
export type CaseStudy = {
  id: string;
  tag: string;
  title: string;
  problem: string;
  solution: string;
  outcome: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "advocate-portal",
    tag: "Legal / Property",
    title: "Advocate portal for a legal & property practice",
    problem:
      "Client intake, title-document requests, and case updates all arrived by phone and messaging apps, so nothing was tracked in one place and follow-ups depended on memory.",
    solution:
      "We built a client-facing portal with structured intake forms, automatic document-request checklists, and an internal queue that assigns each new matter and posts status updates back to the client.",
    outcome:
      "Intake is now recorded consistently, document collection follows a repeatable checklist, and the practice can see the state of every matter without chasing individual staff.",
  },
  {
    id: "ro-water",
    tag: "RO Water Purification",
    title: "Lead-response automation for an RO water purification business",
    problem:
      "Enquiries came in from ads, walk-ins, and referrals at all hours, and were often answered hours later — by which point prospects had already called a competitor.",
    solution:
      "We connected every enquiry source into one pipeline, added an automated first response with service-area and product qualification, and routed qualified enquiries straight to the technician scheduling team.",
    outcome:
      "Every enquiry now gets an immediate acknowledgement, the sales team starts each day with an ordered list instead of a scattered inbox, and after-hours leads are no longer lost.",
  },
  {
    id: "real-estate-builder",
    tag: "Real Estate",
    title: "Pipeline and referral automation for a real estate builder",
    problem:
      "Site-visit requests, channel-partner referrals, and repeat-buyer enquiries lived in separate spreadsheets, making it unclear which leads were active and who owned them.",
    solution:
      "We unified sources into a single pipeline with stage tracking, automated site-visit reminders, and a referral-attribution flow so each channel partner's leads stay traceable end to end.",
    outcome:
      "Sales leadership can see the live pipeline in one view, site visits are confirmed without manual calling rounds, and referral credit is no longer disputed.",
  },
  {
    id: "cafe",
    tag: "Small Business",
    title: "Order and enquiry handling for a neighbourhood cafe",
    problem:
      "Bulk-order enquiries, catering requests, and reservation messages arrived across social channels and were handled inconsistently between shifts.",
    solution:
      "We set up a single intake point with automated replies for common questions, a structured catering enquiry form, and daily digests routed to the owner.",
    outcome:
      "Staff no longer improvise responses, catering enquiries arrive with the details needed to quote, and the owner reviews everything in one daily summary.",
  },
];

export const AUTOMATION_CASE_STUDIES: CaseStudy[] = [
  {
    id: "lead-routing",
    tag: "Lead Routing",
    title: "Round-robin lead routing across a distributed sales team",
    problem:
      "Inbound leads were claimed manually, so some reps had overloaded pipelines while others sat idle, and slow claims meant slow first contact.",
    solution:
      "We built a routing workflow that assigns each new lead by territory and availability, notifies the owner instantly, and escalates if there is no first touch.",
    outcome:
      "Assignment is now instant and even, and unattended leads surface automatically instead of going quiet.",
  },
  {
    id: "invoicing",
    tag: "Invoicing",
    title: "Invoice generation and follow-up for a services firm",
    problem:
      "Invoices were assembled by hand from timesheets and chased over email whenever someone remembered.",
    solution:
      "We automated invoice drafting from approved work records, scheduled delivery, and set up reminder sequences for outstanding balances.",
    outcome:
      "Billing runs on a predictable cycle and reminders go out without anyone maintaining a chase list.",
  },
  {
    id: "crm-sync",
    tag: "CRM Sync",
    title: "Two-way CRM sync for a multi-tool operations stack",
    problem:
      "Contact and deal data drifted between the CRM, the support tool, and finance spreadsheets, so no system could be trusted.",
    solution:
      "We implemented a two-way sync with field mapping, conflict rules, and a reconciliation log for anything that fails validation.",
    outcome:
      "Teams work from consistent records, and mismatches are visible and fixable instead of silently accumulating.",
  },
];

function CaseStudyCardBase({ study }: { study: CaseStudy }) {
  return (
    <article className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        {study.tag}
      </div>
      <h3 className="mt-3 text-lg">{study.title}</h3>
      <dl className="mt-4 space-y-3 text-sm leading-relaxed">
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Problem
          </dt>
          <dd className="mt-1 text-muted-foreground">{study.problem}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Solution
          </dt>
          <dd className="mt-1 text-muted-foreground">{study.solution}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Outcome
          </dt>
          <dd className="mt-1 text-foreground">{study.outcome}</dd>
        </div>
      </dl>
    </article>
  );
}

export function CaseStudyCard({ ...props }: Parameters<typeof CaseStudyCardBase>[0]) {
  return (
    <Translate>
      <CaseStudyCardBase {...props} />
    </Translate>
  );
}
