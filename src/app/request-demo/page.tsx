import type { Metadata } from "next";
import { ContactSplit } from "@/components/contact/contact-split";
import { PageShell } from "@/components/page-shell";

/*
 * Demo requests were previously folded into /contact, which made a booking
 * request indistinguishable from a general enquiry. Same split-screen page,
 * distinct intent: the copy, the submit label and the `intent` on the payload
 * all say "demo".
 */

export const metadata: Metadata = {
  title: "Request a Demo",
  description:
    "Book a walkthrough of Flavor Studio on your own formulas — recipes, costing, nutrition labels, taste tests, projects and CRM.",
};

export default function RequestDemoPage() {
  return (
    <PageShell active="resources" fill>
      <ContactSplit intent="demo" />
    </PageShell>
  );
}
