import type { Metadata } from "next"
import { Embed } from "@/components/embed"
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
    <div className="mx-auto max-w-[900px] px-5 pb-24 pt-16">
      <p className="mono-label text-muted-foreground">Media</p>
      <h1 className="mt-4 text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] md:text-[2.75rem]">
        Talks & appearances
      </h1>
      <p className="mt-6 max-w-[56ch] text-lg leading-[1.75] text-muted-foreground">
        Conference talks and podcast conversations on agentic IT, identity, and the hands-on
        leader.
      </p>

      <div className="mt-12 grid gap-7 md:grid-cols-2">
        {mediaItems.map((item) => (
          <figure key={item.title} className={item.featured ? "md:col-span-2" : ""}>
            <Embed {...item} />
            <figcaption className="mt-4">
              <h2 className="text-[17px] font-semibold tracking-[-0.01em] md:text-lg">{item.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{item.meta}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
