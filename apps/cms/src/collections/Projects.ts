import type { CollectionConfig } from "payload";
import { publishedOrSignedIn } from "../access/published";
import { slugField, summaryField, tagsField } from "../fields/common";
import {
  revalidateAfterChange,
  revalidateAfterDelete,
} from "../hooks/revalidate";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order", "_status"],
    group: "Booths",
  },
  defaultSort: "order",
  versions: { drafts: true },
  access: { read: publishedOrSignedIn },
  hooks: {
    afterChange: [revalidateAfterChange("projects")],
    afterDelete: [revalidateAfterDelete("projects")],
  },
  fields: [
    { name: "name", type: "text", required: true },
    summaryField,
    { name: "description", type: "textarea", required: true },
    {
      name: "links",
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "kind",
              type: "select",
              required: true,
              options: ["source", "live", "api"],
            },
            { name: "href", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "preview",
      type: "text",
      admin: { description: "Screenshot URL" },
    },
    slugField,
    tagsField,
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower comes first" },
    },
  ],
};
