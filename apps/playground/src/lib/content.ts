import "server-only";
import * as bundled from "@playground/content";
import {
  MediaReactionSchema,
  NowPageSchema,
  PostSchema,
  ProjectSchema,
  RefSchema,
  ToolSchema,
  UnofficeHoursSchema,
  type MediaReaction,
  type NowPage,
  type Post,
  type PostKind,
  type Project,
  type Ref,
  type Tool,
  type ToolSection,
  type UnofficeHours,
} from "@playground/contracts";
import { cache } from "react";
import { z } from "zod";
import { getCollection, getGlobal } from "./cms";

// Payload shapes that differ from the contracts: dates are timestamps,
// optional fields come back null, and string lists are arrays of { text }.
const day = z.string().transform((value) => value.slice(0, 10));
const optional = <T extends z.ZodType>(schema: T) =>
  schema.nullish().transform((value) => value ?? undefined);
const textList = z
  .array(z.object({ text: z.string() }))
  .nullish()
  .transform((items) => (items ?? []).map((item) => item.text));
const tags = z
  .array(z.string())
  .nullish()
  .transform((value) => value ?? []);

const CmsPost = z
  .object({
    slug: z.string(),
    title: z.string(),
    summary: z.string(),
    date: day,
    updated: optional(day),
    tags,
    body: z.string(),
  })
  .transform((value) => PostSchema.parse(value));

const CmsMedia = z
  .object({
    slug: z.string(),
    title: z.string(),
    summary: z.string(),
    date: day,
    source: z.string(),
    sourceUrl: z.string(),
    by: z.string(),
    body: z.string(),
    takeaways: textList,
  })
  .transform((value) => MediaReactionSchema.parse(value));

const CmsRef = z
  .object({
    slug: z.string(),
    title: z.string(),
    url: z.string(),
    note: z.string(),
    date: day,
    tags,
  })
  .transform((value) => RefSchema.parse(value));

const CmsProject = z
  .object({
    slug: z.string(),
    name: z.string(),
    summary: z.string(),
    description: z.string(),
    tags,
    links: z
      .array(z.object({ kind: z.string(), href: z.string() }))
      .nullish()
      .transform((links) => links ?? []),
    preview: optional(z.string()),
    cast: optional(z.string()),
  })
  .transform((value) => ProjectSchema.parse(value));

const CmsTool = z
  .object({
    slug: z.string(),
    name: z.string(),
    section: z.string(),
    category: z.string(),
    url: optional(z.string()),
    why: z.string(),
    details: optional(z.string()),
    order: optional(z.number()),
  })
  .transform((value) => ToolSchema.parse(value));

const CmsNow = z
  .object({
    updated: day,
    location: z.string(),
    sections: z.array(z.object({ heading: z.string(), paragraphs: textList })),
  })
  .transform((value) => NowPageSchema.parse(value));

const CmsUnofficeHours = z
  .object({
    bookingUrl: z
      .string()
      .nullish()
      .transform((value) => value || null),
    durationMinutes: z.number(),
    timezone: z.string(),
    intro: textList,
    goodFor: textList,
    notFor: textList,
  })
  .transform((value) => UnofficeHoursSchema.parse(value));

const POST_COLLECTIONS: Record<PostKind, string> = {
  til: "tils",
  reflection: "reflections",
  bliki: "bliki",
};

const BUNDLED_POSTS: Record<PostKind, Post[]> = {
  til: bundled.tils,
  reflection: bundled.reflections,
  bliki: bundled.bliki,
};

const newestFirst = <T extends { date: string }>(items: T[]) =>
  [...items].sort((a, b) => b.date.localeCompare(a.date));

// cache() dedupes calls within one render (e.g. a page and its metadata).

export const getPosts = cache(async (kind: PostKind): Promise<Post[]> => {
  const docs = await getCollection(POST_COLLECTIONS[kind], "-date");
  return docs
    ? docs.map((doc) => CmsPost.parse(doc))
    : newestFirst(BUNDLED_POSTS[kind]);
});

export const getPost = async (
  kind: PostKind,
  slug: string,
): Promise<Post | undefined> =>
  (await getPosts(kind)).find((post) => post.slug === slug);

export const getMediaReactions = cache(async (): Promise<MediaReaction[]> => {
  const docs = await getCollection("media-reactions", "-date");
  return docs
    ? docs.map((doc) => CmsMedia.parse(doc))
    : newestFirst(bundled.mediaReactions);
});

export const getMediaReaction = async (
  slug: string,
): Promise<MediaReaction | undefined> =>
  (await getMediaReactions()).find((item) => item.slug === slug);

export const getRefs = cache(async (): Promise<Ref[]> => {
  const docs = await getCollection("refs", "-date");
  return docs ? docs.map((doc) => CmsRef.parse(doc)) : bundled.refs;
});

export const getProjects = cache(async (): Promise<Project[]> => {
  const docs = await getCollection("projects", "order");
  return docs ? docs.map((doc) => CmsProject.parse(doc)) : bundled.projects;
});

export const getProject = async (slug: string): Promise<Project | undefined> =>
  (await getProjects()).find((project) => project.slug === slug);

export const getTools = cache(async (section: ToolSection): Promise<Tool[]> => {
  const docs = await getCollection("tools", "order");
  const all = docs ? docs.map((doc) => CmsTool.parse(doc)) : bundled.tools;
  return all
    .filter((tool) => tool.section === section)
    .sort((a, b) => a.order - b.order);
});

export const getNow = cache(async (): Promise<NowPage> => {
  const doc = await getGlobal("now");
  return doc ? CmsNow.parse(doc) : bundled.nowPage;
});

export const getUnofficeHours = cache(async (): Promise<UnofficeHours> => {
  const doc = await getGlobal("unoffice-hours");
  return doc ? CmsUnofficeHours.parse(doc) : bundled.unofficeHours;
});
