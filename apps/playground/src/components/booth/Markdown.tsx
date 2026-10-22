import { renderMarkdown } from "@/lib/markdown";

interface MarkdownProps {
  source: string;
  className?: string;
}

/** Renders trusted markdown in the site's terminal prose style. */
export const Markdown = async ({ source, className = "" }: MarkdownProps) => {
  const html = await renderMarkdown(source);
  return (
    <div
      className={`prose-terminal ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
