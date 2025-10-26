/**Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

Сайт: https://the-internet.herokuapp.com/tables
 */
import { expect, Page, test } from "@playwright/test";

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

const emails = expectedTable.map(({ Email }) => Email);

async function getTableRowByEmail(page: Page, email: string) {
  const row = page.locator("#table2 tbody tr").filter({
    has: page.locator("td", { hasText: email }),
  });

  const cells = await row.locator("td").allTextContents();

  return {
    "Last Name": cells[0],
    "First Name": cells[1],
    Email: cells[2],
    Due: cells[3],
    "Web Site": cells[4],
  };
}

test.describe("[Heroku App] [Table2]", () => {
  const url = "https://the-internet.herokuapp.com/tables";

  test("get row data by email", async ({ page }) => {
    await page.goto(url);
    for (const email of emails) {
      const resultData = await getTableRowByEmail(page, email);
      const expectedData = expectedTable.find((user) => user.Email === email);
      expect(
        expectedData === resultData,
        "Expected table data should be equal to actual"
      );
    }
  });
});
