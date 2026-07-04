# jimmyblain.com — personal site

Static personal site + filesystem MDX blog. Next.js App Router · TypeScript · Tailwind v4 ·
shadcn/ui · next-mdx-remote/rsc + gray-matter · deployed on Vercel.

## Workflow — superpowers

This project uses the superpowers plugin workflow. Non-negotiables:

- **superpowers:brainstorming** before any new feature or creative change — design first, get
  approval, then plan.
- **superpowers:writing-plans** for multi-step work; plans live in `docs/superpowers/plans/`.
- **superpowers:test-driven-development** for logic (`tests/posts.test.ts`, `tests/mdx.test.ts`,
  and `tests/feed.test.ts` cover the content layer and RSS feed — keep them green).
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
- `npm test` — Vitest: `tests/posts.test.ts`, `tests/mdx.test.ts`, `tests/feed.test.ts`
  (content layer + RSS)

## Architecture notes

- `lib/posts.ts` is the single content layer; index, post pages, tag pages, sitemap, and RSS
  all derive from it. Frontmatter schema: title, date (YYYY-MM-DD), summary, tags[], draft?.
- `lib/site.ts` owns the canonical URL (`https://jimmyblain.com`) — never hardcode it elsewhere.
- Code blocks are always dark by design (`lib/code-theme.ts`, custom Shiki theme).
- `components/embed.tsx`: YouTube is click-to-load; keep it that way (performance).
