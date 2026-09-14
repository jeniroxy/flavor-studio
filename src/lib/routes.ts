/** Every page in the v2 site, and the anchors the cross-links target. */
export const routes = {
  home: "/",
  features: "/features",
  /** One page per module, /features/<module id>. */
  feature: (id: string) => `/features/${id}`,
  agent: "/ai-agent",
  solutions: "/solutions",
  solution: (slug: string) => `/solutions/${slug}`,
  enterprise: "/enterprise",
  developers: "/developers",
  pricing: "/pricing",
  customers: "/customers",
  stories: "/success-stories",
  story: (slug: string) => `/success-stories/${slug}`,
  news: "/news",
  contact: "/contact",
  /*
   * Demo requests get their own page rather than sharing /contact. Both render
   * the same form, but the visitor's intent differs — and so do the heading,
   * the submit label and the `intent` flag on the payload.
   */
  demo: "/request-demo",
  privacy: "/privacy",
  faq: "/faq",
} as const;

/*
 * Login and Sign Up are NOT part of this site. Credentials are issued by the
 * application and its session cookie is scoped to the app subdomain, so
 * authentication has to happen there — the marketing site only links out.
 */
export const appUrl = "https://app.flavorstudio.com";
export const loginUrl = appUrl;
export const signupUrl = `${appUrl}/signup`;

export type NavKey =
  | "product"
  | "agent"
  | "solutions"
  | "resources"
  | "pricing"
  | "enterprise"
  | "";

export const contactEmail = "info@senspirellc.com";
export const supportEmail = "support@senspirellc.com";
export const salesEmail = "sales@senspirellc.com";
export const phone = "(650) 251-4429";
export const phoneHref = "tel:+16502514429";
export const linkedin = "https://www.linkedin.com/company/senspire";

/** The trial line that sits beside every primary CTA. */
export const trialLine = "14-day free trial. No credit card.";
