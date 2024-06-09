import { expect, test } from '@playwright/test';

test('index page has button', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('Button').innerText()).toContain('Powered by');
});
