/**Разработать тест со следующими шагами:
  - открыть https://the-internet.herokuapp.com/
  - перейти на страницу Dynamic Controls
  - Дождаться появления кнопки Remove
  - Завалидировать текста в заголовке страницы
  - Чекнуть чекбокс
  - Кликнуть по кнопке Remove
  - Дождаться исчезновения чекбокса
  - Проверить наличие кнопки Add
  - Завалидировать текст It's gone!
  - Кликнуть на кнопку Add
  - Дождаться появления чекбокса
  - Завалидировать текст It's back!
 */

import { expect, test } from "@playwright/test";

test.describe("[Heroku App] [Dynamic controls]", () => {
  test("HW20", async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/";
    await page.goto(url);
    const link = page.getByRole("link", { name: "Dynamic Controls" });
    await link.click();
    const heading = page.getByRole("heading", {
      level: 4,
      name: "Dynamic Controls",
    });
    const expectedText = "Dynamic Controls";
    await expect(heading).toHaveText(expectedText);

    const checkbox1 = page.locator('input[label="blah"]');
    await checkbox1.check();

    const changableButton = page.locator("#checkbox-example > button");
    await changableButton.click();

    await expect(checkbox1).toBeVisible({ visible: false, timeout: 20000 });

    await expect(changableButton).toHaveText("Add");

    const message = page.locator("p#message");
    await expect(message).toBeVisible({ visible: true });
    await expect(message).toHaveText("It's gone!");

    await changableButton.click();

    const checkbox2 = page.locator("input[type='checkbox']");
    await expect(checkbox2).toBeVisible({ visible: true, timeout: 20000 });

    await expect(message).toBeVisible({ visible: true });
    await expect(message).toHaveText("It's back!");
  });
});

