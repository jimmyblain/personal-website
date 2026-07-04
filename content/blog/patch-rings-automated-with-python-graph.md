---
title: "Patch rings, automated with Python + Graph"
date: "2026-02-09"
summary: "Turning device-group patch management into user-aware, department-tiered Intune update rings for 300 users."
tags: [Automation, Intune]
---

<!-- PLACEHOLDER BODY — owner replaces with the real post. -->

Intune's update rings are device-centric, but risk is user-centric. Finance
closing the books is not the week to reboot their laptops.

## The approach

A scheduled Python job reads department and role from Entra via Microsoft
Graph, maps each user's primary device into a tier, and rewrites the Intune
ring assignments. Pilot users patch first; the CFO's team patches last.

The whole thing is ~200 lines of Python and one service principal. It replaced
a quarterly spreadsheet exercise nobody trusted.
