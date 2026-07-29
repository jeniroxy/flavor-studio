"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";

/*
 * The demo-request form. Validation and the success state are client-side only
 * — the prototype had no backend, and none was specified here. Wire `submit` to
 * a real endpoint when one exists.
 */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const fieldClass =
  "rounded-[6px] border border-gray-300 bg-white px-3 py-[10px] font-sans text-[14px] text-slate-800 outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(89,163,235,.35)]";
const labelClass =
  "flex flex-col gap-[6px] text-[13px] font-semibold text-slate-700";

export function DemoForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = () => {
    if (!name.trim() || !email.trim()) {
      setError("Please add your name and work email.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("That email doesn't look right — mind checking it?");
      return;
    }
    setError("");
    setSent(true);
  };

  const reset = () => {
    setSent(false);
    setName("");
    setEmail("");
    setCompany("");
    setCategory("");
    setMessage("");
    setError("");
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-[14px] px-2 py-7 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100">
          <Icon name="check-one" className="text-[28px] text-teal-500" />
        </span>
        <div className="font-display text-[22px] font-extrabold text-slate-800">
          Request received.
        </div>
        <p className="max-w-[38ch] text-[14.5px] leading-[1.6] text-slate-500">
          Thanks{name ? `, ${name.split(" ")[0]}` : ""} — we&rsquo;ll reach out
          within one business day to schedule your demo. Bring a recipe.
        </p>
        <button
          type="button"
          onClick={reset}
          className="cursor-pointer text-[14px] font-bold text-blue-600"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-[18px]"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      noValidate
    >
      <div className="font-display text-[20px] font-extrabold text-slate-800">
        Request a demo
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-[14px]">
        <label className={labelClass}>
          Full name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dana Whitfield"
            className={fieldClass}
          />
        </label>
        <label className={labelClass}>
          Work email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="dana@company.com"
            type="email"
            className={fieldClass}
          />
        </label>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-[14px]">
        <label className={labelClass}>
          Company
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Northbake Co."
            className={fieldClass}
          />
        </label>
        <label className={labelClass}>
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`${fieldClass} appearance-auto`}
          >
            <option value="">Select one</option>
            <option value="bakery">Bakery &amp; snacks</option>
            <option value="beverage">Beverage</option>
            <option value="dairy">Dairy</option>
            <option value="supplements">Supplements</option>
            <option value="comanufacturing">Co-manufacturing</option>
            <option value="other">Other</option>
          </select>
        </label>
      </div>

      <label className={labelClass}>
        What are you working on?
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="e.g. Reformulating a granola bar line for reduced sugar, exporting to Canada next year…"
          className={`${fieldClass} resize-y leading-[1.5]`}
        />
      </label>

      {error && (
        <div
          role="alert"
          className="rounded-lg bg-red-100 px-[14px] py-[10px] text-[13px] font-semibold text-red-500"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        className="cursor-pointer rounded-[14px] bg-blue-500 py-[13px] text-center text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(89,163,235,.35)] transition-[background] duration-[180ms] hover:bg-blue-600"
      >
        Request a demo
      </button>
      <div className="text-center text-[12.5px] text-slate-400">
        We reply within one business day. No credit card, no spam.
      </div>
    </form>
  );
}
