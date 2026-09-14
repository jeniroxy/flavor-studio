import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

/*
 * v2 type: Plus Jakarta Sans for display (the clickup.com headline face),
 * Inter for body and UI, JetBrains Mono for the uppercase eyebrows, column
 * headings and stat labels that ClickUp sets in Sometype Mono.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Flavor Studio — Software to replace the spreadsheets",
    template: "%s · Flavor Studio",
  },
  description:
    "The everything platform for food & beverage product development — recipes, ingredients, costing, nutrition labels, taste tests, projects, CRM and an AI Agent that knows your formulas.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
