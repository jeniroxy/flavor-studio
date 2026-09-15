"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { routes } from "@/lib/routes";

/*
 * One form, two intents.
 *
 * The client asked that a visitor who came to *request a demo* be
 * distinguishable from one who just wants to *contact us* — the fields are the
 * same, but the message label, the submit label, the confirmation copy and the
 * `intent` field on the payload all change. `intent` is also rendered as a
 * hidden input so a non-JS form post carries it too, letting the team route and
 * report on the two separately.
 *
 * Fields follow ClickUp's contact-sales form (work email, first and last name,
 * company, a size select) with the two selects that matter for a food R&D
 * conversation: how many products, and what the person does.
 *
 * Validation and the success state are client-side only — there is no backend
 * yet. Wire `submit` to a real endpoint when one exists; the payload it builds
 * is the shape to send.
 */

export type FormIntent = "demo" | "contact";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const COPY: Record<
  FormIntent,
  {
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    confirmTitle: string;
    confirmBody: string;
    again: string;
    footnote: string;
  }
> = {
  demo: {
    messageLabel: "What are you working on? (optional)",
    messagePlaceholder:
      "e.g. Reformulating a granola bar line for reduced sugar, exporting to Canada next year…",
    submit: "Submit",
    confirmTitle: "Demo request received.",
    confirmBody:
      "we’ll reach out within one business day to schedule your demo. Bring a recipe.",
    again: "Send another request",
    footnote: "We reply within one business day. No credit card, no spam.",
  },
  contact: {
    messageLabel: "How can we help?",
    messagePlaceholder:
      "e.g. A question about label formats, integrations, or your existing account…",
    submit: "Send message",
    confirmTitle: "Message sent.",
    confirmBody: "we’ll get back to you within one business day.",
    again: "Send another message",
    footnote: "We reply within one business day.",
  },
};

const SKU_OPTIONS = ["1–10", "11–50", "51–200", "200+"];

const ROLE_OPTIONS = [
  "R&D / formulation",
  "Regulatory / labeling",
  "Costing / procurement",
  "Sales / account management",
  "Sensory / QA",
  "Founder / leadership",
  "IT / systems",
  "Academic",
  "Other",
];

const fieldClass =
  "w-full rounded-[10px] border border-hairline bg-white px-3.5 py-[11px] text-[14px] text-ink outline-none transition-colors duration-200 placeholder:text-ink-4 focus:border-blue-600";
const labelClass = "flex flex-col gap-1.5 text-[13px] font-medium text-ink-2";

function Required() {
  return (
    <span aria-hidden="true" className="text-red-500">
      {" "}
      *
    </span>
  );
}

export function DemoForm({ intent = "demo" }: { intent?: FormIntent }) {
  const copy = COPY[intent];

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [skus, setSkus] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = () => {
    if (
      !email.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !company.trim()
    ) {
      setError("Please fill in your work email, name and company.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("That email doesn't look right — mind checking it?");
      return;
    }
    setError("");
    // The payload a real endpoint should receive. `intent` is what separates a
    // demo request from a general enquiry.
    void {
      intent,
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      company: company.trim(),
      skus,
      role,
      message: message.trim(),
    };
    setSent(true);
  };

  const reset = () => {
    setSent(false);
    setEmail("");
    setFirstName("");
    setLastName("");
    setCompany("");
    setSkus("");
    setRole("");
    setMessage("");
    setError("");
  };

  if (sent) {
    return (
      <div
        className="flex flex-col items-center gap-3.5 px-2 py-8 text-center"
        style={{ animation: "fsPopIn .35s var(--ease-out) both" }}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime-100">
          <Icon name="check-one" className="text-[28px] text-green-600" />
        </span>
        <div className="font-display text-[22px] font-bold text-ink">
          {copy.confirmTitle}
        </div>
        <p className="max-w-[38ch] text-[14px] leading-[1.6] text-ink-2">
          Thanks{firstName ? `, ${firstName.trim()}` : ""} — {copy.confirmBody}
        </p>
        <button
          type="button"
          onClick={reset}
          className="cursor-pointer text-[14px] font-semibold text-blue-700 hover:text-blue-600"
        >
          {copy.again}
        </button>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      noValidate
    >
      <input type="hidden" name="intent" value={intent} />

      <label className={labelClass}>
        <span>
          Work email
          <Required />
        </span>
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          required
          className={fieldClass}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          <span>
            First name
            <Required />
          </span>
          <input
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            required
            className={fieldClass}
          />
        </label>
        <label className={labelClass}>
          <span>
            Last name
            <Required />
          </span>
          <input
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name"
            required
            className={fieldClass}
          />
        </label>
      </div>

      <label className={labelClass}>
        <span>
          Company
          <Required />
        </span>
        <input
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          autoComplete="organization"
          required
          className={fieldClass}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Number of products / SKUs
          <select
            name="skus"
            value={skus}
            onChange={(e) => setSkus(e.target.value)}
            className={`${fieldClass} appearance-auto`}
          >
            <option value="">Select…</option>
            {SKU_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          Role
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`${fieldClass} appearance-auto`}
          >
            <option value="">Select…</option>
            {ROLE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className={labelClass}>
        {copy.messageLabel}
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder={copy.messagePlaceholder}
          className={`${fieldClass} resize-y leading-[1.5]`}
        />
      </label>

      {error && (
        <div
          role="alert"
          className="rounded-[10px] bg-red-100 px-3.5 py-2.5 text-[13px] font-medium text-red-500"
        >
          {error}
        </div>
      )}

      <button type="submit" className="btn btn-primary btn-lg mt-1 w-full">
        {copy.submit}
      </button>
      <p className="text-center text-[12px] leading-[1.5] text-ink-3">
        By submitting, you agree to our{" "}
        <Link href={routes.privacy} className="underline">
          Privacy Policy
        </Link>
        . {copy.footnote}
      </p>
    </form>
  );
}
