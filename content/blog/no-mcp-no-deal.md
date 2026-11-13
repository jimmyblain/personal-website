---
title: "No MCP, No Deal"
date: "2026-11-13"
summary: "Why my organization no longer approves software that doesn't support MCP, and why other IT leaders should make the same call."
tags: [AI, MCP]
---

As IT director, I recently told our procurement team that we'll no longer approve any software request that doesn't support MCP.

If you haven't run into it yet, MCP (Model Context Protocol) is an open standard that lets an AI agent talk directly to other software. The agent can read the data in a system, search it, and act on it, instead of you copying and pasting between tabs.

That might sound like a hard line for a protocol this new, but we've drawn lines like it before. Single sign-on (SSO) and basic data and privacy protections are things vendors have known they needed to provide for years. MCP is new by comparison, but we're at the point where, if you don't have it, you can't get your foot in the door at our organization.

## How we got here

The crazy thing is, I only learned about MCP around January of this year (2026). I picked it up piecemeal through chatter on Twitter and LinkedIn and from what Anthropic published when they first released the protocol, and then I saw it up close at an in-house conference at our company.

The timing couldn't have been better. We were in the early stages of planning a custom agent harness, because we wanted to connect our internal data to an AI agent that we controlled and trusted. I knew going in that this was an insane technical undertaking and that, as a non-tech organization, we'd take on a mountain of technical debt just to keep the beast updated.

At that conference, by pure serendipity, I caught a talk from someone doing something similar at a similar organization. Their answer was MCP, which let them connect all the scattered services and tools they were using to one central agent.

So I dug in. I learned how Claude uses MCP through what Anthropic calls connectors, right inside the Claude app, and saw that 80 to 90 percent of what we wanted the custom harness to do was already covered. Even better, a lot of the tools we used every day either fully supported MCP or had it on their roadmap.

That revelation, on top of how good the Claude models were at the time, convinced our executive sponsor to drop the custom build and lean fully on Claude Enterprise. I think the org is better for it. We never took on that technical debt, and the dividends have been huge.

## One more login

One of the biggest payoffs traces back to that original planning meeting, where a colleague made a point I've carried into almost every planning and product conversation since: **it's very hard to get people to log into one more thing**.

Our people already log into email, Zoom, Slack, the HR portal, and the CRM. By the grace of God, we convinced everyone to also log into Claude and use it regularly, so the idea of adding something else on top of that just didn't make sense.

The reverse is also true. If you can consolidate those scattered services into a single pane, people context switch far less, and they can combine data from different tools into a single outcome. That's what we're ultimately here to do: produce outcomes, not use tools.

## The data is the value

A lot of software vendors miss this. Their product was always valuable for how it helped us shape our data in a clean and consistent way, but the data itself is the value. The shaping still matters, but AI agents can shape data in endless ways, including ways we never knew we needed. What they can't do is make the data. So the most important thing a buyer can demand is full, reliable access to their own data from whatever agent they choose.

It helps that MCP is open source and no longer controlled by Anthropic, which donated it to the [Agentic AI Foundation](https://aaif.io/) under the Linux Foundation, so we're not beholden to one company for continued support. Practically every modern agent platform supports it now. If we ever switch to OpenAI's models or go back to Copilot, our MCP connections come with us, along with the value they bring.

We, as an org, have become addicted to the productivity we get when these systems actually talk to each other instead of sitting in silos. So our people are almost incredulous when a critical, fully cloud-based system refuses to talk to their agent of choice, and I don't blame them. It feels like our value is being held hostage.

## To the vendors

If you sell software that can't natively talk to a modern AI agent, the writing is on the wall. Two patterns worry me most: the vendors who insist customers log into their platform to use their own bespoke AI assistant, and the ones who technically offer MCP but gate it behind an obscure add-on or a higher contract tier. The first runs straight into the one-more-login problem, and the second charges your customers a toll to reach their own data.

That's a risky place to stand when software has never been easier to build or copy. If your product makes the data hard to reach, your customers can build a version that doesn't.

## To my fellow IT leaders

I implore other organizations to make the same call we did: only buy, support, and build on services that can talk natively to AI agents. Put MCP in your procurement criteria next to SSO, and hold the line.

Whatever happens in the market, AI will not be uninvented. Our job is to lead our organizations toward a tech stack built for where the world is going, not where it's been.
