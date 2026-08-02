import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async goto() {
    await this.navigateTo('/');
  }

  async login(username?: string, password?: string) {
    if (username !== undefined) await this.usernameInput.fill(username);
    if (password !== undefined) await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}