# jimmyblain.com — personal site

Static personal site + filesystem MDX blog. Next.js App Router · TypeScript · Tailwind v4 ·
shadcn/ui · next-mdx-remote/rsc + gray-matter · deployed on Vercel.

## Workflow — superpowers

This project uses the superpowers plugin workflow. Non-negotiables:

- **superpowers:brainstorming** before any new feature or creative change — design first, get
  approval, then plan.
- **superpowers:writing-plans** for multi-step work; plans live in `docs/superpowers/plans/`.
- **superpowers:test-driven-development** for logic (`tests/posts.test.ts`, `tests/mdx.test.ts`,
  `tests/headings.test.ts`, and `tests/feed.test.ts` cover the content layer and RSS feed — keep
  them green).
- **superpowers:verification-before-completion** before claiming anything works: run
  `npm test && npm run build`, and check UI changes in **both themes** and at 375px width.

## Hard constraints (owner's rules — do not violate)

- No database, no CMS, no auth, no backend. Static-first. Minimal dependencies.
- No Contentlayer. Content = plain portable Markdown in `content/blog/`, read by `lib/posts.ts`.
- Blog content must never be trapped in generated structures.
- Design: "Menu Screen" (owner's pick, 2026-11-13) — the site drawn as an RPG status menu. Plan and
  rationale: `docs/superpowers/plans/2026-11-13-menu-screen-redesign.md`. Every page is a
  `<Shell>` of `<Window>`s; amber (`--primary`) is the one accent; both themes first-class.
  `design_handoff_personal_site/` is the retired editorial look, kept for history only.
- Posts never touch layout. A post's "Objectives" list and heading anchors are derived from its
  `## ` headings by `lib/headings.ts`.

## Commands

- `npm run dev` — dev server (drafts visible)
- `npm run build` — production build (drafts excluded)
- `npm test` — Vitest: `tests/posts.test.ts`, `tests/mdx.test.ts`, `tests/headings.test.ts`,
  `tests/feed.test.ts` (content layer + RSS)

## Architecture notes

- `lib/posts.ts` is the single content layer; index, post pages, tag pages, sitemap, and RSS
  all derive from it. Frontmatter schema: title, date (YYYY-MM-DD), summary, tags[], draft?.
- `lib/site.ts` owns the canonical URL (`https://jimmyblain.com`) — never hardcode it elsewhere.
- Code blocks are always dark by design (`lib/code-theme.ts`, custom Shiki theme).
- `components/sprite.tsx` is the portrait sprite; `achievements` in `lib/site.ts` feeds the home
  page's Achievements window.
- `components/embed.tsx`: YouTube is click-to-load; keep it that way (performance).
