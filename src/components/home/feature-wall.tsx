import { Reveal } from "@/components/reveal";
import { Container, Headline, Lede, Section } from "@/components/ui";
import { CapabilityHive } from "./capability-hive";

/*
 * The wall of features. It began as clickup.com's S4 (a 10×8 icon grid with
 * four hero tiles in the centre); it is now a honeycomb in the shape of the
 * Flavor Studio mark, the four module tiles inside it and each capability
 * hex opening a demo request, see capability-hive.tsx. The rules below still
 * govern which capabilities ship.
 *
 * Provenance rule: a cell goes on this wall only if it is named either by a
 * screen in the application design file (Figma "Flavor Studio Application")
 * or by flavorstudio.com's own published copy — most are in both. The split
 * is real: "Triangle tests", "Attribute scores", "Roles & rights", "ERP sync"
 * and "REST API" come from the old site's copy and FAQ ("connect any ERP,
 * accounting…"), not from a screen; "Timesheet", "Aggregate labels",
 * "Requirements builder", "Custom fields" and "Custom calculations" come from
 * screens the old site never showed.
 *
 * There is a third source, and it outranks the other two: the client's
 * written review of the redesign (see the client-feedback memory). It names
 * what the site must cover — Project Timeline, Project Board, Reports, API
 * integrations, Webhooks, Plex and other external systems, Publish Designer,
 * newer recipe and ingredient capabilities, and the wider publishing/export
 * options — and asks for more product detail, not less.
 *
 * Audited 2026-09-17. "Webhooks" was briefly cut for lacking a source and
 * then restored: the client review names it outright, as it does Plex. Do
 * not cut it again on the grounds that the old site and the design file are
 * silent — they are, and it still ships. Dropped instead: "Print templates"
 * (thin evidence, and "Reports" already covers reporting), "Types & tags",
 * "Duplicate versions" (covered by Version history) and "24/7 support" (a
 * support policy, not a capability). That freed the four cells which used to
 * overflow the 44 visible slots — custom fields, custom calculations,
 * overrun and servings — so they now render.
 *
 * The desktop hexagon has exactly 42 slots (two rings around the panel), so
 * "Timesheet" + "Running timer" and "AI Agent" + "Cited answers" were folded
 * into one hex each. A new capability means changing the hexagon's size or
 * folding another pair; see CELLS in capability-hive.tsx.
 */

export function FeatureWall() {
  return (
    <Section id="product" className="py-[var(--section-gap)]">
      <Container>
        <div className="mx-auto max-w-[780px] text-center">
          <Headline size="lg" tail="in Flavor Studio.">
            Every module, one ingredient library, all
          </Headline>
          <Lede className="mx-auto mt-4 max-w-[600px]">
            Eighteen modules that share one live cost model. Use one of them,
            or all of them.
          </Lede>
        </div>
      </Container>
      <Reveal
        delay={0.1}
        className="mx-auto mt-[clamp(32px,4vw,56px)] max-w-[var(--container)] px-4 sm:px-6"
      >
        <CapabilityHive />
      </Reveal>
    </Section>
  );
}
