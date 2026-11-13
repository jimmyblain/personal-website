import { describe, expect, it } from "vitest"
import { getHeadings, headingSlugger, slugifyHeading } from "../lib/headings"

describe("slugifyHeading", () => {
  it("lowercases and hyphenates", () => {
    expect(slugifyHeading("Step 3 (optional): control who can connect")).toBe(
      "step-3-optional-control-who-can-connect",
    )
  })

  it("drops apostrophes rather than splitting the word", () => {
    expect(slugifyHeading("Why Copilot connects and Claude doesn't")).toBe(
      "why-copilot-connects-and-claude-doesnt",
    )
    expect(slugifyHeading("Why Copilot connects and Claude doesn’t")).toBe(
      "why-copilot-connects-and-claude-doesnt",
    )
  })

  it("falls back to 'section' when nothing usable is left", () => {
    expect(slugifyHeading("???")).toBe("section")
  })
})

describe("headingSlugger", () => {
  it("numbers repeated titles so ids stay unique", () => {
    const slug = headingSlugger()
    expect(slug("Setup")).toBe("setup")
    expect(slug("Setup")).toBe("setup-2")
    expect(slug("Setup")).toBe("setup-3")
    expect(slug("Other")).toBe("other")
  })
})

describe("getHeadings", () => {
  it("returns only level-2 headings, in order", () => {
    const source = ["# Title", "", "## First", "text", "### Sub", "## Second"].join("\n")
    expect(getHeadings(source)).toEqual([
      { text: "First", slug: "first" },
      { text: "Second", slug: "second" },
    ])
  })

  it("ignores ## lines inside fenced code blocks", () => {
    const source = ["## Real", "", "```md", "## Not a heading", "```", "", "~~~", "## Nor this", "~~~", "## Also real"].join(
      "\n",
    )
    expect(getHeadings(source).map((h) => h.text)).toEqual(["Real", "Also real"])
  })

  it("strips inline code, links and emphasis from the text", () => {
    const source = "## Run `npm test` with [the docs](https://example.com) and **care**"
    expect(getHeadings(source)).toEqual([
      { text: "Run npm test with the docs and care", slug: "run-npm-test-with-the-docs-and-care" },
    ])
  })

  it("gives duplicate titles distinct slugs", () => {
    const source = ["## Setup", "## Setup"].join("\n")
    expect(getHeadings(source).map((h) => h.slug)).toEqual(["setup", "setup-2"])
  })

  it("ignores trailing closing hashes and whitespace", () => {
    expect(getHeadings("##   Spaced out ##  ")).toEqual([{ text: "Spaced out", slug: "spaced-out" }])
  })

  it("returns an empty list for a post with no headings", () => {
    expect(getHeadings("Just a paragraph.\n\nAnother.")).toEqual([])
  })
})
