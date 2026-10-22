import { expect, test } from "@playwright/test";

const prompt = (page: import("@playwright/test").Page) =>
  page.getByRole("textbox", { name: "Type a command, or help" });

test("help lists commands and cd walks to a booth", async ({ page }) => {
  await page.goto("/");
  await prompt(page).fill("help");
  await prompt(page).press("Enter");
  await expect(page.getByText("cd <booth>")).toBeVisible();

  await prompt(page).fill("cd now");
  await prompt(page).press("Enter");
  await expect(page).toHaveURL("/now");
});

test("tab completes booth names and history recalls commands", async ({
  page,
}) => {
  await page.goto("/");
  await prompt(page).fill("whoami");
  await prompt(page).press("Enter");
  await expect(
    page.getByText(/full-stack engineer \(TypeScript/),
  ).toBeVisible();

  await prompt(page).press("ArrowUp");
  await expect(prompt(page)).toHaveValue("whoami");

  await prompt(page).fill("cd writing/t");
  await prompt(page).press("Tab");
  await expect(prompt(page)).toHaveValue("cd writing/til");
});

test("typing j and k in the prompt doesn't move the vim selection", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "the vim tree is the desktop sidebar");
  await page.goto("/");
  await expect(page.locator('nav[data-vim-keys="on"]').first()).toBeAttached();
  await prompt(page).click();
  await page.keyboard.type("jk");
  await expect(prompt(page)).toHaveValue("jk");
  await expect(prompt(page)).toBeFocused();
});

test("the guestbook can be signed and read from the shell", async ({
  page,
}) => {
  const entries = [
    {
      id: 1,
      name: "ada",
      message: "lovely booths",
      createdAt: "2026-10-22T10:00:00Z",
    },
  ];
  // Never touch the real API from tests.
  await page.route("**/guestbook", async (route) => {
    if (route.request().method() === "POST") {
      const { message } = route.request().postDataJSON();
      entries.unshift({
        id: 2,
        name: "a visitor",
        message,
        createdAt: "2026-10-22T11:00:00Z",
      });
      await route.fulfill({ status: 201, json: entries[0] });
    } else {
      await route.fulfill({ json: entries });
    }
  });

  await page.goto("/");
  await prompt(page).fill('echo "hello from the tests" >> guestbook');
  await prompt(page).press("Enter");
  await expect(page.getByText("signed. thanks for stopping by.")).toBeVisible();

  await prompt(page).fill("cat guestbook");
  await prompt(page).press("Enter");
  await expect(page.getByText("ada: lovely booths")).toBeVisible();
  await expect(page.getByText("a visitor: hello from the tests")).toBeVisible();
});

test("the shell shows the API's reason when it refuses an entry", async ({
  page,
}) => {
  await page.route("**/guestbook", (route) =>
    route.fulfill({
      status: 400,
      json: { message: "message: Links aren't allowed" },
    }),
  );
  await page.goto("/");
  await prompt(page).fill('echo "https://spam.example" >> guestbook');
  await prompt(page).press("Enter");
  await expect(
    page.getByText("guestbook: message: Links aren't allowed"),
  ).toBeVisible();
});
