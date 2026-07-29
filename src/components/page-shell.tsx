import type { ReactNode } from "react";
import { BlockStack } from "@/components/layout-primitives";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import type { NavKey } from "@/lib/routes";

/**
 * Every subpage: sticky nav, a stack of box blocks on the gray canvas, then the
 * full-width footer. `fill` makes the stack grow so short pages (Login, FAQ,
 * Contact) still push the footer to the bottom of the viewport.
 */
export function PageShell({
  active = "",
  children,
  fill = false,
}: {
  active?: NavKey;
  children: ReactNode;
  fill?: boolean;
}) {
  return (
    <div className="bg-canvas flex min-h-screen flex-col text-[color:var(--text-body)]">
      <SiteNav active={active} />
      <BlockStack className={fill ? "flex-1" : ""}>{children}</BlockStack>
      <SiteFooter />
    </div>
  );
}
