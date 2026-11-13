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

/**
 * The home page's Achievements window. `stat` is the big pixel figure, `detail` the line under it.
 * Keep the hedges ("about", "roughly"): these are rounded figures.
 */
export const achievements = [
  { stat: "CISSP", detail: "Certified Information Systems Security Professional" },
  {
    stat: "About 750,000",
    detail:
      "Claude prompts a month checked against our AI usage policy, by a service I wrote and then re-architected from $322 a month to $13",
  },
  {
    stat: "Roughly $207k",
    detail: "in consultant fees skipped by running the Box migration in-house",
  },
  { stat: "About 40 apps", detail: "on automated SSO and SCIM through Okta and Entra ID" },
] as const
