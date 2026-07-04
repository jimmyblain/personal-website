---
title: "Identity-first: SSO + SCIM for 40 apps"
date: "2026-04-03"
summary: "A practical model for automated joiner/mover/leaver access across a globally distributed workforce on Okta and Entra."
tags: [IAM, Okta, Entra]
---

<!-- PLACEHOLDER BODY — owner replaces with the real post. -->

Access management breaks quietly. Nobody notices the contractor who kept their
Salesforce seat for eight months, until an auditor does.

## Joiner, mover, leaver

The model we run: every application behind SSO, every entitlement granted by
group membership, every group driven by HR attributes. When the HR system says
someone changed departments, their access follows within the hour — no ticket.

Getting roughly 40 applications onto SSO and SCIM took a year of vendor calls,
and it was worth every one. Provisioning stopped being a task and became a
property of the system.

## What I'd do differently

Start with the deprovisioning story, not the login story. SSO sells itself;
automated *removal* is the part that protects the organization.
