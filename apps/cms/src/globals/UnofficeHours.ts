import type { GlobalConfig } from "payload";
import { anyone } from "../access/published";
import { revalidateGlobal } from "../hooks/revalidate";

const lines = (name: string) => ({
  name,
  type: "array" as const,
  required: true,
  minRows: 1,
  fields: [{ name: "text", type: "text" as const, required: true }],
});

export const UnofficeHours: GlobalConfig = {
  slug: "unoffice-hours",
  label: "Unoffice hours",
  admin: { group: "Booths" },
  access: { read: anyone },
  hooks: { afterChange: [revalidateGlobal("unoffice-hours")] },
  fields: [
    {
      name: "bookingUrl",
      type: "text",
      admin: { description: "cal.com link, or a mailto: until one exists" },
    },
    {
      type: "row",
      fields: [
        {
          name: "durationMinutes",
          type: "number",
          required: true,
          defaultValue: 30,
        },
        {
          name: "timezone",
          type: "text",
          required: true,
          defaultValue: "SAST (UTC+2)",
        },
      ],
    },
    {
      ...lines("intro"),
      fields: [{ name: "text", type: "textarea", required: true }],
    },
    lines("goodFor"),
    lines("notFor"),
  ],
};
