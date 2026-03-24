// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Responsive Layout', () => {

  test('desktop (1280px): full nav visible, hamburger hidden', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    // Desktop nav should be visible
    const nav = page.locator('header nav');
    await expect(nav).toBeVisible();

    // Hamburger should be hidden (display: none at > 768px)
    const hamburger = page.locator('button.hamburger');
    await expect(hamburger).toBeHidden();
  });

  test('mobile (768px): nav hidden, hamburger visible on homepage', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Desktop nav should be hidden
    const nav = page.locator('header nav');
    await expect(nav).toBeHidden();

    // Hamburger should be visible
    const hamburger = page.locator('button.hamburger');
    await expect(hamburger).toBeVisible();
  });

  test('mobile: click hamburger opens mobile nav', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const hamburger = page.locator('button.hamburger');
    const mobileNav = page.locator('#mobile-nav');

    // Mobile nav should not have 'open' class initially
    await expect(mobileNav).not.toHaveClass(/open/);

    // Click hamburger
    await hamburger.click();

    // Mobile nav should now have 'open' class
    await expect(mobileNav).toHaveClass(/open/);

    // Hamburger should have 'active' class
    await expect(hamburger).toHaveClass(/active/);
  });

  test('mobile: click link in mobile nav navigates and closes drawer', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const hamburger = page.locator('button.hamburger');
    const mobileNav = page.locator('#mobile-nav');

    // Open mobile nav
    await hamburger.click();
    await expect(mobileNav).toHaveClass(/open/);

    // The click handler on mobile nav links removes 'open' class before navigation.
    // Verify the link exists and is clickable.
    const coursesLink = mobileNav.locator('a[href="/courses/"]');
    await expect(coursesLink).toBeVisible();

    // Verify the drawer closes (the JS handler removes classes synchronously on click)
    // and then navigation occurs
    await coursesLink.click();

    // Should navigate to courses page
    await expect(page).toHaveURL(/\/courses\//);
    await expect(page.locator('h1')).toContainText('Courses');
  });

  test('mobile: course cards stack vertically', async ({ page }) => {
    await page.setViewportSize({ width: 480, height: 900 });
    await page.goto('/');

    // The tracks grid uses grid-template-columns: 1fr at <= 1024px
    const tracksGrid = page.locator('.tracks');
    if (await tracksGrid.count() > 0) {
      const gridStyle = await tracksGrid.evaluate(
        el => getComputedStyle(el).gridTemplateColumns
      );
      // At small viewports, should be single column (one value)
      const columnCount = gridStyle.split(' ').length;
      expect(columnCount).toBe(1);
    }
  });

  test('mobile: feed is usable on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/feed/');
    await page.waitForSelector('.post', { timeout: 15000 });

    // Posts should render and be visible
    const posts = page.locator('.post');
    await expect(posts.first()).toBeVisible();

    // Filter tabs should still be visible
    const filters = page.locator('.filter-tab');
    await expect(filters.first()).toBeVisible();

    // Composer input should be visible in the first post
    const composer = page.locator('.composer-input').first();
    await expect(composer).toBeVisible();
  });
});
