import { expect, test, type Page } from "@playwright/test";

// Keys pressed before hydration hit no listener; wait for the tree to say
// it's listening.
const gotoReady = async (page: Page, path: string) => {
  await page.goto(path);
  await expect(page.locator('nav[data-vim-keys="on"]').first()).toBeAttached();
};

test.describe("vim keys on the booth tree", () => {
  test.skip(
    ({ isMobile }) => isMobile,
    "the vim-driven tree is the desktop sidebar",
  );

  test("j/k move the selection from the current booth, Enter opens it", async ({
    page,
  }) => {
    await gotoReady(page, "/");
    const tree = page.getByRole("navigation", { name: "Booths" }).first();

    await page.keyboard.press("j");
    await expect(tree.getByRole("link", { name: "now" })).toBeFocused();
    await page.keyboard.press("j");
    await expect(
      tree.getByRole("link", { name: "unoffice-hours" }),
    ).toBeFocused();
    await page.keyboard.press("k");
    await expect(tree.getByRole("link", { name: "now" })).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL("/now");
  });

  test("G and gg jump to the ends, l opens, h goes to the group's first booth", async ({
    page,
  }) => {
    await gotoReady(page, "/");
    const tree = page.getByRole("navigation", { name: "Booths" }).first();

    await page.keyboard.press("Shift+G");
    await expect(tree.getByRole("link", { name: "toolset" })).toBeFocused();
    await page.keyboard.press("h");
    await expect(tree.getByRole("link", { name: "terminal" })).toBeFocused();

    await page.keyboard.press("g");
    await page.keyboard.press("g");
    await expect(tree.getByRole("link", { name: "home" })).toBeFocused();

    await page.keyboard.press("j");
    await page.keyboard.press("l");
    await expect(page).toHaveURL("/now");
  });

  test("Escape releases the selection", async ({ page }) => {
    await gotoReady(page, "/now");
    const tree = page.getByRole("navigation", { name: "Booths" }).first();
    await page.keyboard.press("j");
    await expect(
      tree.getByRole("link", { name: "unoffice-hours" }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(
      tree.getByRole("link", { name: "unoffice-hours" }),
    ).not.toBeFocused();
  });
});

test("j does nothing while the sidebar is hidden on mobile", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  await page.keyboard.press("j");
  await expect(page).toHaveURL("/");
  expect(await page.evaluate(() => document.activeElement?.tagName)).toBe(
    "BODY",
  );
});

test("vim keys drive the booths menu on mobile", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await gotoReady(page, "/");
  await page.getByRole("button", { name: "booths" }).click();
  const menu = page.getByRole("dialog", { name: "Booths" });
  await expect(menu).toBeVisible();

  await page.keyboard.press("j");
  await expect(menu.getByRole("link", { name: "now" })).toBeFocused();
  await page.keyboard.press("l");
  await expect(page).toHaveURL("/now");
  await expect(menu).toBeHidden();
});
