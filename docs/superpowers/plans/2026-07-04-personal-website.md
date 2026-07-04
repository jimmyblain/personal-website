# jimmyblain.com Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Jimmy Blain's personal site — six static pages + a filesystem MDX blog where publishing a post = dropping one markdown file in `content/blog/` and pushing.

**Architecture:** Fully static Next.js App Router site (SSG, no backend). A single content layer (`lib/posts.ts`) reads flat `.md`/`.mdx` files with gray-matter and feeds every derived surface: index, post pages, tag pages, sitemap, RSS. Design tokens from the handoff (`design_handoff_personal_site/README.md` — the visual source of truth) map onto shadcn CSS variables.

**Tech Stack:** Next.js (App Router) + TypeScript, Tailwind CSS v4, shadcn/ui, `next-mdx-remote/rsc` + `gray-matter`, `rehype-pretty-code`/Shiki, `next-themes`, `lucide-react`, Vitest (dev-only, for lib logic).

## Global Constraints

- Stack exactly: Next.js App Router + TypeScript + Tailwind CSS + shadcn/ui, deployed on Vercel.
- **No Contentlayer. No database, no CMS, no auth, no backend server.** Static-first, minimal dependencies.
- Content stays plain, portable Markdown — never trapped in generated structures.
- Frontmatter schema: `title` (string), `date` (YYYY-MM-DD), `summary` (string), `tags` (string[]), `draft` (boolean, optional).
- `draft: true` posts: excluded from production build, index, tag pages, sitemap, and RSS; visible in `npm run dev`.
- Canonical domain: `https://jimmyblain.com` — only ever referenced via `site.url` in `lib/site.ts`.
- Design restraint rules (from handoff, non-negotiable): steel-blue (`#3A6375`/`#6AB0CD`) only for links and key actions — never decorative fills or gradients; tan (`#EBC6AD`) used exactly once (the JB monogram tile); active nav item = darker text, **not** blue.
- Both light and dark mode are first-class; everything comfortable at 375px width.
- Exact page copy comes from the handoff — it is quoted verbatim in the tasks below; do not paraphrase it.
- Library versions: use whatever `create-next-app@latest` / `shadcn@latest` scaffold. If generated file shapes differ from code shown here (e.g., oklch tokens, config format), keep the generated shape and merge our values into it.

---

### Task 1: Scaffold project + dependencies

**Files:**
- Create: entire Next.js scaffold at repo root (`app/`, `package.json`, `tsconfig.json`, `next.config.ts`, …), `components.json`, `components/ui/button.tsx`, `components/ui/sheet.tsx`
- Modify: `package.json` (add `test` script), `.gitignore`

**Interfaces:**
- Produces: working `npm run dev` / `npm run build` / `npx vitest run`; `cn()` at `lib/utils.ts`; shadcn `Button`, `Sheet` primitives; import alias `@/*`.

- [ ] **Step 1: Scaffold in scratchpad and copy in** (repo root is non-empty — `design_handoff_personal_site/`, `.claude/`, `docs/` would make `create-next-app` refuse)

```bash
cd /private/tmp/claude-502/-Users-JBlain-repos-personal-website/f958d05e-a4ee-4d60-b407-b78897027d08/scratchpad
npx create-next-app@latest scaffold --typescript --tailwind --eslint --app --no-src-dir --turbopack --import-alias "@/*" --yes
# copy everything except the scaffold's own .git into the real repo
rsync -a --exclude=.git scaffold/ /Users/JBlain/repos/personal-website/
cd /Users/JBlain/repos/personal-website && npm install
```

- [ ] **Step 2: shadcn init + primitives**

```bash
npx shadcn@latest init --yes -b neutral
npx shadcn@latest add button sheet --yes
```

- [ ] **Step 3: Runtime + dev dependencies**

```bash
npm install next-mdx-remote gray-matter next-themes rehype-pretty-code shiki remark-gfm
npm install -D vitest
```

Add to `package.json` scripts: `"test": "vitest run"`.

- [ ] **Step 4: Verify scaffold runs**

Run: `npm run build`
Expected: build succeeds, `/` route listed as static (○).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js + Tailwind + shadcn, add content/MDX deps"
```

---

### Task 2: Site config, design tokens, fonts, root layout

**Files:**
- Create: `lib/site.ts`
- Modify: `app/globals.css` (replace generated token values), `app/layout.tsx` (replace)

**Interfaces:**
- Produces: `site` object `{ name, title, description, url, email, resume, links: {linkedin, github}, nav: {href,label}[] }`; CSS vars/utilities `bg-warm-accent`, `text-warm-accent-foreground`, `text-link`, `border-border-subtle`, `.mono-label` class; fonts as `--font-geist-sans`/`--font-geist-mono` (Tailwind `font-sans`/`font-mono`); `<ThemeProvider>` wrapping the app.

- [ ] **Step 1: Write `lib/site.ts`**

```ts
export const site = {
  name: "jimmy blain",
  title: "Jimmy Blain — IT Director & systems architect",
  description:
    "I lead enterprise IT for a global foundation and build the systems myself — automation, AI agents, and identity infrastructure. Enterprise outcomes, delivered hands-on.",
  url: "https://jimmyblain.com",
  email: "glajummyblain@gmail.com",
  resume: "/resume.pdf",
  links: {
    linkedin: "https://www.linkedin.com/in/glajummyb",
    github: "https://github.com/jblain",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/media", label: "Media" },
    { href: "/contact", label: "Contact" },
  ],
} as const
```

- [ ] **Step 2: Replace token values in `app/globals.css`**

Keep the generated file's structure (`@import "tailwindcss"`, `tw-animate-css`, `@custom-variant dark`, `@theme inline` block, base layer). Replace the `:root` / `.dark` variable values and add custom tokens + utilities so the file contains:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: #ffffff;
  --foreground: #1b1e1f;
  --card: #ffffff;
  --card-foreground: #1b1e1f;
  --popover: #ffffff;
  --popover-foreground: #1b1e1f;
  --primary: #3a6375;
  --primary-foreground: #ffffff;
  --secondary: #eef2f2;
  --secondary-foreground: #1b1e1f;
  --muted: #eef2f2;
  --muted-foreground: #5b6465;
  --accent: #6ab0cd;
  --accent-foreground: #1b1e1f;
  --destructive: #b3261e;
  --border: #dbe2e3;
  --input: #dbe2e3;
  --ring: #3a6375;
  --radius: 0.75rem;
  /* custom (no shadcn slot) */
  --border-subtle: #eaefef;
  --border-strong: #c5d6d8;
  --link: #3a6375;
  --link-hover: #23404c;
  --warm-accent: #ebc6ad;
  --warm-accent-foreground: #77573c;
  /* code blocks are always dark (handoff specifies dark-only code styling) */
  --code-bg: #131515;
  --code-chrome: #1b1e1e;
  --code-fg: #c6cfd0;
  --code-border: #262a2a;
  --code-muted: #9aa6a7;
}

.dark {
  --background: #191b1b;
  --foreground: #ebf2f3;
  --card: #202323;
  --card-foreground: #ebf2f3;
  --popover: #202323;
  --popover-foreground: #ebf2f3;
  --primary: #6ab0cd;
  --primary-foreground: #14232a;
  --secondary: #262a2a;
  --secondary-foreground: #ebf2f3;
  --muted: #262a2a;
  --muted-foreground: #9aa6a7;
  --accent: #6ab0cd;
  --accent-foreground: #14232a;
  --destructive: #e5484d;
  --border: #333939;
  --input: #333939;
  --ring: #86bbd4;
  --border-subtle: #262a2a;
  --border-strong: #333939;
  --link: #86bbd4;
  --link-hover: #a5cde0;
}

@theme inline {
  /* keep every generated --color-* mapping, then add: */
  --color-border-subtle: var(--border-subtle);
  --color-border-strong: var(--border-strong);
  --color-link: var(--link);
  --color-link-hover: var(--link-hover);
  --color-warm-accent: var(--warm-accent);
  --color-warm-accent-foreground: var(--warm-accent-foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground antialiased;
  }
}

@layer components {
  /* handoff mono-label token: 11–13px mono, uppercase, wide tracking */
  .mono-label {
    @apply font-mono text-xs font-medium uppercase tracking-[0.12em];
  }
}
```

- [ ] **Step 3: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { site } from "@/lib/site"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s — Jimmy Blain" },
  description: site.description,
  alternates: {
    canonical: "./",
    types: { "application/rss+xml": `${site.url}/rss.xml` },
  },
  openGraph: {
    type: "website",
    siteName: site.title,
    url: site.url,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

(Navbar is added to this layout in Task 5.)

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: PASS (default home page still renders; fonts and tokens compile).

- [ ] **Step 5: Commit**

```bash
git add lib/site.ts app/globals.css app/layout.tsx
git commit -m "feat: design tokens, Geist fonts, site config, theme provider"
```

---

### Task 3: Content layer (`lib/posts.ts`) — TDD

**Files:**
- Create: `lib/posts.ts`, `tests/posts.test.ts`, `tests/fixtures/blog/first-post.md`, `tests/fixtures/blog/second-post.mdx`, `tests/fixtures/blog/draft-post.md`, `tests/fixtures/bad/missing-title.md`

**Interfaces:**
- Produces (consumed by Tasks 6, 8, 10, 11, 14):

```ts
export type Post = {
  slug: string; title: string; date: string; summary: string;
  tags: string[]; draft: boolean; readingTime: number; content: string;
}
type Options = { includeDrafts?: boolean; dir?: string }
export function getAllPosts(opts?: Options): Post[]            // newest first
export function getPostBySlug(slug: string, opts?: Options): Post | undefined
export function getAllTags(opts?: Options): { tag: string; slug: string; count: number }[]
export function tagToSlug(tag: string): string
export function formatDate(date: string): string               // "Jun 12, 2026"
```

- [ ] **Step 1: Write fixtures**

`tests/fixtures/blog/first-post.md`:

```md
---
title: First Post
date: 2026-01-15
summary: The first fixture post.
tags: [AI, Python]
---

Hello world. This is the first post body.
```

`tests/fixtures/blog/second-post.mdx`:

```md
---
title: "Second Post"
date: "2026-03-02"
summary: The second fixture post.
tags: [AI]
---

Second post body with **markdown**.
```

`tests/fixtures/blog/draft-post.md`:

```md
---
title: Draft Post
date: 2026-04-01
summary: Not published yet.
tags: [Leadership]
draft: true
---

Draft body.
```

`tests/fixtures/bad/missing-title.md`:

```md
---
date: 2026-01-01
summary: No title here.
tags: []
---

Body.
```

(Note `first-post.md` has an unquoted YAML date — gray-matter parses that as a JS `Date`; the second uses a quoted string. The parser must handle both.)

- [ ] **Step 2: Write the failing tests** — `tests/posts.test.ts`

```ts
import { describe, expect, it } from "vitest"
import path from "node:path"
import { formatDate, getAllPosts, getAllTags, getPostBySlug, tagToSlug } from "../lib/posts"

// import.meta.dirname requires Node 20.11+ (tests run as ESM under Vitest — no __dirname)
const dir = path.join(import.meta.dirname, "fixtures", "blog")
const badDir = path.join(import.meta.dirname, "fixtures", "bad")

describe("getAllPosts", () => {
  it("returns published posts sorted newest first, slug from filename", () => {
    const posts = getAllPosts({ dir })
    expect(posts.map((p) => p.slug)).toEqual(["second-post", "first-post"])
  })
  it("normalizes both quoted and unquoted YAML dates to YYYY-MM-DD strings", () => {
    const posts = getAllPosts({ dir, includeDrafts: true })
    for (const p of posts) expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
  it("excludes drafts by default, includes them when asked", () => {
    expect(getAllPosts({ dir }).some((p) => p.draft)).toBe(false)
    expect(getAllPosts({ dir, includeDrafts: true }).map((p) => p.slug)).toContain("draft-post")
  })
  it("computes readingTime of at least 1 minute", () => {
    for (const p of getAllPosts({ dir })) expect(p.readingTime).toBeGreaterThanOrEqual(1)
  })
  it("throws a clear error naming the file for invalid frontmatter", () => {
    expect(() => getAllPosts({ dir: badDir })).toThrow(/missing-title\.md/)
    expect(() => getAllPosts({ dir: badDir })).toThrow(/title/)
  })
})

describe("getPostBySlug", () => {
  it("finds a post by slug", () => {
    expect(getPostBySlug("first-post", { dir })?.title).toBe("First Post")
  })
  it("returns undefined for unknown slug", () => {
    expect(getPostBySlug("nope", { dir })).toBeUndefined()
  })
})

describe("tags", () => {
  it("counts unique tags across published posts", () => {
    expect(getAllTags({ dir })).toEqual([
      { tag: "AI", slug: "ai", count: 2 },
      { tag: "Python", slug: "python", count: 1 },
    ])
  })
  it("slugifies tags", () => {
    expect(tagToSlug("Claude Agent SDK")).toBe("claude-agent-sdk")
  })
})

describe("formatDate", () => {
  it("formats YYYY-MM-DD without timezone drift", () => {
    expect(formatDate("2026-06-12")).toBe("Jun 12, 2026")
  })
})
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npx vitest run`
Expected: FAIL — cannot resolve `../lib/posts`.

- [ ] **Step 4: Write `lib/posts.ts`**

```ts
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const DEFAULT_DIR = path.join(process.cwd(), "content", "blog")
const WORDS_PER_MINUTE = 200

export type Post = {
  slug: string
  title: string
  date: string // YYYY-MM-DD
  summary: string
  tags: string[]
  draft: boolean
  readingTime: number // minutes
  content: string // raw markdown body (frontmatter stripped)
}

type Options = {
  /** Defaults to true in `next dev`, false in production builds. */
  includeDrafts?: boolean
  /** Content directory override (used by tests). */
  dir?: string
}

export function tagToSlug(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

export function formatDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}

function parsePost(filePath: string): Post {
  const file = path.basename(filePath)
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"))

  // gray-matter parses unquoted YAML dates as JS Date objects
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date

  const checks: [string, boolean][] = [
    ["title", typeof data.title === "string" && data.title.length > 0],
    ["date", typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)],
    ["summary", typeof data.summary === "string" && data.summary.length > 0],
    ["tags", Array.isArray(data.tags) && data.tags.every((t: unknown) => typeof t === "string")],
  ]
  for (const [field, ok] of checks) {
    if (!ok) {
      throw new Error(
        `content/blog/${file}: missing or invalid frontmatter field "${field}". ` +
          `Expected schema: title (string), date (YYYY-MM-DD), summary (string), tags (string[]), draft (boolean, optional).`,
      )
    }
  }

  const words = content.trim().split(/\s+/).filter(Boolean).length
  return {
    slug: file.replace(/\.mdx?$/, ""),
    title: data.title,
    date,
    summary: data.summary,
    tags: data.tags,
    draft: data.draft === true,
    readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    content,
  }
}

export function getAllPosts(opts: Options = {}): Post[] {
  const { includeDrafts = process.env.NODE_ENV === "development", dir = DEFAULT_DIR } = opts
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => parsePost(path.join(dir, f)))
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string, opts: Options = {}): Post | undefined {
  return getAllPosts(opts).find((p) => p.slug === slug)
}

export function getAllTags(opts: Options = {}): { tag: string; slug: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const post of getAllPosts(opts)) {
    for (const t of post.tags) counts.set(t, (counts.get(t) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, slug: tagToSlug(tag), count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run`
Expected: all tests PASS.

- [ ] **Step 6: Commit**

```bash
git add lib/posts.ts tests/
git commit -m "feat: filesystem content layer with drafts, tags, reading time (TDD)"
```

---

### Task 4: Seed content + resume placeholder

**Files:**
- Create: `content/blog/shipping-an-executive-ai-agent-in-two-weeks.mdx`, `content/blog/identity-first-sso-scim-for-40-apps.md`, `content/blog/patch-rings-automated-with-python-graph.md`, `content/blog/the-hands-on-director.md` (draft), `public/resume.pdf`

**Interfaces:**
- Produces: 3 published posts + 1 draft matching the handoff's Content section; the `.mdx` post uses `<Embed />` (component built in Task 9 — post pages render from Task 10 onward, so this is safe).

- [ ] **Step 1: Write the flagship `.mdx` post** — `content/blog/shipping-an-executive-ai-agent-in-two-weeks.mdx`

Copy, code block, and blockquote are verbatim from the design reference:

````mdx
---
title: "Shipping an executive AI agent in two weeks"
date: "2026-06-12"
summary: "A two-person team built a chief-of-staff agent on the Claude Agent SDK — custom MCP servers over Graph, Salesforce, and Slack — and why it beat a six-month RFP."
tags: [AI, MCP, Python]
---

The President wanted to ask questions about organizational goals and get answers
pulled straight from the systems where that data already lived. The conventional
path — an RFP, a vendor build, or net-new engineering hires — was estimated at
six-plus months. We shipped a working system in two.

## The architecture

The agent runs on Anthropic's Claude Agent SDK, with custom MCP servers deployed
to Azure Container Apps. Each server exposes one system: Microsoft Graph for
email and SharePoint, Salesforce for grantmaking data, and Slack as the
conversational surface.

```python title="resolve_device.py"
async def resolve_primary_device(user_id: str) -> str:
    devices = await graph.get(f"/users/{user_id}/managedDevices")
    primary = max(devices, key=lambda d: d["lastSyncDateTime"])
    return primary["azureADDeviceId"]
```

> The bigger win wasn't the code. It was the forcing function: to make data
> agent-readable, leadership had to structure goals and results in the first place.

Delivered with no added headcount, and it moved the whole organization toward
being agent-centered.

Here's the keynote where I walked through the build:

<Embed
  provider="youtube"
  id="jNQXAC9IVRw"
  title="Agentic IT: shipping AI that ships"
/>
````

(The `id` is a PLACEHOLDER — owner replaces with the real video id.)

- [ ] **Step 2: Write the two published `.md` posts**

`content/blog/identity-first-sso-scim-for-40-apps.md`:

```md
---
title: "Identity-first: SSO + SCIM for 40 apps"
date: "2026-04-03"
summary: "A practical model for automated joiner/mover/leaver access across a globally distributed workforce on Okta and Entra."
tags: [IAM, Okta, Entra]
---

<!-- PLACEHOLDER BODY — owner replaces with the real post. -->

Access management breaks quietly. Nobody notices the contractor who kept their
Salesforce seat for eight months, until an auditor does.

## Joiner, mover, leaver

The model we run: every application behind SSO, every entitlement granted by
group membership, every group driven by HR attributes. When the HR system says
someone changed departments, their access follows within the hour — no ticket.

Getting roughly 40 applications onto SSO and SCIM took a year of vendor calls,
and it was worth every one. Provisioning stopped being a task and became a
property of the system.

## What I'd do differently

Start with the deprovisioning story, not the login story. SSO sells itself;
automated *removal* is the part that protects the organization.
```

`content/blog/patch-rings-automated-with-python-graph.md`:

```md
---
title: "Patch rings, automated with Python + Graph"
date: "2026-02-09"
summary: "Turning device-group patch management into user-aware, department-tiered Intune update rings for 300 users."
tags: [Automation, Intune]
---

<!-- PLACEHOLDER BODY — owner replaces with the real post. -->

Intune's update rings are device-centric, but risk is user-centric. Finance
closing the books is not the week to reboot their laptops.

## The approach

A scheduled Python job reads department and role from Entra via Microsoft
Graph, maps each user's primary device into a tier, and rewrites the Intune
ring assignments. Pilot users patch first; the CFO's team patches last.

The whole thing is ~200 lines of Python and one service principal. It replaced
a quarterly spreadsheet exercise nobody trusted.
```

- [ ] **Step 3: Write the draft post** — `content/blog/the-hands-on-director.md`

```md
---
title: "The hands-on director"
date: "2026-03-18"
summary: "Why I still write code as a Director — and how player-coach leadership changes what IT can actually ship."
tags: [Leadership]
draft: true
---

<!-- DRAFT — visible in `npm run dev`, excluded from production builds. -->

Somewhere between manager and director, most IT leaders stop building. I didn't,
and it's the most useful professional decision I've made.
```

- [ ] **Step 4: Create placeholder `public/resume.pdf`**

```bash
python3 - <<'EOF'
content = b"BT /F1 18 Tf 72 720 Td (Resume placeholder - replace public/resume.pdf) Tj ET"
objs = [
    b"<< /Type /Catalog /Pages 2 0 R >>",
    b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    b"<< /Length " + str(len(content)).encode() + b" >>\nstream\n" + content + b"\nendstream",
    b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
]
out = b"%PDF-1.4\n"
offsets = []
for i, o in enumerate(objs, 1):
    offsets.append(len(out))
    out += f"{i} 0 obj\n".encode() + o + b"\nendobj\n"
xref = len(out)
out += b"xref\n0 " + str(len(objs) + 1).encode() + b"\n0000000000 65535 f \n"
for off in offsets:
    out += f"{off:010d} 00000 n \n".encode()
out += b"trailer\n<< /Size " + str(len(objs) + 1).encode() + b" /Root 1 0 R >>\nstartxref\n" + str(xref).encode() + b"\n%%EOF"
open("public/resume.pdf", "wb").write(out)
EOF
file public/resume.pdf  # expect: PDF document
```

- [ ] **Step 5: Verify content layer reads the real folder**

```bash
npx vitest run   # fixture tests still pass
ls content/blog  # expect the 4 post files
file public/resume.pdf  # expect: PDF document
```

(`getAllPosts()` against the real `content/blog/` is exercised end-to-end by `npm run build` in Task 6.)

- [ ] **Step 6: Commit**

```bash
git add content/ public/resume.pdf
git commit -m "content: seed 3 published posts, 1 draft, resume placeholder"
```

---

### Task 5: Global chrome — Navbar, theme toggle, mobile sheet

**Files:**
- Create: `components/navbar.tsx`, `components/theme-toggle.tsx`
- Modify: `app/layout.tsx` (add `<Navbar />` above `<main>`)

**Interfaces:**
- Consumes: `site.nav` (Task 2), shadcn `Sheet` (Task 1).
- Produces: `<Navbar />` used only in `app/layout.tsx`.

- [ ] **Step 1: Write `components/theme-toggle.tsx`** (CSS-swapped icons avoid hydration mismatch)

```tsx
"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex size-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <Sun className="size-3.5 dark:hidden" />
      <Moon className="hidden size-3.5 dark:block" />
    </button>
  )
}
```

- [ ] **Step 2: Write `components/navbar.tsx`**

Per handoff §Global chrome: sticky, bottom border `border-subtle`, `22px 44px` desktop / `16px 20px` mobile padding, 26px tan JB tile + lowercase mono wordmark, active link = foreground + medium (NOT blue), hamburger → Sheet under `md`.

```tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/95 backdrop-blur-sm">
      <nav className="flex items-center justify-between px-5 py-4 md:px-11 md:py-[22px]" aria-label="Main">
        <Link href="/" className="flex items-center gap-2.5">
          {/* the one and only use of the tan warm accent */}
          <span className="flex size-6 items-center justify-center rounded-[7px] bg-warm-accent font-mono text-xs font-medium text-warm-accent-foreground md:size-[26px]">
            JB
          </span>
          <span className="font-mono text-sm font-medium lowercase text-foreground">{site.name}</span>
        </Link>

        <div className="flex items-center gap-5">
          <ul className="hidden items-center gap-6 md:flex">
            {site.nav.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={cn(
                    "text-sm transition-colors duration-150",
                    isActive(href) ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <Sheet>
            <SheetTrigger
              className="flex size-7 items-center justify-center rounded-full border border-border text-muted-foreground md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <ul className="mt-10 flex flex-col gap-1 px-4">
                {site.nav.map(({ href, label }) => (
                  <li key={href}>
                    <SheetClose asChild>
                      <Link
                        href={href}
                        className={cn(
                          "block rounded-md px-3 py-2.5 text-base",
                          isActive(href) ? "font-medium text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
```

- [ ] **Step 3: Add to layout** — in `app/layout.tsx`, import `Navbar` and render inside `ThemeProvider`, above `<main>`:

```tsx
import { Navbar } from "@/components/navbar"
// …
<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
  <Navbar />
  <main>{children}</main>
</ThemeProvider>
```

- [ ] **Step 4: Verify**

Run: `npm run dev` → open http://localhost:3000. Expected: navbar renders with JB tile, links, working theme toggle (persists across reload); at 375px the links collapse to the hamburger sheet.

- [ ] **Step 5: Commit**

```bash
git add components/navbar.tsx components/theme-toggle.tsx app/layout.tsx
git commit -m "feat: global navbar with monogram, theme toggle, mobile sheet"
```

---

### Task 6: Home page (direction 1a) + PostRow + TagChip

**Files:**
- Create: `components/post-row.tsx`, `components/tag-chip.tsx`
- Modify: `app/page.tsx` (replace scaffold home)

**Interfaces:**
- Consumes: `getAllPosts`, `formatDate`, `tagToSlug` (Task 3), `Button` (Task 1).
- Produces: `<PostRow post={Post} showTags?>` (whole row clickable via stretched link; tag chips remain independently clickable); `<TagChip tag={string} active?>` linking to `/blog/tag/[slug]`.

- [ ] **Step 1: Write `components/tag-chip.tsx`**

```tsx
import Link from "next/link"
import { tagToSlug } from "@/lib/posts"
import { cn } from "@/lib/utils"

export function TagChip({ tag, active = false }: { tag: string; active?: boolean }) {
  return (
    <Link
      href={`/blog/tag/${tagToSlug(tag)}`}
      className={cn(
        "rounded-full border bg-muted px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-150",
        active
          ? "border-foreground/40 text-foreground"
          : "border-border text-muted-foreground hover:text-foreground",
      )}
    >
      {tag}
    </Link>
  )
}
```

- [ ] **Step 2: Write `components/post-row.tsx`**

Whole-row click without nested anchors: the title link gets an `::after` overlay; chips sit above it with `relative z-10`.

```tsx
import Link from "next/link"
import { formatDate, type Post } from "@/lib/posts"
import { TagChip } from "@/components/tag-chip"

export function PostRow({ post, showTags = false }: { post: Post; showTags?: boolean }) {
  return (
    <article className="group relative border-t border-border-subtle py-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.01em] md:text-[19px]">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors duration-150 after:absolute after:inset-0 group-hover:text-link"
          >
            {post.title}
          </Link>
        </h3>
        <time dateTime={post.date} className="mono-label shrink-0 font-normal text-muted-foreground">
          {formatDate(post.date)}
        </time>
      </div>
      <p className="mt-2 max-w-[64ch] text-muted-foreground">{post.summary}</p>
      {showTags && post.tags.length > 0 && (
        <div className="relative z-10 mt-3 flex w-fit flex-wrap gap-2">
          {post.tags.map((t) => (
            <TagChip key={t} tag={t} />
          ))}
        </div>
      )}
    </article>
  )
}
```

- [ ] **Step 3: Replace `app/page.tsx`** (copy verbatim from handoff/reference)

```tsx
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
        <Button asChild size="lg" className="rounded-lg px-[22px] max-sm:w-full">
          <Link href="/blog">Read the blog →</Link>
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
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: PASS, `/` static. In dev, Home shows hero + 3 (dev: newest 3 of 4 incl. draft — fine, dev shows drafts by design) post rows in both themes.

- [ ] **Step 5: Commit**

```bash
git add components/post-row.tsx components/tag-chip.tsx app/page.tsx
git commit -m "feat: home page (editorial statement) with recent writing"
```

---

### Task 7: About / Resume page

**Files:**
- Create: `app/about/page.tsx`

**Interfaces:**
- Consumes: `site` (Task 2), `Button` (Task 1).

- [ ] **Step 1: Write `app/about/page.tsx`** (copy verbatim from reference; experience grid `150px | 1fr`)

```tsx
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "IT director and systems architect — strategy, budget, and vendor portfolio at The Rockefeller Foundation, still building the systems directly.",
  alternates: { canonical: "/about" },
}

const experience = [
  {
    period: "2024 — Now",
    role: "Director, IT Operations & Services Management",
    company: "The Rockefeller Foundation",
    description:
      "Own strategy, $6.4M budget (11% YoY savings), and DR. Architected and coded a chief-of-staff AI agent for the executive team in two weeks.",
  },
  {
    period: "2020 — 2024",
    role: "IT Services Manager",
    company: "The Rockefeller Foundation",
    description:
      "Led a global support team resolving 1,000+ monthly incidents at 85% first-time resolution; cut cloud spend 21% via right-sizing and automation.",
  },
  {
    period: "2016 — 2020",
    role: "Systems Engineer",
    company: "Ventucom",
    description:
      "Administered M365 and Google Workspace across dozens of MSP clients; built repeatable SSO/RBAC access models and hardened email with DKIM/DMARC.",
  },
]

const skills = [
  "Azure · AZ-104",
  "Okta · Entra ID",
  "Python",
  "Claude Agent SDK · MCP",
  "Intune",
  "NetSuite · Salesforce",
  "CISSP",
  "ITIL 4",
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[760px] px-5 pb-24 pt-16">
      <p className="mono-label text-muted-foreground">About</p>
      <h1 className="mt-4 text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] md:text-[2.75rem]">
        The hands-on director
      </h1>

      <div className="mt-8 space-y-6 text-lg leading-[1.75] text-muted-foreground">
        <p>
          I'm an IT director and systems architect with about a decade across global enterprise
          IT, multi-client MSP environments, and applied AI. At The Rockefeller Foundation I own
          IT strategy, a $6.4M budget, and a 40–50 vendor portfolio for a ~300-person organization
          spread across four continents.
        </p>
        <p>
          What makes the role unusual is that I still build. I write the Python automation, stand
          up custom MCP servers and AI agents on the Claude Agent SDK, and engineer identity
          across Okta and Microsoft Entra — SSO and SCIM for roughly 40 applications. I'd rather
          architect and automate than only direct.
        </p>
      </div>

      <section className="mt-20" aria-labelledby="experience">
        <div className="flex items-center justify-between">
          <h2 id="experience" className="text-[26px] font-semibold tracking-[-0.015em]">
            Experience
          </h2>
          <Button asChild className="rounded-lg">
            <a href={site.resume} download>
              Download PDF ↓
            </a>
          </Button>
        </div>
        <div className="mt-6">
          {experience.map((job) => (
            <div
              key={job.role}
              className="grid gap-2 border-t border-border-subtle py-7 md:grid-cols-[150px_1fr] md:gap-6"
            >
              <p className="mono-label pt-1 font-normal text-muted-foreground">{job.period}</p>
              <div>
                <h3 className="text-[17px] font-semibold tracking-[-0.01em] md:text-lg">{job.role}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{job.company}</p>
                <p className="mt-3 max-w-[60ch] text-muted-foreground">{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="skills">
        <h2 id="skills" className="text-[26px] font-semibold tracking-[-0.015em]">
          Skills
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-border bg-muted px-3 py-1.5 font-mono text-xs text-muted-foreground"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` → PASS. In dev, `/about` matches the reference: bio, experience grid stacking to one column on mobile, skill chips, PDF button downloads `resume.pdf`.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: about page with structured resume and PDF download"
```

---

### Task 8: Blog index

**Files:**
- Create: `app/blog/page.tsx`

**Interfaces:**
- Consumes: `getAllPosts` (Task 3), `PostRow` (Task 6).

- [ ] **Step 1: Write `app/blog/page.tsx`**

```tsx
import type { Metadata } from "next"
import { PostRow } from "@/components/post-row"
import { getAllPosts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Blog",
  description: "Field notes from running enterprise IT and building the systems behind it.",
  alternates: { canonical: "/blog" },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-[760px] px-5 pb-24 pt-16">
      <p className="mono-label text-muted-foreground">Writing</p>
      <h1 className="mt-4 text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] md:text-[2.75rem]">
        Notes on IT, AI & automation
      </h1>
      <p className="mt-6 max-w-[56ch] text-lg leading-[1.75] text-muted-foreground">
        Field notes from running enterprise IT and building the systems behind it.
      </p>

      <div className="mt-14">
        {posts.map((post) => (
          <PostRow key={post.slug} post={post} showTags />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` → PASS. Dev: `/blog` lists 4 posts (incl. draft — dev behavior), each row with title/date/summary/tag chips; rows are `padding: 28px 0`-ish spacious.

- [ ] **Step 3: Commit**

```bash
git add app/blog/page.tsx
git commit -m "feat: blog index"
```

---

### Task 9: Embed component

**Files:**
- Create: `components/embed.tsx`

**Interfaces:**
- Produces (consumed by Task 10's MDX map and Task 12's media page):

```ts
type EmbedProps =
  | { provider: "youtube"; id: string; title: string }
  | { provider: "spotify" | "apple"; url: string; title: string }
export function Embed(props: EmbedProps): JSX.Element
```

- [ ] **Step 1: Write `components/embed.tsx`** — YouTube is click-to-load (lite-youtube pattern: static thumbnail, iframe only after click); Spotify/Apple are lazy iframes.

```tsx
"use client"

import { useState } from "react"
import { Play } from "lucide-react"

type EmbedProps =
  | { provider: "youtube"; id: string; title: string }
  | { provider: "spotify" | "apple"; url: string; title: string }

export function Embed(props: EmbedProps) {
  if (props.provider === "youtube") {
    return <YouTubeFacade id={props.id} title={props.title} />
  }
  const height = props.provider === "spotify" ? 152 : 175
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <iframe
        src={props.url}
        title={props.title}
        height={height}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        className="block w-full border-0"
      />
    </div>
  )
}

/** Click-to-load: no YouTube JS/iframe until the user asks for it. */
function YouTubeFacade({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-black">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 size-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- remote thumbnail, no optimization needed */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="size-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-black/70 transition-colors duration-150 group-hover:bg-black/90">
              <Play className="ml-0.5 size-6 fill-white text-white" />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` → PASS (component compiles; rendering is exercised in Tasks 10 & 12).

- [ ] **Step 3: Commit**

```bash
git add components/embed.tsx
git commit -m "feat: Embed component with click-to-load YouTube facade"
```

---

### Task 10: MDX pipeline + blog post page

**Files:**
- Create: `lib/code-theme.ts`, `components/copy-button.tsx`, `components/mdx.tsx`, `app/blog/[slug]/page.tsx`
- Modify: `app/globals.css` (append article + code-block styles)

**Interfaces:**
- Consumes: `getAllPosts`/`getPostBySlug`/`formatDate` (Task 3), `TagChip` (Task 6), `Embed` (Task 9).
- Produces: `mdxComponents: MDXComponents` map; `/blog/[slug]` static pages with per-post metadata.

- [ ] **Step 1: Write `lib/code-theme.ts`** — custom Shiki (TextMate) theme from handoff code colors

```ts
/** Custom Shiki theme matching the handoff's code-block palette (dark-only by design). */
export const codeTheme = {
  name: "jb-dark",
  type: "dark",
  colors: {
    "editor.background": "#131515",
    "editor.foreground": "#C6CFD0",
  },
  tokenColors: [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#5B6465", fontStyle: "italic" } },
    { scope: ["keyword", "storage.type", "storage.modifier", "keyword.control"], settings: { foreground: "#86BBD4" } },
    {
      scope: ["entity.name.function", "support.function", "support.class", "entity.name.type", "support.type"],
      settings: { foreground: "#6AB0CD" },
    },
    { scope: ["string", "string.quoted", "punctuation.definition.string"], settings: { foreground: "#9FD3A8" } },
    { scope: ["constant.numeric", "constant.language"], settings: { foreground: "#6AB0CD" } },
    { scope: ["variable", "variable.parameter"], settings: { foreground: "#C6CFD0" } },
  ],
}
```

- [ ] **Step 2: Write `components/copy-button.tsx`** — finds its code via `closest("figure")`, so it works from the figure chrome regardless of markup nesting

```tsx
"use client"

import { useState } from "react"

export function CopyButton() {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      aria-label="Copy code to clipboard"
      onClick={async (e) => {
        const code = e.currentTarget.closest("figure")?.querySelector("pre")?.innerText ?? ""
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="absolute right-4 top-2.5 z-10 font-mono text-xs text-[#86BBD4] transition-opacity hover:opacity-80"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  )
}
```

- [ ] **Step 3: Write `components/mdx.tsx`**

```tsx
import type { MDXComponents } from "mdx/types"
import type { ComponentPropsWithoutRef } from "react"
import Link from "next/link"
import { CopyButton } from "@/components/copy-button"
import { Embed } from "@/components/embed"

function Anchor({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const cls =
    "text-link underline decoration-link/40 underline-offset-4 transition-colors duration-150 hover:text-link-hover"
  if (href.startsWith("/")) return <Link href={href} className={cls} {...props} />
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
```

- [ ] **Step 4: Append article/code styles to `app/globals.css`**

```css
/* ── Article body ──────────────────────────────────────────────── */
.article-body > :first-child {
  margin-top: 0;
}

/* inline code (not inside pre) */
.article-body :not(pre) > code {
  @apply rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em];
}

/* ── Code blocks (always dark, per handoff) ────────────────────── */
[data-rehype-pretty-code-figure] {
  @apply my-8 overflow-hidden rounded-xl;
  background: var(--code-bg);
  border: 1px solid var(--code-border);
}
[data-rehype-pretty-code-figure] figcaption[data-rehype-pretty-code-title] {
  @apply px-4 py-2.5 font-mono text-xs;
  background: var(--code-chrome);
  border-bottom: 1px solid var(--code-border);
  color: var(--code-muted);
}
[data-rehype-pretty-code-figure] pre {
  @apply overflow-x-auto p-4 font-mono text-[13.5px] leading-[1.7];
  color: var(--code-fg);
}
[data-rehype-pretty-code-figure] code {
  @apply bg-transparent p-0 font-mono;
  counter-reset: line;
}
```

- [ ] **Step 5: Write `app/blog/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypePrettyCode from "rehype-pretty-code"
import { mdxComponents } from "@/components/mdx"
import { TagChip } from "@/components/tag-chip"
import { codeTheme } from "@/lib/code-theme"
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/posts"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url: `/blog/${post.slug}`,
      publishedTime: `${post.date}T12:00:00.000Z`,
      tags: [...post.tags],
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="mx-auto max-w-[680px] px-5 pb-24 pt-14">
      <Link
        href="/blog"
        className="mono-label text-link transition-colors duration-150 hover:text-link-hover"
      >
        ← All posts
      </Link>

      <div className="mono-label mt-9 flex items-center gap-3 font-normal text-muted-foreground">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden className="size-[3px] rounded-full bg-muted-foreground" />
        <span>{post.readingTime} min read</span>
      </div>

      <h1 className="mt-4 text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] md:text-[2.625rem]">
        {post.title}
      </h1>

      {post.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <TagChip key={t} tag={t} />
          ))}
        </div>
      )}

      <div className="article-body mt-10">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [[rehypePrettyCode, { theme: codeTheme, keepBackground: true, defaultLang: "text" }]],
            },
          }}
        />
      </div>
    </article>
  )
}
```

- [ ] **Step 6: Verify**

Run: `npm run build`
Expected: PASS; `/blog/[slug]` shows 3 static paths (draft excluded). In dev, open `/blog/shipping-an-executive-ai-agent-in-two-weeks`: meta row, tags, prose at 1.8 line-height, dark code block with `resolve_device.py` chrome bar + working Copy button, accent-ruled blockquote, YouTube facade that loads the player on click. Check both themes.

- [ ] **Step 7: Commit**

```bash
git add lib/code-theme.ts components/copy-button.tsx components/mdx.tsx app/blog/\[slug\] app/globals.css
git commit -m "feat: MDX pipeline with custom Shiki theme, copy button, post page"
```

---

### Task 11: Tag pages

**Files:**
- Create: `app/blog/tag/[tag]/page.tsx`

**Interfaces:**
- Consumes: `getAllPosts`, `getAllTags`, `tagToSlug` (Task 3), `PostRow`, `TagChip` (Task 6).

- [ ] **Step 1: Write `app/blog/tag/[tag]/page.tsx`**

```tsx
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PostRow } from "@/components/post-row"
import { TagChip } from "@/components/tag-chip"
import { getAllPosts, getAllTags, tagToSlug } from "@/lib/posts"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllTags().map(({ slug }) => ({ tag: slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await params
  const match = getAllTags().find((t) => t.slug === tag)
  if (!match) return {}
  return {
    title: `Posts tagged "${match.tag}"`,
    description: `Writing tagged ${match.tag}.`,
    alternates: { canonical: `/blog/tag/${tag}` },
  }
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const tags = getAllTags()
  const match = tags.find((t) => t.slug === tag)
  if (!match) notFound()

  const posts = getAllPosts().filter((p) => p.tags.some((t) => tagToSlug(t) === tag))

  return (
    <div className="mx-auto max-w-[760px] px-5 pb-24 pt-16">
      <p className="mono-label text-muted-foreground">Writing</p>
      <h1 className="mt-4 text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] md:text-[2.75rem]">
        Tagged: {match.tag}
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">
        {posts.length} {posts.length === 1 ? "post" : "posts"} ·{" "}
        <Link href="/blog" className="text-link transition-colors duration-150 hover:text-link-hover">
          All posts
        </Link>
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((t) => (
          <TagChip key={t.slug} tag={t.tag} active={t.slug === tag} />
        ))}
      </div>

      <div className="mt-12">
        {posts.map((post) => (
          <PostRow key={post.slug} post={post} showTags />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` → tag routes listed (e.g. `/blog/tag/ai`, `/blog/tag/mcp`, `/blog/tag/okta`, …), draft-only tags (leadership) absent. In dev, clicking a chip on `/blog` navigates to its tag page with the active chip highlighted.

- [ ] **Step 3: Commit**

```bash
git add app/blog/tag
git commit -m "feat: static tag pages"
```

---

### Task 12: Media page

**Files:**
- Create: `lib/media.ts`, `app/media/page.tsx`

**Interfaces:**
- Consumes: `Embed` (Task 9).
- Produces: `mediaItems: MediaItem[]` — owner edits this array to add/replace media.

- [ ] **Step 1: Write `lib/media.ts`**

```ts
/**
 * Media appearances shown on /media.
 * To add one: append an item here. YouTube wants the video id (youtube.com/watch?v=<id>);
 * Spotify/Apple want the full *embed* URL from each platform's Share → Embed dialog.
 */
export type MediaItem =
  | { provider: "youtube"; id: string; title: string; meta: string; featured?: boolean }
  | { provider: "spotify" | "apple"; url: string; title: string; meta: string; featured?: boolean }

export const mediaItems: MediaItem[] = [
  {
    provider: "youtube",
    id: "jNQXAC9IVRw", // PLACEHOLDER — replace with real video id
    title: "Agentic IT: shipping AI that ships",
    meta: "Keynote · DevOps NYC · 2026",
    featured: true,
  },
  {
    provider: "spotify",
    url: "https://open.spotify.com/embed/episode/REPLACE_WITH_EPISODE_ID", // PLACEHOLDER
    title: "The player-coach CIO",
    meta: "Ship It! · Ep. 214",
  },
  {
    provider: "apple",
    url: "https://embed.podcasts.apple.com/us/podcast/REPLACE_WITH_SHOW?i=REPLACE_WITH_EPISODE", // PLACEHOLDER
    title: "Identity at scale",
    meta: "The Access Layer · Ep. 58",
  },
]
```

- [ ] **Step 2: Write `app/media/page.tsx`**

```tsx
import type { Metadata } from "next"
import { Embed } from "@/components/embed"
import { mediaItems } from "@/lib/media"

export const metadata: Metadata = {
  title: "Media",
  description:
    "Conference talks and podcast conversations on agentic IT, identity, and the hands-on leader.",
  alternates: { canonical: "/media" },
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
              <h3 className="text-[17px] font-semibold tracking-[-0.01em] md:text-lg">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.meta}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify**

Run: `npm run build` → PASS. Dev `/media`: featured YouTube spans both columns at 16:9 with click-to-load; podcast items side-by-side, stacking at mobile width. (Placeholder Spotify/Apple URLs will show the platforms' error frames — expected until the owner supplies real embed URLs.)

- [ ] **Step 4: Commit**

```bash
git add lib/media.ts app/media
git commit -m "feat: media page with responsive embed grid"
```

---

### Task 13: Contact page

**Files:**
- Create: `app/contact/page.tsx`

**Interfaces:**
- Consumes: `site` (Task 2), `Button` (Task 1).

- [ ] **Step 1: Write `app/contact/page.tsx`**

```tsx
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about IT leadership, applied AI, and building systems that ship.",
  alternates: { canonical: "/contact" },
}

const rows = [
  { label: "LinkedIn", value: "/in/glajummyb ↗", href: site.links.linkedin, external: true },
  { label: "GitHub", value: "/jblain ↗", href: site.links.github, external: true },
  { label: "Resume", value: "Download PDF ↓", href: site.resume, external: false },
]

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[640px] px-5 pb-24 pt-20">
      <p className="mono-label text-muted-foreground">Contact</p>
      <h1 className="mt-4 text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] md:text-[2.75rem]">
        Let's talk.
      </h1>
      <p className="mt-6 max-w-[48ch] text-lg leading-[1.75] text-muted-foreground">
        Open to conversations about IT leadership, applied AI, and building systems that ship. The
        fastest way to reach me is email.
      </p>

      <Button asChild size="lg" className="mt-9 rounded-lg px-[22px] max-sm:w-full">
        <a href={`mailto:${site.email}`}>{site.email} →</a>
      </Button>

      <ul className="mt-16">
        {rows.map((row) => (
          <li key={row.label} className="border-t border-border-subtle">
            <a
              href={row.href}
              {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
              className="group flex items-center justify-between py-5"
            >
              <span className="font-medium">{row.label}</span>
              <span className="font-mono text-sm text-link transition-colors duration-150 group-hover:text-link-hover">
                {row.value}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` → PASS. Dev `/contact`: in dark mode the email button is the inverted primary (light `#6AB0CD` fill, dark text); rows open LinkedIn/GitHub in new tabs; Resume downloads.

- [ ] **Step 3: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat: contact page"
```

---

### Task 14: SEO & feeds — RSS (TDD), sitemap, robots

**Files:**
- Create: `lib/feed.ts`, `tests/feed.test.ts`, `app/rss.xml/route.ts`, `app/sitemap.ts`, `app/robots.ts`

**Interfaces:**
- Consumes: `getAllPosts`, `getAllTags` (Task 3), `site` (Task 2).
- Produces: `escapeXml(s: string): string`, `generateRssXml(posts: Post[]): string`.

- [ ] **Step 1: Write the failing tests** — `tests/feed.test.ts`

```ts
import { describe, expect, it } from "vitest"
import { escapeXml, generateRssXml } from "../lib/feed"
import type { Post } from "../lib/posts"

const post: Post = {
  slug: "a-post",
  title: "Ampersands & <angles>",
  date: "2026-06-12",
  summary: 'She said "hi"',
  tags: ["AI"],
  draft: false,
  readingTime: 3,
  content: "body",
}

describe("escapeXml", () => {
  it("escapes the five XML special characters", () => {
    expect(escapeXml(`<a & "b" 'c'>`)).toBe("&lt;a &amp; &quot;b&quot; &apos;c&apos;&gt;")
  })
})

describe("generateRssXml", () => {
  const xml = generateRssXml([post])
  it("is RSS 2.0 with channel metadata", () => {
    expect(xml).toContain('<rss version="2.0"')
    expect(xml).toContain("<channel>")
    expect(xml).toContain("https://jimmyblain.com/rss.xml")
  })
  it("escapes item fields and links to the post", () => {
    expect(xml).toContain("Ampersands &amp; &lt;angles&gt;")
    expect(xml).toContain("<link>https://jimmyblain.com/blog/a-post</link>")
    expect(xml).toContain("<pubDate>Fri, 12 Jun 2026 12:00:00 GMT</pubDate>")
    expect(xml).toContain("<category>AI</category>")
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/feed.test.ts`
Expected: FAIL — cannot resolve `../lib/feed`.

- [ ] **Step 3: Write `lib/feed.ts`**

```ts
import { site } from "@/lib/site"
import type { Post } from "@/lib/posts"

const XML_ESCAPES: Record<string, string> = {
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;",
  "'": "&apos;",
  '"': "&quot;",
}

export function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, (c) => XML_ESCAPES[c])
}

export function generateRssXml(posts: Post[]): string {
  const items = posts
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${site.url}/blog/${p.slug}</link>
      <guid>${site.url}/blog/${p.slug}</guid>
      <description>${escapeXml(p.summary)}</description>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
${p.tags.map((t) => `      <category>${escapeXml(t)}</category>`).join("\n")}
    </item>`,
    )
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.title)}</title>
    <link>${site.url}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en-us</language>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`
}
```

Note: `lib/feed.ts` imports via `@/` alias — if `npx vitest run` can't resolve it, change both imports to relative (`./site`, `./posts`); no vitest config needed.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run`
Expected: all PASS.

- [ ] **Step 5: Write the routes**

`app/rss.xml/route.ts`:

```ts
import { generateRssXml } from "@/lib/feed"
import { getAllPosts } from "@/lib/posts"

export const dynamic = "force-static"

export function GET() {
  return new Response(generateRssXml(getAllPosts()), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
```

`app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next"
import { getAllPosts, getAllTags } from "@/lib/posts"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/blog", "/media", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
  }))
  const posts = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T12:00:00Z`),
  }))
  const tags = getAllTags().map(({ slug }) => ({
    url: `${site.url}/blog/tag/${slug}`,
  }))
  return [...pages, ...posts, ...tags]
}
```

`app/robots.ts`:

```ts
import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  }
}
```

- [ ] **Step 6: Verify**

```bash
npm run build
```

Expected: `/rss.xml`, `/sitemap.xml`, `/robots.txt` in route list, all static. Then against the production build:

```bash
npm run start &
sleep 2
curl -s http://localhost:3000/rss.xml | head -30        # valid RSS, 3 items, no draft
curl -s http://localhost:3000/sitemap.xml | grep -c "<url>"  # 5 pages + 3 posts + 8 tags = 16
curl -s http://localhost:3000/robots.txt
kill %1
```

- [ ] **Step 7: Commit**

```bash
git add lib/feed.ts tests/feed.test.ts app/rss.xml app/sitemap.ts app/robots.ts
git commit -m "feat: RSS feed, sitemap, robots (TDD for feed generation)"
```

---

### Task 15: README + CLAUDE.md

**Files:**
- Create: `CLAUDE.md`
- Modify: `README.md` (replace scaffold README)

- [ ] **Step 1: Replace `README.md`**

```md
# jimmyblain.com

Personal site + blog. Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · MDX from
the filesystem · deployed on Vercel. Fully static — no database, no CMS, no backend.

## Publishing a new post

1. Write your post in plain Markdown.
2. Add frontmatter at the top:

   ```md
   ---
   title: "My post title"
   date: "2026-07-04"
   summary: "One or two sentences shown in lists and the RSS feed."
   tags: [AI, Automation]
   ---
   ```

3. Save it as `content/blog/my-post-title.md` — **the filename is the URL slug**
   (`/blog/my-post-title`).
4. Commit and push. Vercel builds and deploys automatically.

That's it. The blog index, tag pages, sitemap, and RSS feed all update themselves.

### Drafts

Add `draft: true` to the frontmatter. The post is visible locally in `npm run dev` (so you can
preview it) but excluded from production builds, the index, tag pages, sitemap, and RSS. Commit
drafts freely.

### Embeds in a post

Plain `.md` is all you need for normal writing. If you want an embed inline, name the file
`.mdx` and drop in the component:

```mdx
<Embed provider="youtube" id="VIDEO_ID" title="Talk title" />
<Embed provider="spotify" url="https://open.spotify.com/embed/episode/…" title="Episode" />
<Embed provider="apple" url="https://embed.podcasts.apple.com/us/podcast/…" title="Episode" />
```

YouTube embeds are click-to-load — the page stays fast; the player loads when clicked.

## Editing other content

| What                    | Where                                          |
| ----------------------- | ---------------------------------------------- |
| Name, domain, email, social links, nav | `lib/site.ts`                   |
| Media page items        | `lib/media.ts` (owner: replace PLACEHOLDER embeds) |
| About page bio / resume | `app/about/page.tsx`                           |
| Resume PDF              | `public/resume.pdf` (replace the placeholder)  |

## Development

```bash
npm run dev     # local dev server (drafts visible)
npm run build   # production build (drafts excluded)
npm test        # unit tests for the content layer + feed
```

## Deploying

1. Push this repo to GitHub.
2. In [vercel.com/new](https://vercel.com/new), import the repo. Framework auto-detects as
   Next.js; no configuration needed. Every push to `main` deploys production; every PR gets a
   preview URL.
3. **Custom domain:** Vercel project → Settings → Domains → add `jimmyblain.com` (and
   `www.jimmyblain.com`, redirected to the apex). At your registrar, point DNS where Vercel
   tells you — typically an `A` record for the apex to `76.76.21.21` and a `CNAME` for `www`
   to `cname.vercel-dns.com`. HTTPS is automatic.
```

- [ ] **Step 2: Write `CLAUDE.md`**

```md
# jimmyblain.com — personal site

Static personal site + filesystem MDX blog. Next.js App Router · TypeScript · Tailwind v4 ·
shadcn/ui · next-mdx-remote/rsc + gray-matter · deployed on Vercel.

## Workflow — superpowers

This project uses the superpowers plugin workflow. Non-negotiables:

- **superpowers:brainstorming** before any new feature or creative change — design first, get
  approval, then plan.
- **superpowers:writing-plans** for multi-step work; plans live in `docs/superpowers/plans/`.
- **superpowers:test-driven-development** for logic (`lib/*.ts` has Vitest coverage — keep it).
- **superpowers:verification-before-completion** before claiming anything works: run
  `npm test && npm run build`, and check UI changes in **both themes** and at 375px width.

## Hard constraints (owner's rules — do not violate)

- No database, no CMS, no auth, no backend. Static-first. Minimal dependencies.
- No Contentlayer. Content = plain portable Markdown in `content/blog/`, read by `lib/posts.ts`.
- Blog content must never be trapped in generated structures.
- Design source of truth: `design_handoff_personal_site/README.md`. Restraint rules: steel-blue
  for links/actions only (never decorative), tan appears exactly once (navbar monogram), active
  nav = darker text not blue, both themes first-class.

## Commands

- `npm run dev` — dev server (drafts visible)
- `npm run build` — production build (drafts excluded)
- `npm test` — Vitest (content layer + RSS)

## Architecture notes

- `lib/posts.ts` is the single content layer; index, post pages, tag pages, sitemap, and RSS
  all derive from it. Frontmatter schema: title, date (YYYY-MM-DD), summary, tags[], draft?.
- `lib/site.ts` owns the canonical URL (`https://jimmyblain.com`) — never hardcode it elsewhere.
- Code blocks are always dark by design (`lib/code-theme.ts`, custom Shiki theme).
- `components/embed.tsx`: YouTube is click-to-load; keep it that way (performance).
```

- [ ] **Step 3: Commit**

```bash
git add README.md CLAUDE.md
git commit -m "docs: publishing workflow README + CLAUDE.md with superpowers workflow"
```

---

### Task 16: Full verification pass

**Files:** none (verification only; fix-forward anything found, commit fixes individually).

- [ ] **Step 1: Tests + lint + production build**

```bash
npm test          # expect: all pass
npm run lint      # expect: clean
npm run build     # expect: all routes ○ static; /blog/[slug] = 3 paths (no draft);
                  # tag routes exclude draft-only tags (no /blog/tag/leadership)
```

- [ ] **Step 2: Production functional checks**

```bash
npm run start &
sleep 2
curl -s http://localhost:3000/blog | grep -c "hands-on director"   # expect 0 (draft excluded)
curl -s http://localhost:3000/rss.xml | grep -c "<item>"           # expect 3
curl -s http://localhost:3000/blog/shipping-an-executive-ai-agent-in-two-weeks | grep -o '<link rel="canonical"[^>]*>'
# expect canonical https://jimmyblain.com/blog/shipping-an-executive-ai-agent-in-two-weeks
kill %1
```

- [ ] **Step 3: Dev-mode draft check**

Run `npm run dev`; confirm `/blog` DOES list "The hands-on director" (drafts visible in dev) and `/blog/the-hands-on-director` renders.

- [ ] **Step 4: Visual pass with Playwright MCP** (against `npm run dev`)

For each of `/`, `/about`, `/blog`, `/blog/shipping-an-executive-ai-agent-in-two-weeks`, `/blog/tag/ai`, `/media`, `/contact`:
- Screenshot at 1280px in light AND dark (toggle via navbar button).
- Screenshot at 375px; verify hamburger sheet opens and navigates.

Also open `file:///Users/JBlain/repos/personal-website/design_handoff_personal_site/Jimmy Blain - Site System.dc.html` and compare side-by-side: type hierarchy, spacing rhythm, token colors, nav chrome, post row layout, code block chrome, contact rows.

- [ ] **Step 5: Interaction checks (Playwright)**

- Theme toggle switches and persists across reload.
- Code block Copy button shows "Copied".
- YouTube facade: thumbnail first; iframe appears on click.
- Tag chip on a post navigates to its tag page with active highlight.

- [ ] **Step 6: Commit any fixes**

```bash
git add -A && git commit -m "fix: visual/functional polish from verification pass"
```

---

## Deployment Handoff (after all tasks pass — do WITH the user)

1. `gh repo create` (user picks name/visibility) and push `main`.
2. Vercel: user imports the repo at vercel.com/new (or `npx vercel` CLI). Zero config.
3. Domains: add `jimmyblain.com` + `www` in Vercel → Settings → Domains; user updates registrar DNS (A `76.76.21.21` apex, CNAME `cname.vercel-dns.com` for www). Verify HTTPS + both hostnames resolve.
4. Post-deploy smoke test on the live URL: `/rss.xml`, `/sitemap.xml`, one post page, theme toggle.

## Deferred (documented, intentionally not built)

Contact form (Formspree/Web3Forms, isolated component), "Now" card (`content/now.md`), custom OG images, real media embed URLs + real resume PDF (owner supplies).
