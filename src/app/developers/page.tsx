import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { ApiNav, type ApiNavEntry } from "@/components/developers/api-nav";
import {
  ApiReference,
  type ApiSection,
} from "@/components/developers/api-reference";
import { PageShell } from "@/components/page-shell";
import { Headline, Section } from "@/components/ui";

/*
 * The Flavor Studio API reference, word for word from flavorstudio.com/api
 * (ported 2026-10-12): every section, endpoint, parameter, code sample,
 * webhook event and error code. The content is generated into
 * src/content/api-reference.json by scripts/api-reference.py; edit the
 * script and regenerate rather than hand-editing the JSON.
 *
 * Read with fs rather than imported: a ~1 MB JSON import makes TypeScript
 * infer a type for every node. Read during render, so `next dev` picks up a
 * regenerated file; the page is static, so in production it runs at build.
 */

function readReference() {
  return JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "src/content/api-reference.json"),
      "utf8",
    ),
  ) as { title: string; nav: ApiNavEntry[]; sections: ApiSection[] };
}

export const metadata: Metadata = {
  title: "Flavor Studio API",
  description:
    "Flavor Studio’s API has predictable, resource-oriented URLs, and uses JSON to indicate API errors.",
};

/* Wider than the site container: the sidebar, the prose and the code panels
   sit side by side, as on the live reference. */
const WRAP = "mx-auto w-full max-w-[1440px] px-[clamp(20px,3vw,32px)]";

export default function DevelopersPage() {
  const ref = readReference();
  return (
    <PageShell active="product">
      <Section className="pt-[clamp(48px,7vw,96px)] pb-[clamp(32px,4vw,56px)]">
        <div className={WRAP}>
          {/* "Flavor Studio API", the live page's h1, with the site's grey tail.
              No reveal: on a page this heavy the fade would wait for
              hydration and leave the title blank. */}
          <Headline as="h1" size="hero" tail="API" reveal={false}>
            Flavor Studio
          </Headline>
        </div>
      </Section>

      <Section className="pb-[clamp(64px,8vw,120px)]">
        <div
          className={`${WRAP} grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]`}
        >
          <aside className="hidden lg:block">
            <ApiNav
              nav={ref.nav}
              className="panel sticky top-[84px] max-h-[calc(100vh-104px)] overflow-y-auto p-3"
            />
          </aside>
          <details className="panel p-3 lg:hidden">
            <summary className="flex min-h-[44px] cursor-pointer items-center px-1 text-[15px] font-semibold text-ink">
              Contents
            </summary>
            <ApiNav nav={ref.nav} className="mt-2" />
          </details>
          <div className="min-w-0">
            <ApiReference sections={ref.sections} />
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
