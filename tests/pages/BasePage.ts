import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string = '') {
    await this.page.goto(path);
  }

  async getErrorMessage(): Promise<string> {
    const errorLocator = this.page.locator('[data-test="error"]');
    await expect(errorLocator).toBeVisible();
    return (await errorLocator.textContent()) || '';
  }
}