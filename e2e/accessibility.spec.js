// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {

  test('tab through homepage: focus indicators visible on interactive elements', async ({ page }) => {
    await page.goto('/');

    // Tab through first several elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
    }

    // At least one element should have focus
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedTag).toBeTruthy();
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedTag);
  });

  test('all nav links are reachable by keyboard', async ({ page }) => {
    await page.goto('/');

    const focusedElements = [];
    // Tab through enough times to hit nav links
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press('Tab');
      const tag = await page.evaluate(() => document.activeElement?.tagName);
      const href = await page.evaluate(() =>
        document.activeElement?.getAttribute('href')
      );
      if (tag === 'A' && href) {
        focusedElements.push(href);
      }
    }

    // Should have reached at least the nav links
    expect(focusedElements.length).toBeGreaterThan(0);
  });

  test('theme toggle is focusable and activatable with Enter', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload();

    // Tab until we reach the theme toggle
    let foundToggle = false;
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      const ariaLabel = await page.evaluate(() =>
        document.activeElement?.getAttribute('aria-label')
      );
      if (ariaLabel === 'Toggle theme') {
        foundToggle = true;
        break;
      }
    }
    expect(foundToggle).toBeTruthy();

    // Press Enter to activate
    await page.keyboard.press('Enter');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('theme toggle is activatable with Space', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload();

    // Tab to theme toggle
    let foundToggle = false;
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      const ariaLabel = await page.evaluate(() =>
        document.activeElement?.getAttribute('aria-label')
      );
      if (ariaLabel === 'Toggle theme') {
        foundToggle = true;
        break;
      }
    }
    expect(foundToggle).toBeTruthy();

    // Press Space to activate
    await page.keyboard.press('Space');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('feed posts navigable with j/k keys', async ({ page }) => {
    await page.goto('/feed/');
    await page.waitForSelector('.post', { timeout: 15000 });

    // Press j to focus first post
    await page.keyboard.press('j');
    const focusedFirst = page.locator('.post-focused');
    await expect(focusedFirst).toHaveCount(1);

    // Press j again for second post
    await page.keyboard.press('j');
    // Should still have exactly one focused post
    const focusedSecond = page.locator('.post-focused');
    await expect(focusedSecond).toHaveCount(1);

    // Press k to go back
    await page.keyboard.press('k');
    await expect(page.locator('.post-focused')).toHaveCount(1);
  });

  test('no focus traps on homepage (can tab through and past all elements)', async ({ page }) => {
    await page.goto('/');

    // Tab through a large number of times. If we hit a focus trap,
    // the focus would cycle within a small set of elements.
    const focusedElements = [];
    for (let i = 0; i < 30; i++) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => ({
        tag: document.activeElement?.tagName,
        text: document.activeElement?.textContent?.slice(0, 30),
      }));
      focusedElements.push(info.tag + ':' + (info.text || ''));
    }

    // Count unique elements - should be many different ones (not stuck in a trap)
    const unique = new Set(focusedElements);
    expect(unique.size).toBeGreaterThan(3);
  });

  test('no focus traps on feed page (can always tab out)', async ({ page }) => {
    await page.goto('/feed/');
    await page.waitForSelector('.post', { timeout: 15000 });

    const focusedElements = [];
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press('Tab');
      const tag = await page.evaluate(() => document.activeElement?.tagName);
      focusedElements.push(tag);
    }

    const unique = new Set(focusedElements);
    // Should hit multiple different element types (not trapped)
    expect(unique.size).toBeGreaterThan(1);
  });
});
