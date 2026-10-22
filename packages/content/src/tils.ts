import { PostSchema, type Post } from "@playground/contracts";

/** TILs picked up while building this site. Markdown bodies. */
export const tils: Post[] = PostSchema.array().parse([
  {
    slug: "hashnode-rss-instead-of-graphql",
    title: "Hashnode's GraphQL API is paid now; the RSS feed isn't",
    summary:
      "The blog booth reads my Hashnode posts from RSS, because the GraphQL API moved behind the Pro plan.",
    date: "2026-10-22",
    tags: ["hashnode", "rss", "nextjs"],
    body: `I wanted the blog booth to list my Hashnode posts. The obvious route, \`gql.hashnode.com\`, now answers with a redirect to an announcement: the API is Pro-only.

The RSS feed at \`/rss.xml\` is still free and has everything a preview needs: title, brief, date, tags and the cover image.

Two parser settings mattered with \`fast-xml-parser\`:

\`\`\`ts
const parser = new XMLParser({
  // the cover lives in <enclosure url="…">, an attribute
  ignoreAttributes: false,
  attributeNamePrefix: "",
  // keep values as strings: a tag called "2024" must not become a number
  parseTagValue: false,
});
\`\`\`

The feed has no read time, so I estimate it from the post's word count at 200 words a minute.`,
  },
  {
    slug: "satori-cannot-read-woff2",
    title: "Satori can't read woff2",
    summary:
      "next/og renders with Satori, which only understands ttf, otf and woff. My self-hosted woff2 fonts didn't work there.",
    date: "2026-10-22",
    tags: ["nextjs", "fonts", "og-images"],
    body: `The site self-hosts its fonts as variable **woff2** files. When I added Open Graph images with \`next/og\`, those fonts wouldn't load: Satori, the renderer underneath, doesn't decompress woff2.

The fix was a second, small set of static **woff** files just for the images, read from disk at build time:

\`\`\`ts
const font = (file: string) =>
  readFile(join(process.cwd(), "src/og", file));
\`\`\`

Static weights are fine there: an OG image only needs regular and bold.`,
  },
  {
    slug: "next-font-google-flakes-ci",
    title: "next/font/google can fail your CI build",
    summary:
      "next/font/google downloads fonts at build time, so a network blip fails the build. Self-hosting fixed it.",
    date: "2026-10-22",
    tags: ["nextjs", "ci", "fonts"],
    body: `A CI build failed once with this, then passed on a rerun:

\`\`\`
Can't resolve '@vercel/turbopack-next/internal/font/google/font'
\`\`\`

\`next/font/google\` fetches the font files during \`next build\`. If that fetch fails, so does the build. I swapped to \`next/font/local\` with the files committed, kept the same CSS variables, and builds no longer need the network for fonts.`,
  },
  {
    slug: "tailwind-4-button-cursor",
    title: "Tailwind 4 dropped the pointer cursor on buttons",
    summary:
      "Tailwind 3's preflight gave buttons cursor: pointer. Tailwind 4 follows the browser default instead.",
    date: "2026-10-22",
    tags: ["tailwind", "css"],
    body: `After upgrading to Tailwind 4 every button showed the arrow cursor. The new preflight leaves buttons at the browser default, which is \`cursor: default\`.

One base rule brings the old behaviour back:

\`\`\`css
button:not(:disabled),
[role="button"]:not(:disabled) {
  cursor: pointer;
}
\`\`\`

The other upgrade gotcha: borders now default to \`currentColor\` instead of gray, so every border needs an explicit colour.`,
  },
  {
    slug: "zustand-persist-hydration",
    title: "Persisted zustand state and hydration mismatches",
    summary:
      "Reading localStorage during the first client render makes it differ from the server HTML. skipHydration fixes it.",
    date: "2026-10-22",
    tags: ["react", "zustand", "nextjs"],
    body: `The accent picker and the sound toggle live in a zustand store persisted to \`localStorage\`. The server can't read \`localStorage\`, so when the store rehydrated during the first render, the client HTML didn't match the server's.

The pattern that works:

1. \`skipHydration: true\` on the \`persist\` options, so the first render uses defaults like the server did.
2. Call \`useUiStore.persist.rehydrate()\` once after mount.
3. An inline script in \`<head>\` applies the saved accent before first paint, so there's no flash of the default colour.`,
  },
  {
    slug: "e2e-keys-race-hydration",
    title: "Keyboard e2e tests can race hydration",
    summary:
      "Pressing keys right after page.goto can beat the React effect that attaches the listener. Wait for a ready marker.",
    date: "2026-10-22",
    tags: ["playwright", "testing", "react"],
    body: `The vim-key tests passed locally and failed on CI. Playwright pressed \`j\` as soon as the page loaded, but on a slower runner the \`keydown\` listener, attached in an effect, wasn't there yet.

The fix: the component marks itself once it's listening, and the tests wait for that.

\`\`\`ts
nav.setAttribute("data-vim-keys", "on");
\`\`\`

\`\`\`ts
await page.goto(path);
await expect(page.locator('nav[data-vim-keys="on"]').first()).toBeAttached();
\`\`\``,
  },
]);
