import { expect, test } from "@playwright/test";

test.describe("[Heroku App] [Table]", () => {
  const url = "https://the-internet.herokuapp.com/";

  test("Single locator with more tha 1 elements", async ({ page }) => {
    await page.goto(url);

    //получим все ссылки со страницы
    const allLinks = page.locator("ul li a"); //по этому локатору резолвнуты все элементы по селектору = 44

    //найдем все ссылки содержащие букву а (*в селекторе позволяет искать по сабстринге))
    const linksWithAInText = allLinks.filter({ hasText: "a" });

    //получип первый/последний элемент
    const firstElement = allLinks.first();
    console.log(await firstElement.innerText()); //проверим какой текст в превой линке
    const lastElement = allLinks.last();

    //получим второй элемент
    const secondElement = allLinks.nth(1); //передаем индекс

    //посчитаем количество элементов по селектору
    const numberOfLinks = await allLinks.count(); //коунт асинхронный метод, поэтому эвейт
    const numnerOfFilteredLinks = await linksWithAInText.count();

    console.log(numberOfLinks);
    console.log(numnerOfFilteredLinks);

    await expect(allLinks).toHaveCount(44); //проверим, что их таки 44
  });

  test("Array of elements", async ({ page }) => {
    await page.goto(url);

    const allLinks = page.locator("ul li a"); //по этому локатору резолвнуты все элементы по селектору = 44

    // а как перейти к массиву элементов из этого локатора
    const arrayOfLinks = await allLinks.all();

    //но методы массивов дефолтные (бmap, forEarh и т.д) не работают с асинхронностью, тогда как?
    //допустим надо вывести в консоль массив всех текстов из ссылок
    //const text = allLinks.map(async (linlk) => await linlk.innerText()); //это скорее всего не сработает (сработает весли тест мал и не перегрущен асинхронными функциями тогда map успеет)

    const text = await Promise.all(
      arrayOfLinks.map((link) => link.innerText())
    ); //вот тут мы дождемся резолва всех промисов. Правда если один упадет то все =>  Promise.allSettled
    console.log(text);

    //можно просто через цикл for но тогда каждая запись отдельно, а не массив
    for (const link of arrayOfLinks) {
      console.log(await link.innerText());
    }
  });

  /**решение задачи с таблицей
   * вытянуть все данные из таблицы
   * данные из таблицы лучше в виде массив объектов
   * нам не нужен будет последний столбец -там не данные
   */

  test("Parse table data", async ({ page }) => {
    const expectedTable = [
      {
        "Last Name": "Smith",
        "First Name": "John",
        Email: "jsmith@gmail.com",
        Due: "$50.00",
        "Web Site": "http://www.jsmith.com",
      },
      {
        "Last Name": "Bach",
        "First Name": "Frank",
        Email: "fbach@yahoo.com",
        Due: "$51.00",
        "Web Site": "http://www.frank.com",
      },
      {
        "Last Name": "Doe",
        "First Name": "Jason",
        Email: "jdoe@hotmail.com",
        Due: "$100.00",
        "Web Site": "http://www.jdoe.com",
      },
      {
        "Last Name": "Conway",
        "First Name": "Tim",
        Email: "tconway@earthlink.net",
        Due: "$50.00",
        "Web Site": "http://www.timconway.com",
      },
    ];
    await page.goto("https://the-internet.herokuapp.com/tables");
    const table = page.locator("#table");

    //сначала получим все локаторы для хедеров
    const headersLocators = await table.locator("th").all();

    //отбросим последний хедер методом массивов
    headersLocators.pop();

    //теперь все хедеры тут мы получили массив со всеми хедерами ['Last Name', First Name' 'Email', 'Due', 'Web Site'] - и это будут ключи наших объектов
    const headers = await Promise.all(
      headersLocators.map((el) => el.innerText())
    );

    //получим данные из строк
    const tableRows = await table.locator("tbody tr").all(); //локатор резолвает целую строку из таблицы

    //создадим заготовку для нашего массива объектов, и мы знаем типизацию ключей и значений
    const tableData: Record<string, string>[] = [];

    //тепреь нужно пробежаться по каждой строке и вытянуть данные
    for (const row of tableRows) {
      //вытянуть значение
      //создать объект
      //впушить объект в дату

      const cellsLocators = await row
        .locator("td")
        .filter({ hasNot: page.locator("a") }); //получаем значение ячеек и отбрасываем последние, там ссылки, через фильтр
      console.log(await cellsLocators.allInnerTexts()); //тут получили отдельнае массивы с данными ячеек ["Conway", "Tim", 'aa@test.com', "$50.00", 'https://www.google.com/']
      const cells = await cellsLocators.allInnerTexts(); //allInnerTexts дал все текстовки

      //теперь у нас два массива с ключами (headers) и значений (cell)

      //получаем данные для еденичного объекта

      const rowData = headers.reduce<Record<string, string>>(
        (result, header, i) => {
          result[header] = cells[i]!; //не уверен, что длины массивов cells = headers, поэтому !
          return result;
        },
        {}
      );
      //и тпереь добавляем все в массив
      tableData.push(rowData);
    }

    //осталось собрать данные для валидации
    //метод на фронте в консоли в лекции с 2:15:00 ну или руками вбить в expected table

    //осталось сравнить данные из экспектед таблицы и нашей data и !!!обязательно сранвить длины, вдруг мы больше получили
    expect(
      expectedTable.length,
      `Number of rows in table should be ${expectedTable.length}`
    ).toBe(tableData.length);
    expectedTable.forEach((el, i) => {
      expect(el, `Expected table row should be equal to actual`).toEqual(
        tableData[i]
      );
    });
  });
});
