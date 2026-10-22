import "server-only";
import rehypeShiki from "@shikijs/rehype";
import type { ThemeRegistration } from "shiki";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

// Code colours from the site palette, so snippets read like the terminal
// chrome around them rather than a pasted-in editor theme.
const playgroundTheme: ThemeRegistration = {
  name: "playground",
  type: "dark",
  colors: {
    "editor.background": "#1e1916",
    "editor.foreground": "#c8baa6",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#8a7c6e", fontStyle: "italic" },
    },
    {
      scope: ["keyword", "storage", "storage.type", "keyword.operator.new"],
      settings: { foreground: "#c0613f" },
    },
    {
      scope: ["string", "string.quoted", "markup.inline.raw"],
      settings: { foreground: "#8a9a6d" },
    },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call"],
      settings: { foreground: "#cf9b5c" },
    },
    {
      scope: ["constant", "constant.numeric", "constant.language"],
      settings: { foreground: "#d99a7a" },
    },
    {
      scope: [
        "entity.name.type",
        "support.type",
        "support.class",
        "entity.name.tag",
      ],
      settings: { foreground: "#e3c48f" },
    },
    {
      scope: ["variable", "variable.other", "meta.object-literal.key"],
      settings: { foreground: "#e6dacb" },
    },
    {
      scope: ["punctuation", "meta.brace", "keyword.operator"],
      settings: { foreground: "#a8998a" },
    },
  ],
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeShiki, {
    theme: playgroundTheme,
    // Unknown fence languages render as plain text instead of failing.
    fallbackLanguage: "text",
    defaultLanguage: "text",
  })
  .use(rehypeStringify);

/**
 * Markdown to HTML with highlighted code. Only for content we write (the CMS
 * and @playground/content), so the HTML isn't sanitised.
 */
export const renderMarkdown = async (markdown: string): Promise<string> =>
  String(await processor.process(markdown));
