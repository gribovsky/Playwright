import { expect, test } from "@playwright/test";

/**ниже по файлу будут закоменчены части, раскоментироватт по порядку
 * между многострочными комментами
 */

//введем валидные данные для регистрации
// interface ICredentials {
//   username: string;
//   password: string;
// }
// const userData: ICredentials[] = [
//   {
//     username: "Andrei12345678 !@#S",
//     password: "Andrei12345678 !@#S",
//   },
//   {
//     username: "Emy",
//     password: "123456Aa",
//   },
//   {
//     username: "Andrei12345678 !@#S aaaaaaaaaaaaaaaaaaaaa",
//     password: "123456Aaaaaaaaaaaaaa",
//   },
// ];

// const succesMessage = "Successfully registered! Please, click Back to return on login page";

// test.describe("[Demo Login Form] Registration", () => {
//   test("Register with  smoke creentials", async ({ page }) => {
//     const url = "https://anatoly-karpovich.github.io/demo-login-form/";
//     await page.goto(url);
//     const registerOnLoginButton = page.locator(
//       '.loginForm input[value="Register"]'
//     ); // кнопка Register без id для тренировки
//     await expect(registerOnLoginButton).toBeVisible();
//     await registerOnLoginButton.click();

//     const registerForm = page.locator(".registerForm"); //корневой локатор для формы регистрации
//     const registerFormTitle = registerForm.locator("#registerForm"); //ищем уже не по все пэйдже, а именно в форме
//     await expect(registerFormTitle).toBeVisible();

//     //найдем поля юзернем, пасворд и кнопку батон в форме регистрации по тому же принципу
//     const userNameInput = registerForm.locator("input[type='text']");
//     const passwordInput = registerForm.locator("input[type='password']");
//     const registerButton = registerForm.locator("input[type='submit']");

//     //получаем данные для ввода, вводим их и кликаем зарегистрироваться
//     const { username, password } = userData[0]!;
//     await userNameInput.fill(username);
//     await passwordInput.fill(password);
//     await registerButton.click();

//     //валидируем успешную регистрацию
//     const succesMessageLabel = registerForm.locator("h4");
//     await expect(succesMessageLabel).toHaveText(succesMessage)

//   });
//  });

/**это мы прогнали один тест, а у нас три варианта данных.
 * можно скопипастить тесты и только менять const { username, password } = userData[0]! на 1,2
 * но так как все шаги !!!абсолютно одинаковы, кроме данных = можно сделать парметризированный тест
 * 1. создадим интрефейc IUserData - в котором будут все данные, нужные для теста: название теста, креды, саксес мессадж
 * 2. Проапдейтаем изер дату в соотвествии с этим интрефейсом
 * 3. И будем запускать тест в цикле (лучше просто ащк, т.к. методы массивов плохо работают с асинхронными данными - не дожидаются)
 */
//!!!!закоменчено, т.к. ниже потом будет импорт из файла
// interface IUserData {
//   title: string;
//   credentials: ICredentials;
//   successMessage: string;
// }

// const message =
//   "Successfully registered! Please, click Back to return on login page";
// interface ICredentials {
//   username: string;
//   password: string;
// }
// const userData: IUserData[] = [
//   {
//     credentials: {
//       username: "Andrei12345678 !@#S",
//       password: "Andrei12345678 !@#S",
//     },
//     successMessage: message,
//     title: "Register with  smoke creentials",
//   },
//   {
//     credentials: { username: "Emy", password: "123456Aa" },
//     successMessage: message,
//     title: "Register with min valid creentials",
//   },
//   {
//     credentials: {
//       username: "Andrei12345678 !@#S aaaaaaaaaaaaaaaaaaaaa",
//       password: "123456Aaaaaaaaaaaaaa",
//     },
//     successMessage: message,
//     title: "Register with max valid creentials",
//   },
// ];

// test.describe("[Demo Login Form] Registration", () => {
//   for (const { credentials, successMessage, title } of userData) {
//     test(title, async ({ page }) => {
//       const url = "https://anatoly-karpovich.github.io/demo-login-form/";
//       await page.goto(url);
//       const registerOnLoginButton = page.locator(
//         '.loginForm input[value="Register"]'
//       );
//       await expect(registerOnLoginButton).toBeVisible();
//       await registerOnLoginButton.click();

//       const registerForm = page.locator(".registerForm");
//       const registerFormTitle = registerForm.locator("#registerForm");
//       await expect(registerFormTitle).toBeVisible();

//       const userNameInput = registerForm.locator("input[type='text']");
//       const passwordInput = registerForm.locator("input[type='password']");
//       const registerButton = registerForm.locator("input[type='submit']");

//       const { username, password } = credentials;
//       await userNameInput.fill(username);
//       await passwordInput.fill(password);
//       await registerButton.click();

//       const succesMessageLabel = registerForm.locator("h4");
//       await expect(succesMessageLabel).toHaveText(successMessage);
//     });
//   }
// });

/**тестовые данные занимают кучу места => лучше хранить их в файле
 * создаем в src папку data, в ней папку с теже именем, что и папка где тесты - data-login-form (чтобы было понятно, для чего данные)
 * и в ней уже файлик register.data.ts с данными и все со строки 64 по 127 туда
 * userData в нем преименуем в validDataTest
 * и так как нам нужен экспорт этих данных и там только один массив - default export
 * и потом все проимпортировать в этот файл, где тест
 */

import userData from "../../data/demo-login-form/register.data";

test.describe("[Demo Login Form] Registration", () => {
  for (const { credentials, successMessage, title } of userData) {
    test(title, async ({ page }) => {
      const url = "https://anatoly-karpovich.github.io/demo-login-form/";
      await page.goto(url);
      const registerOnLoginButton = page.locator(
        '.loginForm input[value="Register"]'
      );
      await expect(registerOnLoginButton).toBeVisible();
      await registerOnLoginButton.click();

      const registerForm = page.locator(".registerForm");
      const registerFormTitle = registerForm.locator("#registerForm");
      await expect(registerFormTitle).toBeVisible();

      const userNameInput = registerForm.locator("input[type='text']");
      const passwordInput = registerForm.locator("input[type='password']");
      const registerButton = registerForm.locator("input[type='submit']");

      const { username, password } = credentials;
      await userNameInput.fill(username);
      await passwordInput.fill(password);
      await registerButton.click();

      const succesMessageLabel = registerForm.locator("h4");
      await expect(succesMessageLabel).toHaveText(successMessage);
    });
  }
});

/**второй вариант хранения - в json файле
 * засовываем массив userData (validTestData) в созданный в папке data/demo-login-form userdata.json файл
 * не забыв везде кавычки
 * саксес мессадже тоже подставив руками какой надо
 * для импорта json нужно импортнуть fs - import fs from 'fs'
 * для нормального пути импорт path
 * cwd - для указания корня
 */
//все что ниже вместо строки 143 - import userData from "../../data/demo-login-form/register.data";
// import fs from "fs";
// import path from "path";
// const file = path.resolve(
//   `${process.cwd()}/src/data/demo-login-form/userdata.json`
// );
// const userData = JSON.parse(fs.readFileSync(file, "utf-8"));
