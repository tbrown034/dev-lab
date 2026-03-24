// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {

  test('homepage loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Learn Coding/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Courses nav link navigates to /courses/', async ({ page }) => {
    await page.goto('/');
    await page.locator('header nav a[href="/courses/"]').click();
    await expect(page).toHaveURL(/\/courses\//);
    await expect(page.locator('h1')).toContainText('Courses');
  });

  test('The Scroll link navigates to /feed/', async ({ page }) => {
    await page.goto('/');
    await page.locator('header nav a[href="/feed/"]').click();
    await expect(page).toHaveURL(/\/feed\//);
    await expect(page.locator('#feed-title')).toContainText('The Scroll');
  });

  test('The Pod link navigates to /pod/', async ({ page }) => {
    await page.goto('/');
    await page.locator('header nav a[href="/pod/"]').click();
    await expect(page).toHaveURL(/\/pod\//);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('About link navigates to /about/', async ({ page }) => {
    await page.goto('/');
    await page.locator('header nav a[href="/about/"]').click();
    await expect(page).toHaveURL(/\/about\//);
    await expect(page.locator('h1')).toBeVisible();
  });

  // ── Course card navigation from homepage ──

  test('D3 track card navigates to /d3/', async ({ page }) => {
    await page.goto('/');
    await page.locator('a.track[data-color="d3"]').click();
    await expect(page).toHaveURL(/\/d3\//);
    await expect(page.locator('h1, .logo')).toContainText(/D3/);
  });

  test('Django track card navigates to /django/', async ({ page }) => {
    await page.goto('/');
    await page.locator('a.track[data-color="django"]').click();
    await expect(page).toHaveURL(/\/django\//);
  });

  test('SQL track card navigates to /sql/', async ({ page }) => {
    await page.goto('/');
    await page.locator('a.track[data-color="sql"]').click();
    await expect(page).toHaveURL(/\/sql\//);
  });

  test('JS/TS planned track navigates to /jsts/', async ({ page }) => {
    await page.goto('/');
    await page.locator('a.planned-track[data-color="jsts"]').click();
    await expect(page).toHaveURL(/\/jsts\//);
  });

  test('React planned track navigates to /react/', async ({ page }) => {
    await page.goto('/');
    await page.locator('a.planned-track[data-color="react"]').click();
    await expect(page).toHaveURL(/\/react\//);
  });

  test('CSS planned track navigates to /css-design/', async ({ page }) => {
    await page.goto('/');
    await page.locator('a.planned-track[data-color="css"]').click();
    await expect(page).toHaveURL(/\/css-design\//);
  });

  test('AI planned track navigates to /ai-llm/', async ({ page }) => {
    await page.goto('/');
    await page.locator('a.planned-track[data-color="ai"]').click();
    await expect(page).toHaveURL(/\/ai-llm\//);
  });

  // ── Course cards from /courses/ page ──

  test('courses page: click each course card arrives at correct hub', async ({ page }) => {
    await page.goto('/courses/');

    const cards = [
      { selector: 'a.course-card[data-color="d3"]', url: '/d3/' },
      { selector: 'a.course-card[data-color="django"]', url: '/django/' },
      { selector: 'a.course-card[data-color="sql"]', url: '/sql/' },
      { selector: 'a.course-card[data-color="jsts"]', url: '/jsts/' },
      { selector: 'a.course-card[data-color="react"]', url: '/react/' },
      { selector: 'a.course-card[data-color="css"]', url: '/css-design/' },
      { selector: 'a.course-card[data-color="ai"]', url: '/ai-llm/' },
    ];

    for (const card of cards) {
      await page.goto('/courses/');
      await page.locator(card.selector).click();
      await expect(page).toHaveURL(new RegExp(card.url.replace(/\//g, '\\/')));
    }
  });

  // ── Hub page has lesson nav links that work ──

  test('D3 hub has lesson nav links and first lesson loads', async ({ page }) => {
    await page.goto('/d3/');
    // Hub should have lesson links in the nav or lesson list
    const lessonLinks = page.locator('.nav a, .lesson-row');
    await expect(lessonLinks.first()).toBeVisible();

    // Click first actual lesson row
    const firstLesson = page.locator('a.lesson-row').first();
    await expect(firstLesson).toBeVisible();
    await firstLesson.click();
    await expect(page).toHaveURL(/\/d3\/lessons\//);
    await expect(page.locator('h1')).toBeVisible();
  });

  // ── Lesson page: back link returns to hub ──

  test('lesson back link returns to D3 hub', async ({ page }) => {
    await page.goto('/d3/lessons/01-fundamentals/');
    await expect(page.locator('h1')).toBeVisible();

    const backLink = page.locator('.header a[href="/d3/"]').first();
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL(/\/d3\/$/);
  });

  // ── Prev/next navigation in lesson footer ──

  test('prev/next navigation works in lesson footer', async ({ page }) => {
    await page.goto('/d3/lessons/02-selections-data/');
    await expect(page.locator('h1')).toBeVisible();

    const navFooter = page.locator('.nav-footer');
    await expect(navFooter).toBeVisible();

    // Should have a "prev" link and a "next" link
    const prevLink = navFooter.locator('a').first();
    const nextLink = navFooter.locator('a').last();
    await expect(prevLink).toBeVisible();
    await expect(nextLink).toBeVisible();

    // Click next
    const nextHref = await nextLink.getAttribute('href');
    await nextLink.click();
    await expect(page).toHaveURL(new RegExp(nextHref.replace(/\//g, '\\/')));
    await expect(page.locator('h1')).toBeVisible();
  });
});
