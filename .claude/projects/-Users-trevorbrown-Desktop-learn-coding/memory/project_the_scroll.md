---
name: The Scroll feed feature
description: Social media-style learning feed at /feed/ with AI personas, comments, and AI replies in character
type: project
---

"The Scroll" — a doomscrolling-replacement feed with coding tips, interview Qs, hot takes, and debug challenges.

**Why:** Trevor saw a Twitter post about replacing social media feeds with learning content. Wanted a similar experience with dev personas and AI interaction.

**How to apply:** The feed lives at /feed/ with its own JS modules (feed-data.js, feed.js). Uses the existing /api/chat endpoint with platform='feed'. Each track has whimsical sub-names: D3="The Bindery", Django="The Shell", SQL="The Table". AI personas have fun handles like @bobby_tables, @bindData, @manage_py. Users can comment and AI replies in character via a dedicated FEED_SYSTEM_PROMPT.
