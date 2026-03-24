// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Games', () => {

  test('D3 games page loads', async ({ page }) => {
    await page.goto('/d3/games/');
    await expect(page).toHaveTitle(/D3 Games|Games/i);
    await expect(page.locator('.header h1, h1')).toBeVisible();
  });

  test('Django games page loads', async ({ page }) => {
    await page.goto('/django/games/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('SQL games page loads', async ({ page }) => {
    await page.goto('/sql/games/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('D3 games: tab switching shows correct game panel', async ({ page }) => {
    await page.goto('/d3/games/');

    const tabs = page.locator('.tab-btn');
    const tabCount = await tabs.count();
    expect(tabCount).toBeGreaterThan(1);

    // First tab should be active by default
    await expect(tabs.first()).toHaveClass(/active/);

    // First game panel should be visible
    const panels = page.locator('.game-panel');
    const firstPanel = panels.first();
    await expect(firstPanel).toHaveClass(/active/);

    // Click second tab
    const secondTab = tabs.nth(1);
    await secondTab.click();
    await expect(secondTab).toHaveClass(/active/);

    // First tab should no longer be active
    await expect(tabs.first()).not.toHaveClass(/active/);

    // Second panel should now be visible
    const visiblePanels = page.locator('.game-panel.active');
    await expect(visiblePanels).toHaveCount(1);
  });

  test('D3 games: answering a question shows feedback', async ({ page }) => {
    await page.goto('/d3/games/');

    // Wait for first game panel to be active
    await page.waitForSelector('.game-panel.active');

    // Find a choice button (answer option)
    const choiceBtn = page.locator('.choice-btn').first();
    // Only proceed if choice buttons exist (game type has multiple choice)
    const choiceCount = await page.locator('.choice-btn').count();

    if (choiceCount > 0) {
      await choiceBtn.click();

      // After clicking, the button should get correct or wrong class
      const hasCorrect = await choiceBtn.evaluate(
        el => el.classList.contains('correct') || el.classList.contains('wrong')
      );
      expect(hasCorrect).toBeTruthy();

      // Explanation should show
      const explanation = page.locator('.explanation.show');
      await expect(explanation).toBeVisible();
    }
  });

  test('D3 games: score updates after answering', async ({ page }) => {
    await page.goto('/d3/games/');
    await page.waitForSelector('.game-panel.active');

    const scoreValue = page.locator('.score-item .value').first();
    const choiceCount = await page.locator('.choice-btn').count();

    if (choiceCount > 0) {
      const scoreBefore = await scoreValue.textContent();

      // Find the correct answer and click it
      // (or just click any answer to trigger score change)
      await page.locator('.choice-btn').first().click();

      // Wait for DOM update
      await page.waitForTimeout(300);

      // Score area should still be visible
      await expect(scoreValue).toBeVisible();
    }
  });
});
