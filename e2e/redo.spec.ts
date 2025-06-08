import { test, expect } from '@playwright/test';

test.describe('Redo Mode', () => {
  test.beforeEach(async ({ page }) => {
    // Clear local storage before each test to ensure a clean state
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should allow redoing cards answered incorrectly', async ({ page }) => {
    // 1. Start a study session for "Animals"
    await page.goto('/study');
    await page.getByRole('link', { name: 'Study: Animals' }).click();

    // 2. Answer first card "wrong", second card "right", third "wrong"
    const flashcard = page.locator('[data-testid=flashcard]');
    
    // Card 1: el perro -> The dog (WRONG)
    await flashcard.click(); // Flip
    await page.getByRole('button', { name: '❌ Wrong' }).click();
    
    // Card 2: el gato -> The cat (RIGHT)
    await flashcard.click(); // Flip
    await page.getByRole('button', { name: '✅ Right' }).click();

    // Card 3: el pájaro -> The bird (WRONG)
    await flashcard.click(); // Flip
    await page.getByRole('button', { name: '❌ Wrong' }).click();

    // 3. Session complete screen should show 2 wrong answers and a "Redo" button
    await expect(page.getByText('You got 1 right and 2 wrong.')).toBeVisible();
    const redoButton = page.getByRole('link', { name: 'Redo Wrong Cards' });
    await expect(redoButton).toBeVisible();

    // 4. Click "Redo Wrong Cards"
    await redoButton.click();
    await expect(page).toHaveURL('/study/redo');
    await expect(page.getByText('Redoing Wrong Cards')).toBeVisible();

    // 5. Verify the redo session has 2 cards
    await expect(page.getByText('Card 1 of 2')).toBeVisible();
    await expect(flashcard.getByText('el perro')).toBeVisible();

    // 6. Answer the first card "right" this time
    await flashcard.click();
    await page.getByRole('button', { name: '✅ Right' }).click();

    // 7. Verify the next card is the second wrong card
    await expect(page.getByText('Card 2 of 2')).toBeVisible();
    await expect(flashcard.getByText('el pájaro')).toBeVisible();
    
    // 8. Answer the second card "wrong" again
    await flashcard.click();
    await page.getByRole('button', { name: '❌ Wrong' }).click();

    // 9. Redo session is complete. It should offer to redo the 1 remaining card.
    await expect(page.getByText('Redo Session Complete!')).toBeVisible();
    const redoAgainButton = page.getByRole('link', { name: 'Redo Again (1 left)' });
    await expect(redoAgainButton).toBeVisible();

    // 10. Go back to the category selection page
    await page.goto('/study');
    
    // 11. Verify it shows 1 card to review and allows clearing
    await expect(page.getByText('You have 1 card(s) to review.')).toBeVisible();
    
    const clearButton = page.getByRole('button', { name: 'Clear Wrong Cards' });
    await expect(clearButton).toBeVisible();

    // 12. Clear the wrong cards
    await clearButton.click();
    
    // 13. Verify the redo section disappears
    await expect(page.getByText('You have 1 card(s) to review.')).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Redo Wrong Cards' })).not.toBeVisible();
  });
}); 