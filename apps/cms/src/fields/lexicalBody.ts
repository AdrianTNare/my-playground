import {
  BlocksFeature,
  CodeBlock,
  convertLexicalToMarkdown,
  editorConfigFactory,
  type lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { Field, SanitizedConfig } from "payload";

type Features = NonNullable<
  NonNullable<Parameters<typeof lexicalEditor>[0]>["features"]
>;

/** The rich-text editor's features: Payload's defaults plus code blocks. */
export const editorFeatures: Features = ({ defaultFeatures }) => [
  ...defaultFeatures,
  BlocksFeature({ blocks: [CodeBlock()] }),
];

type EditorConfig = Awaited<
  ReturnType<typeof editorConfigFactory.fromFeatures>
>;
let editorConfig: Promise<EditorConfig> | undefined;

/**
 * The editor's config for markdown conversion, built once per process. It has
 * to come from the same features as the editor, or code blocks are lost.
 */
export const getEditorConfig = (config: SanitizedConfig) =>
  (editorConfig ??= editorConfigFactory.fromFeatures({
    config,
    features: editorFeatures,
  }));

/**
 * Long-form body: a Lexical `content` field for writing, plus a read-only
 * `body` that exposes it as markdown, so the playground renders every booth
 * through one markdown pipeline.
 */
export const lexicalBodyFields: Field[] = [
  { name: "content", type: "richText", required: true },
  {
    name: "body",
    type: "textarea",
    virtual: true,
    admin: { hidden: true },
    hooks: {
      afterRead: [
        async ({ siblingData, req }) => {
          if (!siblingData?.content) return undefined;
          return convertLexicalToMarkdown({
            data: siblingData.content,
            editorConfig: await getEditorConfig(req.payload.config),
          });
        },
      ],
    },
  },
];
