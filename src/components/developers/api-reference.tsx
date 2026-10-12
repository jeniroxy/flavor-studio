import type { ReactNode } from "react";
import { CopyCode } from "@/components/developers/copy-code";

/*
 * Renders the API reference ported from flavorstudio.com/api. The content
 * lives in src/content/api-reference.json, generated from the live page's
 * HTML: every text node is the live page's, only the markup is renamed into
 * the roles below. Rows pair the prose (left) with its code (right), as the
 * live reference does; below xl they stack.
 */

type Line = { method: string; path: string; href?: string };
export type ApiNode =
  | string
  | {
      t: string;
      c?: ApiNode[];
      id?: string;
      href?: string;
      req?: boolean;
      title?: string;
      code?: string;
      methods?: string[];
      url?: string;
      lines?: Line[];
    };
export type ApiArticle = { id: string; title: string; body: ApiNode[] };
export type ApiSection = ApiArticle & { articles: ApiArticle[] };

/* Method badges: GET reads, POST writes. Text stays ink for contrast; the
   tint only tells the two apart at a glance. */
const METHOD_TINT: Record<string, string> = {
  GET: "bg-teal-100",
  POST: "bg-blue-200",
  DELETE: "bg-red-100",
};

function Method({ m }: { m: string }) {
  return (
    <span
      className={`inline-flex rounded-[var(--radius-xs)] px-1.5 py-0.5 font-mono text-[11px] leading-none font-semibold text-ink ${METHOD_TINT[m] ?? "bg-panel-2"}`}
    >
      {m}
    </span>
  );
}

function CodePanel({ title, code }: { title: string; code: string }) {
  return (
    <div
      data-code
      className="overflow-hidden rounded-[var(--radius-md)] bg-night-2"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 py-1.5 pr-1.5 pl-4">
        <span className="font-mono text-[12px] text-white/80">{title}</span>
        <CopyCode />
      </div>
      <pre
        tabIndex={0}
        aria-label={title}
        className="m-0 max-h-[460px] overflow-auto p-4 font-mono text-[12.5px] leading-[1.6] text-[#e6e6e6]"
      >
        {code}
      </pre>
    </div>
  );
}

function Endpoints({ title, lines }: { title: string; lines: Line[] }) {
  return (
    <div className="rounded-[var(--radius-md)] bg-panel p-4">
      <div className="font-mono text-[12px] text-ink-2">{title}</div>
      <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
        {lines.map((l, i) => (
          <li key={i} className="flex items-baseline gap-2.5">
            <Method m={l.method} />
            {l.href ? (
              <a
                href={l.href}
                className="font-mono text-[13px] break-all text-ink underline-offset-[3px] hover:underline"
              >
                {l.path}
              </a>
            ) : (
              <span className="font-mono text-[13px] break-all text-ink">
                {l.path}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function kids(n: ApiNode[] | undefined): ReactNode {
  return n?.map((k, i) => <Node key={i} n={k} />);
}

function Node({ n }: { n: ApiNode }): ReactNode {
  if (typeof n === "string") return n;
  const c = n.c;
  switch (n.t) {
    case "row": {
      const hasRight = c?.some((k) => typeof k !== "string" && k.t === "right");
      return (
        <div
          className={`mt-6 grid gap-6 ${hasRight ? "xl:grid-cols-2 xl:gap-10" : ""}`}
        >
          {kids(c)}
        </div>
      );
    }
    case "left":
      return <div className="min-w-0">{kids(c)}</div>;
    case "right":
      return <div className="flex min-w-0 flex-col gap-4">{kids(c)}</div>;
    case "block":
      return <div className="mt-5">{kids(c)}</div>;
    case "p":
      return (
        <p className="my-3 text-[15px] leading-[1.7] text-ink-2 first:mt-0">
          {kids(c)}
        </p>
      );
    case "b":
      return <b className="font-semibold text-ink">{kids(c)}</b>;
    case "i":
      return <i>{kids(c)}</i>;
    case "code":
      return (
        <code className="rounded-[var(--radius-xs)] bg-panel px-1 py-px font-mono text-[0.88em] text-ink">
          {kids(c)}
        </code>
      );
    case "a":
      return (
        <a
          href={n.href}
          className="font-medium text-blue-700 underline underline-offset-[3px]"
        >
          {kids(c)}
        </a>
      );
    case "br":
      return <br />;
    case "sub":
      return (
        <div className="mt-6 mb-2 text-[13.5px] font-semibold text-ink first:mt-0">
          {kids(c)}
        </div>
      );
    case "params":
      return (
        <ul className="m-0 list-none divide-y divide-hairline border-y border-hairline p-0">
          {c?.map((k, i) =>
            typeof k === "string" ? null : (
              <li key={i} className="py-3">
                {kids(k.c)}
              </li>
            ),
          )}
        </ul>
      );
    case "phead":
      /* The spaces between name, type and status are kept: flex ignores them
         visually, but copy-paste and screen readers need them. */
      return (
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          {kids(c)}
        </div>
      );
    case "pname":
      return (
        <span className="font-mono text-[13.5px] font-semibold break-all text-ink">
          {kids(c)}
        </span>
      );
    case "ptype":
      return (
        <span className="font-mono text-[12px] text-ink-2">{kids(c)}</span>
      );
    case "pstatus":
      return (
        <span
          className={`text-[12px] ${n.req ? "font-bold text-ink" : "text-ink-2"}`}
        >
          {kids(c)}
        </span>
      );
    case "indent":
      return (
        <div className="mt-2 border-l-2 border-hairline pl-4">{kids(c)}</div>
      );
    case "ul":
      return (
        <ul className="my-3 flex list-disc flex-col gap-1.5 pl-5 text-[15px] leading-[1.7] text-ink-2">
          {kids(c)}
        </ul>
      );
    case "li":
      return <li>{kids(c)}</li>;
    case "pre":
      return (
        <pre className="my-2 overflow-x-auto rounded-[var(--radius-sm)] bg-panel p-3 font-mono text-[12.5px] leading-[1.6] text-ink">
          {n.code}
        </pre>
      );
    case "codetitle":
      return (
        <div className="text-[13.5px] font-semibold text-ink">{kids(c)}</div>
      );
    case "http":
      return (
        <div className="-mt-2 flex flex-wrap items-center gap-2 rounded-[var(--radius-sm)] border border-hairline px-3 py-2.5">
          {n.methods?.map((m) => (
            <Method key={m} m={m} />
          ))}
          <code className="font-mono text-[13px] break-all text-ink">
            {n.url}
          </code>
        </div>
      );
    case "editor":
      return <CodePanel title={n.title ?? ""} code={n.code ?? ""} />;
    case "endpoints":
      return <Endpoints title={n.title ?? ""} lines={n.lines ?? []} />;
    case "h4":
      return (
        <h4
          id={n.id}
          className="mt-10 scroll-mt-[96px] font-mono text-[16px] font-semibold text-ink"
        >
          {kids(c)}
        </h4>
      );
    case "table":
      return (
        <div className="mt-4 overflow-x-auto rounded-[var(--radius-md)] border border-hairline">
          <table className="w-full min-w-[720px] border-collapse text-left text-[13.5px] leading-[1.6] text-ink-2">
            {kids(c)}
          </table>
        </div>
      );
    case "thead":
      return <thead className="bg-panel">{kids(c)}</thead>;
    case "tbody":
      return <tbody>{kids(c)}</tbody>;
    case "tr":
      return (
        <tr className="border-t border-hairline first:border-t-0">{kids(c)}</tr>
      );
    case "th":
      return (
        <th className="px-4 py-3 text-[12.5px] font-semibold text-ink">
          {kids(c)}
        </th>
      );
    case "td":
      return <td className="px-4 py-3 align-top">{kids(c)}</td>;
    case "small":
      return <span className="text-[13px]">{kids(c)}</span>;
    case "spacer":
      /* The live table pads a code column with an empty line so its rows
         stay level with the message column. */
      return <span aria-hidden="true">&nbsp;</span>;
    default:
      return <>{kids(c)}</>;
  }
}

export function ApiReference({ sections }: { sections: ApiSection[] }) {
  return (
    <div className="flex flex-col">
      {sections.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={`scroll-mt-[96px] ${i ? "mt-16 border-t border-hairline pt-14" : ""}`}
        >
          <h2 className="font-display text-[clamp(26px,2.6vw,34px)] leading-[1.15] font-bold tracking-[-0.02em] text-ink">
            {s.title}
          </h2>
          {kids(s.body)}
          {s.articles.map((a) => (
            <article
              key={a.id}
              id={a.id}
              className="mt-12 scroll-mt-[96px] border-t border-hairline pt-10"
            >
              <h3 className="font-display text-[22px] leading-[1.25] font-bold tracking-[-0.01em] text-ink">
                {a.title}
              </h3>
              {kids(a.body)}
            </article>
          ))}
        </section>
      ))}
    </div>
  );
}
