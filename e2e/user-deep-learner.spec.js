// @ts-check
import { test, expect } from '@playwright/test';

test.describe('User who goes through an entire course', () => {

  test('D3 syllabus: goals section exists', async ({ page }) => {
    await page.goto('/d3/lessons/00-syllabus/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Syllabus');

    // Goals section should exist
    const goals = page.locator('.goals');
    await expect(goals).toBeVisible();
    const goalCards = page.locator('.goal');
    const goalCount = await goalCards.count();
    expect(goalCount).toBeGreaterThan(0);
  });

  test('navigate syllabus → lesson 01 via next link', async ({ page }) => {
    await page.goto('/d3/lessons/00-syllabus/');
    await expect(page.locator('h1')).toBeVisible();

    // Scroll to nav-footer and click next
    const navFooter = page.locator('.nav-footer');
    await navFooter.scrollIntoViewIfNeeded();
    const nextLink = navFooter.locator('a').last();
    await expect(nextLink).toBeVisible();
    await nextLink.click();

    await expect(page).toHaveURL(/\/d3\/lessons\/01/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('lesson 01: scroll to quiz, click all reveal buttons', async ({ page }) => {
    await page.goto('/d3/lessons/01-fundamentals/');
    await expect(page.locator('h1')).toBeVisible();

    // Scroll to quiz section
    const quizSection = page.locator('.quiz');
    await quizSection.scrollIntoViewIfNeeded();
    await expect(quizSection).toBeVisible();

    // Click all quiz reveal buttons
    const quizButtons = quizSection.locator('.question button');
    const btnCount = await quizButtons.count();
    expect(btnCount).toBeGreaterThan(0);

    for (let i = 0; i < btnCount; i++) {
      await quizButtons.nth(i).scrollIntoViewIfNeeded();
      await quizButtons.nth(i).click();
    }

    // All answers should be visible
    const answers = quizSection.locator('.question .answer');
    for (let i = 0; i < btnCount; i++) {
      await expect(answers.nth(i)).toBeVisible();
    }
  });

  test('lesson 01 has exercise section', async ({ page }) => {
    await page.goto('/d3/lessons/01-fundamentals/');
    const exercise = page.locator('.exercise');
    await exercise.scrollIntoViewIfNeeded();
    await expect(exercise).toBeVisible();
  });

  test('click next through lessons 02-05, each loads unique content', async ({ page }) => {
    await page.goto('/d3/lessons/01-fundamentals/');

    const titles = [];
    const title01 = await page.locator('h1').textContent();
    titles.push(title01);

    // Navigate through lessons 02, 03, 04, 05
    for (let i = 0; i < 4; i++) {
      const navFooter = page.locator('.nav-footer');
      await navFooter.scrollIntoViewIfNeeded();
      const nextLink = navFooter.locator('a').last();
      await expect(nextLink).toBeVisible();
      await nextLink.click();
      await expect(page.locator('h1')).toBeVisible();

      const title = await page.locator('h1').textContent();
      titles.push(title);
    }

    // All titles should be unique
    const uniqueTitles = new Set(titles);
    expect(uniqueTitles.size).toBe(titles.length);

    // Should be on lesson 05
    await expect(page).toHaveURL(/\/d3\/lessons\/05/);
  });

  test('D3 games: switch between 3 game tabs', async ({ page }) => {
    await page.goto('/d3/games/');
    await expect(page.locator('h1')).toBeVisible();

    const tabs = page.locator('.tab-btn');
    const tabCount = await tabs.count();
    expect(tabCount).toBeGreaterThan(2);

    // Click first 3 tabs
    for (let i = 0; i < 3; i++) {
      await tabs.nth(i).click();
      await expect(tabs.nth(i)).toHaveClass(/active/);

      // Only one panel should be active
      const activePanels = page.locator('.game-panel.active');
      await expect(activePanels).toHaveCount(1);
    }
  });

  test('JSTS games: switch between game tabs', async ({ page }) => {
    await page.goto('/jsts/games/');
    await expect(page.locator('body')).toBeVisible();

    const tabs = page.locator('.tab-btn');
    const tabCount = await tabs.count();
    expect(tabCount).toBeGreaterThan(2);

    for (let i = 0; i < Math.min(3, tabCount); i++) {
      await tabs.nth(i).click();
      await expect(tabs.nth(i)).toHaveClass(/active/);
      const activePanels = page.locator('.game-panel.active');
      await expect(activePanels).toHaveCount(1);
    }
  });

  test('D3 projects page: content renders', async ({ page }) => {
    await page.goto('/d3/projects/');
    await expect(page.locator('body')).toBeVisible();
    const bodyText = await page.locator('body').textContent();
    expect(bodyText.length).toBeGreaterThan(50);
  });

  test('JSTS portfolio page: content renders', async ({ page }) => {
    await page.goto('/jsts/projects/');
    await expect(page.locator('body')).toBeVisible();
    const bodyText = await page.locator('body').textContent();
    expect(bodyText.length).toBeGreaterThan(50);
  });

  test('full course journey: hub → syllabus → lessons → back to hub', async ({ page }) => {
    // Start at D3 hub
    await page.goto('/d3/');
    await expect(page.locator('.logo')).toBeVisible();

    // Click syllabus
    const syllabus = page.locator('a.syllabus');
    await expect(syllabus).toBeVisible();
    await syllabus.click();
    await expect(page).toHaveURL(/\/d3\/lessons\/00-syllabus/);

    // Click next to lesson 01
    const navFooter = page.locator('.nav-footer');
    await navFooter.scrollIntoViewIfNeeded();
    await navFooter.locator('a').last().click();
    await expect(page).toHaveURL(/\/d3\/lessons\/01/);

    // Click next to lesson 02
    const navFooter2 = page.locator('.nav-footer');
    await navFooter2.scrollIntoViewIfNeeded();
    await navFooter2.locator('a').last().click();
    await expect(page).toHaveURL(/\/d3\/lessons\/02/);

    // Go back to hub via back link
    const backLink = page.locator('.header a[href="/d3/"]').first();
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL(/\/d3\/$/);
  });
});
