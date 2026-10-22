export interface FeedItem {
  title: string;
  /** Absolute URL of the entry's page. */
  url: string;
  date: string;
  summary: string;
  /** Rendered HTML of the full entry. */
  html: string;
  category: string;
}

interface FeedChannel {
  title: string;
  siteUrl: string;
  feedUrl: string;
  description: string;
  items: FeedItem[];
}

const escape = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

// "]]>" would end the CDATA section early; split it across two sections.
const cdata = (html: string) =>
  `<![CDATA[${html.replaceAll("]]>", "]]]]><![CDATA[>")}]]>`;

/** RSS 2.0 with full-content items, newest first. */
export const renderFeed = ({
  title,
  siteUrl,
  feedUrl,
  description,
  items,
}: FeedChannel): string => {
  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date));
  const rssDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
<title>${escape(title)}</title>
<link>${escape(siteUrl)}</link>
<description>${escape(description)}</description>
<language>en</language>
<atom:link href="${escape(feedUrl)}" rel="self" type="application/rss+xml"/>
${sorted[0] ? `<lastBuildDate>${rssDate(sorted[0].date)}</lastBuildDate>\n` : ""}${sorted
    .map(
      (item) => `<item>
<title>${escape(item.title)}</title>
<link>${escape(item.url)}</link>
<guid isPermaLink="true">${escape(item.url)}</guid>
<pubDate>${rssDate(item.date)}</pubDate>
<category>${escape(item.category)}</category>
<description>${escape(item.summary)}</description>
<content:encoded>${cdata(item.html)}</content:encoded>
</item>`,
    )
    .join("\n")}
</channel>
</rss>
`;
};
