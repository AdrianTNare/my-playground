import { expect, test } from "@playwright/test";

// The page is built from the live Hashnode feed. If the feed was down at
// build time the booth shows its placeholder instead (unit-tested), so the
// post assertions only run when posts were loaded.
test("blog booth lists posts that link to Hashnode and filters by tag", async ({
  page,
}) => {
  await page.goto("/writing/blog");
  await expect(
    page.getByRole("heading", { level: 1, name: "Blog" }),
  ).toBeVisible();

  const filters = page.getByRole("group", { name: "Filter posts by tag" });
  test.skip(!(await filters.isVisible()), "feed was unavailable at build time");

  const posts = page
    .getByRole("listitem")
    .filter({ has: page.locator("time") });
  const total = await posts.count();
  expect(total).toBeGreaterThan(0);
  await expect(posts.first().getByRole("link").first()).toHaveAttribute(
    "href",
    /^https:\/\/terminal-knight\.hashnode\.dev\//,
  );

  // Pick the first post's first tag: only posts carrying it stay listed.
  const firstTag = posts.first().getByRole("button").first();
  const tag = (await firstTag.textContent())!.trim();
  await firstTag.click();
  await expect(
    filters.getByRole("button", { name: tag, exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  for (const post of await posts.all()) {
    await expect(
      post.getByRole("button", { name: tag, exact: true }),
    ).toBeVisible();
  }

  await filters.getByRole("button", { name: "all", exact: true }).click();
  await expect(posts).toHaveCount(total);
});
