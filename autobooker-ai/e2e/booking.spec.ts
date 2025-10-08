import { test, expect } from '@playwright/test';

test('public booking flow', async ({ page }) => {
  // Replace 'coach1' with a valid coach identifier from your seed data
  await page.goto('/book/coach1');

  // Step 1: select the first available date (assumes a button with a date label)
  const dateButtons = await page.locator('button').filter({ hasText: /\d{2}\// }).elementHandles();
  if (dateButtons.length > 0) {
    await dateButtons[0].click();
  }

  // Step 2: select the first available time slot (assumes time button)
  const timeButtons = await page.locator('button').filter({ hasText: /:/ }).elementHandles();
  if (timeButtons.length > 0) {
    await timeButtons[0].click();
  }

  // Step 3: fill client information and submit
  await page.fill('input[name="clientName"]', 'Test Client');
  await page.fill('input[name="clientEmail"]', 'client@example.com');
  await page.click('button[type="submit"]');

  // Expect confirmation message
  await expect(page.locator('text=confirm')).toBeVisible();
});
