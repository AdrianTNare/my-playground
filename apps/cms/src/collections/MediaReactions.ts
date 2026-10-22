import type { CollectionConfig } from "payload";
import { publishedOrSignedIn } from "../access/published";
import {
  dateField,
  markdownField,
  slugField,
  summaryField,
} from "../fields/common";
import {
  revalidateAfterChange,
  revalidateAfterDelete,
} from "../hooks/revalidate";

export const MediaReactions: CollectionConfig = {
  slug: "media-reactions",
  labels: { singular: "Media reaction", plural: "Media reactions" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "source", "date", "_status"],
    group: "Booths",
  },
  defaultSort: "-date",
  versions: { drafts: true },
  access: { read: publishedOrSignedIn },
  hooks: {
    afterChange: [revalidateAfterChange("media-reactions")],
    afterDelete: [revalidateAfterDelete("media-reactions")],
  },
  fields: [
    { name: "title", type: "text", required: true },
    summaryField,
    {
      type: "row",
      fields: [
        {
          name: "source",
          type: "select",
          required: true,
          options: ["youtube", "podcast", "article", "tweet"],
        },
        { name: "sourceUrl", type: "text", required: true },
        {
          name: "by",
          type: "text",
          required: true,
          admin: { description: "Channel, show or author" },
        },
      ],
    },
    markdownField("body"),
    {
      name: "takeaways",
      type: "array",
      fields: [{ name: "text", type: "text", required: true }],
    },
    slugField,
    dateField,
  ],
};
