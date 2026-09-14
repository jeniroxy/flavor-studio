import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import type { NavKey } from "@/lib/routes";

/**
 * Every page: announcement bar + sticky nav, the page's sections stacked with
 * the shared section rhythm, then the footer. `fill` pushes the footer to the
 * bottom of short pages.
 */
export function PageShell({
  active = "",
  children,
  fill = false,
  className = "",
}: {
  active?: NavKey;
  children: ReactNode;
  fill?: boolean;
  className?: string;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-[color:var(--text-body)]">
      <SiteNav active={active} />
      <main className={`${fill ? "flex-1" : ""} ${className}`}>{children}</main>
      <SiteFooter />
    </div>
  );
}
