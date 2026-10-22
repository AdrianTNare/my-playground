import { expect, test } from "@playwright/test";
import { leafBooths } from "../src/booths";

test.describe("booth routes", () => {
  for (const booth of leafBooths) {
    test(`${booth.href} renders its heading`, async ({ page }) => {
      const response = await page.goto(booth.href);
      expect(response?.status()).toBe(200);
      const heading = booth.href === "/" ? "Adrian Nare" : booth.title;
      await expect(
        page.getByRole("heading", { level: 1, name: heading }),
      ).toBeVisible();
    });
  }

  test("project detail pages render from the list", async ({ page }) => {
    await page.goto("/projects");
    await page.getByRole("link", { name: "forum-frontend/" }).click();
    await expect(page).toHaveURL("/projects/forum-frontend");
    await expect(
      page.getByRole("heading", { level: 1, name: "forum-frontend" }),
    ).toBeVisible();
  });

  for (const [group, target] of [
    ["/reads", "/reads/refs"],
    ["/writing", "/writing/til"],
    ["/tinkering", "/tinkering/terminal"],
  ]) {
    test(`${group} redirects to ${target}`, async ({ page }) => {
      await page.goto(group);
      await expect(page).toHaveURL(target);
    });
  }

  test("unknown paths show the no-such-booth page", async ({ page }) => {
    const response = await page.goto("/nope");
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "No such booth" }),
    ).toBeVisible();
  });
});
