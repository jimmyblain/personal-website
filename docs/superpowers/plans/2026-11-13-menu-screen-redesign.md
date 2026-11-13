# Menu Screen redesign

Owner picked direction 2 ("Menu Screen") from the redesign mockups on 2026-11-13: the site as an
RPG status menu. This replaces the editorial look from `design_handoff_personal_site/`.

## Goals

- Every page is built from the same parts: a menu window, titled windows, and a pixel sprite.
- Writing a post stays "drop a Markdown file in `content/blog/`". Nothing in a post touches layout.
- Both themes work. Readable at 375px with the page title on the first screen.
- No new dependencies. Still fully static.

## Steps

1. `lib/headings.ts` (test-first, `tests/headings.test.ts`): one slug function and a `##` extractor
   that skips code fences. The post page uses it for the "Objectives" list; the MDX `h2` renderer
   uses the same slug function for its `id`, so the two cannot drift.
2. `app/globals.css`: map the Menu Screen palette onto the existing shadcn token names (light on
   `:root`, dark on `.dark`) so `Button` and `Sheet` keep working. Add the window and pixel-label
   classes. Retint the always-dark code block.
3. `app/layout.tsx`: Pixelify Sans (headings, labels), IBM Plex Sans (body), IBM Plex Mono (code).
4. Shared parts: `components/shell.tsx` (menu + optional aside + main), `components/window.tsx`,
   `components/menu.tsx`, `components/sprite.tsx`. Restyle `post-row`, `tag-chip`, `footer`,
   `theme-toggle`, `empty-posts`, `copy-button`.
5. Pages: home, about, contact, blog index, tag page, post page. Real copy from the current site.
   Achievements live in `lib/site.ts`.
6. Mobile: the menu collapses to one compact window with a single row of links; Objectives
   collapses into a closed disclosure.
7. Verify: `npm test && npm run build`, then every route at 375px and desktop in both themes.
8. Docs: update the design bullet in `CLAUDE.md` and the test list.
