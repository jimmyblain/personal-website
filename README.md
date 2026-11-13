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

That's it. The blog index, tag pages, sitemap, and RSS feed all update themselves. So does the
post's own page: its "Objectives" list is built from the post's `## ` headings, so there is no
layout to touch.

### Drafts

Add `draft: true` to the frontmatter. The post is visible locally in `npm run dev` (so you can
preview it) but excluded from production builds, the index, tag pages, sitemap, and RSS. Commit
drafts freely.

**All four posts currently in `content/blog/` are placeholders and marked `draft: true`**, so the
live site publishes none of them and `/blog` shows an empty state (`components/empty-posts.tsx`,
also used on the homepage). Drop the `draft: true` line to publish one — the empty state
disappears on its own as soon as a post goes live.

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
| Media page items        | `lib/media.ts` — page is **hidden** (see below) |
| About page bio / resume | `app/about/page.tsx`                           |
| Resume PDF              | `public/resume.pdf` (replace the placeholder)  |

### The Media page is hidden

There's nothing real to show yet, so `/media` is off the site. The page still exists at
`app/_media/page.tsx` — the leading underscore makes it a Next.js *private folder*, which is
excluded from routing, so the URL 404s. To bring it back:

1. `git mv app/_media app/media`
2. Restore the `{ href: "/media", label: "Media" }` entry in `lib/site.ts` → `nav`
3. Add `"/media"` back to the `pages` array in `app/sitemap.ts`
4. Replace the PLACEHOLDER embeds in `lib/media.ts` with real ones

### The footer is not in the design handoff

`design_handoff_personal_site/README.md` specs the navbar as the only global chrome — there is
no footer in it. `components/footer.tsx` was added anyway, deliberately: the RSS feed had no
visible entry point, only the `<link rel="alternate">` autodiscovery tag, which helps feed
readers but not people. It's intentionally minimal (muted copyright, one steel-blue RSS link) so
it doesn't compete with the contact page. Don't delete it as "not in the spec."

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
