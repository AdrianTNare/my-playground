import { expect, test } from "@playwright/test";

// Runs against the bundled @playground/content (CI has no CMS).

test("a TIL opens from the list and renders highlighted code", async ({
  page,
}) => {
  await page.goto("/writing/til");
  await page
    .getByRole("link", {
      name: "Tailwind 4 dropped the pointer cursor on buttons",
    })
    .click();
  await expect(page).toHaveURL("/writing/til/tailwind-4-button-cursor");
  await expect(
    page.getByRole("heading", { level: 1, name: /pointer cursor/ }),
  ).toBeVisible();
  // Shiki wraps highlighted tokens in spans inside <pre>.
  await expect(page.locator(".prose-terminal pre span").first()).toBeVisible();

  await page.getByRole("link", { name: "$ cd .." }).click();
  await expect(page).toHaveURL("/writing/til");
});

test("terminal booth expands a tool's config", async ({ page }) => {
  await page.goto("/tinkering/terminal");
  await expect(page.getByRole("heading", { name: "## editor" })).toBeVisible();
  const details = page.locator("details", { hasText: "cat tmux.md" });
  await expect(details.locator("pre")).toBeHidden();
  await details.getByText("cat tmux.md").click();
  await expect(details.locator("pre")).toContainText("set -g prefix C-a");
});

test("refs link out to their sources", async ({ page }) => {
  await page.goto("/reads/refs");
  const ref = page.getByRole("link", { name: /Payload CMS docs/ });
  await expect(ref).toHaveAttribute("href", "https://payloadcms.com/docs");
  await expect(ref).toHaveAttribute("target", "_blank");
});

test("booths without content still show their coming-soon entry", async ({
  page,
}) => {
  for (const path of ["/media", "/writing/reflections", "/reads/bliki"]) {
    await page.goto(path);
    await expect(page.getByText("coming soon")).toBeVisible();
  }
});

test("unoffice hours books by email until a booking page exists", async ({
  page,
}) => {
  await page.goto("/unoffice-hours");
  await expect(
    page.getByRole("link", { name: "./email-to-book.sh" }),
  ).toHaveAttribute("href", /^mailto:/);
});

test("the CMS refresh hook refuses requests without the secret", async ({
  request,
}) => {
  const res = await request.post("/api/revalidate", {
    data: { tag: "cms:tils" },
  });
  expect(res.status()).toBe(401);
});
