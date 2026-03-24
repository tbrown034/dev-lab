// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Dark/Light Theme Toggle', () => {

  test('default theme is dark (no data-theme or data-theme="dark")', async ({ page }) => {
    await page.goto('/');
    const theme = await page.locator('html').getAttribute('data-theme');
    // Default is dark: either no attribute or explicitly "dark"
    expect(theme === null || theme === 'dark').toBeTruthy();
  });

  test('clicking theme toggle switches to light mode', async ({ page }) => {
    await page.goto('/');
    // Clear any saved theme preference
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload();

    const toggle = page.locator('button.theme-toggle');
    await expect(toggle).toBeVisible();

    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('clicking toggle again switches back to dark mode', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload();

    const toggle = page.locator('button.theme-toggle');

    // Click once -> light
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    // Click again -> dark
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('theme persists across page navigation via localStorage', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload();

    const toggle = page.locator('button.theme-toggle');
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    // Verify localStorage was set
    const savedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(savedTheme).toBe('light');

    // Navigate to another page
    await page.goto('/courses/');
    // Theme should persist
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('background color changes between dark and light', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload();

    // Get dark background
    const darkBg = await page.evaluate(() =>
      getComputedStyle(document.body).backgroundColor
    );

    // Switch to light
    await page.locator('button.theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    // Get light background
    const lightBg = await page.evaluate(() =>
      getComputedStyle(document.body).backgroundColor
    );

    // They should be different
    expect(darkBg).not.toBe(lightBg);
  });
});
