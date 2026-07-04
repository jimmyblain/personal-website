import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PostRow } from "@/components/post-row"
import { getAllPosts } from "@/lib/posts"

export default function HomePage() {
  const recent = getAllPosts().slice(0, 3)

  return (
    <div className="mx-auto max-w-[760px] px-5 pb-24 pt-16 md:pt-20">
      <div className="flex items-center gap-3">
        <span aria-hidden className="h-[3px] w-6 rounded-full bg-warm-accent" />
        <p className="mono-label text-muted-foreground">
          Director, IT Operations — The Rockefeller Foundation
        </p>
      </div>

      <h1 className="mt-7 max-w-[16ch] text-[2rem] font-semibold leading-[1.06] tracking-[-0.03em] md:text-[3.75rem] md:leading-[1.03]">
        I run enterprise IT and still write the code behind it.
      </h1>

      <p className="mt-7 max-w-[56ch] text-lg leading-[1.75] text-muted-foreground">
        A hands-on IT director and systems architect — owning strategy, a $6.4M budget, and a
        40-vendor portfolio for a ~300-person org across four continents, while building the
        Python, MCP servers, and identity infrastructure directly.
      </p>

      <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
        <Button
          size="lg"
          className="rounded-lg px-[22px] max-sm:w-full"
          render={<Link href="/blog" />}
          nativeButton={false}
        >
          Read the blog →
        </Button>
        <Link
          href="/about"
          className="text-[15px] font-medium text-link transition-colors duration-150 hover:text-link-hover"
        >
          About & resume
        </Link>
      </div>

      <section className="mt-24" aria-labelledby="recent-writing">
        <div className="flex items-baseline justify-between">
          <h2 id="recent-writing" className="mono-label text-muted-foreground">
            Recent writing
          </h2>
          <Link
            href="/blog"
            className="text-sm text-link transition-colors duration-150 hover:text-link-hover"
          >
            All posts →
          </Link>
        </div>
        <div className="mt-5">
          {recent.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}
