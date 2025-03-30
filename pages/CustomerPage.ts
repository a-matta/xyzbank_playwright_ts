import { Page, Locator, expect } from "@playwright/test";

export class CustomerPage {
  private page: Page;
  private base_url: string;
  private customer_button: Locator;
  private menu_transactions_button: Locator;
  private customer_name_selector: Locator;
  private customer_login_button: Locator;
  private menu_deposit_button: Locator;
  private menu_withdrawl_button: Locator;
  private submit_button: Locator;
  private amount_input: Locator;
  private message: Locator;
  private current_balance: Locator;

  constructor(page: Page) {
    this.page = page;
    this.base_url =
      "https://www.globalsqa.com/angularJs-protractor/BankingProject";
    this.customer_button = page.locator("//button[@ng-click='customer()']");
    this.customer_name_selector = page.locator("#userSelect");
    this.customer_login_button = page.locator("//button[@type='submit']");
    this.menu_transactions_button = page.locator(
      "//button[@ng-click='transactions()']"
    );
    this.menu_deposit_button = page.locator("//button[@ng-click='deposit()']");
    this.menu_withdrawl_button = page.locator(
      "//button[@ng-click='withdrawl()']"
    );
    this.submit_button = page.locator("//button[@type='submit']");
    this.amount_input = page.locator("//input[@ng-model='amount']");
    this.message = page.locator("[ng-show='message']");
    this.current_balance = page.locator(".center .ng-binding").nth(1);
  }

  async customerlogin(customer_name_selector: string) {
    await this.customer_button.click(); // Use the Locator directly
    await this.customer_name_selector.selectOption(customer_name_selector); // Use the Locator directly
    await this.customer_login_button.click();
  }

  async deposit(amount: number) {
    await this.menu_deposit_button.click();
    await this.amount_input.fill(String(amount));
    await this.submit_button.click();
  }

  async verify_deposit_is_successful() {
    await expect(this.message).toBeVisible();
    await expect(this.message).toHaveText("Deposit Successful");
  }

  async get_current_balance(): Promise<number> {
    const balanceText = await this.current_balance.textContent();
    const cleanedBalanceText = balanceText!.trim().replace(/[^0-9.-]/g, "");
    return Number(cleanedBalanceText);
  }

  async verify_current_balance(amount: number) {
    await expect(this.current_balance).toHaveText(`${amount}`);
  }

  async withdraw(amount: number) {
    await this.menu_withdrawl_button.click();
    await this.amount_input.fill(String(amount));
    await this.submit_button.click();
  }

  async verify_withdraw_is_successful() {
    await expect(this.message).toBeVisible();
    await expect(this.message).toHaveText("Transaction successful");
  }

  async verify_withdraw_fails_due_to_insufficient_funds() {
    await expect(this.message).toBeVisible();
    await expect(this.message).toHaveText(
      "Transaction Failed. You can not withdraw amount more than the balance."
    );
  }
}
