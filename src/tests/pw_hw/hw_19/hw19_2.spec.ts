/**Создайте ОДИН смоук тест со следующими шагами:

1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
2. Заполните форму регистрации
3. Проверьте, что пользователь успешно зарегистрирован
 */

import { expect, test } from "@playwright/test";

test.describe("[Anatoly Karpovich Registration Form] [Registration]", () => {
  test("should register user", async ({ page }) => {
    const userExample = {
      firstName: "Ivan",
      lastName: "Ivanov",
      Address: "Minsk",
      Email: "1111@test.com",
      Phone: "1111111",
      Country: "Canada",
      Gender: "male",
      Language: "English",
      Skills: ["JavaScript"],
      Hobbies: ["Sports", "Gaming"],
      yearOfBirth: "1981",
      monthOfBirth: "August",
      dayOfBirth: "29",
      Password: "***",
    };
    // const fullName = userExample["Full Name"];
    // const [firstNameExample, lastNameExample] = fullName.split(" ");

    const url = "https://anatoly-karpovich.github.io/demo-registration-form/";

    const firstName = page.locator("#firstName");
    const lastName = page.locator("#lastName");
    const fullName = page.locator("#fullName");
    const address = page.locator("#address");
    const emailAddress = page.locator("#email");
    const phone = page.locator("#phone");
    const country = page.locator("#country");
    const gender = page.locator(
      `input[name="gender"][value="${userExample.Gender}"]`
    );
    const genderOnDetailes = page.locator("#gender");
    const language = page.locator("#language");
    const skills = page.locator("#skills");
    const hobbiesOnDetails = page.locator("#hobbies");
    const yearOfBirth = page.locator("#year");
    const monthOfBirth = page.locator("#month");
    const dayOfBirth = page.locator("#day");
    const dateOfBirth = page.locator("#dateOfBirth");

    const password = page.locator("#password");
    const confirmPassword = page.locator("#password-confirm");

    const submitButton = page.locator("//button[text()='Submit']");
    const registrationDetails = page.locator("h2");

    await page.goto(url);

    await firstName.fill(userExample.firstName);
    await lastName.fill(userExample.lastName);
    await address.fill(userExample.Address);
    await emailAddress.fill(userExample.Email);
    await phone.fill(userExample.Phone);
    await country.selectOption(userExample.Country);
    await expect(country).toHaveValue(userExample.Country);
    await gender.check();

    for (const hobby of userExample.Hobbies) {
      const hobbies = page.locator(`input[class="hobby"][value = "${hobby}"]`);
      await hobbies.check();
    }

    await language.fill(userExample.Language);

    for (const skill of userExample.Skills) {
      await skills.selectOption(skill);
      await expect(skills).toHaveValue(skill);
    }

    await yearOfBirth.selectOption(userExample.yearOfBirth);
    await expect(yearOfBirth).toHaveValue(userExample.yearOfBirth);
    await monthOfBirth.selectOption(userExample.monthOfBirth);
    await expect(monthOfBirth).toHaveValue(userExample.monthOfBirth);
    await dayOfBirth.selectOption(userExample.dayOfBirth);
    await expect(dayOfBirth).toHaveValue(userExample.dayOfBirth);

    await password.fill(userExample.Password);
    await confirmPassword.fill(userExample.Password);

    await submitButton.click();

    await expect(registrationDetails).toHaveText("Registration Details");
    await expect(fullName).toHaveText(
      `${userExample.firstName} ${userExample.lastName}`
    );
    await expect(address).toHaveText(userExample.Address);
    await expect(emailAddress).toHaveText(userExample.Email);
    await expect(phone).toHaveText(userExample.Phone);
    await expect(country).toHaveText(userExample.Country);
    await expect(genderOnDetailes).toHaveText(userExample.Gender);
    await expect(language).toHaveText(userExample.Language);
    await expect(skills).toHaveText(userExample.Skills.join(","));
    await expect(dateOfBirth).toHaveText(
      `${userExample.dayOfBirth} ${userExample.monthOfBirth} ${userExample.yearOfBirth}`
    );
  });
});
