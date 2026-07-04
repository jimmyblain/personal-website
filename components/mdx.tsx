import type { MDXComponents } from "mdx/types"
import type { ComponentPropsWithoutRef } from "react"
import Link from "next/link"
import { CopyButton } from "@/components/copy-button"
import { Embed } from "@/components/embed"

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

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-12 text-[26px] font-semibold leading-tight tracking-[-0.015em]" {...props} />
  ),
  h3: (props) => <h3 className="mt-10 text-xl font-semibold tracking-[-0.01em]" {...props} />,
  p: (props) => <p className="mt-6 text-lg leading-[1.8]" {...props} />,
  ul: (props) => <ul className="mt-6 list-disc space-y-2 pl-6 text-lg leading-[1.8]" {...props} />,
  ol: (props) => <ol className="mt-6 list-decimal space-y-2 pl-6 text-lg leading-[1.8]" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-10 border-l-[3px] border-accent pl-6 text-xl font-medium leading-[1.6] [&_p]:mt-0 [&_p]:text-xl [&_p]:font-medium"
      {...props}
    />
  ),
  a: Anchor,
  figure: Figure,
  hr: () => <hr className="my-12 border-border-subtle" />,
  Embed,
}
