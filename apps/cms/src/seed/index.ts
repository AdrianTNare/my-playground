/**
 * Loads the content in @playground/content into the CMS. Safe to rerun:
 * documents are matched by slug and updated in place.
 *
 *   pnpm --filter @playground/cms seed
 */
import {
  bliki,
  mediaReactions,
  nowPage,
  projects,
  reflections,
  refs,
  tils,
  tools,
  unofficeHours,
} from "@playground/content";
import type { Post } from "@playground/contracts";
import { convertMarkdownToLexical } from "@payloadcms/richtext-lexical";
import config from "@payload-config";
import { getPayload, type CollectionSlug } from "payload";
import { getEditorConfig } from "../fields/lexicalBody";

const payload = await getPayload({ config });
const editorConfig = await getEditorConfig(payload.config);

const lines = (items: string[]) => items.map((text) => ({ text }));

const upsert = async (
  collection: CollectionSlug,
  slug: string,
  data: Record<string, unknown>,
) => {
  const { docs } = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    draft: true,
    depth: 0,
  });
  // One helper serves every collection, so the per-collection data types
  // can't be named here; the content was already parsed by its zod schema.
  const published = { ...data, slug, _status: "published" } as never;

  if (docs[0]) {
    await payload.update({ collection, id: docs[0].id, data: published });
    return "updated";
  }
  await payload.create({ collection, data: published, draft: false });
  return "created";
};

const seed = async (
  collection: CollectionSlug,
  items: { slug: string }[],
  toData: (item: never) => Record<string, unknown>,
) => {
  for (const item of items) {
    const result = await upsert(collection, item.slug, toData(item as never));
    payload.logger.info(`${collection}/${item.slug}: ${result}`);
  }
};

const markdownPost = (post: Post) => ({
  title: post.title,
  summary: post.summary,
  body: post.body,
  date: post.date,
  tags: post.tags,
});

const lexicalPost = (post: Post) => ({
  title: post.title,
  summary: post.summary,
  content: convertMarkdownToLexical({ editorConfig, markdown: post.body }),
  date: post.date,
  updated: post.updated,
  tags: post.tags,
});

await seed("tils", tils, markdownPost);
await seed("reflections", reflections, lexicalPost);
await seed("bliki", bliki, lexicalPost);
await seed("refs", refs, (ref: (typeof refs)[number]) => ({ ...ref }));
await seed("tools", tools, (tool: (typeof tools)[number]) => ({ ...tool }));
await seed(
  "media-reactions",
  mediaReactions,
  (item: (typeof mediaReactions)[number]) => ({
    ...item,
    takeaways: lines(item.takeaways),
  }),
);
await seed("projects", projects, (project: (typeof projects)[number]) => ({
  ...project,
  order: projects.indexOf(project),
}));

await payload.updateGlobal({
  slug: "now",
  data: {
    updated: nowPage.updated,
    location: nowPage.location,
    sections: nowPage.sections.map((section) => ({
      heading: section.heading,
      paragraphs: lines(section.paragraphs),
    })),
  },
});
await payload.updateGlobal({
  slug: "unoffice-hours",
  data: {
    ...unofficeHours,
    bookingUrl: unofficeHours.bookingUrl ?? undefined,
    intro: lines(unofficeHours.intro),
    goodFor: lines(unofficeHours.goodFor),
    notFor: lines(unofficeHours.notFor),
  },
});
payload.logger.info("globals: now, unoffice-hours updated");

process.exit(0);
