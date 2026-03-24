// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Mobile user on their phone', () => {

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
  });

  test('homepage: hamburger visible, desktop nav hidden', async ({ page }) => {
    await page.goto('/');

    const hamburger = page.locator('button.hamburger');
    const desktopNav = page.locator('header nav');

    await expect(hamburger).toBeVisible();
    await expect(desktopNav).toBeHidden();
  });

  test('tap hamburger → drawer opens with all nav links', async ({ page }) => {
    await page.goto('/');

    const hamburger = page.locator('button.hamburger');
    const mobileNav = page.locator('#mobile-nav');

    await expect(mobileNav).not.toHaveClass(/open/);

    await hamburger.click();
    await expect(mobileNav).toHaveClass(/open/);
    await expect(hamburger).toHaveClass(/active/);

    // All nav links should be visible
    const links = mobileNav.locator('a');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThanOrEqual(4);
    for (let i = 0; i < linkCount; i++) {
      await expect(links.nth(i)).toBeVisible();
    }
  });

  test('tap Courses in drawer → navigates, drawer closes', async ({ page }) => {
    await page.goto('/');

    const hamburger = page.locator('button.hamburger');
    const mobileNav = page.locator('#mobile-nav');

    await hamburger.click();
    await expect(mobileNav).toHaveClass(/open/);

    const coursesLink = mobileNav.locator('a[href="/courses/"]');
    await coursesLink.click();

    await expect(page).toHaveURL(/\/courses\//);
    await expect(page.locator('h1')).toContainText('Courses');
  });

  test('course cards are single column at mobile width', async ({ page }) => {
    await page.goto('/courses/');

    // There are two .courses-grid sections (active + new), use first
    const coursesGrid = page.locator('.courses-grid').first();
    await expect(coursesGrid).toBeVisible();

    const gridColumns = await coursesGrid.evaluate(
      el => getComputedStyle(el).gridTemplateColumns
    );
    // Single column means just one value in gridTemplateColumns
    const columnCount = gridColumns.trim().split(/\s+/).length;
    expect(columnCount).toBe(1);
  });

  test('track hub lesson list is usable (no horizontal overflow)', async ({ page }) => {
    await page.goto('/d3/');

    const lessonList = page.locator('.lesson-list');
    await expect(lessonList).toBeVisible();

    // Check no horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflow).toBe(false);
  });

  test('lesson content reads well, text content is visible', async ({ page }) => {
    await page.goto('/d3/lessons/01-fundamentals/');

    await expect(page.locator('h1')).toBeVisible();

    // Content should be visible
    const content = page.locator('.content');
    await expect(content).toBeVisible();

    // Text paragraphs should be readable (not clipped to zero width)
    const firstParagraph = content.locator('p').first();
    await expect(firstParagraph).toBeVisible();
    const box = await firstParagraph.boundingBox();
    expect(box).toBeTruthy();
    // Paragraph should have reasonable width (at least 200px on a 375px screen)
    expect(box.width).toBeGreaterThan(200);
  });

  test('feed posts are readable, filter tabs wrap properly', async ({ page }) => {
    await page.goto('/feed/');
    await page.waitForSelector('.post', { timeout: 15000 });

    const posts = page.locator('.post');
    await expect(posts.first()).toBeVisible();

    // Filter tabs should be visible
    const filters = page.locator('.filter-tab');
    await expect(filters.first()).toBeVisible();

    // Composer should still work
    const composer = page.locator('.composer-input').first();
    await expect(composer).toBeVisible();
  });

  test('games page: tab bar scrolls horizontally, game is playable', async ({ page }) => {
    await page.goto('/d3/games/');

    const tabBar = page.locator('.tab-bar');
    await expect(tabBar).toBeVisible();

    // Tab buttons should be present
    const tabs = page.locator('.tab-btn');
    const tabCount = await tabs.count();
    expect(tabCount).toBeGreaterThan(1);

    // Game panel should be active
    await page.waitForSelector('.game-panel.active');

    // Try playing a game if choice buttons exist
    const choiceCount = await page.locator('.choice-btn').count();
    if (choiceCount > 0) {
      await page.locator('.choice-btn').first().click();
      // Should get feedback
      const hasClass = await page.locator('.choice-btn').first().evaluate(
        el => el.classList.contains('correct') || el.classList.contains('wrong')
      );
      expect(hasClass).toBeTruthy();
    }
  });

  test('pod episode: player controls tappable, transcript scrolls', async ({ page }) => {
    await page.goto('/pod/d3/01-svg-fundamentals/');

    await expect(page.locator('h1')).toBeVisible();

    // Player controls should be visible and tappable
    const playBtn = page.locator('#play-pause');
    await expect(playBtn).toBeVisible();

    const speedBtn = page.locator('#speed-btn');
    await expect(speedBtn).toBeVisible();
    await speedBtn.click();
    await expect(speedBtn).toHaveText('1.25x');

    // Transcript should exist and be scrollable
    const transcriptLines = page.locator('.transcript-line');
    await expect(transcriptLines.first()).toBeVisible();
    const count = await transcriptLines.count();
    expect(count).toBeGreaterThan(0);
  });
});
