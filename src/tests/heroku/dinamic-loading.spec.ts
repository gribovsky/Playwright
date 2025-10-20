import { expect, test } from "@playwright/test";

test.describe("[Heroku App] [Dynamic loading]", () => {
  // AreaAttributes

  test("Get by role", async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/";
    await page.goto(url);
    const link = page.getByRole("link", { name: "Dynamic loading" }); //ищем линку с текстом Dynamic loading. Кроме name есть куча параметров
    await link.click();
    const heading = page.getByRole("heading", { level: 3 }); //без имени т.к. он там один такой, но добавми level (3 - ок, 4 -сломаем)
    const expectedText = "Dynamically Loaded Page Elements";
    await expect(heading).toHaveText(expectedText);
  });

  test("Get by text", async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/";
    await page.goto(url);
    const link = page.getByRole("link", { name: "Dynamic loading" }); //ищем линку с текстом Dynamic loading. Кроме name есть куча параметров
    await link.click();
    const heading = page.getByRole("heading", { level: 3 }); //без имени т.к. он там один такой, но добавми level (3 - ок, 4 -сломаем)
    const expectedText = "Dynamically Loaded Page Elements";
    await expect(heading).toHaveText(expectedText);

    const example1 = page.getByText(
      "Example 1: Element on page that is hidden"
    );
    // const example1 = page.getByText("Example 1", {exact: false}) // ищем по частичному вхождению

    await expect(example1).toBeVisible();
    await expect(example1).toBeInViewport(); //элемент виден в том кусе странице, который открыт счас (не где-то там внизу страницы)
  });

  test("Get by label", async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/login";
    await page.goto(url);
    await page.getByLabel("Username").fill("tomsmith");
    await page.getByLabel("Password").fill("SuperSecretPassword!");
    await page.getByRole("button", { name: "Login" }).click();
  });

  test("Get by testId", async ({ page }) => {
    //в верстке на тестах есть часто data-testId - очень редко
  });

  test("Get by placeholder", async ({ page }) => {
    // очень редко
  });

  test("Get by Title", async ({ page }) => {
    // по тултипу
  });

  test("Get by AltText", async ({ page }) => {
    // когда не прогрузилась картинка там есть еще текст
  });

  //Продвинутая работа с локаторами

  test("Advanced locator", async ({ page }) => {
    // ищем форму в которую вложен userName //form[.//input[@id="userName"]] - .// означает, что ищем на любом уровне вложенности
    const url = "anatoly-karpovich.github.io/demo-login-form/";
    await page.goto(url);

    const form = page.locator("form", {
      // hasText: "",
      // hasNotText: "",
      has: page.locator("input#userName"), //означает, что наша форма обладает еще каким-то элементом - добавляем локатор
    });

    const usernameInput = form.locator("input#userName"); //ищем уже в form, а не по всему дому (например нашли общий локатор модалки и потом по нему ищем)
  });

  test("Codegen", async ({ page }) => {
    //npx playwright codegen url - запись действий на сайте //могут возникнуть проблемы если элементы сделаны не логично, например кнопка как инпут
    //npx playwright codegen https://anatoly-karpovich.github.io/demo-registration-form/
    await page.goto(
      "https://anatoly-karpovich.github.io/demo-registration-form/"
    );
    await page.locator("#skills").selectOption("JavaScript");
    await page.locator("#skills").selectOption(["JavaScript", "Python"]); //попытка выбрать два скилла (проблема с ними была в дз)
  });

  //Awaits

  test("Waits", async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/dynamic_loading";
    await page.goto(url);
    await page.locator(`a[href="/dynamic_loading/2"]`).click();
    await page.getByRole("button", { name: "Start" }).click(); //после клика на сайте идет лоадинг, т.е текст ниже доступен не сразу, но PW ждет))
    // const text = await page
    //   .locator("#finish")
    //   .getByRole("heading", { level: 4 })
    //   .innerText();
    // console.log(text);
    //реализуем тоже самое
    // await expect(
    //   page.locator("#finish").getByRole("heading", { level: 4 })
    // ).toHaveText("Hello World!", { timeout: 20000 }); //toHaveText ждет 5 секунд, поэтому нужно явно добавииь тайм аут, иначе тест упадет

    //перепишем все что выше более читабельно
    const heading = page.locator("#finish").getByRole("heading", { level: 4 });
    //await expect(heading).toBeVisible({timeout: 20000}); //toBeVisible тоже ждет 5 сек - а ля селениум, сначала ждем визибилити
    await expect(heading).toHaveText("Hello World!", { timeout: 20000 });

    //хотим выловить селектор лоадинга= нужно как-то стопнуть верстку
    //в консоле пишем setTimeout(function() {debugger;}, 0) - и ловим лоадинг, и можем ждать потом пока он спрячется строка
    //но есть вариант, что мы его не дождемся, поэтому сначала ждем появления, потом пропадания - система орабатывает быстрее верстки
    // const loader = page.locator("#loading");
    // await expect(loader).toBeVisible(); //появился
    // await expect(loader).toBeVisible({visible: false, timeout: 20000}); //пропал, без таймаута упадем
    // await expect(heading).toHaveText("Hello World!") //проверили текст
  });

  //неявные ожидание (implicit wait) - прописаны на уровне конфига, и работает везде и всегда
  //явные ожидания (explicit wait) - прописываем мы для конкретного элемента
  //кастомные - для ожидания группировки условий, которые должны сойтись вместе

  test("Explicit wait", async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/dynamic_loading";
    await page.goto(url);
    await page.getByRole("link", { name: "Example 1" }).click();
    await page.getByRole("button", { name: "Start" }).click();
    const heading = page.locator("#finish h4");
    await heading.waitFor({ state: "visible", timeout: 20000 }); //хорошая практика через expect, т.тк. вторым элементом можно описание всунуть await expect(loader, "Waiting for load bar disappear").toBeVisible({visible: false, timeout: 20000})
    //attached - элемент появляется в верстке
    //detached - элемент пропадает из верстки
    //visible - элемент есть в верстке и видим
    //hidden - элемент есть в верстке, но не видим

    //const isDisplayed = await loader.isVisible(); //возвращает булеан, есть для разные
  });

  test("Custom wait", async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/dynamic_controls";
    await page.goto(url);
    const button = page.getByRole("button", { name: "Remove" }).click();
    //после клика
    //пропадает чекбокс input[label="blah"]
    //кнопка "#checkbox-example > button" меняется на add,
    //появляется сообщение it's gone p#message

    // await page.waitForFunction(
    //   () => {
    //     //внутри этой функции строго через !!!!!!!!!qwery селекторы
    //     const checkbox = document.querySelector('input[label="blah"]');
    //     const buttonText = document.querySelector(
    //       "#checkbox-example > button"
    //     )?.textContent;
    //     const message = document.querySelector(
    //       "#checkbox-example > #message"
    //     )?.textContent;

    //     return !checkbox && buttonText === "Add" && message === "It's gone!";
    //   },
    //   "", // место для передачи переменных (чтоб селекторы не писать в функции)
    //   { timeout: 10000 }
    // );

    //перепишем более правильно
    await page.waitForFunction(
      (selectors: { checbox: string; button: string; label: string }) => {
        const checkbox = document.querySelector(selectors.checbox);
        const buttonText = document.querySelector(
          selectors.button
        )?.textContent;
        const message = document.querySelector(selectors.label)?.textContent;

        return !checkbox && buttonText === "Add" && message === "It's gone!";
      },
      {
        checbox: 'input[label="blah"]',
        button: "#checkbox-example > button",
        label: "#checkbox-example > #message",
      }, // место для передачи переменных (чтоб селекторы не писать в функции)
      { timeout: 10000 }
    );
  });

  //валидируем текстовку на странице

  test("Soft", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/checkboxes");
    const title = page.locator("h3");
    // const checbox1 = page.locator("//input{@type='checkbox'][1]");
    // const checbox2 = page.locator("//input{@type='checkbox'][2]");
    // const checkbox = (index: number) =>
    //   page.locator(`//input{@type='checkbox'][${index}]`); //через функцию

    // await expect(checkbox(1)).toHaveValue("checkbox 1"); // для инпутов toHaveValue
    // await expect(checkbox(2)).toHaveValue("checkbox 2"); //текста сделаны криво, между формами так не срабатыывает
    //поэтому так смю лекция 20 2:13:20
    // await expect(title).toHaveText("Checkboxes");
    // const form = page.locator("form#checkboxes");
    // const formText = await form.innerText();
    // const checkboxesText = formText!.split("\n").map((el) => el.trim());
    // expect(checkboxesText[0], "Check text content for checkbox 1").toBe("checkbox 1");
    // expect(checkboxesText[1], "Check text content for checkbox 2").toBe("checkbox 2");

    //а вдруг упадет первый чекбокс и дальше не пойдет
    //если хотим чтобы все прошло, даже если упало - используем soft
    await expect
      .soft(title, 'Check "Checkboxes" title')
      .toHaveText("Checkboxes1"); //текст спецом неправильный
    const form = page.locator("form#checkboxes");
    const formText = await form.innerText();
    const checkboxesText = formText.split("\n").map((el) => el.trim());
    expect
      .soft(checkboxesText[0], "Check text content for checkbox 1")
      .toBe("Checkbox 1");
    expect
      .soft(checkboxesText[1], "Check text content for checkbox 2")
      .toBe("Checkbox 2");
  });
});
