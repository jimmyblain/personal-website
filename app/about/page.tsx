import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { rssAlternate, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "IT director and systems architect — strategy, budget, and vendor portfolio at The Rockefeller Foundation, still building the systems directly.",
  alternates: { canonical: "/about", types: rssAlternate() },
}

const experience = [
  {
    period: "2024 — Now",
    role: "Director, IT Operations & Services Management",
    company: "The Rockefeller Foundation",
    description:
      "Now I set the technology strategy and own the budget, including for our public charity RF Catalytic Capital, and I've brought spend down year over year by retiring underused services and renegotiating bloated contracts. I stood up our AI governance from scratch: a monthly council with the COO and Chief People Officer, and 20 departmental AI Ambassadors who build fluency on their teams and bring use cases back to it. And I do the building myself. I've built tools and agentic workflows on top of the systems we run, so our team can talk to our infrastructure in plain English, and wrote the Azure service that checks about 750,000 Claude prompts a month against our AI usage policy (then re-architected it from $322 a month to $13). When we moved off Box, I ran the migration to SharePoint in-house with AI-built tooling and skipped roughly $207k in consultant fees.",
  },
  {
    period: "2020 — 2024",
    role: "IT Services Manager",
    company: "The Rockefeller Foundation",
    description:
      "Moving into management, I led and trained a global support team resolving 1,000+ incidents a month at 85% first-time resolution. The bigger work was fixing the system around that team: one Salesforce case platform in place of scattered ticket queues (it surfaced 20% more incidents that had been going unreported), automated SSO and SCIM for about 40 apps on Okta and Entra ID, and a 21% cut in yearly Azure and AWS spend. I also worked with peer departments to set a procurement policy that reined in shadow IT without leaving staff short on the tools they needed.",
  },
  {
    period: "2016 — 2020",
    role: "Systems Support Engineer",
    company: "Ventucom",
    description:
      "At an MSP, I managed 1,000+ Windows and macOS devices across client fleets with Intune and JAMF, and closed email-spoofing gaps with DKIM and DMARC. Doing the same tenant tasks by hand for every client got old fast, so I wrote PowerShell tooling that turned onboarding a new client into a CSV instead of a click-through. That habit of building my way out of repetitive work started here.",
  },
  {
    period: "2015 — 2016",
    role: "Technology Specialist",
    company: "Medgar Evers College, CUNY",
    description:
      "My first IT job, while I was finishing my degree at Brooklyn College. Every technical problem in the college's career office came to me, and it was on me to keep the office and its staff running through the academic year.",
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
          I'm an IT director and systems architect with about ten years across global enterprise IT, 
          multi-client MSP environments, and applied AI. I run the parts most people split between two roles: 
          strategy, budget, and vendors at the top, and the systems build underneath.
        </p>
        <p>
          The build isn't just a hand-off step for me. I architect the identity, cloud, and automation systems 
          the organization runs on, and I stay in the work myself instead of passing it to a vendor or a slide deck. 
          Most leaders at this level stopped years ago. Being close to how the systems actually behave is what 
          keeps my calls on strategy, budget, and risk grounded, and honestly it's the part I enjoy most.
        </p>
      </div>

      <section className="mt-20" aria-labelledby="experience">
        <div className="flex items-center justify-between">
          <h2 id="experience" className="text-[26px] font-semibold tracking-[-0.015em]">
            Experience
          </h2>
          <Button className="rounded-lg" render={<a href={site.resume} download />} nativeButton={false}>
            Download PDF ↓
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
