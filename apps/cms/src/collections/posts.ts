import type { CollectionConfig, Field } from "payload";
import { publishedOrSignedIn } from "../access/published";
import {
  dateField,
  markdownField,
  slugField,
  summaryField,
  tagsField,
} from "../fields/common";
import { lexicalBodyFields } from "../fields/lexicalBody";
import {
  revalidateAfterChange,
  revalidateAfterDelete,
} from "../hooks/revalidate";

interface PostCollectionArgs {
  slug: string;
  singular: string;
  plural: string;
  /** Markdown for short posts, Lexical for long ones. */
  authoring: "markdown" | "lexical";
  extraFields?: Field[];
}

const postCollection = ({
  slug,
  singular,
  plural,
  authoring,
  extraFields = [],
}: PostCollectionArgs): CollectionConfig => ({
  slug,
  labels: { singular, plural },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "_status"],
    group: "Writing",
  },
  defaultSort: "-date",
  versions: { drafts: true },
  access: { read: publishedOrSignedIn },
  hooks: {
    afterChange: [revalidateAfterChange(slug)],
    afterDelete: [revalidateAfterDelete(slug)],
  },
  fields: [
    { name: "title", type: "text", required: true },
    summaryField,
    ...(authoring === "markdown" ? [markdownField("body")] : lexicalBodyFields),
    slugField,
    dateField,
    tagsField,
    ...extraFields,
  ],
});

export const Tils = postCollection({
  slug: "tils",
  singular: "TIL",
  plural: "TILs",
  authoring: "markdown",
});

export const Reflections = postCollection({
  slug: "reflections",
  singular: "Reflection",
  plural: "Reflections",
  authoring: "lexical",
});

export const Bliki = postCollection({
  slug: "bliki",
  singular: "Bliki entry",
  plural: "Bliki",
  authoring: "lexical",
  extraFields: [
    {
      name: "updated",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly" },
        description: "Last revision, if it's been revised.",
      },
    },
  ],
});
