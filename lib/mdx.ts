/**
 * MDX cannot parse a bare `<!-- -->` HTML comment in flow content — it throws
 * at parse time, before any remark/rehype plugin gets a chance to run. So
 * comments must be stripped from the raw source string before handing it to
 * `MDXRemote`.
 *
 * A naive `source.replace(/<!--[\s\S]*?-->/g, "")` over the whole document
 * would also delete comments that appear inside fenced code blocks (e.g. an
 * HTML/XML/SVG snippet in a ```html fence showing `<!-- ... -->`), which is
 * legal content that must render as-is. To avoid that, we split the source
 * on fenced code blocks and only strip comments from the segments that fall
 * *outside* a fence, leaving fence bodies untouched.
 *
 * Known residual gap: `<!--` inside an *inline* code span (single backticks)
 * within flow text is not specially protected here. That's a rare edge case
 * (an inline comment-shaped string outside a fence) and is left unhandled
 * for now.
 */
export function stripFlowComments(source: string): string {
  const fenceSplit = /(^```[\s\S]*?^```|^~~~[\s\S]*?^~~~)/m
  const segments = source.split(fenceSplit)

  return segments
    .map((segment, index) => {
      // Odd indices are the captured fenced blocks — leave them untouched.
      if (index % 2 === 1) return segment
      return segment.replace(/<!--[\s\S]*?-->/g, "")
    })
    .join("")
}
