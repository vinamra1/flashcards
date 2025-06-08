import { test, expect } from '@playwright/test';

test.describe('Spanish Flashcards App E2E Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Go to the home page before each test
    await page.goto('/');
  });

  test('should display the home page with navigation buttons', async ({ page }) => {
    // Check for the main heading
    await expect(page.getByRole('heading', { name: 'Spanish Flashcards' })).toBeVisible();

    // Check for the navigation buttons
    await expect(page.getByRole('link', { name: 'Study Mode' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Quiz Mode' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Stats Page' })).toBeVisible();
  });

  test('should navigate to study category selection and then to a flashcard page', async ({ page }) => {
    // Navigate to the study category selection page
    await page.goto('/study');

    // Check that we are on the category selection page
    await expect(page.getByRole('heading', { name: 'Study Session: Choose a Category' })).toBeVisible();

    // Click on the "Animals" category
    await page.getByRole('link', { name: 'Study: Animals' }).click();

    // Check that we are on the flashcard page for the "Animals" category
    await expect(page).toHaveURL('/study/animals');
    await expect(page.getByRole('heading', { name: 'Studying: Animals' })).toBeVisible();
  });

  test('should flip the flashcard when clicked', async ({ page }) => {
    // Navigate to the study page for animals
    await page.goto('/study/animals');

    // Find the flashcard
    const flashcard = page.getByTestId('flashcard');
    await expect(flashcard).toBeVisible();

    // Check that the front of the card is visible by looking for the spanish-word class
    const front = flashcard.locator('.spanish-word');
    await expect(front).toBeVisible();
    const frontText = await front.textContent();


    // Click the flashcard to flip it
    await flashcard.click();

    // Check that the back of the card is now visible
    const back = flashcard.locator('.english-word');
    await expect(back).toBeVisible();

    // Card should not have the same text on both sides
    await expect(back).not.toHaveText(frontText!);
  });

  test('should show feedback buttons after flipping and advance card on click', async ({ page }) => {
    await page.goto('/study/animals');

    const flashcard = page.getByTestId('flashcard');
    const front = flashcard.locator('.spanish-word');

    // Get the text of the first card
    const firstCardText = await front.textContent();
    await expect(firstCardText).not.toBeNull();

    // Flip the card
    await flashcard.click();

    // Check that feedback buttons are visible
    const correctButton = page.getByTestId('correct-button');
    const wrongButton = page.getByTestId('wrong-button');
    await expect(correctButton).toBeVisible();
    await expect(wrongButton).toBeVisible();

    // Click the "correct" button
    await correctButton.click();

    // Check that the next card is shown and is not flipped
    await expect(page.getByText('Card 2 of 3')).toBeVisible();
    const secondCardText = await front.textContent();
    await expect(secondCardText).not.toBeNull();
    await expect(secondCardText).not.toEqual(firstCardText);
  });

  test('should show the session complete screen after the last card', async ({ page }) => {
    await page.goto('/study/animals');

    // Cycle through all cards
    for (let i = 0; i < 3; i++) {
        await page.getByTestId('flashcard').click();
        // Alternate between correct and wrong to test the final count
        const button = i % 2 === 0 ? page.getByTestId('correct-button') : page.getByTestId('wrong-button');
        await button.click();
    }

    // Check for session complete screen
    await expect(page.getByRole('heading', { name: 'Session Complete!' })).toBeVisible();
    await expect(page.getByText('You got 2 right and 1 wrong.')).toBeVisible();
  });

  test('should navigate to quiz category selection page', async ({ page }) => {
    // Click on Quiz Mode
    await page.getByRole('link', { name: 'Quiz Mode' }).click();

    // Check that we are on the category selection page for quizzes
    await expect(page.getByRole('heading', { name: 'Quiz Session: Choose a Category' })).toBeVisible();

    // Check for the new quiz type links
    await expect(page.getByRole('link', { name: 'Multiple Choice' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Fill in the Blank' }).first()).toBeVisible();
  });

  test('should navigate to the stats page', async ({ page }) => {
    // Click on Stats Page
    await page.getByRole('link', { name: 'Stats Page' }).click();

    // Check that we are on the stats page
    await expect(page.getByRole('heading', { name: 'Statistics' })).toBeVisible();
  });

}); 