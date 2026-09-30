import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { IntegrationTabs } from "@/components/developers/integration-tabs";
import { PageShell } from "@/components/page-shell";
import { Reveal, RevealStagger } from "@/components/reveal";
import {
  Button,
  CheckList,
  Container,
  Eyebrow,
  Headline,
  IconTile,
  Lede,
  RainbowCta,
  Section,
} from "@/components/ui";
import { productAssets } from "@/lib/assets";
import { contactEmail, routes, supportEmail } from "@/lib/routes";

/*
 * Integrations & API.
 *
 * The client called this "a very important part of the publicly available
 * website, especially for companies that want to integrate Flavor Studio with
 * their existing systems". Everything stated here is drawn from what Flavor
 * Studio already publishes about its API (a full internet-based API exposing
 * your data over industry standards; the supported route for bulk export).
 *
 * Deliberately NOT invented: endpoint paths, parameter names, the auth
 * scheme, payload shapes, rate limits, the webhook event list. Those blocks
 * are marked as awaiting the real reference (`PendingReference`), because a
 * plausible-looking but wrong API doc is worse than an honest gap —
 * integrators will build against it. Supply the OpenAPI/Swagger definition
 * or the current docs export and these become real content.
 */

export const metadata: Metadata = {
  title: "Integrations & API",
  description:
    "Connect your ERP, vendors and data to Flavor Studio — a REST API and webhooks over recipes, ingredients, projects and CRM, plus import and export in the formats your partners need.",
};

/* The systems teams connect. Text chips only: these are systems reached
   through the API, webhooks and import/export, not logos we own.

   Audited 2026-09-18: NetSuite, SAP, QuickBooks, Microsoft Dynamics, Shopify,
   Zapier and Slack were removed. None of them appears in flavorstudio.com's
   copy, in the application design file or in the client's review — they were
   lifted from the ClickUp teardown's sketch of an integrations marquee and
   shipped as if they were ours. This page is read by integrators, so a system
   is named here only when a source names it. Plex stays because the client's
   review asks for it by name; ERP and accounting are the legacy FAQ's words.
   Drive, Dropbox and OneDrive are real but narrower than the rest of this
   row: they are file sources on the Recipes screen (see lib/flows.ts), which
   is why they close the row rather than lead it. */
const ROW_A = [
  "ERP",
  "Plex",
  "Accounting packages",
  "Plant systems",
  "Any system with an accessible interface",
  "Google Drive",
  "Dropbox",
  "OneDrive",
];
const ROW_B = [
  "USDA SR28",
  "Vendor spec sheets (PDF)",
  "CSV / Excel",
  "Word",
  "Read-only PDF",
  "JSON",
  "Encrypted FS format",
  "Webhooks",
  "REST API",
  "Print",
  "Authenticator apps",
];

const RESOURCES = [
  {
    icon: "chef-hat-one",
    title: "Recipes & versions",
    body: "Formulas, their versions, ingredient lines, yield and cost data.",
  },
  {
    icon: "leaves",
    title: "Ingredients",
    body: "The ingredient library, including custom ingredients and supplier data.",
  },
  {
    icon: "doc-detail",
    title: "Nutrition & labels",
    body: "Calculated nutrition and the label output generated from a formula.",
  },
  {
    icon: "folder-open",
    title: "Projects & tasks",
    body: "Projects, stage gates, tasks and the recipes they are linked to.",
  },
  {
    icon: "peoples",
    title: "CRM",
    body: "Opportunities, activities, sample requests and shipment status.",
  },
  {
    icon: "experiment",
    title: "Taste tests",
    body: "Panels, attribute scores and the versions they were run against.",
  },
];

const WEBHOOK_USES = [
  "Notify your ERP when a formula is approved",
  "Kick off a downstream job when a project passes a stage gate",
  "Sync a costing change into an internal dashboard as it happens",
  "Trigger a document build when a label is regenerated",
];

const API_POINTS = [
  "TLS encryption on all API traffic",
  "Access scoped to your own workspace data",
  "User privileges and groups respected by the API",
  "Sign-on IP addresses logged",
];

/*
 * A marked gap. Used wherever the page would otherwise have to invent API
 * detail — the client supplies the reference, and these become real content.
 */
function PendingReference({ title, needs }: { title: string; needs: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-dashed border-panel-3 bg-white px-5 py-4">
      <Eyebrow tone="muted" className="text-[11px]">
        Awaiting source material
      </Eyebrow>
      <div className="mt-2 text-[14px] font-semibold text-ink">{title}</div>
      <p className="mt-1 text-[13px] leading-[1.6] text-ink-2">{needs}</p>
    </div>
  );
}

/*
 * The real admin screen for the card, from the application (Figma "synced to
 * dev" frames; keys masked in the app itself). It shows where the API and
 * webhooks live; the reference itself is still the gap marked below it.
 */
function AppScreen({
  shot,
  caption,
}: {
  shot: { src?: string; alt: string; width: number; height: number };
  caption: string;
}) {
  if (!shot.src) return null;
  return (
    <figure className="m-0 mt-6">
      <div className="overflow-hidden rounded-[12px] bg-white shadow-[0_18px_44px_rgba(22,34,58,0.14)] ring-1 ring-black/5">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes="(max-width: 1024px) 100vw, 560px"
          className="block w-full"
        />
      </div>
      <figcaption className="mt-2 text-[13px] leading-[1.5] text-ink-2">
        {caption}
      </figcaption>
    </figure>
  );
}

/** One row of text chips sliding left (or right); content is doubled so the
    -50% keyframe loops seamlessly. Pure CSS, paused for reduced motion. */
function ChipMarquee({
  items,
  reverse = false,
  duration = "60s",
}: {
  items: string[];
  reverse?: boolean;
  duration?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="mask-x overflow-hidden py-1.5">
      <div
        className={`marquee gap-3 ${reverse ? "marquee-reverse" : ""}`}
        style={{ "--marquee-duration": duration } as CSSProperties}
        aria-hidden="true"
      >
        {doubled.map((t, i) => (
          <span key={`${t}-${i}`} className="chip">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function DevelopersPage() {
  return (
    <PageShell active="product">
      {/* ------------------------------------------------------------ hero */}
      <Section className="pt-[clamp(48px,7vw,96px)] pb-[clamp(40px,5vw,64px)]">
        <Container wide className="text-center">
          <Headline as="h1" size="hero" className="mx-auto max-w-[18ch]">
            Connect your ERP, vendors and data{" "}
            <span className="tail">to Flavor Studio.</span>
          </Headline>
          <Lede className="mx-auto mt-5 max-w-[60ch]">
            A full internet-based API exposes your recipes, ingredients,
            projects and CRM data over industry standards — and webhooks call
            your systems when something changes. Whatever you run, it does not
            have to be re-keyed.
          </Lede>
          <Reveal delay={0.1} className="mt-8 flex justify-center">
            <Button href={routes.contact} size="lg" arrow>
              Talk to an integration engineer
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* --------------------------------------------------------- marquee */}
      <Section className="pb-[clamp(56px,7vw,110px)]">
        <Reveal className="mx-auto max-w-[var(--container)]">
          <ChipMarquee items={ROW_A} duration="55s" />
          <ChipMarquee items={ROW_B} reverse duration="65s" />
          <p className="eyebrow eyebrow-muted mt-5 text-center text-[11px]">
            Systems teams connect through the API, webhooks and import / export
          </p>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------ tabs */}
      <Section className="pb-[clamp(64px,8vw,120px)]">
        <Container wide>
          <Reveal>
            <IntegrationTabs />
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------- custom integrations */}
      <Section id="api" className="scroll-mt-[90px] pb-[clamp(64px,8vw,120px)]">
        <Container wide>
          <div className="mx-auto max-w-[780px] text-center">
            <Reveal>
              <Eyebrow className="mb-4">Custom integrations</Eyebrow>
            </Reveal>
            <Headline size="lg" tail="Flavor Studio API.">
              Build your own integration with the
            </Headline>
            <Lede className="mx-auto mt-4 max-w-[56ch]">
              Read and write your data from the systems you already run, or have
              Flavor Studio tell them when something changed.
            </Lede>
          </div>

          <RevealStagger
            stagger={0.1}
            className="mt-12 grid gap-4 lg:grid-cols-2"
          >
            <div className="panel flex flex-col p-[clamp(24px,3vw,36px)]">
              <div className="flex items-center justify-between gap-4">
                <IconTile name="api" />
                <span className="chip">Flavor Studio API</span>
              </div>
              <h3 className="font-display mt-6 text-[22px] leading-[1.25] font-bold text-ink">
                Everything your team creates, reachable programmatically
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-ink-2">
                Formulas are trade secrets, and API access is governed the same
                way the application is. It is also the easiest route to get your
                data out — including a one-click JSON download for an individual
                recipe.
              </p>
              <CheckList items={API_POINTS} className="mt-5" />
              <AppScreen
                shot={productAssets.apiDocs}
                caption="Admin › Settings › API in Flavor Studio, where the API is switched on and its keys are issued."
              />
              <div className="mt-6 flex flex-col gap-3">
                <PendingReference
                  title="Full endpoint reference"
                  needs="Resource paths, request and response shapes, query parameters, pagination and error codes are published from the existing API documentation rather than rewritten by hand. Send the OpenAPI/Swagger definition or an export of the current reference and this becomes a browsable, versioned reference."
                />
                <PendingReference
                  title="Credentials, token flow and rate limits"
                  needs="The exact authentication scheme, how credentials are issued, token lifetime and any rate limiting are documented from the real implementation. We have deliberately not guessed at them — integrators would build against the guess."
                />
              </div>
            </div>

            <div
              id="webhooks"
              className="panel flex scroll-mt-[90px] flex-col p-[clamp(24px,3vw,36px)]"
            >
              <div className="flex items-center justify-between gap-4">
                <IconTile name="link" />
                <span className="chip">Webhooks</span>
              </div>
              <h3 className="font-display mt-6 text-[22px] leading-[1.25] font-bold text-ink">
                React to changes as they happen
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-ink-2">
                Rather than polling the API on a schedule, have Flavor Studio
                call your system when something changes.
              </p>
              <CheckList items={WEBHOOK_USES} className="mt-5" tone="blue" />
              <AppScreen
                shot={productAssets.webhooks}
                caption="Admin › Webhooks in Flavor Studio: each endpoint with its recent error rate and status."
              />
              <div className="mt-auto flex flex-col gap-3 pt-6">
                <PendingReference
                  title="Event catalogue and payload shapes"
                  needs="The list of subscribable events, their payloads, delivery guarantees, retry behaviour and signature verification come from the implementation. Supply those and this becomes a complete webhook reference."
                />
              </div>
            </div>
          </RevealStagger>
        </Container>
      </Section>

      {/* ------------------------------------------------------- resources */}
      <Section className="pb-[clamp(64px,8vw,120px)]">
        <Container wide>
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <Headline size="md" className="max-w-[20ch]" tail="exposes.">
              What the API
            </Headline>
            <Reveal className="text-[14px] text-ink-2 lg:max-w-[44ch]">
              Building something specific? Write to{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="font-semibold text-ink"
              >
                {contactEmail}
              </a>{" "}
              and we will put you in touch with the team that maintains the API.
            </Reveal>
          </div>
          <RevealStagger
            stagger={0.06}
            className="hairline-grid mt-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {RESOURCES.map((r) => (
              <div key={r.title} className="p-6">
                <IconTile name={r.icon} />
                <h3 className="font-display mt-5 text-[17px] leading-[1.3] font-bold text-ink">
                  {r.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-ink-2">
                  {r.body}
                </p>
              </div>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      <RainbowCta
        title="One platform. Your systems. Connected."
        cta={{ label: "Talk to an integration engineer", href: routes.contact }}
        note={
          <>
            Or email technical support at{" "}
            <a href={`mailto:${supportEmail}`} className="underline">
              {supportEmail}
            </a>
          </>
        }
      />
    </PageShell>
  );
}
