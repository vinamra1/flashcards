import { test, expect } from '@playwright/test';

test.describe('Statistics Tracking', () => {
    test.beforeEach(async ({ page }) => {
        // Clear local storage before each test to ensure a clean state
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
      });

  test('should track stats across study and quiz sessions and display them correctly', async ({ page }) => {
    // 1. Perform a study session for "Animals"
    await page.goto('/study/animals');
    // Card 1: Correct
    await page.getByTestId('flashcard').click();
    await page.getByTestId('correct-button').click();
    // Card 2: Incorrect
    await page.getByTestId('flashcard').click();
    await page.getByTestId('wrong-button').click();
    // Card 3: Correct
    await page.getByTestId('flashcard').click();
    await page.getByTestId('correct-button').click();
    // Session complete
    await expect(page.getByRole('heading', { name: 'Session Complete!' })).toBeVisible();

    // 2. Perform a multiple-choice quiz for "Animals"
    await page.goto('/quiz/animals/multiple-choice');
    // Question 1: Correct
    await page.getByRole('button', { name: 'the dog' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Next Question' }).click();
    // Question 2: Incorrect
    await page.getByRole('button', { name: 'the house' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Next Question' }).click();
    // Quiz complete
    await expect(page.getByRole('heading', { name: 'Quiz Complete!' })).toBeVisible();

    // 3. Navigate to the Stats page and verify the numbers
    await page.goto('/stats');
    await expect(page.getByRole('heading', { name: 'Statistics' })).toBeVisible();

    // Overall Performance
    await expect(page.getByText('Total Cards Studied: 3')).toBeVisible();
    await expect(page.getByText('Total Correct Answers: 3')).toBeVisible(); // 2 study + 1 quiz
    await expect(page.getByText('Total Incorrect Answers: 2')).toBeVisible(); // 1 study + 1 quiz
    await expect(page.getByText('Overall Accuracy: 60.0%')).toBeVisible();

    // Animals Category
    const animalsCard = page.locator('.category-card', { hasText: 'Animals' });
    await expect(animalsCard.getByText('Studied: 3')).toBeVisible();
    await expect(animalsCard.getByText('Correct: 3')).toBeVisible();
    await expect(animalsCard.getByText('Incorrect: 2')).toBeVisible();
    await expect(animalsCard.getByText('Accuracy: 60.0%')).toBeVisible();

    // 4. Reset stats
    await page.getByRole('button', { name: 'Reset All Statistics' }).click();

    // 5. Verify stats are cleared
    await expect(page.getByText('Total Cards Studied: 0')).toBeVisible();
    await expect(page.getByText('Total Correct Answers: 0')).toBeVisible();
    await expect(page.getByText('Total Incorrect Answers: 0')).toBeVisible();
    await expect(page.getByText('Overall Accuracy: 0.0%')).toBeVisible();
    await expect(animalsCard.getByText('Studied: 0')).toBeVisible();
    await expect(animalsCard.getByText('Correct: 0')).toBeVisible();
    await expect(animalsCard.getByText('Incorrect: 0')).toBeVisible();
    await expect(animalsCard.getByText('Accuracy: 0.0%')).toBeVisible();
  });
}); 