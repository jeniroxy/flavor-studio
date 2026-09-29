"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { ADD_MENU } from "./agent-data";

/*
 * The composer, to play with: the "+" menu is the design's six items, and
 * each one toggles what it adds into the question, the way the panel shows
 * it. Recipe names are the design's; the others are labelled by kind rather
 * than given invented file names or people.
 *
 * Nothing can be sent. The send button is visibly off and says why: the
 * client ruled out anything public that reaches their AI.
 */

type Key = (typeof ADD_MENU)[number]["label"];

/** What each menu item puts into the question. */
const ADDS: Record<Key, { chip: string; icon: string }[]> = {
  "Mention a recipe": [
    { chip: "Classic Fudge Brownie v3", icon: "file-text" },
    { chip: "Protein Brownie v3", icon: "file-text" },
  ],
  "Mention someone": [{ chip: "@ a colleague", icon: "user" }],
  "Add file or document": [{ chip: "A file or document", icon: "upload" }],
  "Add a link": [{ chip: "A link", icon: "link" }],
  "Use current page as context": [
    { chip: "This page: Recipes · List", icon: "doc-detail" },
  ],
  "Use AI Agent output as context": [
    { chip: "An earlier answer", icon: "copy" },
  ],
};

export function ComposerToy() {
  const [on, setOn] = useState<Key[]>(["Mention a recipe"]);
  const [menu, setMenu] = useState(true);

  // Escape closes the menu, as a menu should.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu]);

  const toggle = (k: Key) =>
    setOn((cur) => (cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]));

  const chips = ADD_MENU.filter((m) => on.includes(m.label)).flatMap((m) =>
    ADDS[m.label].map((a) => ({ ...a, key: `${m.label}-${a.chip}` })),
  );

  return (
    <div className="font-['Avenir_Next',var(--font-mulish),sans-serif] text-slate-800">
      <div className="relative rounded-[16px] border border-[#e9e9e9] bg-white p-3.5 shadow-float">
        <div className="flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#f3f3f6] px-2 py-1 text-[11.5px] text-slate-600">
            <span className="size-2 rounded-[2px] bg-lime-500" />
            Context: <b className="font-semibold text-slate-800">Recipes · List</b>
          </span>
          {chips.map((c) => (
            <span
              key={c.key}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#deedfb] px-2.5 py-1 text-[12px] font-semibold text-[#324561]"
              style={{ animation: "fsPopIn .3s var(--ease-out) both" }}
            >
              <Icon name={c.icon} className="text-[12px]" />
              {c.chip}
            </span>
          ))}
        </div>
        <p className="mt-3 min-h-[48px] text-[15px] leading-[1.5]">
          Show me the side by side nutritional labels of{" "}
          {on.includes("Mention a recipe") ? (
            <>
              <b className="text-blue-600">@Classic Fudge Brownie v3</b> vs{" "}
              <b className="text-blue-600">@Protein Brownie v3</b>
            </>
          ) : (
            <span className="text-slate-500">@…</span>
          )}
        </p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <button
            type="button"
            aria-expanded={menu}
            aria-controls="composer-menu"
            aria-label="Add to the question"
            onClick={() => setMenu((m) => !m)}
            className={`flex size-11 items-center justify-center rounded-[10px] border transition-colors ${
              menu ? "border-blue-600 bg-blue-050 text-blue-600" : "border-[#e9e9e9] text-slate-600 hover:border-blue-400"
            }`}
          >
            <Icon name="plus" className={`text-[18px] transition-transform ${menu ? "rotate-45" : ""}`} />
          </button>
          <span className="flex items-center gap-2.5">
            <span className="text-[12px] text-slate-600">Replay only, nothing is sent</span>
            <button
              type="button"
              disabled
              aria-label="Send (off on this website)"
              className="flex size-11 cursor-not-allowed items-center justify-center rounded-[10px] bg-[#c4cedd] text-white"
            >
              <Icon name="up" className="text-[16px]" />
            </button>
          </span>
        </div>

        {menu ? (
          <div
            id="composer-menu"
            role="group"
            aria-label="Add to the question"
            className="mt-3 grid rounded-[12px] border border-[#e9e9e9] bg-white p-1.5 sm:grid-cols-2"
            style={{ animation: "fsPopIn .25s var(--ease-out) both" }}
          >
            {ADD_MENU.map((m) => {
              const active = on.includes(m.label);
              return (
                <button
                  key={m.label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggle(m.label)}
                  className={`flex min-h-[44px] w-full items-center gap-3 rounded-[8px] px-3 text-left text-[14px] transition-colors ${
                    active ? "bg-blue-050 font-semibold" : "hover:bg-[#f3f3f6]"
                  }`}
                >
                  <span className="flex w-5 justify-center text-[16px] font-bold text-slate-600">
                    {"glyph" in m ? m.glyph : <Icon name={m.icon} />}
                  </span>
                  <span className="flex-1">{m.label}</span>
                  {active ? <Icon name="check" className="text-[15px] text-[#067a33]" /> : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
