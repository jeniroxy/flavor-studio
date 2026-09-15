"use client";

import { PillTabs } from "@/components/pill-tabs";
import { IconTile } from "@/components/ui";

/*
 * ClickUp's integrations page switches a 3-column icon list between
 * "Native integrations", "Automatic Import" and "More". Ours is honest about
 * what Flavor Studio ships: what is built into the product, what moves in
 * and out as files, and what goes through the API and webhooks.
 */

type Item = { icon: string; name: string; desc: string };
type Tab = {
  id: string;
  label: string;
  title: string;
  sub: string;
  items: Item[];
};

const TABS: Tab[] = [
  {
    id: "native",
    label: "Native",
    title: "Built into the product",
    sub: "Connections that work the day you sign up, with nothing to configure.",
    items: [
      {
        icon: "leaves",
        name: "USDA SR28 database",
        desc: "Over 9,000 ingredients with nutrients and allergens built in, beside your own custom ingredients.",
      },
      {
        icon: "file-pdf-one",
        name: "Vendor spec sheet import",
        desc: "The tool reads a supplier PDF and pulls the nutrient values onto the ingredient.",
      },
      {
        icon: "cloud-storage",
        name: "Google Drive, Dropbox, OneDrive",
        desc: "Upload recipe and ingredient images straight from cloud storage, or from your computer.",
      },
      {
        icon: "key-one",
        name: "Authenticator apps",
        desc: "Two-factor authentication through any standard authenticator app, phone or email.",
      },
      {
        icon: "doc-detail",
        name: "Label engine export",
        desc: "PNG for internal drafts, high-resolution vector PDF for the packaging designer.",
      },
      {
        icon: "printer",
        name: "Print and publish",
        desc: "Recipes, labels, composition and claims laid out through the Publish Designer and printed directly.",
      },
    ],
  },
  {
    id: "files",
    label: "Import & export",
    title: "Your data, in the format the recipient needs",
    sub: "Every publish sets region, method and file type. Nothing is locked in.",
    items: [
      {
        icon: "file-excel",
        name: "CSV for Excel",
        desc: "Export recipes and ingredient data as CSV for the spreadsheets that are not going away yet.",
      },
      {
        icon: "file-word",
        name: "Word download",
        desc: "Published recipes and specs downloaded for Word, laid out through your own template.",
      },
      {
        icon: "file-pdf-one",
        name: "Read-only PDF",
        desc: "Publish read-only PDFs for customers and co-manufacturers.",
      },
      {
        icon: "lock",
        name: "Encrypted FS format",
        desc: "Carries embedded custom ingredients to Flavor Studio users outside your company.",
      },
      {
        icon: "file-code",
        name: "JSON, one click",
        desc: "Download any recipe as a JSON file in seconds — the quickest way to get your data out.",
      },
      {
        icon: "upload",
        name: "Supplier PDF in",
        desc: "Nutrients imported from a vendor spec sheet, or copied from another ingredient.",
      },
    ],
  },
  {
    id: "api",
    label: "API & webhooks",
    title: "Connect the systems you already run",
    sub: "A full internet-based API exposes your data using industry standards.",
    items: [
      {
        icon: "api",
        name: "REST API",
        desc: "Recipes, ingredients, projects and CRM data, readable and writable from your own systems.",
      },
      {
        icon: "lightning",
        name: "Webhooks",
        desc: "Flavor Studio calls your system when something changes, instead of your system polling.",
      },
      {
        icon: "factory-building",
        name: "ERP and plant systems",
        desc: "Push approved formulas and specs into production; pull cost or inventory data back.",
      },
      {
        icon: "funds",
        name: "Accounting packages",
        desc: "Keep ingredient costs aligned with what accounting actually says, so margins are real.",
      },
      {
        icon: "branch-one",
        name: "Plex and other external systems",
        desc: "Companies running Plex — or any system with an accessible interface — integrate through the API.",
      },
      {
        icon: "download",
        name: "Bulk export",
        desc: "The API is the supported route for bulk export, so your own reporting stack can read directly.",
      },
    ],
  },
];

export function IntegrationTabs() {
  return (
    <PillTabs
      tabs={TABS}
      render={(tab) => (
        <div className="mt-10">
          <div className="text-center">
            <h2 className="font-display text-[clamp(26px,2.9vw,40px)] leading-[1.18] font-bold tracking-[-0.03em] text-ink">
              {tab.title}
            </h2>
            <p className="mt-2 text-[16px] text-ink-2">{tab.sub}</p>
          </div>
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {tab.items.map((item) => (
              <li key={item.name} className="flex items-start gap-4">
                <IconTile name={item.icon} />
                <div>
                  <div className="text-[15px] font-semibold text-ink">
                    {item.name}
                  </div>
                  <p className="mt-1 text-[13px] leading-[1.6] text-ink-2">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    />
  );
}
