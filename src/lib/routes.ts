/** Every page in the v3 site, and the anchors the cross-links target. */
export const routes = {
  home: "/",
  features: "/features",
  agent: "/ai-agent",
  pricing: "/pricing",
  customers: "/customers",
  stories: "/success-stories",
  contact: "/contact",
  faq: "/faq",
  login: "/login",
} as const;

export type NavKey = "features" | "agent" | "pricing" | "faq" | "";

export const contactEmail = "info@senspirellc.com";
export const supportEmail = "support@senspirellc.com";
export const salesEmail = "sales@senspirellc.com";
export const phone = "(650) 251-4429";
export const phoneHref = "tel:+16502514429";
export const linkedin = "https://www.linkedin.com/company/senspire";
