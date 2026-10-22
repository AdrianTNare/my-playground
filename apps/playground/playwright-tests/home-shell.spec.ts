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
