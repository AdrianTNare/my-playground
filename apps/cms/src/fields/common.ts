import type { Field } from "payload";

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const slugField: Field = {
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  validate: (value: string | null | undefined) =>
    !value || SLUG.test(value) || "Lowercase words joined by dashes",
  admin: {
    position: "sidebar",
    description: "The URL segment, e.g. hashnode-rss-feed",
  },
};

export const dateField: Field = {
  name: "date",
  type: "date",
  required: true,
  defaultValue: () => new Date().toISOString(),
  admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } },
};

export const tagsField: Field = {
  name: "tags",
  type: "text",
  hasMany: true,
  admin: { position: "sidebar" },
};

export const summaryField: Field = {
  name: "summary",
  type: "textarea",
  required: true,
  admin: { description: "One or two sentences for the booth's list." },
};

/** Short-form body, written as raw markdown. */
export const markdownField = (name: string, required = true): Field => ({
  name,
  type: "code",
  required,
  admin: { language: "markdown", editorOptions: { wordWrap: "on" } },
});
