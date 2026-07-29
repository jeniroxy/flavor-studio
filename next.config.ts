import type { NextConfig } from "next";

/*
 * STATIC_EXPORT=1 emits a plain HTML/CSS/JS bundle into `out/` that runs from
 * any static file server — no Node process needed. Every page here is already
 * static (the forms and the chat demo are client-side only), so nothing is lost
 * except next/image's on-demand optimisation.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

/*
 * The archived v2 design set is plain static HTML under `public/v2/`, one
 * `index.html` per route. Next serves `public/` at exact paths only — it does
 * no directory-index resolution — so `/v2` and `/v2/features` need rewrites to
 * reach those files. Static export drops rewrites, but there the host's own
 * directory index serves the same URLs, so this is only needed off `export`.
 */
const v2Routes = [
  "features",
  "pricing",
  "customers",
  "success-stories",
  "contact",
  "faq",
  "ai-agent",
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        async rewrites() {
          return [
            { source: "/v2", destination: "/v2/index.html" },
            ...v2Routes.map((slug) => ({
              source: `/v2/${slug}`,
              destination: `/v2/${slug}/index.html`,
            })),
          ];
        },
      }),
};

export default nextConfig;
