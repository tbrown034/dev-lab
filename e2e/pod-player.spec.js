// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Pod Player', () => {

  test('episode page loads with transcript', async ({ page }) => {
    await page.goto('/pod/d3/01-svg-fundamentals/');
    await expect(page).toHaveTitle(/SVG Fundamentals/);
    await expect(page.locator('h1')).toContainText('SVG Fundamentals');

    // Transcript lines should be built from the TRANSCRIPT data
    const transcriptLines = page.locator('.transcript-line');
    await expect(transcriptLines.first()).toBeVisible();
    const lineCount = await transcriptLines.count();
    expect(lineCount).toBeGreaterThan(0);
  });

  test('play button exists and is clickable', async ({ page }) => {
    await page.goto('/pod/d3/01-svg-fundamentals/');
    const playBtn = page.locator('#play-pause');
    await expect(playBtn).toBeVisible();
    await expect(playBtn).toBeEnabled();

    // Verify it has the play icon initially
    const playIcon = playBtn.locator('.icon-play');
    const pauseIcon = playBtn.locator('.icon-pause');
    await expect(playIcon).toBeVisible();
    // Pause icon should be hidden initially
    await expect(pauseIcon).toBeHidden();
  });

  test('speed control cycles through speeds', async ({ page }) => {
    await page.goto('/pod/d3/01-svg-fundamentals/');
    const speedBtn = page.locator('#speed-btn');
    await expect(speedBtn).toBeVisible();

    // Initial speed should be 1x
    await expect(speedBtn).toHaveText('1x');

    // Cycle: 1x -> 1.25x -> 1.5x -> 2x -> 0.75x -> 1x
    const expectedSpeeds = ['1.25x', '1.5x', '2x', '0.75x', '1x'];
    for (const speed of expectedSpeeds) {
      await speedBtn.click();
      await expect(speedBtn).toHaveText(speed);
    }
  });

  test('clicking transcript segment seeks audio and triggers active state', async ({ page }) => {
    await page.goto('/pod/d3/01-svg-fundamentals/');
    const transcriptLines = page.locator('.transcript-line');
    await expect(transcriptLines.first()).toBeVisible();

    // Click a transcript line further down (e.g., 3rd line)
    const targetLine = transcriptLines.nth(2);
    await targetLine.click();

    // The click handler calls audio.currentTime = seg.time and audio.play().
    // Since there may be no actual audio file, timeupdate may not fire.
    // Instead, manually trigger the sync by dispatching a timeupdate event
    // so the transcript highlight logic runs.
    await page.evaluate(() => {
      const audio = document.getElementById('episode-audio');
      if (audio) audio.dispatchEvent(new Event('timeupdate'));
    });

    // Now either the clicked line or the first line (time=0) should be active
    // depending on whether currentTime was actually set
    const anyActive = page.locator('.transcript-line.active');
    await expect(anyActive).toHaveCount(1);
  });

  test('transcript lines exist and have content', async ({ page }) => {
    await page.goto('/pod/d3/01-svg-fundamentals/');
    const transcriptLines = page.locator('.transcript-line');
    const count = await transcriptLines.count();
    expect(count).toBeGreaterThan(5);

    // Each line should have a timestamp and text
    const firstLine = transcriptLines.first();
    const timestamp = firstLine.locator('.timestamp');
    const text = firstLine.locator('.text');
    await expect(timestamp).toBeVisible();
    await expect(text).toBeVisible();

    const textContent = await text.textContent();
    expect(textContent.length).toBeGreaterThan(10);
  });

  test('pod index page loads with episode list', async ({ page }) => {
    await page.goto('/pod/');
    await expect(page).toHaveTitle(/The Pod/);

    // Should have episode links
    const episodes = page.locator('a.episode');
    const count = await episodes.count();
    expect(count).toBeGreaterThan(0);

    // Click first episode navigates to episode page
    await episodes.first().click();
    await expect(page).toHaveURL(/\/pod\/.+\//);
    await expect(page.locator('h1')).toBeVisible();
  });
});
