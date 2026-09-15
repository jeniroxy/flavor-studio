import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeatureTemplate } from "@/components/features/feature-template";
import { PageShell } from "@/components/page-shell";
import {
  featureModule,
  featurePages,
  getFeaturePage,
} from "@/lib/feature-pages";

/*
 * /features/<module id> — one page per module on ClickUp's feature Template A.
 * Content comes from src/lib/feature-pages.ts; the set of ids from the same
 * list, so the static export emits exactly one page per module.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return featurePages.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const page = getFeaturePage(id);
  if (!page) return {};
  const mod = featureModule(page);
  return {
    title: `${mod.label} — ${page.h1} ${page.tail}`,
    description: page.lede,
  };
}

export default async function FeaturePageRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = getFeaturePage(id);
  if (!page) notFound();
  return (
    <PageShell active="product">
      <FeatureTemplate page={page} />
    </PageShell>
  );
}
