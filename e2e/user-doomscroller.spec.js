// @ts-check
import { test, expect } from '@playwright/test';

test.describe('User who lives in The Scroll', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/feed/');
    await page.evaluate(() => {
      localStorage.removeItem('scroll-likes');
      localStorage.removeItem('scroll-bookmarks');
      localStorage.removeItem('scroll-comments');
    });
    await page.reload();
    await page.waitForSelector('.post', { timeout: 15000 });
  });

  test('scrolls, likes 3 posts, bookmarks 2 posts', async ({ page }) => {
    // Scroll through posts
    await page.evaluate(() => window.scrollBy(0, 600));
    const posts = page.locator('.post');
    const postCount = await posts.count();
    expect(postCount).toBeGreaterThan(3);

    // Like 3 random posts
    for (let i = 0; i < 3; i++) {
      const likeBtn = posts.nth(i).locator('.like-btn');
      await likeBtn.click();
      await expect(likeBtn).toHaveClass(/liked/);
    }

    // Bookmark 2 posts
    for (let i = 0; i < 2; i++) {
      const bookmarkBtn = posts.nth(i).locator('.bookmark-btn');
      await bookmarkBtn.click();
    }
    // Re-query after re-render
    await page.waitForSelector('.post');
    const bookmarked = page.locator('.bookmark-btn.bookmarked');
    const bookmarkedCount = await bookmarked.count();
    expect(bookmarkedCount).toBeGreaterThanOrEqual(2);
  });

  test('toggle filters: only AI visible, then AI + CSS', async ({ page }) => {
    const filters = page.locator('.filter-tab');
    const totalFilters = await filters.count();

    // Deselect all except AI
    for (let i = 0; i < totalFilters; i++) {
      const filter = filters.nth(i);
      const track = await filter.getAttribute('data-track');
      if (track !== 'ai') {
        const isActive = await filter.evaluate(el => el.classList.contains('active'));
        if (isActive) await filter.click();
      }
    }

    // Only AI posts visible
    await page.waitForSelector('.post');
    const postBadges = page.locator('.post-badge');
    const badgeCount = await postBadges.count();
    for (let i = 0; i < badgeCount; i++) {
      const text = await postBadges.nth(i).textContent();
      expect(text.toLowerCase()).toContain('ai');
    }

    // Turn on CSS too
    const cssFilter = page.locator('.filter-tab[data-track="css"]');
    await cssFilter.click();
    await expect(cssFilter).toHaveClass(/active/);

    // Both AI and CSS posts should be visible
    await page.waitForSelector('.post');
    const visiblePosts = await page.locator('.post').count();
    expect(visiblePosts).toBeGreaterThan(0);
  });

  test('cannot toggle off the last remaining filter', async ({ page }) => {
    const filters = page.locator('.filter-tab');
    const total = await filters.count();

    // Deselect all except the last one
    for (let i = 0; i < total - 1; i++) {
      const filter = filters.nth(i);
      const isActive = await filter.evaluate(el => el.classList.contains('active'));
      if (isActive) await filter.click();
    }

    const lastActive = page.locator('.filter-tab.active');
    const lastActiveCount = await lastActive.count();
    expect(lastActiveCount).toBe(1);

    // Try to deselect the last one — should stay active
    await lastActive.first().click();
    const stillActive = await page.locator('.filter-tab.active').count();
    expect(stillActive).toBeGreaterThanOrEqual(1);
  });

  test('shuffle changes post order', async ({ page }) => {
    const shuffleBtn = page.locator('#refresh-btn');
    await expect(shuffleBtn).toBeVisible();

    const firstPostBefore = await page.locator('.post').first().getAttribute('data-id');

    let changed = false;
    for (let i = 0; i < 5; i++) {
      await shuffleBtn.click();
      await page.waitForSelector('.post');
      const firstPostAfter = await page.locator('.post').first().getAttribute('data-id');
      if (firstPostAfter !== firstPostBefore) {
        changed = true;
        break;
      }
    }

    const postCount = await page.locator('.post').count();
    if (postCount > 1) {
      expect(changed).toBeTruthy();
    }
  });

  test('shuffle again changes order again', async ({ page }) => {
    const shuffleBtn = page.locator('#refresh-btn');

    // First shuffle
    await shuffleBtn.click();
    await page.waitForSelector('.post');
    const orderAfterFirst = await page.locator('.post').first().getAttribute('data-id');

    // Second shuffle
    let changed = false;
    for (let i = 0; i < 5; i++) {
      await shuffleBtn.click();
      await page.waitForSelector('.post');
      const orderAfterSecond = await page.locator('.post').first().getAttribute('data-id');
      if (orderAfterSecond !== orderAfterFirst) {
        changed = true;
        break;
      }
    }

    const postCount = await page.locator('.post').count();
    if (postCount > 1) {
      expect(changed).toBeTruthy();
    }
  });

  test('type a comment, submit it, comment appears', async ({ page }) => {
    const firstPost = page.locator('.post').first();
    const composerInput = firstPost.locator('.composer-input');
    const sendBtn = firstPost.locator('.composer-send');

    await expect(composerInput).toBeVisible();
    await expect(sendBtn).toBeDisabled();

    await composerInput.fill('This is my test comment from Playwright');
    await expect(sendBtn).toBeEnabled();
    await sendBtn.click();

    // Comment should appear in the post's comment thread
    const userComment = firstPost.locator('.comment-user');
    await expect(userComment).toBeVisible();
    const commentText = await userComment.locator('.comment-text').textContent();
    expect(commentText).toContain('This is my test comment from Playwright');
  });

  test('keyboard navigation: j/k/l/b and ? shortcut overlay', async ({ page }) => {
    // j j j to move down
    await page.keyboard.press('j');
    await expect(page.locator('.post-focused')).toHaveCount(1);
    await page.keyboard.press('j');
    await page.keyboard.press('j');
    await expect(page.locator('.post-focused')).toHaveCount(1);

    // k to move up
    await page.keyboard.press('k');
    await expect(page.locator('.post-focused')).toHaveCount(1);

    // l to like focused post
    await page.keyboard.press('l');
    const focusedLikeBtn = page.locator('.post-focused .like-btn');
    await expect(focusedLikeBtn).toHaveClass(/liked/);

    // b to bookmark focused post
    await page.keyboard.press('b');
    // Feed re-renders on bookmark, re-check
    await page.waitForSelector('.post');

    // ? to show shortcut overlay
    await page.keyboard.press('?');
    const hint = page.locator('#shortcut-hint');
    await expect(hint).toBeVisible();
    await expect(hint.locator('.hint-title')).toContainText('Keyboard Shortcuts');

    // Click to dismiss
    await hint.click();
    await expect(hint).not.toBeVisible();
  });

  test('likes and bookmarks persist after page refresh', async ({ page }) => {
    // Like and bookmark first post
    const firstPost = page.locator('.post').first();
    const postId = await firstPost.getAttribute('data-id');

    await firstPost.locator('.like-btn').click();
    await expect(firstPost.locator('.like-btn')).toHaveClass(/liked/);

    await firstPost.locator('.bookmark-btn').click();
    await page.waitForSelector('.post');

    // Verify localStorage was updated
    const likes = await page.evaluate(() => JSON.parse(localStorage.getItem('scroll-likes') || '{}'));
    expect(Object.keys(likes).length).toBeGreaterThan(0);

    const bookmarks = await page.evaluate(() => JSON.parse(localStorage.getItem('scroll-bookmarks') || '{}'));
    expect(Object.keys(bookmarks).length).toBeGreaterThan(0);

    // Refresh page
    await page.reload();
    await page.waitForSelector('.post', { timeout: 15000 });

    // Find the same post and verify like/bookmark persisted
    const refreshedPost = page.locator(`.post[data-id="${postId}"]`);
    // Post may have moved due to initial shuffle, but likes/bookmarks should persist
    const likesAfter = await page.evaluate(() => JSON.parse(localStorage.getItem('scroll-likes') || '{}'));
    expect(likesAfter[postId]).toBeTruthy();

    const bookmarksAfter = await page.evaluate(() => JSON.parse(localStorage.getItem('scroll-bookmarks') || '{}'));
    expect(bookmarksAfter[postId]).toBeTruthy();
  });
});
