import { expect, test } from "@playwright/test";

test.describe('[Heroku App] [Dropdown]', () => {
    test.beforeEach(async ({ page }) => {
        const url = "https://the-internet.herokuapp.com/";
        const dropdownLink = page.locator('a[href="/dropdown"]');
        await page.goto(url);
        await dropdownLink.click();
      });
    
    test("Should select option 1", async ({page}) => {
        const dropdown = page.locator("#dropdown");
        await dropdown.selectOption("1") //принимает либо значение value (есть у опшинов, смотри ч/з инспект), либо текст
        await expect(dropdown).toHaveValue("1"); //проверяем что в дропдаун засетано нужное вэлью

    });

    test("Should select option 2", async ({page}) => {
        const dropdown = page.locator("#dropdown");
        await dropdown.selectOption("Option 2") // текст
        await expect(dropdown).toHaveValue("2"); //проверяем что в дропдаун засетано нужное вэлью

    });
});