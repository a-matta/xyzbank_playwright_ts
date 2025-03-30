import { test, expect, Page } from "@playwright/test";
import { ManagerPage } from "../pages/ManagerPage";
import { MainPage } from "../pages/MainPage";

const data = {
  first_name: "Matti",
  last_name: "Pirkka",
  post_code: "00100",
};

// Helper function to navigate and login as manager
async function setupManagerPage(page: Page): Promise<ManagerPage> {
  const main_page = new MainPage(page);
  await main_page.navigate();
  return await main_page.loginAsManager();
}

test("Test New Customer Journey", async ({ page }) => {
  // create a customer
  const manager_page = await setupManagerPage(page);

  // add customer and verify
  await manager_page.addCustomer(data);
  await manager_page.verifyCustomerIsAvailableInSearchResults(data);
  await manager_page.verifyAccountNumberIsEmpty();

  // open account and verify
  const customerName = `${data.first_name} ${data.last_name}`;
  await manager_page.openAccount(customerName, "Dollar");
  await manager_page.verifyCustomerIsAvailableInSearchResults(data);
  await manager_page.verifyAccountNumberIsNotEmpty();

  // delete customer and verify
  await manager_page.deleteCustomer();
  await manager_page.verifyCustomerIsNotFound(data);
});
