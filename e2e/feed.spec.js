// @ts-check
import { test, expect } from '@playwright/test';

test.describe('The Scroll (Feed)', () => {

  test.beforeEach(async ({ page }) => {
    // Clear feed state so tests start fresh
    await page.goto('/feed/');
    await page.evaluate(() => {
      localStorage.removeItem('scroll-likes');
      localStorage.removeItem('scroll-bookmarks');
      localStorage.removeItem('scroll-comments');
    });
    await page.reload();
    // Wait for posts to render
    await page.waitForSelector('.post', { timeout: 15000 });
  });

  test('feed page loads and posts render', async ({ page }) => {
    await expect(page.locator('#feed-title')).toContainText('The Scroll');
    const posts = page.locator('.post');
    await expect(posts.first()).toBeVisible();
    const count = await posts.count();
    expect(count).toBeGreaterThan(0);
  });

  test('filter toggle: deselect D3 hides D3 posts', async ({ page }) => {
    // Count posts before
    const postsBefore = await page.locator('.post').count();
    expect(postsBefore).toBeGreaterThan(0);

    // Click D3 filter to deselect
    const d3Filter = page.locator('.filter-tab[data-track="d3"]');
    await expect(d3Filter).toHaveClass(/active/);
    await d3Filter.click();
    await expect(d3Filter).not.toHaveClass(/active/);

    // Should have fewer posts (or same if no D3 posts exist)
    const postsAfter = await page.locator('.post').count();
    // D3 posts should be gone, so count should change
    // Check no post has the D3 badge visible (track line color for d3)
    const d3Badges = page.locator('.post-badge:text-is("D3")');
    const d3Count = await d3Badges.count();
    expect(d3Count).toBe(0);
  });

  test('filter toggle: re-enable D3 restores D3 posts', async ({ page }) => {
    const d3Filter = page.locator('.filter-tab[data-track="d3"]');

    // Deselect D3
    await d3Filter.click();
    await expect(d3Filter).not.toHaveClass(/active/);
    const withoutD3 = await page.locator('.post').count();

    // Re-enable D3
    await d3Filter.click();
    await expect(d3Filter).toHaveClass(/active/);

    await page.waitForTimeout(300); // wait for re-render
    const withD3 = await page.locator('.post').count();
    expect(withD3).toBeGreaterThanOrEqual(withoutD3);
  });

  test('multiple filters can be active simultaneously', async ({ page }) => {
    // By default all 7 filters are active
    const activeFilters = page.locator('.filter-tab.active');
    const count = await activeFilters.count();
    expect(count).toBe(7);

    // Deselect D3 and Django
    await page.locator('.filter-tab[data-track="d3"]').click();
    await page.locator('.filter-tab[data-track="django"]').click();

    const remaining = await page.locator('.filter-tab.active').count();
    expect(remaining).toBe(5);
  });

  test('cannot deselect ALL filters (at least one stays active)', async ({ page }) => {
    const filters = page.locator('.filter-tab');
    const total = await filters.count();

    // Try to deselect all by clicking each active one
    // Deselect all except the last
    for (let i = 0; i < total - 1; i++) {
      const filter = filters.nth(i);
      if (await filter.evaluate(el => el.classList.contains('active'))) {
        await filter.click();
      }
    }

    // One should still be active (the last one we didn't click shouldn't deselect)
    // Now try to deselect the remaining one
    const lastActive = page.locator('.filter-tab.active');
    const lastActiveCount = await lastActive.count();
    expect(lastActiveCount).toBe(1);

    // Click the last active one - should NOT deselect
    await lastActive.first().click();
    const finalCount = await page.locator('.filter-tab.active').count();
    expect(finalCount).toBeGreaterThanOrEqual(1);
  });

  test('shuffle button randomizes post order', async ({ page }) => {
    // Get first post ID before shuffle
    const firstPostBefore = await page.locator('.post').first().getAttribute('data-id');

    // Click shuffle multiple times to increase chance of different order
    const shuffleBtn = page.locator('#refresh-btn');
    await expect(shuffleBtn).toBeVisible();

    let changed = false;
    for (let i = 0; i < 5; i++) {
      await shuffleBtn.click();
      await page.waitForTimeout(200);
      const firstPostAfter = await page.locator('.post').first().getAttribute('data-id');
      if (firstPostAfter !== firstPostBefore) {
        changed = true;
        break;
      }
    }
    // With enough shuffles, order should change (unless only 1 post)
    const postCount = await page.locator('.post').count();
    if (postCount > 1) {
      expect(changed).toBeTruthy();
    }
  });

  test('like button toggles (heart fills, count changes)', async ({ page }) => {
    const firstPost = page.locator('.post').first();
    const likeBtn = firstPost.locator('.like-btn');
    await expect(likeBtn).toBeVisible();

    // Get initial state
    const initialLiked = await likeBtn.evaluate(el => el.classList.contains('liked'));
    expect(initialLiked).toBe(false);

    // Click to like
    await likeBtn.click();
    await expect(likeBtn).toHaveClass(/liked/);

    // SVG fill should change to 'currentColor'
    const fill = await likeBtn.locator('svg path').getAttribute('fill');
    expect(fill).toBe('currentColor');

    // Click again to unlike
    await likeBtn.click();
    await expect(likeBtn).not.toHaveClass(/liked/);
  });

  test('bookmark button toggles', async ({ page }) => {
    const firstPost = page.locator('.post').first();
    const bookmarkBtn = firstPost.locator('.bookmark-btn');
    await expect(bookmarkBtn).toBeVisible();

    // Initially not bookmarked
    await expect(bookmarkBtn).not.toHaveClass(/bookmarked/);

    // Click to bookmark
    await bookmarkBtn.click();
    // Feed re-renders on bookmark, so re-locate
    await page.waitForSelector('.post');
    const updatedBookmark = page.locator('.post').first().locator('.bookmark-btn');
    await expect(updatedBookmark).toHaveClass(/bookmarked/);
  });

  test('comment composer: type text, send button enables', async ({ page }) => {
    const firstPost = page.locator('.post').first();
    const composerInput = firstPost.locator('.composer-input');
    const sendBtn = firstPost.locator('.composer-send');

    await expect(composerInput).toBeVisible();

    // Send button should start disabled
    await expect(sendBtn).toBeDisabled();

    // Type into composer
    await composerInput.fill('This is a test comment');

    // Send button should be enabled
    await expect(sendBtn).toBeEnabled();

    // Clear the input
    await composerInput.fill('');
    await expect(sendBtn).toBeDisabled();
  });

  test('keyboard shortcut j navigates to next post', async ({ page }) => {
    // Press j to navigate to first post
    await page.keyboard.press('j');
    const focused = page.locator('.post-focused');
    await expect(focused).toBeVisible();
  });

  test('keyboard shortcut k navigates to previous post', async ({ page }) => {
    // Navigate down twice, then back up
    await page.keyboard.press('j');
    await page.keyboard.press('j');
    await page.keyboard.press('k');
    const focused = page.locator('.post-focused');
    await expect(focused).toBeVisible();
  });

  test('keyboard shortcut l likes focused post', async ({ page }) => {
    // Focus first post
    await page.keyboard.press('j');
    const focusedPost = page.locator('.post-focused');
    await expect(focusedPost).toBeVisible();

    // Press l to like
    await page.keyboard.press('l');
    const likeBtn = focusedPost.locator('.like-btn');
    await expect(likeBtn).toHaveClass(/liked/);
  });

  test('keyboard shortcut ? shows shortcut hint overlay', async ({ page }) => {
    await page.keyboard.press('?');
    const hint = page.locator('#shortcut-hint');
    await expect(hint).toBeVisible();
    await expect(hint.locator('.hint-title')).toContainText('Keyboard Shortcuts');

    // Click to close
    await hint.click();
    await expect(hint).not.toBeVisible();
  });
});
