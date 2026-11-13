import type { Metadata } from "next"
import { EmptyPosts } from "@/components/empty-posts"
import { PostRow } from "@/components/post-row"
import { Shell } from "@/components/shell"
import { Window } from "@/components/window"
import { getAllPosts } from "@/lib/posts"
import { rssAlternate } from "@/lib/site"

export const metadata: Metadata = {
  title: "Blog",
  description: "Field notes from running enterprise IT and building the systems behind it.",
  alternates: { canonical: "/blog", types: rssAlternate() },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <Shell>
      <Window as="header" title="Journal">
        <h1 className="font-pixel text-[2.6rem] leading-none md:text-[3rem] lg:text-[3.75rem]">
          Notes on IT, AI & automation
        </h1>
        <p className="mt-3 max-w-[56ch] text-muted-foreground">
          Field notes from running enterprise IT and building the systems behind it.
        </p>
      </Window>

      <Window title={`Entries · ${posts.length}`} aria-label="All posts">
        <div className="flex flex-col gap-3">
          {posts.length === 0 ? (
            <EmptyPosts />
          ) : (
            posts.map((post) => <PostRow key={post.slug} post={post} showTags headingLevel="h2" />)
          )}
        </div>
      </Window>
    </Shell>
  )
}
