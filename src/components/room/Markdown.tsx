import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

/**
 * Rendered markdown for a crew member's brief and the shared document. Colours come from the
 * surrounding text. HTML in the text stays text, links aren't followed and pictures from
 * elsewhere aren't loaded, so nothing in a reply can take the student out of the room or reach
 * the network.
 */
const COMPONENTS: Components = {
  h1: ({ children }) => <h3 className="mt-3 text-sm font-semibold first:mt-0">{children}</h3>,
  h2: ({ children }) => <h3 className="mt-3 text-sm font-semibold first:mt-0">{children}</h3>,
  h3: ({ children }) => <h4 className="mt-3 font-semibold first:mt-0">{children}</h4>,
  h4: ({ children }) => <h4 className="mt-2 font-semibold first:mt-0">{children}</h4>,
  p: ({ children }) => <p className="mt-2 first:mt-0">{children}</p>,
  ul: ({ children }) => <ul className="mt-2 list-disc space-y-1 pl-5 first:mt-0">{children}</ul>,
  ol: ({ children }) => <ol className="mt-2 list-decimal space-y-1 pl-5 first:mt-0">{children}</ol>,
  blockquote: ({ children }) => (
    <blockquote className="mt-2 border-l-2 border-current/30 pl-3 italic">{children}</blockquote>
  ),
  hr: () => <hr className="my-3 border-current/20" />,
  pre: ({ children }) => (
    <pre className="mt-2 overflow-x-auto rounded-md bg-black/25 p-2 font-mono text-[11px] leading-snug [&>code]:bg-transparent [&>code]:p-0">
      {children}
    </pre>
  ),
  code: ({ children }) => (
    <code className="rounded-sm bg-black/25 px-1 py-px font-mono text-[0.92em]">{children}</code>
  ),
  table: ({ children }) => (
    <div className="mt-2 overflow-x-auto">
      <table className="w-full border-collapse text-left">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-current/30 px-2 py-1 font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border-b border-current/10 px-2 py-1 align-top">{children}</td>
  ),
  a: ({ children, href }) => (
    <span className="underline decoration-dotted underline-offset-2" title={href}>
      {children}
    </span>
  ),
  img: ({ alt }) => <span className="italic">[picture{alt ? `: ${alt}` : ""}]</span>,
};

export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn("break-words", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={COMPONENTS}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
