// @ts-check
import { test, expect } from '@playwright/test';

test.describe('User who switches themes constantly', () => {

  test.beforeEach(async ({ page }) => {
    // Start fresh with no saved theme
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload();
  });

  test('starts in dark mode, toggles to light, verifies background change', async ({ page }) => {
    // Default is dark
    const initialTheme = await page.locator('html').getAttribute('data-theme');
    expect(initialTheme === null || initialTheme === 'dark').toBeTruthy();

    // Get dark background
    const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);

    // Toggle to light
    await page.locator('button.theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    // Background should actually change
    const lightBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(darkBg).not.toBe(lightBg);
  });

  test('theme persists across pages that have the theme script', async ({ page }) => {
    // Switch to light
    await page.locator('button.theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    // Navigate to /courses/ → theme persists (has theme script)
    await page.goto('/courses/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    // Navigate to track hub → theme persists (has theme script)
    await page.goto('/d3/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    // Navigate to feed → theme persists (has theme script)
    await page.goto('/feed/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    // Navigate to pod → theme persists (has theme script)
    await page.goto('/pod/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('toggle back to dark on pod page, persists to about', async ({ page }) => {
    // Start light
    await page.locator('button.theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    // Go to pod
    await page.goto('/pod/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    // Toggle back to dark
    await page.locator('button.theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    // Navigate to about → dark persists
    await page.goto('/about/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('dark mode persists via localStorage on fresh navigation', async ({ page }) => {
    // Toggle to light then back to dark
    await page.locator('button.theme-toggle').click();
    await page.locator('button.theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    // Verify localStorage
    const saved = await page.evaluate(() => localStorage.getItem('theme'));
    expect(saved).toBe('dark');

    // Navigate to homepage fresh
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('no flash of wrong theme on page load', async ({ page }) => {
    // Set theme to light via localStorage before navigating
    await page.evaluate(() => localStorage.setItem('theme', 'light'));

    // Navigate to a fresh page and immediately check theme
    await page.goto('/courses/');

    // The theme script runs synchronously in <script>, so by the time DOMContentLoaded fires,
    // the theme should already be set. Check it's light (no dark flash).
    const theme = await page.locator('html').getAttribute('data-theme');
    expect(theme).toBe('light');

    // Verify visually: background should be a light color
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    // Parse RGB — light mode should have high R,G,B values
    const match = bg.match(/\d+/g);
    if (match) {
      const r = parseInt(match[0]);
      const g = parseInt(match[1]);
      const b = parseInt(match[2]);
      // Light backgrounds have high brightness
      expect(r + g + b).toBeGreaterThan(400);
    }
  });
});
