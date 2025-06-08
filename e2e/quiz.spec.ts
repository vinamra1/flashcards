import { test, expect } from '@playwright/test';

test.describe('Quiz Mode', () => {
    test.beforeEach(async ({ page }) => {
        // Clear local storage before each test to ensure a clean slate
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
      });

  test('should complete a multiple-choice quiz and see the final score', async ({ page }) => {
    // 1. Navigate to the quiz selection page
    await page.goto('/quiz');
    await expect(page.getByRole('heading', { name: 'Quiz Session: Choose a Category' })).toBeVisible();

    // 2. Start a multiple-choice quiz for "Food"
    await page.getByRole('link', { name: 'Multiple Choice' }).first().click();
    await expect(page).toHaveURL('/quiz/animals/multiple-choice');
    await expect(page.getByText('Multiple choice')).toBeVisible();

    // 3. Answer questions
    // Question 1: el perro -> the dog. Correct answer is "the dog"
    await page.getByRole('button', { name: 'the dog' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Correct!')).toBeVisible();
    await page.getByRole('button', { name: 'Next Question' }).click();
    
    // Question 2: el gato -> the cat. Select wrong answer
    await page.getByRole('button', { name: 'the house' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Wrong! The correct answer was: the cat')).toBeVisible();
    await page.getByRole('button', { name: 'Next Question' }).click();

    // 4. See the final score
    await expect(page.getByRole('heading', { name: 'Quiz Complete!' })).toBeVisible();
    await expect(page.getByText('You scored 1 out of 2.')).toBeVisible();
  });

  test('should complete a fill-in-the-blank quiz and see the final score', async ({ page }) => {
    // 1. Navigate to the quiz selection page
    await page.goto('/quiz');

    // 2. Start a fill-in-the-blank quiz for "Verbs"
    await page.getByRole('link', { name: 'Fill in the Blank' }).last().click();
    await expect(page).toHaveURL('/quiz/verbs/fill-in-the-blank');
    await expect(page.getByText('fill in the blank')).toBeVisible();

    // 3. Answer questions
    const textInput = page.getByPlaceholder('Type the English translation');

    // Question 1: "to run"
    await textInput.fill('to run');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Correct!')).toBeVisible();
    await page.getByRole('button', { name: 'Next Question' }).click();

    // Question 2: "to sleep" (with wrong answer)
    await textInput.fill('to jump');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Wrong! The correct answer was: to sleep')).toBeVisible();
    await page.getByRole('button', { name: 'Next Question' }).click();

    // 4. See the final score
    await expect(page.getByRole('heading', { name: 'Quiz Complete!' })).toBeVisible();
    await expect(page.getByText('You scored 1 out of 2.')).toBeVisible();
  });
}); 