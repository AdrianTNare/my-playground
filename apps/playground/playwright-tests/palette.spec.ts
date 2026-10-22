import { expect, test, type Page } from "@playwright/test";

// Shortcuts pressed before hydration hit no listener; wait for the palette.
const gotoReady = async (page: Page, path: string) => {
  await page.goto(path);
  await expect(page.locator('html[data-palette="ready"]')).toBeAttached();
};

const palette = (page: Page) =>
  page.getByRole("dialog", { name: "Find a booth or run a command" });

test.describe("⌘K palette", () => {
  test.skip(({ isMobile }) => isMobile, "keyboard shortcuts are desktop");

  test("Ctrl/⌘+K opens it, typing filters, Enter goes there", async ({
    page,
  }) => {
    await gotoReady(page, "/");
    await page.keyboard.press("ControlOrMeta+k");
    await expect(palette(page)).toBeVisible();

    await page.keyboard.type("til");
    await expect(
      palette(page).getByRole("option", { selected: true }),
    ).toContainText("writing/til");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL("/writing/til");
    await expect(palette(page)).toBeHidden();
  });

  test("/ opens it; Esc drops to normal mode, j/k move, Esc closes", async ({
    page,
  }) => {
    await gotoReady(page, "/now");
    await page.keyboard.press("/");
    await expect(palette(page)).toBeVisible();
    await expect(palette(page)).toContainText("-- INSERT --");

    await page.keyboard.press("Escape");
    await expect(palette(page)).toBeVisible();
    await expect(palette(page)).toContainText("-- NORMAL --");

    const selected = palette(page).getByRole("option", { selected: true });
    await expect(selected).toContainText("~");
    await page.keyboard.press("j");
    await expect(selected).toContainText("now");
    // In normal mode keys are motions, not text.
    await expect(palette(page).getByRole("combobox")).toHaveValue("");

    await page.keyboard.press("Escape");
    await expect(palette(page)).toBeHidden();
  });

  test("commands run in place and report back", async ({ page }) => {
    await gotoReady(page, "/");
    await page.keyboard.press("ControlOrMeta+k");
    await page.keyboard.type("sound off");
    await page.keyboard.press("Enter");
    await expect(palette(page)).toContainText("sound: off");
    await expect(palette(page)).toBeVisible();
  });

  test("the vim tree ignores keys while the palette is open", async ({
    page,
  }) => {
    await gotoReady(page, "/");
    await page.keyboard.press("ControlOrMeta+k");
    await page.keyboard.press("Escape"); // normal mode
    await page.keyboard.press("j");
    const sidebar = page.getByRole("navigation", { name: "Booths" }).first();
    await expect(sidebar.getByRole("link", { name: "now" })).not.toBeFocused();
  });
});

test("the / button opens the palette on mobile", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await gotoReady(page, "/");
  await page.getByRole("button", { name: "Find a booth" }).click();
  await expect(palette(page)).toBeVisible();
  await page.getByRole("combobox").fill("projects");
  await page.getByRole("option", { selected: true }).click();
  await expect(page).toHaveURL("/projects");
});
