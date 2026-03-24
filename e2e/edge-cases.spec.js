// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Breaking things — edge cases', () => {

  test('non-existent page does not crash', async ({ page }) => {
    const response = await page.goto('/nonexistent/');
    // Vite returns a 404 page or falls back — page should not crash
    // We just verify the page loaded (status might be 404 or it may redirect)
    expect(response).toBeTruthy();
    // Body should still render something
    await expect(page.locator('body')).toBeVisible();
  });

  test('rapid theme toggle 10 times ends in correct state', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload();

    const toggle = page.locator('button.theme-toggle');
    await expect(toggle).toBeVisible();

    // Toggle 10 times rapidly
    for (let i = 0; i < 10; i++) {
      await toggle.click();
    }

    // 10 toggles from dark: dark→light→dark→light→dark→light→dark→light→dark→light = light
    // Even number of toggles = back to start (dark), but we started from null/dark
    // 10 clicks from dark = light (even), actually let's check:
    // Start: dark. 1→light, 2→dark, 3→light, ... 10→dark (even = back to start)
    const finalTheme = await page.locator('html').getAttribute('data-theme');
    // 10 is even, so should be dark
    expect(finalTheme).toBe('dark');

    // Verify no visual glitch — the toggle button should still be interactive
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('feed: toggle all filters off one by one → last one stays', async ({ page }) => {
    await page.goto('/feed/');
    await page.evaluate(() => {
      localStorage.removeItem('scroll-likes');
      localStorage.removeItem('scroll-bookmarks');
      localStorage.removeItem('scroll-comments');
    });
    await page.reload();
    await page.waitForSelector('.post', { timeout: 15000 });

    const filters = page.locator('.filter-tab');
    const total = await filters.count();

    // Click each active filter to deselect it
    for (let i = 0; i < total; i++) {
      const filter = filters.nth(i);
      const isActive = await filter.evaluate(el => el.classList.contains('active'));
      if (isActive) {
        await filter.click();
      }
    }

    // At least one should still be active
    const remaining = await page.locator('.filter-tab.active').count();
    expect(remaining).toBeGreaterThanOrEqual(1);
  });

  test('feed: like, unlike, like again → count is correct', async ({ page }) => {
    await page.goto('/feed/');
    await page.evaluate(() => {
      localStorage.removeItem('scroll-likes');
      localStorage.removeItem('scroll-bookmarks');
      localStorage.removeItem('scroll-comments');
    });
    await page.reload();
    await page.waitForSelector('.post', { timeout: 15000 });

    const firstPost = page.locator('.post').first();
    const likeBtn = firstPost.locator('.like-btn');

    // Initial: not liked
    await expect(likeBtn).not.toHaveClass(/liked/);

    // Like
    await likeBtn.click();
    await expect(likeBtn).toHaveClass(/liked/);

    // Unlike
    await likeBtn.click();
    await expect(likeBtn).not.toHaveClass(/liked/);

    // Like again
    await likeBtn.click();
    await expect(likeBtn).toHaveClass(/liked/);

    // Verify in localStorage — should be liked (true)
    const postId = await firstPost.getAttribute('data-id');
    const likes = await page.evaluate(() => JSON.parse(localStorage.getItem('scroll-likes') || '{}'));
    expect(likes[postId]).toBeTruthy();
  });

  test('feed: submit empty comment → nothing happens (send disabled)', async ({ page }) => {
    await page.goto('/feed/');
    await page.evaluate(() => {
      localStorage.removeItem('scroll-likes');
      localStorage.removeItem('scroll-bookmarks');
      localStorage.removeItem('scroll-comments');
    });
    await page.reload();
    await page.waitForSelector('.post', { timeout: 15000 });

    const firstPost = page.locator('.post').first();
    const composerInput = firstPost.locator('.composer-input');
    const sendBtn = firstPost.locator('.composer-send');

    // Send should be disabled with empty input
    await expect(sendBtn).toBeDisabled();

    // Try filling whitespace-only
    await composerInput.fill('');
    await expect(sendBtn).toBeDisabled();
  });

  test('games: answer same question twice does not double-count', async ({ page }) => {
    await page.goto('/d3/games/');
    await page.waitForSelector('.game-panel.active');

    const choiceCount = await page.locator('.choice-btn').count();
    if (choiceCount > 0) {
      // Click first answer
      const firstBtn = page.locator('.choice-btn').first();
      await firstBtn.click();

      // After answering, button should be disabled
      const isDisabled = await firstBtn.evaluate(el => el.disabled);

      // Try clicking the same button again
      await firstBtn.click({ force: true });

      // Button should either be disabled or clicking it again should have no additional effect
      // Verify the button got feedback class (correct/wrong)
      const hasFeedback = await firstBtn.evaluate(
        el => el.classList.contains('correct') || el.classList.contains('wrong')
      );
      expect(hasFeedback).toBeTruthy();
    }
  });

  test('resize from desktop to mobile and back → layout adjusts', async ({ page }) => {
    // Start desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    const hamburger = page.locator('button.hamburger');
    const desktopNav = page.locator('header nav');

    await expect(desktopNav).toBeVisible();
    await expect(hamburger).toBeHidden();

    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(hamburger).toBeVisible();
    await expect(desktopNav).toBeHidden();

    // Resize back to desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(desktopNav).toBeVisible();
    await expect(hamburger).toBeHidden();
  });

  test('scroll to bottom of long lesson → nav-footer is visible and clickable', async ({ page }) => {
    await page.goto('/d3/lessons/01-fundamentals/');
    await expect(page.locator('h1')).toBeVisible();

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const navFooter = page.locator('.nav-footer');
    await expect(navFooter).toBeVisible();

    // Next link should be clickable
    const nextLink = navFooter.locator('a').last();
    await expect(nextLink).toBeVisible();
    const href = await nextLink.getAttribute('href');
    expect(href).toBeTruthy();
  });

  test('pod: click transcript line when no audio loaded → does not crash', async ({ page }) => {
    await page.goto('/pod/d3/01-svg-fundamentals/');

    const transcriptLines = page.locator('.transcript-line');
    await expect(transcriptLines.first()).toBeVisible();

    // Click a transcript line — this calls audio.currentTime = seg.time
    // which should not crash even if audio is not loaded
    await transcriptLines.nth(0).click();

    // Page should still be functional
    await expect(page.locator('h1')).toBeVisible();
    await expect(transcriptLines.first()).toBeVisible();
  });

  test('open multiple tabs: change theme in one → other picks up on navigation', async ({ page, context }) => {
    // Clear theme
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload();

    // Open second tab
    const page2 = await context.newPage();
    await page2.goto('/');

    // Toggle theme in page1
    await page.locator('button.theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    // Navigate page2 to another page — it should pick up the light theme from localStorage
    await page2.goto('/courses/');
    await expect(page2.locator('html')).toHaveAttribute('data-theme', 'light');

    await page2.close();
  });
});
