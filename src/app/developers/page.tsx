import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icon";
import {
  Block,
  BlueButton,
  GhostButton,
  HeroBackdrop,
  SectionHeading,
  SectionLabel,
} from "@/components/layout-primitives";
import { PageShell } from "@/components/page-shell";
import { Reveal, RevealStagger } from "@/components/reveal";
import { contactEmail, routes, supportEmail } from "@/lib/routes";

/*
 * The Developers section, absent from the first design round.
 *
 * The client called this "a very important part of the publicly available
 * website, especially for companies that want to integrate Flavor Studio with
 * their existing systems" — so it is a top-level page in the nav rather than a
 * link buried in the footer.
 *
 * Everything stated here is drawn from what Flavor Studio already publishes
 * about its API (a full internet-based API exposing your data over industry
 * standards; the supported route for bulk export). Deliberately NOT invented:
 * endpoint paths, parameter names, auth scheme specifics, payload shapes and
 * rate limits. Those blocks are marked as awaiting the real reference — see
 * `PendingReference` below — because a plausible-looking but wrong API doc is
 * worse than an honest gap, and integrators will try to build against it.
 *
 * To publish the real thing: supply the OpenAPI/Swagger definition or the
 * current docs export, and these sections render from it.
 */

export const metadata: Metadata = {
  title: "Developers",
  description:
    "The Flavor Studio API, webhooks and integration options — connect recipes, ingredients, projects and CRM data to your ERP, plant systems and internal tools.",
};

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

const INTEGRATIONS = [
  {
    icon: "factory-building",
    title: "ERP and plant systems",
    body: "Push approved formulas and specs into the system that runs production, and pull cost or inventory data back the other way.",
  },
  {
    icon: "funds",
    title: "Accounting",
    body: "Keep ingredient costs aligned with what your accounting package actually says, so margins are calculated off real numbers.",
  },
  {
    icon: "branch-one",
    title: "Plex and other external systems",
    body: "Companies running Plex — or any other external system with an accessible interface — can integrate through the API rather than re-keying data.",
  },
  {
    icon: "cloud-storage",
    title: "Internal tools and data warehouses",
    body: "The API is also the supported route for bulk export, so your own reporting stack can read from Flavor Studio directly.",
  },
];

const WEBHOOK_USES = [
  "Notify your ERP when a formula is approved",
  "Kick off a downstream job when a project passes a stage gate",
  "Sync a costing change into an internal dashboard as it happens",
  "Trigger a document build when a label is regenerated",
];

/*
 * A marked gap. Used wherever the page would otherwise have to invent API
 * detail — the client supplies the reference, and these become real content.
 */
function PendingReference({ title, needs }: { title: string; needs: string }) {
  return (
    <div className="rounded-[16px] border-2 border-dashed border-gray-300 bg-gray-050 px-[clamp(20px,2.4vw,30px)] py-[clamp(20px,2.4vw,28px)]">
      <div className="flex items-center gap-2 text-[11px] font-bold tracking-[.14em] text-slate-400 uppercase">
        <Icon name="doc-search" className="text-[15px]" />
        Awaiting source material
      </div>
      <div className="mt-[10px] text-[15px] font-bold text-slate-800">
        {title}
      </div>
      <p className="mt-2 max-w-[62ch] text-[14px] leading-[1.6] text-slate-500">
        {needs}
      </p>
    </div>
  );
}

export default function DevelopersPage() {
  return (
    <PageShell active="developers">
      <Block className="relative px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,7vw,96px)]">
        <HeroBackdrop />
        <div className="relative mx-auto max-w-[1180px]">
          <SectionLabel tone="dark">Developers</SectionLabel>
          <Reveal
            as="h1"
            delay={0.06}
            className="font-display mt-[14px] max-w-[18ch] text-[clamp(36px,4.6vw,60px)] leading-[1.08] font-extrabold tracking-[-0.02em] text-white"
          >
            Build Flavor Studio into your stack.
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-[18px] max-w-[58ch] text-[clamp(16px,1.5vw,18px)] leading-[1.65] text-[#aebdd0]"
          >
            A full internet-based API exposes your recipes, ingredients,
            projects and CRM data over industry standards — so Flavor Studio
            connects to the ERP, accounting package, plant system or internal
            tool you already run.
          </Reveal>
          <Reveal delay={0.18} className="mt-8 flex flex-wrap gap-[14px]">
            <BlueButton href={`mailto:${supportEmail}`}>
              Request API access
            </BlueButton>
            <GhostButton href="#integrations" radius="14px">
              See integration options
            </GhostButton>
          </Reveal>
        </div>
      </Block>

      {/* ------------------------------------------------------- what it covers */}
      <Block
        id="api"
        className="scroll-mt-[90px] bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(52px,6vw,84px)]"
      >
        <div className="mx-auto max-w-[1180px]">
          <div className="max-w-[640px]">
            <SectionLabel>The API</SectionLabel>
            <SectionHeading>What the API exposes.</SectionHeading>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-[18px] max-w-[60ch] text-[16px] leading-[1.65] text-slate-500"
            >
              Everything your team creates in Flavor Studio is reachable
              programmatically. It is also the easiest route to get your data
              out — including a one-click JSON download for an individual
              recipe.
            </Reveal>
          </div>

          <RevealStagger
            stagger={0.06}
            delay={0.14}
            className="mt-[clamp(28px,3.4vw,42px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-[clamp(14px,1.8vw,22px)]"
          >
            {RESOURCES.map((res) => (
              <div
                key={res.title}
                className="bg-gray-050 rounded-[18px] px-[22px] py-[20px]"
              >
                <Icon name={res.icon} className="text-[22px] text-blue-500" />
                <div className="mt-3 text-[16px] font-bold text-slate-800">
                  {res.title}
                </div>
                <div className="mt-[6px] text-[14px] leading-[1.55] text-slate-500">
                  {res.body}
                </div>
              </div>
            ))}
          </RevealStagger>

          <Reveal delay={0.2} className="mt-[clamp(26px,3vw,36px)]">
            <PendingReference
              title="Full endpoint reference"
              needs="Resource paths, request and response shapes, query parameters, pagination and error codes are published from the existing API documentation rather than rewritten by hand. Send the OpenAPI/Swagger definition or an export of the current reference and this section becomes a browsable, versioned reference."
            />
          </Reveal>
        </div>
      </Block>

      {/* ---------------------------------------------------------- auth */}
      <Block className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(52px,6vw,84px)]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-[clamp(30px,4vw,56px)]">
          <div>
            <SectionLabel>Authentication &amp; security</SectionLabel>
            <SectionHeading>Access on your terms.</SectionHeading>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-[18px] max-w-[54ch] text-[16px] leading-[1.65] text-slate-500"
            >
              Formulas are trade secrets, and API access is governed the same
              way the application is. All traffic is TLS-encrypted, accounts use
              two-step authentication, and sign-on IP addresses are logged for
              traceability.
            </Reveal>
            <RevealStagger
              stagger={0.05}
              delay={0.16}
              className="mt-5 flex flex-col gap-[10px]"
            >
              {[
                "TLS encryption on all API traffic",
                "Access scoped to your own workspace data",
                "User privileges and groups respected by the API",
                "Sign-on IP addresses logged",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-[10px] text-[14px] leading-[1.55] text-slate-700"
                >
                  <Icon
                    name="check-one"
                    className="mt-[3px] flex-none text-[15px] text-[#0e8b73]"
                  />
                  {item}
                </div>
              ))}
            </RevealStagger>
          </div>

          <Reveal delay={0.1} className="mt-[clamp(0px,1vw,14px)]">
            <PendingReference
              title="Credentials, token flow and rate limits"
              needs="The exact authentication scheme, how credentials are issued, token lifetime and any rate limiting are documented from the real implementation. We have deliberately not guessed at them here — integrators would build against the guess."
            />
          </Reveal>
        </div>
      </Block>

      {/* -------------------------------------------------------- webhooks */}
      <Block
        id="webhooks"
        className="scroll-mt-[90px] bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(52px,6vw,84px)]"
      >
        <div className="mx-auto max-w-[1180px]">
          <div className="max-w-[640px]">
            <SectionLabel>Webhooks</SectionLabel>
            <SectionHeading>React to changes as they happen.</SectionHeading>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-[18px] max-w-[60ch] text-[16px] leading-[1.65] text-slate-500"
            >
              Rather than polling the API on a schedule, have Flavor Studio call
              your system when something changes.
            </Reveal>
          </div>

          <RevealStagger
            stagger={0.06}
            delay={0.14}
            className="mt-[clamp(24px,3vw,36px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[14px]"
          >
            {WEBHOOK_USES.map((use) => (
              <div
                key={use}
                className="bg-gray-050 flex items-start gap-[10px] rounded-[16px] px-5 py-4 text-[14px] leading-[1.55] text-slate-700"
              >
                <Icon
                  name="lightning"
                  className="mt-[2px] flex-none text-[16px] text-blue-500"
                />
                {use}
              </div>
            ))}
          </RevealStagger>

          <Reveal delay={0.2} className="mt-[clamp(24px,3vw,34px)]">
            <PendingReference
              title="Event catalogue and payload shapes"
              needs="The list of subscribable events, their payloads, delivery guarantees, retry behaviour and signature verification come from the implementation. Supply those and this becomes a complete webhook reference."
            />
          </Reveal>
        </div>
      </Block>

      {/* ---------------------------------------------------- integrations */}
      <Block
        id="integrations"
        className="scroll-mt-[90px] bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(52px,6vw,84px)]"
      >
        <div className="mx-auto max-w-[1180px]">
          <div className="max-w-[640px]">
            <SectionLabel>Integrations</SectionLabel>
            <SectionHeading>Fits the systems you already run.</SectionHeading>
          </div>

          <RevealStagger
            stagger={0.07}
            delay={0.12}
            className="mt-[clamp(28px,3.4vw,42px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-[clamp(14px,1.8vw,22px)]"
          >
            {INTEGRATIONS.map((item) => (
              <div
                key={item.title}
                className="bg-gray-050 rounded-[18px] px-[24px] py-[22px]"
              >
                <Icon name={item.icon} className="text-[24px] text-blue-500" />
                <div className="mt-3 text-[16px] font-bold text-slate-800">
                  {item.title}
                </div>
                <div className="mt-2 text-[14px] leading-[1.6] text-slate-500">
                  {item.body}
                </div>
              </div>
            ))}
          </RevealStagger>

          <Reveal
            delay={0.2}
            className="mt-[clamp(24px,3vw,34px)] text-[14px] leading-[1.65] text-slate-500"
          >
            Building something specific? Write to{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="font-bold text-blue-600 hover:text-blue-700"
            >
              {contactEmail}
            </a>{" "}
            and we will put you in touch with the team that maintains the API.
          </Reveal>
        </div>
      </Block>

      <CtaBand
        title="Integrating Flavor Studio?"
        body="Tell us what you need to connect and we will walk your developers through the API on a call."
        className="py-[clamp(60px,7vw,100px)]"
        secondMark={false}
      >
        <BlueButton href={routes.demo}>Request a demo</BlueButton>
        <a
          href={`mailto:${supportEmail}`}
          className="rounded-[14px] border border-white/[.28] px-8 py-[15px] text-[16px] font-bold whitespace-nowrap text-white transition-[background] duration-[180ms] hover:bg-white/10"
        >
          Email technical support
        </a>
      </CtaBand>
    </PageShell>
  );
}
