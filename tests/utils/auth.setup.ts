import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const username = process.env.SAUCE_USERNAME;
  const password = process.env.SAUCE_PASSWORD;

  if (!username || !password) {
    throw new Error('Missing SAUCE_USERNAME or SAUCE_PASSWORD environment variables.');
  }

  // 1. Perform login once
  await page.goto('/');
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();

  // 2. Verify login succeeded
  await expect(page).toHaveURL(/.*inventory.html/);

  // 3. Save storage state (cookies, session storage) to file
  await page.context().storageState({ path: authFile });
});