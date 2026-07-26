/**
 * Next.js merges `alternates` shallowly: any page that declares its own
 * `alternates` (e.g. `{ canonical: ... }`) replaces the root layout's
 * `alternates` entirely, dropping the RSS autodiscovery link. Spread this
 * into every page-level `alternates` object to keep it present everywhere.
 */
export function rssAlternate() {
  return { "application/rss+xml": `${site.url}/rss.xml` };
}

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
    github: "https://github.com/jimmyblain",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    // Media is hidden until there are real appearances to show — the page lives
    // at app/_media/ (underscore = private folder, excluded from routing).
    // To bring it back: rename to app/media/, restore this entry and the
    // sitemap path in app/sitemap.ts.
    { href: "/contact", label: "Contact" },
  ],
} as const;
