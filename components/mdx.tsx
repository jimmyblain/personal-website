import type { MDXComponents } from "mdx/types"
import { isValidElement, type ComponentPropsWithoutRef, type ReactNode } from "react"
import Link from "next/link"
import { CopyButton } from "@/components/copy-button"
import { Embed } from "@/components/embed"
import { headingSlugger } from "@/lib/headings"

function Anchor({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const cls =
    "text-link underline decoration-link/40 underline-offset-4 transition-colors duration-150 hover:text-link-hover"
  if (href.startsWith("/")) return <Link href={href} className={cls} {...props} />
  if (href.startsWith("#")) return <a href={href} className={cls} {...props} />
  return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...props} />
}

/** Code-block frame from rehype-pretty-code; positions the Copy button in the chrome. */
function Figure(props: ComponentPropsWithoutRef<"figure">) {
  if ("data-rehype-pretty-code-figure" in props) {
    return (
      <figure {...props} className="relative">
        <CopyButton />
        {props.children}
      </figure>
    )
  }
  return <figure {...props} />
}

/** The text a reader sees in a rendered heading (through inline code, links, emphasis). */
function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(nodeText).join("")
  if (isValidElement(node)) return nodeText((node.props as { children?: ReactNode }).children)
  return ""
}

/**
 * Components for one post render. Call once per post: the `h2` ids come from a slugger that
 * numbers repeated titles, matching the Objectives list built by `getHeadings`.
 */
export function createMdxComponents(): MDXComponents {
  const slug = headingSlugger()
  return {
    h2: ({ children, ...props }) => (
      <h2
        id={slug(nodeText(children).replace(/\s+/g, " ").trim())}
        className="mt-11 scroll-mt-6 font-pixel text-[30px] font-normal leading-[1.1] md:text-[35px]"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: (props) => <h3 className="mt-8 text-xl font-semibold leading-snug" {...props} />,
    p: (props) => <p className="mt-5 leading-[1.7]" {...props} />,
    ul: (props) => <ul className="mt-5 list-disc space-y-2 pl-6 leading-[1.7] marker:text-primary" {...props} />,
    ol: (props) => <ol className="mt-5 list-decimal space-y-2 pl-6 leading-[1.7] marker:text-primary" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="my-8 rounded-md border-2 border-dashed border-border bg-muted px-5 py-4 text-lg font-medium leading-[1.6] [&_p]:mt-0"
        {...props}
      />
    ),
    table: (props) => (
      <div className="my-7 overflow-x-auto">
        <table className="w-full border-collapse text-base leading-[1.6]" {...props} />
      </div>
    ),
    th: (props) => (
      <th
        className="border-2 border-border px-3.5 py-2 text-left align-bottom font-pixel text-[20px] font-normal text-primary"
        {...props}
      />
    ),
    td: (props) => <td className="border-2 border-border px-3.5 py-2.5 align-top" {...props} />,
    a: Anchor,
    figure: Figure,
    hr: () => <hr className="my-10 border-t-2 border-dashed border-border" />,
    Embed,
  }
}
