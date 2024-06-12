import { expect, test } from '@playwright/test';

test('index page has button', async ({ page }) => {
  await page.goto('/');
  const buttonText = await page.locator('h1').innerText();
  expect(buttonText).toContain('Showcase');
});
