import { test, expect } from "@playwright/test";
import { CustomerPage } from "../pages/CustomerPage";
import { MainPage } from "../pages/MainPage";

test("Test Deposit", async ({ page }) => {
  const main_page = new MainPage(page);
  //const customer = new CustomerPage(page);
  await main_page.navigate();
  const customerPage = await main_page.loginAsCustomer("Harry Potter");
  await customerPage.verify_current_balance(0);
  await customerPage.deposit(100);
  await customerPage.verify_deposit_is_successful();
  await customerPage.verify_current_balance(100);
});

test("Test Withdraw Amount Success", async ({ page }) => {
  const main_page = new MainPage(page);
  await main_page.navigate();
  const customerPage = await main_page.loginAsCustomer("Hermoine Granger");
  const current_balance = await customerPage.get_current_balance();
  await customerPage.withdraw(100);
  await customerPage.verify_withdraw_is_successful();
  await customerPage.verify_current_balance(current_balance - 100);
});

test("Test Withdraw Fails For Insufficient Balance", async ({ page }) => {
  const main_page = new MainPage(page);
  const customer = new CustomerPage(page);
  await main_page.navigate();
  const customerPage = await main_page.loginAsCustomer("Ron Weasly");
  await customerPage.withdraw(1000);
  await customerPage.verify_withdraw_fails_due_to_insufficient_funds();
});
