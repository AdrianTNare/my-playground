import type { GlobalConfig } from "payload";
import { anyone } from "../access/published";
import { revalidateGlobal } from "../hooks/revalidate";

export const Now: GlobalConfig = {
  slug: "now",
  label: "Now page",
  admin: { group: "Booths" },
  access: { read: anyone },
  hooks: { afterChange: [revalidateGlobal("now")] },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "updated",
          type: "date",
          required: true,
          admin: { date: { pickerAppearance: "dayOnly" } },
        },
        { name: "location", type: "text", required: true },
      ],
    },
    {
      name: "sections",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        { name: "heading", type: "text", required: true },
        {
          name: "paragraphs",
          type: "array",
          required: true,
          minRows: 1,
          fields: [{ name: "text", type: "textarea", required: true }],
        },
      ],
    },
  ],
};
