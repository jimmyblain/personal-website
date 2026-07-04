# Deploying jimmyblain.com

One-time setup: push to GitHub, import to Vercel, point your domain. After this,
every `git push` to `main` deploys automatically.

Prerequisites: a [GitHub](https://github.com) account and a [Vercel](https://vercel.com)
account (sign in to Vercel *with* GitHub — it makes the import one click).

---

## 1. Commit your remaining changes

You edited `lib/site.ts` and replaced `public/resume.pdf` — commit those first:

```bash
cd /Users/JBlain/repos/personal-website
git add -A
git commit -m "content: real contact details + resume PDF"
```

Confirm the tree is clean and everything builds:

```bash
git status        # should say "nothing to commit, working tree clean"
npm run build     # should succeed with all routes static/SSG
```

> Sanity check `lib/site.ts` one more time — `email`, `links.linkedin`, and
> `links.github` are what appear on your public Contact page and in your RSS feed.

---

## 2. Create the GitHub repo and push

**Option A — GitHub CLI (fastest):**

```bash
# install once if needed: brew install gh   then:  gh auth login
gh repo create jimmyblain-site --private --source=. --remote=origin --push
```

That creates the repo, adds it as `origin`, and pushes `main` in one step. Use
`--public` instead of `--private` if you want the source public.

**Option B — GitHub website:**

1. Create a new empty repo at <https://github.com/new> (no README/.gitignore — the repo already has them).
2. Then:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

---

## 3. Import to Vercel

1. Go to <https://vercel.com/new>.
2. Pick your GitHub account and select the repo you just pushed.
3. Vercel auto-detects **Next.js** — leave every setting at its default:
   - Framework preset: Next.js
   - Build command / output dir / install command: **defaults** (don't override)
   - **Environment variables: none needed.** This site has no backend, database,
     or secrets.
4. Click **Deploy**. First build takes ~1–2 minutes.

You'll get a live URL like `https://jimmyblain-site.vercel.app`. Open it and click
around — the site is fully live there already.

> The canonical URLs, sitemap, and RSS feed are hardcoded to `https://jimmyblain.com`
> (via `site.url` in `lib/site.ts`). That's intentional — they should point at your
> real domain, not the `*.vercel.app` preview. They'll be correct the moment your
> domain is attached in the next step. (If you ever change the final domain, edit
> `site.url` in `lib/site.ts` — it's the single source of truth.)

From now on: **push to `main` → production deploy. Open a PR → free preview URL.**

---

## 4. Point jimmyblain.com at Vercel

In your Vercel project: **Settings → Domains → Add**.

1. Add `jimmyblain.com`.
2. Add `www.jimmyblain.com` — Vercel will offer to redirect it to the apex; accept.

Vercel then shows the exact DNS records to create. At your **domain registrar**
(wherever you bought jimmyblain.com — GoDaddy, Namecheap, Cloudflare, etc.), open
the DNS settings and add what Vercel tells you. It's typically:

| Type  | Name / Host | Value                     |
| ----- | ----------- | ------------------------- |
| `A`   | `@` (apex)  | `76.76.21.21`             |
| `CNAME` | `www`     | `cname.vercel-dns.com`    |

> Use the values Vercel actually displays — they occasionally differ. If your
> registrar is Cloudflare, set those records to **DNS only** (grey cloud), not proxied.

DNS propagation is usually minutes, sometimes up to a few hours. Vercel auto-issues
the HTTPS certificate once the records resolve — no action needed. The domain page
shows a green check when it's live.

---

## 5. Post-deploy smoke test

Once `https://jimmyblain.com` resolves:

- [ ] Home, About, Blog, a blog post, Media, Contact all load
- [ ] Theme toggle works and persists across reload
- [ ] `https://jimmyblain.com/rss.xml` returns the feed (3 posts)
- [ ] `https://jimmyblain.com/sitemap.xml` and `/robots.txt` load
- [ ] View source on a post → `<link rel="canonical">` points at `jimmyblain.com`
- [ ] Replace any remaining placeholders: real media embed URLs in `lib/media.ts`

---

## Publishing after launch

Write a Markdown file, add frontmatter, drop it in `content/blog/`, commit, push.
Vercel redeploys automatically. Full details in `README.md`.
