import { expect, test } from "@playwright/test";

// Counts oscillators started, i.e. ticks played.
const countTicks = () => {
  (window as unknown as { __ticks: number }).__ticks = 0;
  const original = AudioContext.prototype.createOscillator;
  AudioContext.prototype.createOscillator = function (this: AudioContext) {
    (window as unknown as { __ticks: number }).__ticks += 1;
    return original.call(this);
  };
};

const ticks = (page: import("@playwright/test").Page) =>
  page.evaluate(() => (window as unknown as { __ticks: number }).__ticks);

test.describe("desktop shell", () => {
  test.skip(({ isMobile }) => isMobile, "sidebar is desktop-only");

  test("sidebar marks the current booth and navigates", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Booths" }).first();
    await nav.getByRole("link", { name: "now" }).click();
    await expect(page).toHaveURL("/now");
    await expect(nav.getByRole("link", { name: "now" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("clicking a booth plays a tick, unless muted, and mute persists", async ({
    page,
  }) => {
    await page.addInitScript(countTicks);
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Booths" }).first();

    await nav.getByRole("link", { name: "media" }).click();
    await expect(page).toHaveURL("/media");
    expect(await ticks(page)).toBeGreaterThan(0);

    const toggle = page.getByRole("button", { name: /sound:/ }).first();
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-pressed", "false");

    await page.reload();
    await expect(
      page.getByRole("button", { name: /sound:/ }).first(),
    ).toHaveAttribute("aria-pressed", "false");
    const before = await ticks(page);
    await nav.getByRole("link", { name: "projects" }).click();
    await expect(page).toHaveURL("/projects");
    expect(await ticks(page)).toBe(before);
  });
});

test.describe("mobile shell", () => {
  test.skip(({ isMobile }) => !isMobile, "booths menu is mobile-only");

  test("booths menu opens, navigates and closes", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "booths" }).click();
    const dialog = page.getByRole("dialog", { name: "Booths" });
    await expect(dialog).toBeVisible();

    await dialog.getByRole("link", { name: "til" }).click();
    await expect(page).toHaveURL("/writing/til");
    await expect(dialog).toBeHidden();
    await expect(
      page.getByRole("heading", { level: 1, name: "TIL" }),
    ).toBeVisible();
  });

  test("Esc closes the booths menu", async ({ page }) => {
    await page.goto("/now");
    await page.getByRole("button", { name: "booths" }).click();
    const dialog = page.getByRole("dialog", { name: "Booths" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});

test("accent choice persists across reloads", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "sage" }).click();
  const accent = () =>
    page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim(),
    );
  expect(await accent()).toBe("#8a9a6d");
  await page.reload();
  expect(await accent()).toBe("#8a9a6d");
  await expect(page.getByRole("button", { name: "sage" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});
