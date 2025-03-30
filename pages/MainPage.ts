import { Page, Locator, expect } from "@playwright/test";
import { test } from "@playwright/test";

import { CustomerPage } from "../pages/CustomerPage";
import { ManagerPage } from "../pages/ManagerPage";

const base_url =
  "https://www.globalsqa.com/angularJs-protractor/BankingProject";

export class MainPage {
  private page: Page;
  private customer_button: Locator;
  private customer_name_selector: Locator;
  private customer_login_button: Locator;
  private manager_button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.customer_button = page.locator("//button[@ng-click='customer()']");
    this.customer_name_selector = page.locator("#userSelect");
    this.customer_login_button = page.locator("//button[@type='submit']");
    this.manager_button = page.locator("//button[@ng-click='manager()']");
  }

  async navigate() {
    await this.page.goto(base_url);
    await expect(this.page).toHaveTitle("XYZ Bank");
  }

  async loginAsCustomer(customer_name: string): Promise<CustomerPage> {
    await this.customer_button.click();
    await this.customer_name_selector.selectOption({ label: customer_name });
    await this.customer_login_button.click();
    return new CustomerPage(this.page);
  }

  async loginAsManager(): Promise<ManagerPage> {
    await this.manager_button.click();
    return new ManagerPage(this.page);
  }
}
