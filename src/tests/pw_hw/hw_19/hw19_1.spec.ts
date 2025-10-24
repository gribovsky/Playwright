/**  Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/

  Требования:
    Страница регистрации:
      Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
      Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
    Страница логина:
      Username: обязательное
      Password: обязательное
 */

import { expect, test } from "@playwright/test";

interface ICredentials {
  username: string;
  password: string;
}

enum NOTIFICATIONS {
  REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
  REGISTER_FAILED = "Please, provide valid data",
  LOGIN_CRED_EMPTY = "Credentials are required",
}

test.describe("[Anatoly Karpovich Login Form] [Registration]", () => {
  const validCredentials: ICredentials[] = [
    {
      username: "CodeMaster01",
      password: "!DevPower2024@",
    },
    {
      username: "AAA",
      password: "!DevPower1111@",
    },
    {
      username: "SuperUser_Elite_Account_Registered123456",
      password: "!DevPower2222@",
    },
    {
      username: "CodeMaster02",
      password: "Aa123456",
    },
    {
      username: "CodeMaster03",
      password: "SecureAccess2025Code",
    },
  ];
  const invalidCredentials: ICredentials = {
    username: "   ",
    password: "        ",
  };

  test.beforeEach(async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";
    const registerButton = page.locator("#registerOnLogin");
    const registrationForm = page.locator("#registerForm");
    await page.goto(url);
    await registerButton.click();
    await expect(registrationForm).toHaveText("Registration");
  });

  test("should registered with average credentials", async ({ page }) => {
    const userNameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const noitifiction = page.locator("#errorMessageOnRegister");
    //const backButton = page.locator("#backOnRegister");

    await userNameInput.fill(validCredentials[0]!.username);
    await passwordInput.fill(validCredentials[0]!.password);
    await registerButton.click();

    await expect(noitifiction).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
  });

  test("should registered with min_user_length", async ({ page }) => {
    const userNameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const noitifiction = page.locator("#errorMessageOnRegister");

    await userNameInput.fill(validCredentials[1]!.username);
    await passwordInput.fill(validCredentials[1]!.password);
    await registerButton.click();

    await expect(noitifiction).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
  });

  test("should registered with max_user_length", async ({ page }) => {
    const userNameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const noitifiction = page.locator("#errorMessageOnRegister");

    await userNameInput.fill(validCredentials[2]!.username);
    await passwordInput.fill(validCredentials[2]!.password);
    await registerButton.click();

    await expect(noitifiction).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
  });

  test("should registered with min_password_length", async ({ page }) => {
    const userNameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const noitifiction = page.locator("#errorMessageOnRegister");

    await userNameInput.fill(validCredentials[3]!.username);
    await passwordInput.fill(validCredentials[3]!.password);
    await registerButton.click();

    await expect(noitifiction).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
  });

  test("should registered with max_password_length", async ({ page }) => {
    const userNameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const noitifiction = page.locator("#errorMessageOnRegister");

    await userNameInput.fill(validCredentials[4]!.username);
    await passwordInput.fill(validCredentials[4]!.password);
    await registerButton.click();

    await expect(noitifiction).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
  });

  test("shouldn't registered with invalid credentials", async ({ page }) => {
    const userNameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const noitifiction = page.locator("#errorMessageOnRegister");

    await userNameInput.fill(invalidCredentials.username);
    await passwordInput.fill(invalidCredentials.password);
    await registerButton.click();

    await expect(noitifiction).toHaveText(NOTIFICATIONS.REGISTER_FAILED);
  });

  test("shouldn't login without credentials", async ({ page }) => {
    const userNameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const noitifiction = page.locator("#errorMessageOnRegister");

    await userNameInput.fill(invalidCredentials.username);
    await passwordInput.fill(invalidCredentials.password);
    await registerButton.click();

    await expect(noitifiction).toHaveText(NOTIFICATIONS.REGISTER_FAILED);
  });

  //попытка написать типа end-to-end сценарий
  test("should register and log with valid credentials", async ({ page }) => {
    const userNameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const noitifiction = page.locator("#errorMessageOnRegister");
    const backButton = page.locator("#backOnRegister");
    const loginForm = page.locator("#loginForm");
    const userNameOnLogin = page.locator("#userName");
    const passwordOnLogin = page.locator("#password");
    const submitOnLogin = page.locator("#submit");
    const successLogin = page.locator("#successMessage");

    await userNameInput.fill(validCredentials[0]!.username);
    await passwordInput.fill(validCredentials[0]!.password);
    await registerButton.click();

    await expect(noitifiction).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
    await backButton.click();
    await expect(loginForm).toHaveText("Login");

    await userNameOnLogin.fill(validCredentials[0]!.username);
    await passwordOnLogin.fill(validCredentials[0]!.password);
    await submitOnLogin.click();

    await expect(successLogin).toHaveText(
      `Hello, ${validCredentials[0]!.username}!`
    );
  });
});

test.describe("[Anatoly Karpovich Login Form] [Login]", () => {
  test("shouldn't register without credentials", async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";
    const loginForm = page.locator("#loginForm");
    const userNameOnLogin = page.locator("#userName");
    const passwordOnLogin = page.locator("#password");
    const submitOnLogin = page.locator("#submit");
    const noitifiction = page.locator("#errorMessage");

    await page.goto(url);
    await expect(loginForm).toHaveText("Login");
    await expect(userNameOnLogin).toBeVisible();
    await expect(passwordOnLogin).toBeVisible();

    await submitOnLogin.click();

    await expect(noitifiction).toHaveText(NOTIFICATIONS.LOGIN_CRED_EMPTY);
  });
});
