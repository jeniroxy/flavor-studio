"use client";

import { useState, type MouseEvent } from "react";

/*
 * Copies the code panel's text. It reads the <pre> beside it instead of
 * taking the code as a prop, so the reference's ~440 KB of samples are not
 * serialised a second time into the client payload.
 */
export function CopyCode() {
  const [state, setState] = useState<"idle" | "done" | "error">("idle");

  async function copy(e: MouseEvent<HTMLButtonElement>) {
    const pre = e.currentTarget.closest("[data-code]")?.querySelector("pre");
    try {
      await navigator.clipboard.writeText(pre?.textContent ?? "");
      setState("done");
    } catch {
      setState("error");
    }
    window.setTimeout(() => setState("idle"), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="min-h-[32px] rounded-[var(--radius-xs)] px-2.5 text-[12px] font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
    >
      <span aria-live="polite">
        {state === "done"
          ? "Copied"
          : state === "error"
            ? "Copy failed"
            : "Copy"}
      </span>
    </button>
  );
}
