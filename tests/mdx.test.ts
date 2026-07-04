import { describe, expect, it } from "vitest"
import { stripFlowComments } from "../lib/mdx"

describe("stripFlowComments", () => {
  it("removes a standalone flow comment", () => {
    const result = stripFlowComments("a\n<!-- hi -->\nb")
    expect(result).not.toContain("hi")
    expect(result).toContain("a")
    expect(result).toContain("b")
  })

  it("preserves a comment inside a fenced html code block", () => {
    const source = [
      "before",
      "",
      "```html",
      "<div>",
      "<!-- keep me -->",
      "</div>",
      "```",
      "",
      "after",
    ].join("\n")
    const result = stripFlowComments(source)
    expect(result).toContain("<!-- keep me -->")
  })

  it("preserves a fenced block with comment-like content spanning multiple lines", () => {
    const source = [
      "```xml",
      "<root>",
      "<!--",
      "multi line",
      "comment body",
      "-->",
      "</root>",
      "```",
    ].join("\n")
    const result = stripFlowComments(source)
    expect(result).toContain("<!--")
    expect(result).toContain("multi line")
    expect(result).toContain("comment body")
    expect(result).toContain("-->")
  })

  it("leaves normal content unchanged", () => {
    const source = "# Title\n\nSome **bold** text and a [link](https://example.com).\n"
    expect(stripFlowComments(source)).toBe(source)
  })
})
