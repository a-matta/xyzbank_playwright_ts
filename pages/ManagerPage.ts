import { Page, Locator, expect } from "@playwright/test";

export class ManagerPage {
  private page: Page;
  private add_customer_button: Locator;
  private open_account_button: Locator;
  private show_customers_button: Locator;
  private search_customer: Locator;
  private table_rows: Locator;
  private table_row_cells: Locator;
  private table_row_delete_button: Locator;
  private customer_name_selector: Locator;
  private currency_selector: Locator;
  private first_name_input: Locator;
  private last_name_input: Locator;
  private post_code_input: Locator;
  private submit_button: Locator;
  private alert: any;

  constructor(page: Page) {
    this.page = page;
    this.add_customer_button = page.locator("//button[@ng-click='addCust()']");
    this.open_account_button = page.locator(
      "//button[@ng-click='openAccount()']"
    );
    this.show_customers_button = page.locator(
      "//button[@ng-click='showCust()']"
    );
    this.search_customer = page.getByPlaceholder("Search Customer");
    this.table_rows = page.locator("//tbody//tr");
    this.table_row_cells = page.locator("//tbody//tr//td");
    this.table_row_delete_button = page.locator("//tbody//tr//td[5]//button");
    this.customer_name_selector = page.locator("#userSelect");
    this.currency_selector = page.locator("#currency");
    this.first_name_input = page.locator("//input[@ng-model='fName']");
    this.last_name_input = page.locator("//input[@ng-model='lName']");
    this.post_code_input = page.locator("//input[@ng-model='postCd']");
    this.submit_button = page.locator("//button[@type='submit']");
  }

  async addCustomer(data: { [key: string]: string }) {
    await this.add_customer_button.click();
    await this.first_name_input.fill(data["first_name"]);
    await this.last_name_input.fill(data["last_name"]);
    await this.post_code_input.fill(data["post_code"]);
    await this.submit_button.click();
  }

  async verifyCustomerIsAvailableInSearchResults(data: {
    [key: string]: string;
  }) {
    await this.show_customers_button.click();
    await this.search_customer.fill(data["first_name"]);
    await expect(this.table_rows).toHaveCount(1);
    await expect(this.table_row_cells.nth(0)).toHaveText(data["first_name"]);
    await expect(this.table_row_cells.nth(1)).toHaveText(data["last_name"]);
    await expect(this.table_row_cells.nth(2)).toHaveText(data["post_code"]);
  }

  async verifyCustomerIsNotFound(data: { [key: string]: string }) {
    await this.show_customers_button.click();
    await this.search_customer.fill(data["first_name"]);
    await expect(this.table_rows).toHaveCount(0);
  }

  async verifyAccountNumberIsEmpty() {
    await expect(this.table_row_cells.nth(3)).toHaveText("");
  }

  async verifyAccountNumberIsNotEmpty() {
    await expect(this.table_row_cells.nth(3)).not.toBeEmpty();
  }

  async openAccount(customer_name: string, currency: string) {
    await this.open_account_button.click();
    await this.customer_name_selector.selectOption(customer_name);
    await this.currency_selector.selectOption(currency);
    await this.submit_button.click();
  }

  async deleteCustomer() {
    await this.table_row_delete_button.click();
  }
}
