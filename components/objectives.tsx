import type { Heading } from "@/lib/headings"
import { Window } from "@/components/window"

function Items({ headings }: { headings: Heading[] }) {
  return (
    <ul className="flex flex-col gap-0.5 text-[15px] leading-snug">
      {headings.map((h) => (
        <li key={h.slug}>
          <a
            href={`#${h.slug}`}
            className="flex min-h-9 items-center gap-2.5 py-1 text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            <span aria-hidden className="size-2 shrink-0 bg-primary" />
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  )
}

/**
 * A post's section list, built from its `##` headings (see lib/headings.ts).
 * `sidebar` is the desktop window under the menu; `inline` is a closed disclosure for phones.
 */
export function Objectives({
  headings,
  variant,
}: {
  headings: Heading[]
  variant: "sidebar" | "inline"
}) {
  if (headings.length < 2) return null

  if (variant === "sidebar") {
    return (
      <Window as="nav" aria-label="In this post" title="Objectives" className="hidden p-6 md:block">
        <Items headings={headings} />
      </Window>
    )
  }
  return (
    <details className="win group p-4 md:hidden">
      <summary className="px-label flex min-h-9 cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
        Objectives
        <span aria-hidden className="text-primary group-open:rotate-90">
          ▶
        </span>
      </summary>
      <nav aria-label="In this post" className="mt-2">
        <Items headings={headings} />
      </nav>
    </details>
  )
}
