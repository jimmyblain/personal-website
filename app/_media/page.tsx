import type { Metadata } from "next"
import { Embed } from "@/components/embed"
import { Shell } from "@/components/shell"
import { Window } from "@/components/window"
import { mediaItems } from "@/lib/media"
import { rssAlternate } from "@/lib/site"

export const metadata: Metadata = {
  title: "Media",
  description:
    "Conference talks and podcast conversations on agentic IT, identity, and the hands-on leader.",
  alternates: { canonical: "/media", types: rssAlternate() },
}

export default function MediaPage() {
  return (
    <Shell>
      <Window as="header" title="Media">
        <h1 className="font-pixel text-[2.6rem] leading-none md:text-[3rem] lg:text-[3.75rem]">Talks & appearances</h1>
        <p className="mt-3 max-w-[56ch] text-muted-foreground">
          Conference talks and podcast conversations on agentic IT, identity, and the hands-on
          leader.
        </p>
      </Window>

      <Window title={`Appearances · ${mediaItems.length}`} aria-label="Appearances">
        <div className="grid gap-7 md:grid-cols-2">
          {mediaItems.map((item) => (
            <figure key={item.title} className={item.featured ? "md:col-span-2" : ""}>
              <Embed {...item} />
              <figcaption className="mt-3">
                <h2 className="text-lg font-semibold leading-snug">{item.title}</h2>
                <p className="px-label mt-1 text-muted-foreground">{item.meta}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Window>
    </Shell>
  )
}
