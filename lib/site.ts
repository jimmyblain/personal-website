/**
 * Next.js merges `alternates` shallowly: any page that declares its own
 * `alternates` (e.g. `{ canonical: ... }`) replaces the root layout's
 * `alternates` entirely, dropping the RSS autodiscovery link. Spread this
 * into every page-level `alternates` object to keep it present everywhere.
 */
export function rssAlternate() {
  return { "application/rss+xml": `${site.url}/rss.xml` }
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
