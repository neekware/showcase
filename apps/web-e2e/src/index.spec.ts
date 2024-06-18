import { expect, test } from '@playwright/test';

test('Index page has a the name', async ({ page }) => {
  await page.goto('/');
  const buttonText = await page.locator('h1').innerText();
  expect(buttonText).toContain('Showcase');
});
