import type { Metadata } from "next";
import { Manrope, Mulish } from "next/font/google";
import "./globals.css";

/*
 * Mulish stands in for Avenir Next (licensed, not web-distributable) and
 * Manrope is the display companion — the substitution the design system
 * documents in tokens/fonts.css.
 */
const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-mulish",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Flavor Studio — Own your formula, from idea to shelf",
    template: "%s · Flavor Studio",
  },
  description:
    "The unified platform for food & beverage product development — recipes, nutrition, labeling, projects and CRM, with an AI Agent that does the heavy lifting alongside you.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${mulish.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
