import Link from "next/link"
import { EmptyPosts } from "@/components/empty-posts"
import { PostRow } from "@/components/post-row"
import { Shell } from "@/components/shell"
import { Portrait } from "@/components/sprite"
import { Window } from "@/components/window"
import { getAllPosts } from "@/lib/posts"
import { achievements } from "@/lib/site"

const status = [
  { label: "Class", value: "IT Director & Systems Architect" },
  { label: "Guild", value: "The Rockefeller Foundation" },
  { label: "Experience", value: "Ten years, at global scale" },
]

export default function HomePage() {
  const recent = getAllPosts().slice(0, 3)

  return (
    <Shell
      aside={
        <Window title="Location" className="hidden p-6 md:block">
          <p className="px-label">New York City metro area</p>
        </Window>
      }
    >
      <Window title="Status">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7 md:flex-col md:items-start lg:flex-row lg:items-center">
          <Portrait />
          <div className="min-w-0">
            <h1 className="font-pixel text-[2.6rem] leading-none md:text-[3rem] lg:text-[3.75rem]">
              Jimmy Blain
            </h1>
            <dl className="mt-3.5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5">
              {status.map(({ label, value }) => (
                <div key={label} className="contents">
                  <dt className="px-label pt-1 text-primary">{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Window>

      <Window title="Message">
        <h2 className="max-w-[24ch] text-balance font-pixel text-[1.9rem] leading-[1.1] md:text-[2.4rem]">
          I run enterprise IT and still build the systems behind it.
        </h2>
        <p className="mt-3 max-w-[62ch] text-muted-foreground">
          I run enterprise IT the way few leaders still do: owning the strategy, budget, and
          vendors, and building the identity, cloud, and AI systems myself. Ten years of it, at
          global scale.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/blog" className="btn-cmd">
            Read the blog
          </Link>
          <Link
            href="/about"
            className="flex min-h-11 items-center text-link underline decoration-link/40 underline-offset-4 transition-colors duration-150 hover:text-link-hover"
          >
            About & resume
          </Link>
        </div>
      </Window>

      <Window title="Journal · recent writing" aria-labelledby="recent-writing">
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <h2 id="recent-writing" className="sr-only">
            Recent writing
          </h2>
          <Link
            href="/blog"
            className="ml-auto flex min-h-9 items-center text-sm text-link transition-colors duration-150 hover:text-link-hover"
          >
            All posts →
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {recent.length === 0 ? (
            <EmptyPosts />
          ) : (
            recent.map((post) => <PostRow key={post.slug} post={post} showTags />)
          )}
        </div>
      </Window>

      <Window title="Achievements" aria-labelledby="achievements">
        <h2 id="achievements" className="sr-only">
          Achievements
        </h2>
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {achievements.map(({ stat, detail }) => (
            <li key={stat} className="text-[15px] leading-normal text-muted-foreground">
              <b className="mb-1 block font-pixel text-[2.1rem] font-normal leading-none text-primary md:text-[2.4rem]">
                {stat}
              </b>
              {detail}
            </li>
          ))}
        </ul>
      </Window>
    </Shell>
  )
}
