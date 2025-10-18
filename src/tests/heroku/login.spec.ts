import { expect, test } from "@playwright/test";

interface ICredentials {
  username: string;
  password: string;
}

enum NOTIFICATIONS {
  LOGIN_SUCCESS = "You logged into a secure area!",
  LOGOUT_SUCCESS = "You logged out of the secure area!",
  INVALID_PASSWORD = "Your password is invalid",
  INVALID_USERNAME = "Your username is invalid",
}

test.describe("[Heroku App] [Form Authentication]", () => {
  const validCredentials: ICredentials = {
    username: "tomsmith",
    password: "SuperSecretPassword!",
  };

  const invalidCredentials: ICredentials[] = [
    {
      username: validCredentials.username,
      password: "qwerty",
    },
    {
      username: "Vasaya Pupkin",
      password: validCredentials.password,
    },
    {
      username: validCredentials.username,
      password: "",
    },
    {
      username: "",
      password: validCredentials.password,
    },
    {
      username: "",
      password: "",
    },
  ];

  //вынесем повторяющиеся действия в каждом тесте
  test.beforeEach(async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/";
    const loginLink = page.locator('a[href="/login"]');
    await page.goto(url);
    await loginLink.click();
  });

  test("should login with valid credentials", async ({ page }) => {
    //AAA = Arrange -> Act -> Assert

    //const url = "https://the-internet.herokuapp.com/"; // повторялось в каждом тесте - вынесли через
    //const loginLink = page.locator('a[href="/login"]');
    const userNameInput = page.locator("#username");
    const passwordInput = page.locator("#password");
    const loginButton = page.locator("//button[@type='submit']");
    const notification = page.locator("#flash");
    const securePageTitle = page.locator("h2");

    //await page.goto(url);
    //await loginLink.click();
    await userNameInput.fill(validCredentials.username);
    await passwordInput.fill(validCredentials.password);
    await loginButton.click();
    // await page.waitForTimeout(1000);
    await expect(notification).toContainText(NOTIFICATIONS.LOGIN_SUCCESS); //for testing according specification use toHaveText
    //используем contain т.к. текст там сложнее
    // const takSebeFlashText ='\n            You logged into a secure area!\n            ×\n          ';
    // await expect(notification).toBeVisible(); //ждем пока нотификашка становится видной
    // const actualNotification = (await notification.innerText()).replace("×","").trim(); //вытягиваем текст, заменяем х на пробелы и тримим
    // expect(actualNotification).toBe(NOTIFICATIONS.LOGIN_SUCCESS) //сравниваем преобразованный текст с видимым на странице
    // console.log(actualNotification)
    await expect(securePageTitle).toHaveText("Secure Area");
  });

  test("should logout", async ({ page }) => {
    //AAA = Arrange -> Act -> Assert

    const userNameInput = page.locator("#username");
    const passwordInput = page.locator("#password");
    const loginButton = page.locator("//button[@type='submit']");
    const notification = page.locator("#flash");
    const PageTitle = page.locator("h2");
    const logoutButton = page.locator('a[href="/logout"]');
    //preconditions

    await userNameInput.fill(validCredentials.username);
    await passwordInput.fill(validCredentials.password);
    await loginButton.click();
    await expect(notification).toContainText(NOTIFICATIONS.LOGIN_SUCCESS); //for testing according specification use toHaveText
    //act
    await logoutButton.click();
    //assert
    await expect(notification).toContainText(NOTIFICATIONS.LOGOUT_SUCCESS);
    await expect(PageTitle).toHaveText("Login Page");
  });

  test("should NOT login with invalid password", async ({ page }) => {
    const userNameInput = page.locator("#username");
    const passwordInput = page.locator("#password");
    const loginButton = page.locator("//button[@type='submit']");
    const notification = page.locator("#flash");

    const { username, password } = invalidCredentials[0]!; //деструктуризация
    await userNameInput.fill(username);
    await passwordInput.fill(password);
    await loginButton.click();
    await expect(notification).toContainText(NOTIFICATIONS.INVALID_PASSWORD); //for testing according specification use toHaveText
  });

  test("should NOT login with invalid username", async ({ page }) => {
    const userNameInput = page.locator("#username");
    const passwordInput = page.locator("#password");
    const loginButton = page.locator("//button[@type='submit']");
    const notification = page.locator("#flash");

    const { username, password } = invalidCredentials[1]!; //деструктуризация
    await userNameInput.fill(username);
    await passwordInput.fill(password);
    await loginButton.click();
    await expect(notification).toContainText(NOTIFICATIONS.INVALID_USERNAME); //for testing according specification use toHaveText
  });

  test("should NOT login with blank password", async ({ page }) => {
    const userNameInput = page.locator("#username");
    const passwordInput = page.locator("#password");
    const loginButton = page.locator("//button[@type='submit']");
    const notification = page.locator("#flash");

    const { username, password } = invalidCredentials[2]!; //деструктуризация
    await userNameInput.fill(username);
    await passwordInput.fill(password);
    await loginButton.click();
    await expect(notification).toContainText(NOTIFICATIONS.INVALID_PASSWORD); //for testing according specification use toHaveText
  });

  test("should NOT login with blank username", async ({ page }) => {
    const userNameInput = page.locator("#username");
    const passwordInput = page.locator("#password");
    const loginButton = page.locator("//button[@type='submit']");
    const notification = page.locator("#flash");
    const { username, password } = invalidCredentials[3]!; //деструктуризация
    await userNameInput.fill(username);
    await passwordInput.fill(password);
    await loginButton.click();
    await expect(notification).toContainText(NOTIFICATIONS.INVALID_USERNAME); //for testing according specification use toHaveText
  });

  test("should NOT login with blank credentials", async ({ page }) => {
    const userNameInput = page.locator("#username");
    const passwordInput = page.locator("#password");
    const loginButton = page.locator("//button[@type='submit']");
    const notification = page.locator("#flash");

    const { username, password } = invalidCredentials[4]!; //деструктуризация
    await userNameInput.fill(username);
    await passwordInput.fill(password);
    await loginButton.click();
    await expect(notification).toContainText(NOTIFICATIONS.INVALID_USERNAME); //for testing according specification use toHaveText
  });
});
