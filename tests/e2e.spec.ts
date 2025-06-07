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
    // Click on Study Mode
    await page.getByRole('link', { name: 'Study Mode' }).click();

    // Check that we are on the category selection page
    await expect(page.getByRole('heading', { name: 'Select a Category for Study' })).toBeVisible();

    // Click on the "Animals" category
    await page.getByRole('link', { name: 'Animals' }).click();

    // Check that we are on the flashcard page for the "Animals" category
    await expect(page.getByRole('heading', { name: 'Studying: Animals' })).toBeVisible();

    // Check that the first flashcard is visible
    await expect(page.getByRole('heading', { name: 'el gato' })).toBeVisible();
  });

  test('should flip the flashcard when clicked', async ({ page }) => {
    // Navigate to the study page for animals
    await page.goto('/study/animals');

    // Find the flashcard
    const flashcard = page.getByTestId('flashcard');
    await expect(flashcard).toBeVisible();

    // Check that the front of the card is visible
    await expect(page.getByRole('heading', { name: 'el gato' })).toBeVisible();

    // Click the flashcard to flip it
    await flashcard.click();

    // Check that the back of the card is now visible
    await expect(page.getByRole('heading', { name: 'the cat' })).toBeVisible();
  });

  test('should navigate to quiz category selection and then to a quiz page', async ({ page }) => {
    // Click on Quiz Mode
    await page.getByRole('link', { name: 'Quiz Mode' }).click();

    // Check that we are on the category selection page
    await expect(page.getByRole('heading', { name: 'Select a Category for Quiz' })).toBeVisible();

    // Click on the "Food" category
    await page.getByRole('link', { name: 'Food' }).click();

    // Check that we are on the quiz page for the "Food" category
    await expect(page.getByRole('heading', { name: 'Quiz: Food' })).toBeVisible();
  });

}); 