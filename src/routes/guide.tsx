import { createFileRoute, Link } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import guideMarkdown from "../../docs/users_guide.md?raw";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Users guide — Bridge Crew" },
      {
        name: "description",
        content:
          "Step-by-step guide to Bridge Crew: open a room, invite the second human, summon the crew, grant the floor, and use context packs.",
      },
      { property: "og:title", content: "Users guide — Bridge Crew" },
      {
        property: "og:description",
        content: "How to run a Bridge Crew session, from sign-in to granting the floor.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
          Bridge Crew · users guide
        </p>
        <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
          Back to the lobby
        </Link>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-10">
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_code]:rounded [&_code]:bg-card [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs [&_h1]:mt-0 [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-foreground [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_hr]:border-border [&_img]:rounded-lg [&_img]:border [&_img]:border-border [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-foreground [&_table]:w-full [&_table]:text-left [&_td]:border-t [&_td]:border-border [&_td]:py-1.5 [&_td]:pr-4 [&_th]:pb-1.5 [&_th]:pr-4 [&_th]:text-foreground">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            urlTransform={(url) =>
              url.startsWith("images/") ? `/guide/${url.slice("images/".length)}` : url
            }
          >
            {guideMarkdown}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
