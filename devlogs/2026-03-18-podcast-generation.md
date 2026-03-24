# Devlog: D3 Podcast Generation via NotebookLM Automation

**Date:** 2026-03-18
**Duration:** ~1 hour
**Result:** 12/12 D3 podcast episodes generated and saved

---

## What we did

Generated AI podcast episodes for all 12 D3 lessons using Google's NotebookLM Audio Overview feature, automated via browser automation (Claude Code + Chrome).

Each episode is a ~15-25 minute two-host conversational podcast that covers the lesson material with mental models, analogies, memorization tips, and broadcast TV connections — tailored to Trevor's background as a journalist learning D3 for broadcast data visualization.

## The pipeline

1. **Scripts already existed** in `tools/podcast-prep/scripts/d3/` — each contains a Section 1 (source document for NotebookLM) and Section 2 (customization instructions for the podcast style)
2. **Browser automation** drove Chrome to NotebookLM: create notebook → paste source text → insert → navigate to Studio → click Audio Overview → wait ~5 min → download
3. **Parallel generation** — ran 4 NotebookLM tabs simultaneously to cut total time
4. **ffmpeg conversion** — NotebookLM downloads as .m4a, converted to .mp3 with `ffmpeg -codec:a libmp3lame -qscale:a 2`

## Key decisions and learnings

- **NotebookLM free tier has daily limits** (~3-4 Audio Overviews per day). Hit the wall after 3 generations.
- **Activated Google Workspace Business Standard free trial** ($16.80/month, 14-day trial) to remove limits. Need to cancel before 2026-04-01.
- **JS automation was 10x faster than click-by-click.** Initially tried manual browser clicks (~20 interactions per lesson). Switched to injecting JS via `javascript_tool` that chains the entire flow with `setTimeout` — paste, insert, navigate, generate — all in one call.
- **Background tab notebook creation is unreliable.** The `/notebook/creating` URL and button clicks often stall in background tabs. Workaround: navigate to home page, use JS to click Create button (triggers in-page navigation that works).
- **4 parallel generations is the sweet spot.** More than that and Google starts returning 503s on notebook creation.

## Files produced

```
audio/d3/
  01-fundamentals.mp3      (~20MB, 23:44)
  02-selections-data.mp3   (~19MB)
  03-scales-axes.mp3       (~20MB)
  04-shapes-bindings.mp3   (~18MB)
  05-maps-geo.mp3          (~20MB)
  06-transitions-interactivity.mp3 (~16MB)
  07-lines-areas.mp3       (~19MB)
  08-arcs-pies.mp3         (~16MB)
  09-maps-geo.mp3          (~8MB)
  10-interactivity.mp3     (~19MB)
  11-d3-react.mp3          (~18MB)
  12-capstone.mp3          (~17MB)
```

Total: ~210MB of podcast content across 12 episodes.

## What's next

- **Listen to a few episodes** and assess quality/style before generating Django and SQL tracks
- **Django track** (12 episodes) — scripts ready in `tools/podcast-prep/scripts/django/`
- **SQL track** (12 episodes) — scripts ready in `tools/podcast-prep/scripts/sql/`
- **Cancel Google Workspace trial** before 2026-04-01

## Note on the podcast player

The podcast player (`components/podcast-player.js`) automatically detects MP3 files at `/audio/{track}/{slug}.mp3` and shows a headphone button on the corresponding lesson page. No code changes needed — just drop the MP3s in the right folder and it works.
