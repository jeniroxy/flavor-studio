"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/icon";

/*
 * The accordion, restyled to clickup.com's: hairline rows, question left,
 * chevron right, no card chrome. Open/close is a grid-template-rows
 * transition (0fr → 1fr) so the answer animates to its natural height.
 */

/*
 * An answer is either one paragraph, or blocks: paragraphs and bullet lists
 * (one level of nesting), as the /faq copy from flavorstudio.com needs.
 * Links are written inline as [label](href).
 */
type FaqListItem = string | { text: string; list: string[] };
export type FaqBlock = string | { list: FaqListItem[] };
export type FaqItem = { q: string; a: string | FaqBlock[] };

function Inline({ text, dark }: { text: string; dark: boolean }) {
  const cls = `font-medium underline underline-offset-[3px] ${dark ? "text-white" : "text-ink"}`;
  // split() with capture groups yields [text, label, href, text, …].
  const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 3 === 0) return part;
        if (i % 3 === 2) return null;
        const href = parts[i + 1];
        return href.startsWith("/") ? (
          <Link key={i} href={href} className={cls}>
            {part}
          </Link>
        ) : (
          <a key={i} href={href} className={cls}>
            {part}
          </a>
        );
      })}
    </>
  );
}

function Answer({ a, dark }: { a: FaqItem["a"]; dark: boolean }) {
  const blocks = typeof a === "string" ? [a] : a;
  return (
    <div
      className={`flex flex-col gap-3 pb-5 text-[15px] leading-[1.65] ${
        dark ? "text-[#b4b4b4]" : "text-ink-2"
      }`}
    >
      {blocks.map((b, i) =>
        typeof b === "string" ? (
          <p key={i}>
            <Inline text={b} dark={dark} />
          </p>
        ) : (
          <ul key={i} className="flex list-disc flex-col gap-1.5 pl-5">
            {b.list.map((li, j) => (
              <li key={j}>
                {typeof li === "string" ? (
                  <Inline text={li} dark={dark} />
                ) : (
                  <>
                    <Inline text={li.text} dark={dark} />
                    <ul className="mt-1.5 flex list-[circle] flex-col gap-1.5 pl-5">
                      {li.list.map((sub, k) => (
                        <li key={k}>
                          <Inline text={sub} dark={dark} />
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}

export function FaqAccordion({
  items,
  /** Index open on first paint; -1 for all closed. */
  defaultOpen = -1,
  /** Distinguishes groups when several accordions share a page. */
  groupKey = "",
  tone = "light",
  className = "",
}: {
  items: FaqItem[];
  defaultOpen?: number;
  groupKey?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const dark = tone === "dark";

  return (
    <div
      className={`border-t ${dark ? "border-hairline-dark" : "border-hairline"} ${className}`}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={`${groupKey}-${item.q}`}
            className={`border-b ${dark ? "border-hairline-dark" : "border-hairline"}`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className={`flex w-full cursor-pointer items-center justify-between gap-4 py-[18px] text-left text-[16px] font-medium ${
                dark ? "text-white" : "text-ink"
              }`}
            >
              <span>{item.q}</span>
              <Icon
                name="down"
                className={`shrink-0 text-[18px] transition-transform duration-200 ${
                  dark ? "text-[#b4b4b4]" : "text-ink-2"
                } ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-200 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              {/* inert keeps a closed answer's links out of the Tab order. */}
              <div className="overflow-hidden" inert={!isOpen}>
                <Answer a={item.a} dark={dark} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
