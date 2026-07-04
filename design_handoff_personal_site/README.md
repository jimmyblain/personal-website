# Handoff: Jimmy Blain — Personal Website

## Overview
Visual system and page mockups for **jimmyblain.com**, a personal-brand site for a
technical IT leader. The site should read as credible, modern, and content-forward —
editorial and typography-led, not flashy or templated. Six pages: **Home, About/Resume,
Blog index, Blog post, Contact, Media**. Full light + dark mode, fully responsive.

Target stack (stated by the owner): **Next.js (App Router) + Tailwind CSS + shadcn/ui**.

## About the Design Files
The file in this bundle — `Jimmy Blain - Site System.dc.html` — is a **design reference
created in HTML**. It is a prototype showing the intended look, layout, type, color, and
behavior. **It is not production code to copy directly.** The `.dc.html` format is a
streaming preview wrapper; ignore the wrapper, `support.js`, and the inline `style="…"`
mechanics — read them only as a spec for values.

Your task is to **recreate these designs in a real Next.js + Tailwind + shadcn/ui app**
using that ecosystem's idioms: shadcn theme tokens in `globals.css`, Tailwind utility
classes, `next/font` for the typefaces, React Server Components for the static pages, and
shadcn primitives (`Button`, `Badge`, `Card`, `Separator`, etc.) where they fit. Do not
port inline styles verbatim.

To view the reference: open the `.dc.html` file in a browser (it renders standalone). It is
laid out as a single design canvas with four labelled bands: **01 Foundations**,
**02 Home · three directions**, **03 Inner pages**, **04 Responsive · mobile**.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, and layout. Recreate the UI closely
using shadcn/ui + Tailwind — match the type hierarchy, spacing rhythm, and exact token
values below. Interactions are lightly specified (this is a static content site), so use
sensible, accessible defaults for hover/focus.

## Selected direction
The home page was explored in three directions (labelled `1a`, `1b`, `1c` in the canvas).
**`1a` (Editorial statement) is the chosen direction** and drives all inner pages. `1b`
(Split · Now) and `1c` (Index) are recorded as alternates only — **do not build them**,
but note two ideas worth keeping as optional enhancements:
- The **"Now" card** from `1b` (currently building / reading / certs) — a nice optional Home module.
- The **warm tan monogram** from `1c`, which has already been folded into `1a` as the site-wide nav brand mark.

---

## Design Tokens

### Color — semantic (source of truth)
Map these to shadcn CSS variables in `app/globals.css`. Hex given; convert to shadcn's
color format (oklch/hsl) as your shadcn version prefers. A ready-to-adapt block is at the
end of this section.

**Light mode**
| Role | Hex | Notes |
|---|---|---|
| background | `#FFFFFF` | page background |
| foreground | `#1B1E1F` | primary text (near-black, warm-neutral) |
| muted (surface) | `#EEF2F2` | tag chips, subtle fills, code chrome |
| muted-foreground | `#5B6465` | secondary text, summaries |
| primary / link | `#3A6375` | muted petrol-slate — links, primary buttons, active accents |
| primary-hover | `#23404C` | darker press/hover |
| primary-foreground | `#FFFFFF` | text on primary fill |
| border | `#C5D6D8` | strong borders |
| border-subtle | `#EAEFEF` | list dividers, section rules |
| border-hairline | `#DBE2E3` | card outlines, window chrome |
| accent | `#6AB0CD` | sky-teal — sparing decorative accent (blockquote rule, spacing demo) |
| warm-accent | `#EBC6AD` | tan — the "JB" monogram tile background only |
| warm-accent-foreground | `#77573C` | text/initials on the tan tile |
| success | `#1F8A5B` | status dot / "selected" affordance (used in canvas only) |

**Dark mode**
| Role | Hex | Notes |
|---|---|---|
| background | `#191B1B` | |
| foreground | `#EBF2F3` | |
| card / elevated chrome | `#202323` | window bar, elevated surfaces |
| muted (surface) | `#262A2A` | tag chips, fills |
| muted-foreground | `#9AA6A7` | secondary text |
| link | `#86BBD4` | light steel-blue — inline links, code keywords |
| primary (CTA fill) | `#6AB0CD` | inverted primary: light fill … |
| primary-foreground | `#14232A` | … with dark text on it |
| border | `#333939` | |
| border-subtle | `#262A2A` | dividers |
| accent | `#6AB0CD` | blockquote rule, code builtin/function names |
| warm-accent | `#EBC6AD` / text `#77573C` | monogram tile (same in both modes) |

**Code block (dark) syntax colors** — `background #131515`, chrome `#1B1E1E`,
base text `#C6CFD0`, keyword `#86BBD4`, builtin/function `#6AB0CD`, string `#9FD3A8`.

> **Design intent — read this:** the palette is deliberately restrained and cool-neutral.
> The steel-blue is reserved for **links and key actions only** — never as a decorative
> wash, gradient, or large fill. The tan is used **once**, as the monogram. Avoid adding
> saturated blues/indigos or gradients; that was explicitly designed out.

**Example `globals.css` (adapt to your shadcn version's format):**
```css
:root {
  --background: #FFFFFF;
  --foreground: #1B1E1F;
  --muted: #EEF2F2;
  --muted-foreground: #5B6465;
  --primary: #3A6375;
  --primary-foreground: #FFFFFF;
  --accent: #6AB0CD;
  --border: #DBE2E3;
  --ring: #3A6375;
  --radius: 0.75rem; /* 12px */
}
.dark {
  --background: #191B1B;
  --foreground: #EBF2F3;
  --card: #202323;
  --muted: #262A2A;
  --muted-foreground: #9AA6A7;
  --primary: #6AB0CD;         /* inverted: light fill */
  --primary-foreground: #14232A;
  --accent: #6AB0CD;
  --border: #333939;
  --ring: #86BBD4;
}
```
Custom tokens without a shadcn slot (warm-accent `#EBC6AD`/`#77573C`, link `#86BBD4`,
code colors) can be added as extra CSS variables or a small Tailwind theme extension.

### Typography
One family throughout: **Geist** (UI + headings + body) and **Geist Mono** (eyebrows,
dates, tags, code). Load with `next/font/google` (`Geist`, `Geist_Mono`) or
`geist/font`. Weights used: 300, 400, 500, 600, 700.

| Token | Size | Weight | Line-height | Letter-spacing | Usage |
|---|---|---|---|---|---|
| display | 56–64px | 600 | 1.02–1.04 | -0.03em | Home hero H1 |
| h1 | 40–44px | 600 | 1.1 | -0.025em | page titles, post title |
| h2 | 26–30px | 600 | 1.15–1.2 | -0.015em | section headings |
| h3 | 17–22px | 600 | 1.2 | -0.01em | post titles in lists, role titles |
| body-lg | 18–19px | 400 | 1.65–1.8 | normal | hero sub, article body |
| body | 16–17px | 400 | 1.6 | normal | summaries, paragraphs |
| small | 14px | 400 | 1.5 | normal | captions, meta |
| mono-label | 11–13px | 400/500 | 1 | +0.06 to +0.16em, UPPERCASE | eyebrows, dates, tags, section labels |

Reading width for article/prose content: **~680px** (`max-w-[680px]`). Inner-page text
column: **~760px**. Body copy paragraphs cap around **56–66ch**.

### Spacing
4px base scale — maps directly to Tailwind: `4 8 12 16 24 32 48 64 96 128`
(`1 2 3 4 6 8 12 16 24 32`). Section bands on the canvas use large vertical rhythm
(64–128px between major sections). Nav padding `22px 44px` desktop, `16px 20px` mobile.

### Radius
- `md` **6–8px** (`rounded-md` / `rounded-lg`) — buttons, inputs, tag chips are `full`.
- `lg` **12–14px** (`rounded-xl`) — cards, code blocks, monogram tile (7px on the small tile).
- `full` **999px** (`rounded-full`) — tag/pill chips, status dots, avatar toggle.
- shadcn `--radius: 0.75rem` (12px) is the base.

### Shadows
Cards/frames only need a soft elevation. Reference used
`0 24–30px 60–70px -24/-30px rgba(20,30,40,.28)` + a tight `0 4–6px 12–16px -4/-6px`
ambient. In-app, a single `shadow-lg`/`shadow-xl` is fine; keep shadows subtle.

---

## Screens / Views

> The browser-window chrome (traffic lights + URL pill) and the outer "canvas" framing in
> the reference are **presentation scaffolding — do not build them.** Build the page
> content inside them.

### Global chrome — Navbar (all pages)
- **Layout:** sticky top bar, `flex items-center justify-between`, padding `22px 44px`
  desktop / `16px 20px` mobile, bottom border `border-subtle`.
- **Left — brand mark:** a `26×26px` (`24×24` mobile) `rounded-md` tile filled
  `#EBC6AD`, containing mono initials **"JB"** in `#77573C`, 12px/500; followed by the
  wordmark **"jimmy blain"** in Geist Mono 14px/500, lowercase, foreground color.
- **Right — nav links:** `Home · About · Blog · Media · Contact`, Geist 14px. Active link
  = foreground + weight 500; inactive = muted-foreground. Then a `28px` `rounded-full`
  bordered **theme toggle** button (icon: sun/moon). On mobile the links collapse to a
  hamburger (`≡`).
- **Blue is NOT used for the active nav item** — active is just darker text. Reserve the
  steel-blue for content links and buttons.

### 1 — Home (direction `1a`, "Editorial statement")
- **Purpose:** who Jimmy is, at a glance, + entry to the sections + recent posts.
- **Layout:** single centered column, generous top padding (~80px). Left-aligned type.
- **Components:**
  - **Eyebrow:** a `24×3px` rounded tan (`#EBC6AD`) tick + mono label
    "Director, IT Operations — The Rockefeller Foundation".
  - **Hero H1** (display, `max-w-[16ch]`): "I run enterprise IT and still write the code behind it."
  - **Sub** (body-lg, muted-foreground, `~56ch`): the positioning paragraph.
  - **Actions:** primary button "Read the blog →" (`#3A6375` fill, white text, `rounded-lg`,
    padding `12px 22px`) + a text link "About & resume" in primary color.
  - **Recent writing:** section with a mono uppercase label "Recent writing" and a
    "All posts →" link (primary). Then 3 post rows separated by `border-subtle` top rules.
    Each row: title (h3) left + mono date right (`justify-between`, `items-baseline`);
    summary (body, muted, `~64ch`) below.
- **Responsive:** on mobile (see canvas band 04) hero drops to ~32px, single column,
  full-width primary button, nav collapses to hamburger.

### 2 — About / Resume
- **Purpose:** longer bio + structured resume + PDF download.
- **Layout:** centered `~760px` column.
- **Components:**
  - Eyebrow "About" (mono) → H1 "The hands-on director".
  - **Bio:** two body-lg paragraphs.
  - **Experience** section: header row with H2 "Experience" (left) and a **primary
    "Download PDF ↓" button** (right, `#3A6375` fill). Then role entries as a 2-column
    grid `150px | 1fr` separated by top rules — left column mono date range
    (`2024 — Now`), right column role title (h3) + company (small, muted) + one-line
    description (body, muted). Roles: Director IT Ops & Services Mgmt (Rockefeller,
    2024–Now); IT Services Manager (Rockefeller, 2020–2024); Systems Engineer (Ventucom,
    2016–2020).
  - **Skills** section: H2 + a wrapped row of pill chips (mono 12px, `muted` bg,
    `border-hairline`, `rounded-full`, padding `6px 12px`): Azure · AZ-104 / Okta · Entra
    ID / Python / Claude Agent SDK · MCP / Intune / NetSuite · Salesforce / CISSP / ITIL 4.
  - **PDF:** wire "Download PDF" to a static `/resume.pdf` in `public/` (owner supplies).

### 3 — Blog index
- **Purpose:** readable, typography-led list of posts.
- **Layout:** centered `~760px` column.
- **Components:** eyebrow "Writing" → H1 "Notes on IT, AI & automation" → intro (body-lg,
  muted). Then post rows separated by `border-subtle` rules, more spacious than Home
  (`padding: 28px 0`): title (h3, ~21px) left + mono full date right; summary (body ~16px,
  muted); a row of tag chips (mono 11px pills). Four posts — see Content section.

### 4 — Blog post
- **Purpose:** focused reading layout, strong type, comfortable measure, good code blocks.
  (Shown in **dark mode** in the reference; must work in both.)
- **Layout:** centered **`~680px`** reading column.
- **Components:**
  - "← All posts" back link (mono, link color).
  - Meta row: mono date · a `3px` dot separator · "8 min read".
  - H1 (h1/42px) + tag chips.
  - **Body:** body-lg paragraphs (`line-height 1.8`), inline links in link color, H2
    subheads.
  - **Code block:** rounded-xl container; top chrome bar with mono filename left +
    "Copy" (link color) right; `<pre>` with Geist Mono ~13.5px, `line-height 1.7`,
    horizontal scroll, syntax colors per token table. Use a real syntax highlighter
    (Shiki / rehype-pretty-code) with a theme matching those colors.
  - **Blockquote:** left rule `3px` in accent (`#6AB0CD`), larger text (20px/500),
    generous vertical margin.

### 5 — Media
- **Purpose:** responsive grid of embedded videos/podcasts (YouTube, Spotify, Apple).
  (Shown in **dark mode** in the reference.)
- **Layout:** eyebrow "Media" → H1 "Talks & appearances" → intro. Then a **2-column grid**
  (`gap ~28px`) that collapses to 1 column on mobile. The featured YouTube item spans full
  width (`grid-column: 1 / -1`) with a **16:9** aspect ratio; the two podcast items are
  half-width with a fixed ~152px-tall embed area.
- **Components:** each item = the embed area + a title (h3) + a meta line (small, muted).
  In the reference the embeds are **placeholders** (striped box, platform label chip
  top-left, a play glyph). **In-app, replace with real responsive embeds:**
  - YouTube: `<iframe>` in an `aspect-video` (16:9) wrapper.
  - Spotify: episode `<iframe>` (Spotify's compact embed, ~152px tall).
  - Apple Podcasts: episode `<iframe>` (Apple's embed).
  Wrap each in a `rounded-xl` bordered container so the embed sits cleanly. Keep iframes
  responsive (`w-full`, aspect wrapper) and lazy-loaded. Owner supplies real embed URLs.

### 6 — Contact
- **Purpose:** email + professional/social links, simple and direct.
  (Shown in **dark mode** in the reference.)
- **Layout:** centered `~640px` column, generous vertical padding.
- **Components:** eyebrow "Contact" → H1 "Let's talk." → intro (body-lg, muted). Then a
  **primary email button** — in dark mode it's the *inverted* primary (light `#6AB0CD`
  fill, dark `#14232A` text): "glajummyblain@gmail.com →" (`mailto:`). Below, a stacked
  list of links separated by top rules, each `justify-between`: label (foreground, 16px/500)
  left + mono value right (LinkedIn `/in/glajummyb ↗`, GitHub `/jblain ↗`, Resume
  `Download PDF ↓` in link color). External links open in a new tab with `rel="noopener"`.

---

## Interactions & Behavior
- **Navigation:** standard `next/link` between the six routes (`/`, `/about`, `/blog`,
  `/blog/[slug]`, `/media`, `/contact`). Active route drives the nav active state.
- **Theme toggle:** light/dark via `next-themes` (`class` strategy on `<html>`). The toggle
  button in the navbar switches modes; respect `prefers-color-scheme` on first load and
  persist choice. **Both modes are first-class — design and test every page in both.**
- **Hover/focus:** links → primary-hover (`#23404C` light) or subtle opacity; buttons →
  slightly darker fill; visible focus ring using `--ring`. Post rows: whole row is a link,
  subtle title color shift or underline on hover. Keep transitions short (~150ms ease).
- **Copy button** on code blocks: copies the block to clipboard, brief "Copied" feedback.
- **Responsive:** mobile-first. Nav collapses to a hamburger + sheet/menu below ~768px.
  Multi-column grids (Media, resume rows) stack to one column. Type scales down (hero
  56→32px). Reading columns are already narrow, so they just get horizontal padding on
  small screens. Everything must be comfortable at 375px width.

## State Management
Minimal — this is a static content site.
- **Theme:** `next-themes` provider (client) holds light/dark; persisted to `localStorage`.
- **Mobile nav:** local `open` boolean for the menu sheet.
- **Content:** blog posts and media items should be **data-driven**, not hardcoded in JSX.
  Recommended: MDX files (or a `content/` collection) for posts with frontmatter
  (`title, date, summary, tags, readingTime, slug`); a `media.ts` array for embeds
  (`type, title, meta, embedUrl`). Blog index and post pages read from that source.
- No auth, no forms with submission (contact is a `mailto:` + links), no data fetching
  beyond reading local content at build time (SSG).

## Assets
- **Fonts:** Geist + Geist Mono via `next/font` (self-hosted by Next automatically). No
  external font files to ship.
- **Icons:** a small set only — theme toggle (sun/moon), hamburger, and inline glyphs
  (arrows `→ ↗ ↓`, play triangles). Use `lucide-react` (ships with shadcn). The reference's
  play triangles/`◐` toggle glyph are placeholders — use real Lucide icons.
- **Images:** none required. The circular monogram is CSS/text ("JB" on a tan tile), not an
  image — keep it that way, or swap for a real headshot later if the owner provides one.
- **Media embeds:** placeholders in the reference — **owner must supply** real YouTube /
  Spotify / Apple Podcasts embed URLs.
- **Resume PDF:** owner supplies `public/resume.pdf` for the Download actions.

## Files
- `Jimmy Blain - Site System.dc.html` — the full design reference (open in a browser). Bands:
  01 Foundations (tokens, type scale, spacing/radius), 02 Home directions (build `1a`
  only), 03 Inner pages (About, Blog index, Blog post, Media, Contact), 04 Mobile.
- `support.js` — runtime for the `.dc.html` preview only. **Not part of the app**; ignore.

## Content (exact copy used — realistic, owner should confirm before publishing)
- **Name / role:** Jimmy Blain — IT Director & hands-on systems architect · Director, IT
  Operations & Services Management, The Rockefeller Foundation.
- **Posts:**
  1. "Shipping an executive AI agent in two weeks" — Jun 12 2026 — tags AI, MCP, Python.
  2. "Identity-first: SSO + SCIM for 40 apps" — Apr 03 2026 — tags IAM, Okta, Entra.
  3. "The hands-on director" — Mar 18 2026 — tag Leadership.
  4. "Patch rings, automated with Python + Graph" — Feb 09 2026 — tags Automation, Intune.
- **Media:** YouTube "Agentic IT: shipping AI that ships" (Keynote · DevOps NYC · 2026);
  Spotify "The player-coach CIO" (Ship It! · Ep. 214); Apple "Identity at scale"
  (The Access Layer · Ep. 58).
- **Contact:** glajummyblain@gmail.com · LinkedIn /in/glajummyb · GitHub /jblain.
