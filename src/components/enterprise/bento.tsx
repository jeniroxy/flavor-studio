import Image from "next/image";
import { FlowPlayer } from "@/components/flow-player";
import { RevealStagger } from "@/components/reveal";
import { IconTile } from "@/components/ui";
import { productAssets } from "@/lib/assets";
import { whyPoints } from "@/lib/data";
import { flows } from "@/lib/flows";

/*
 * "Built for enterprise scalability, security and control" — ClickUp's bento
 * of admin cards, filled with the controls Flavor Studio actually has. The
 * two-factor cell plays the real setup flow from the design file; the
 * versions cell shows the real version switcher.
 */

const oneModule = whyPoints.find((p) => p.title.startsWith("Use one module"));

function CellText({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <>
      <IconTile name={icon} />
      <h3 className="font-display mt-5 text-[18px] leading-[1.25] font-bold text-ink">
        {title}
      </h3>
      <p className="mt-2 text-[14px] leading-[1.6] text-ink-2">{body}</p>
    </>
  );
}

export function EnterpriseBento() {
  return (
    <RevealStagger
      stagger={0.07}
      className="hairline-grid md:grid-cols-2 lg:grid-cols-4"
    >
      <div className="flex flex-col p-6 md:col-span-2 lg:row-span-2">
        <CellText
          icon="key-one"
          title="Two-factor authentication"
          body="Through an authenticator app, phone or email. Verification preferences are set per user and enforced by the organisation."
        />
        <div className="mt-6 max-w-[460px]">
          <FlowPlayer
            flow={flows.twoFactor}
            sizes="(max-width: 1024px) 100vw, 460px"
            dwell={3000}
          />
        </div>
      </div>
      <div className="p-6">
        <CellText
          icon="peoples"
          title="Per-user and per-group rights"
          body="Separate edit and read rights on every recipe, set per user or per group. Privileges, groups and defined roles for everything else."
        />
      </div>
      <div className="p-6">
        <CellText
          icon="history"
          title="Audit history"
          body="The History tool records every modification to a recipe, when and by whom. Sign-on IP addresses are logged for traceability."
        />
      </div>
      <div className="p-6">
        <CellText
          icon="calculator-one"
          title="Workspace-level cost assumptions"
          body="Labour, overhead, packaging and waste defined once in Recipes Admin Settings, applied by condition, and re-costed everywhere on edit."
        />
      </div>
      <div className="p-6">
        <CellText
          icon="all-application"
          title={oneModule?.title ?? "Use one module or all eighteen"}
          body={
            oneModule?.body ??
            "Unlike an ERP, nothing here demands a full rollout. Teams usually start with recipes and labels, then add the rest."
          }
        />
      </div>
      <div className="grid items-center gap-6 p-6 md:col-span-2 lg:col-span-4 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <CellText
            icon="branch-one"
            title="Unlimited versions"
            body="Duplicate a recipe into as many versions as a project needs — V1, Testing, Final — and compare nutrition and cost side by side. Taste-test results stay attached to the exact version they scored."
          />
        </div>
        <div className="frame bg-panel">
          <Image
            src={productAssets.recipeVersions.src}
            alt={productAssets.recipeVersions.alt}
            width={productAssets.recipeVersions.width}
            height={productAssets.recipeVersions.height}
            sizes="(max-width: 1024px) 100vw, 640px"
            className="w-full"
          />
        </div>
      </div>
    </RevealStagger>
  );
}
