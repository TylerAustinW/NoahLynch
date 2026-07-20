---
description: Validate code changes against memory persona using Context7 and Brave Search
---

# Memory Persona Validation Workflow

This workflow validates code changes against the memory persona by reviewing working changes, checking up-to-date documentation via Context7, and validating against best practices using Brave Search.

## Steps

1. **Review Working Changes**
   - Ask the agent to read through the current working changes
   - Provide a concrete and detailed summary of what was changed

2. **Run Context7 Validation**
   - Use Context7 to fetch up-to-date documentation for relevant libraries (Next.js, Framer Motion, etc.)
   - Ensure proof of concept is current (2025/2026)
   - Check if changes align with latest best practices

3. **Run Brave Search Validation**
   - Use Brave Search to validate against current industry best practices
   - Search for specific patterns used in the changes (e.g., "React touch gesture handling swipe best practices 2025")
   - Compare implementation against community standards

4. **Provide Validation Report**
   - Confirm which changes align with best practices (✅)
   - Flag potential issues (⚠️)
   - Suggest better alternatives when available
   - Be concrete and specific with feedback

5. **User Decision**
   - Present validation findings to user
   - Wait for user confirmation before implementing any suggested improvements

## When to Use

Run this workflow After finishing the initial implementation to validate against memory persona guidelines and best practices.
