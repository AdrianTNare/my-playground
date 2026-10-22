import type { CollectionConfig } from "payload";
import { publishedOrSignedIn } from "../access/published";
import {
  dateField,
  markdownField,
  slugField,
  tagsField,
} from "../fields/common";
import {
  revalidateAfterChange,
  revalidateAfterDelete,
} from "../hooks/revalidate";

export const Refs: CollectionConfig = {
  slug: "refs",
  labels: { singular: "Ref", plural: "Refs" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "url", "_status"],
    group: "Booths",
  },
  defaultSort: "-date",
  versions: { drafts: true },
  access: { read: publishedOrSignedIn },
  hooks: {
    afterChange: [revalidateAfterChange("refs")],
    afterDelete: [revalidateAfterDelete("refs")],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "url", type: "text", required: true },
    markdownField("note"),
    slugField,
    dateField,
    tagsField,
  ],
};
