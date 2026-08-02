import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage'; 
export class CheckoutStepTwoPage extends BasePage {
  readonly finishButton: Locator;
  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.finishButton = page.locator('[data-test="finish"]');
    this.itemTotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async getCalculatedPrices() {
    const parse = (text: string) => parseFloat(text.split('$')[1]);
    return {
      subtotal: parse((await this.itemTotalLabel.textContent()) || '$0'),
      tax: parse((await this.taxLabel.textContent()) || '$0'),
      total: parse((await this.totalLabel.textContent()) || '$0'),
    };
  }
}