"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import { routes } from "@/lib/routes";

/*
 * Sign-in form. There is no auth backend behind this — the confirmation state
 * says so rather than pretending to log anyone in.
 */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const fieldClass =
  "rounded-[10px] border border-gray-300 bg-white px-[14px] py-3 font-sans text-[14.5px] text-slate-800 outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(89,163,235,.28)]";
const labelClass =
  "flex flex-col gap-[6px] text-[13px] font-bold text-slate-700";

export function SignInCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState("");

  const submit = () => {
    if (!email.trim() || !password) {
      setError("Enter your work email and password.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("That email doesn't look right — mind checking it?");
      return;
    }
    setError("");
    setSignedIn(true);
  };

  if (signedIn) {
    return (
      <div className="flex flex-col items-center gap-[13px] px-[6px] py-[26px] text-center">
        <span className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-teal-100">
          <Icon name="check-one" className="text-[27px] text-teal-500" />
        </span>
        <div className="font-display text-[21px] font-extrabold text-slate-800">
          Signing you in…
        </div>
        <p className="max-w-[34ch] text-[14px] leading-[1.6] text-slate-500">
          This is a design prototype, so there&rsquo;s no live workspace behind
          it yet.
        </p>
        <button
          type="button"
          onClick={() => {
            setSignedIn(false);
            setEmail("");
            setPassword("");
            setError("");
          }}
          className="cursor-pointer text-[14px] font-bold text-blue-600"
        >
          Back to sign in
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
      <div>
        <div className="font-display text-[21px] font-extrabold text-slate-800">
          Sign in
        </div>
        <div className="mt-[5px] text-[13.5px] text-slate-400">
          Use the email your workspace was created with.
        </div>
      </div>

      <label className={labelClass}>
        Work email
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="username"
          placeholder="dana@company.com"
          className={fieldClass}
        />
      </label>

      <label className={labelClass}>
        Password
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          className={fieldClass}
        />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex cursor-pointer items-center gap-2 text-[13px] text-slate-600">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-[15px] w-[15px] accent-blue-500"
          />
          Keep me signed in
        </label>
        <a href="#reset" className="text-[13px] font-bold text-blue-600">
          Forgot password?
        </a>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-[10px] bg-[#fdecec] px-[14px] py-[10px] text-[13px] font-semibold text-[#c0393d]"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        className="cursor-pointer rounded-full bg-blue-500 py-[14px] text-center text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(89,163,235,.34)] transition-[background] duration-[180ms] hover:bg-blue-600"
      >
        Sign in
      </button>

      <div className="flex items-center gap-3 text-[11.5px] font-bold tracking-[.08em] text-slate-300 uppercase">
        <span className="h-px flex-1 bg-gray-300" />
        or
        <span className="h-px flex-1 bg-gray-300" />
      </div>

      <button
        type="button"
        onClick={() => setSignedIn(true)}
        className="hover:bg-gray-050 flex cursor-pointer items-center justify-center gap-[9px] rounded-full border border-gray-300 bg-white py-[13px] text-center text-[14.5px] font-bold text-slate-800 transition-[background] duration-[180ms]"
      >
        <Icon name="key-one" className="text-[17px] text-slate-500" />
        Continue with SSO
      </button>

      <div className="text-center text-[13px] text-slate-400">
        No workspace yet?{" "}
        <a href={routes.contact} className="font-bold text-blue-600">
          Request a demo
        </a>
      </div>
    </form>
  );
}
