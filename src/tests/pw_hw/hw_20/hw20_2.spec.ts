/**Разработать тест со следующими шагами:
    - открыть https://anatoly-karpovich.github.io/demo-login-form/
    - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
    - Залогиниться с данными что вы вставили в localStorage
    - Завалидировать успешный логин
  
    Рекоммендации:
    - Для доступа к localStorage используйте https://playwright.dev/docs/evaluating
   */
import { expect, test } from "@playwright/test";

test.describe("[Demo_login_form] [Local Storage]", () => {
  const userCreds = {
    name: "test3@gmail.com",
    password: "SecretPw123!@#",
  };

  test("мокаем данные в localStorage через addInitScript ", async ({
    page,
  }) => {
    await page.addInitScript(
      ({ userCreds }) => {
        localStorage.setItem(userCreds.name, JSON.stringify(userCreds));
      },
      { userCreds }
    );

    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");

    const loginForm = page.locator("#loginForm");
    const userNameOnLogin = page.locator("#userName");
    const passwordOnLogin = page.locator("#password");
    const submitOnLogin = page.locator("#submit");
    const noitifiction = page.locator("#successMessage");

    await expect(loginForm).toHaveText("Login");
    await expect(userNameOnLogin).toBeVisible();
    await expect(passwordOnLogin).toBeVisible();

    await userNameOnLogin.fill(userCreds.name);
    await passwordOnLogin.fill(userCreds.password);
    await submitOnLogin.click();

    await expect(noitifiction).toHaveText(`Hello, ${userCreds.name}!`);
  });

  test("мокаем данные в localStorage через evaluate", async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");

    await page.evaluate(() => {
      localStorage.setItem(
        "test2@gmail.com",
        JSON.stringify({
          name: "test2@gmail.com",
          password: "2SecretPw123!@#",
        })
      );
    });

    const loginForm = page.locator("#loginForm");
    const userNameOnLogin = page.locator("#userName");
    const passwordOnLogin = page.locator("#password");
    const submitOnLogin = page.locator("#submit");
    const noitifiction = page.locator("#successMessage");

    await expect(loginForm).toHaveText("Login");
    await expect(userNameOnLogin).toBeVisible();
    await expect(passwordOnLogin).toBeVisible();

    await userNameOnLogin.fill("test2@gmail.com");
    await passwordOnLogin.fill("2SecretPw123!@#");
    await submitOnLogin.click();

    await expect(noitifiction).toHaveText(`Hello, test2@gmail.com!`);
  });
});
