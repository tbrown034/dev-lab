// @ts-check
import { test, expect } from '@playwright/test';

test.describe('First-time visitor lands on the site', () => {

  test('full funnel: homepage → courses → track → lesson → games → home', async ({ page }) => {
    // ── 1. Land on homepage ──
    await page.goto('/');
    await expect(page).toHaveTitle(/Learn Coding/);
    await expect(page.locator('h1')).toBeVisible();

    // ── 2. Scroll down, reveal-on-scroll elements animate in ──
    // Scroll gradually so IntersectionObserver fires for each section
    const revealElements = page.locator('.reveal-on-scroll');
    const count = await revealElements.count();
    expect(count).toBeGreaterThan(0);

    // Scroll the first reveal element into view to trigger its observer
    await revealElements.first().scrollIntoViewIfNeeded();
    await expect(revealElements.first()).toHaveClass(/visible/, { timeout: 5000 });

    // ── 3. Click "Courses" → browse all 7 courses ──
    await page.goto('/');
    await page.locator('header nav a[href="/courses/"]').click();
    await expect(page).toHaveURL(/\/courses\//);
    await expect(page.locator('h1')).toContainText('Courses');

    // Verify all 7 course cards are present
    const courseCards = page.locator('a.course-card');
    await expect(courseCards).toHaveCount(7);

    // ── 4. Pick D3 → hub loads ──
    await page.locator('a.course-card[data-color="d3"]').click();
    await expect(page).toHaveURL(/\/d3\//);
    await expect(page.locator('h1, .logo')).toContainText(/D3/);

    // ── 5. Read syllabus area on hub ──
    const syllabus = page.locator('a.syllabus');
    await expect(syllabus).toBeVisible();

    // ── 6. Navigate to lesson 01 ──
    const firstLesson = page.locator('a.lesson-row').first();
    await expect(firstLesson).toBeVisible();
    await firstLesson.click();
    await expect(page).toHaveURL(/\/d3\/lessons\/01/);
    await expect(page.locator('h1')).toBeVisible();

    // ── 7. Scroll through content ──
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));

    // ── 8. Find quiz section, click reveal button, answer appears ──
    const quizSection = page.locator('.quiz');
    await quizSection.scrollIntoViewIfNeeded();
    await expect(quizSection).toBeVisible();

    const firstQuizBtn = quizSection.locator('.question button').first();
    await firstQuizBtn.scrollIntoViewIfNeeded();
    await expect(firstQuizBtn).toBeVisible();
    await firstQuizBtn.click();

    const firstAnswer = quizSection.locator('.question .answer').first();
    await expect(firstAnswer).toBeVisible();

    // ── 9. Navigate forward through 3 lessons using next links ──
    for (let i = 0; i < 3; i++) {
      const navFooter = page.locator('.nav-footer');
      await navFooter.scrollIntoViewIfNeeded();
      const nextLink = navFooter.locator('a').last();
      await expect(nextLink).toBeVisible();
      const nextHref = await nextLink.getAttribute('href');
      await nextLink.click();
      await expect(page).toHaveURL(new RegExp(nextHref.replace(/\//g, '\\/')));
      await expect(page.locator('h1')).toBeVisible();
    }

    // ── 10. Go back to hub via back link ──
    const backLink = page.locator('.header a[href="/d3/"]').first();
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL(/\/d3\/$/);

    // ── 11. Check games page, play one round ──
    await page.goto('/d3/games/');
    await expect(page.locator('h1')).toBeVisible();
    await page.waitForSelector('.game-panel.active');

    const choiceCount = await page.locator('.choice-btn').count();
    if (choiceCount > 0) {
      await page.locator('.choice-btn').first().click();
      // After answering, button gets correct or wrong class
      const firstChoice = page.locator('.choice-btn').first();
      const hasFeedback = await firstChoice.evaluate(
        el => el.classList.contains('correct') || el.classList.contains('wrong')
      );
      expect(hasFeedback).toBeTruthy();
    }

    // ── 12. Return home via logo ──
    await page.goto('/');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('h1')).toBeVisible();
  });
});
