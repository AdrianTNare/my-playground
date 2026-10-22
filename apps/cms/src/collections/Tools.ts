import type { CollectionConfig } from "payload";
import { publishedOrSignedIn } from "../access/published";
import { markdownField, slugField } from "../fields/common";
import {
  revalidateAfterChange,
  revalidateAfterDelete,
} from "../hooks/revalidate";

export const Tools: CollectionConfig = {
  slug: "tools",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "section", "category", "order"],
    group: "Booths",
  },
  defaultSort: "order",
  versions: { drafts: true },
  access: { read: publishedOrSignedIn },
  hooks: {
    afterChange: [revalidateAfterChange("tools")],
    afterDelete: [revalidateAfterDelete("tools")],
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      type: "row",
      fields: [
        {
          name: "section",
          type: "select",
          required: true,
          options: [
            { label: "Terminal", value: "terminal" },
            { label: "Toolset", value: "toolset" },
          ],
        },
        {
          name: "category",
          type: "text",
          required: true,
          admin: { description: "e.g. editor, shell" },
        },
      ],
    },
    { name: "url", type: "text" },
    {
      name: "why",
      type: "textarea",
      required: true,
      admin: { description: "One line on why it earned its place." },
    },
    markdownField("details", false),
    slugField,
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
  ],
};
