"use client";

import type { BlogPost } from "@playground/contracts";
import { useState } from "react";

interface BlogListProps {
  posts: BlogPost[];
  tags: string[];
}

interface TagButtonProps {
  label: string;
  pressed: boolean;
  onSelect: () => void;
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const TagButton = ({ label, pressed, onSelect }: TagButtonProps) => (
  <button
    type="button"
    onClick={onSelect}
    aria-pressed={pressed}
    data-nav-sound
    className={`rounded-[5px] border px-[9px] py-1 font-mono text-[11px] transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
      pressed
        ? "border-accent text-accent"
        : "border-[#3a302a] text-clay hover:border-accent hover:text-accent"
    }`}
  >
    {label}
  </button>
);

/** Blog previews with a tag filter; filtering stays client-side so the page can be cached. */
export const BlogList = ({ posts, tags }: BlogListProps) => {
  const [tag, setTag] = useState<string | null>(null);
  const shown = tag ? posts.filter((post) => post.tags.includes(tag)) : posts;
  const toggle = (next: string) =>
    setTag((current) => (current === next ? null : next));

  return (
    <>
      <div className="mt-10" role="group" aria-label="Filter posts by tag">
        <div className="font-mono text-[13px] text-amber">
          $ ls --tag=<span className="text-bright">{tag ?? "*"}</span>
          <span className="ml-3 text-muted">
            {shown.length} {shown.length === 1 ? "post" : "posts"}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-[7px]">
          <TagButton
            label="all"
            pressed={tag === null}
            onSelect={() => setTag(null)}
          />
          {tags.map((t) => (
            <TagButton
              key={t}
              label={t}
              pressed={tag === t}
              onSelect={() => toggle(t)}
            />
          ))}
        </div>
      </div>

      <ul className="mt-6 divide-y divide-[#2f2722] overflow-hidden rounded-[10px] border border-edge bg-panel">
        {shown.map((post) => (
          <li
            key={post.slug}
            className="grid gap-x-6 gap-y-1.5 px-[clamp(18px,3vw,26px)] py-5 sm:grid-cols-[112px_1fr]"
          >
            <time
              dateTime={post.date}
              className="pt-[3px] font-mono text-[12px] text-muted"
            >
              {formatDate(post.date)}
            </time>
            <div className="min-w-0">
              <h2 className="font-mono text-[17px] font-semibold text-bright">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener"
                  data-nav-sound
                  className="rounded-sm transition-colors outline-offset-2 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {post.title} <span className="text-[13px] text-amber">↗</span>
                </a>
              </h2>
              <p className="mt-2 max-w-[68ch] font-mono text-[14px] leading-[1.65] text-clay">
                {post.brief}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-[7px]">
                <span className="mr-1 font-mono text-[12px] text-muted">
                  {post.readTimeMinutes} min read
                </span>
                {post.tags.map((t) => (
                  <TagButton
                    key={t}
                    label={t}
                    pressed={tag === t}
                    onSelect={() => toggle(t)}
                  />
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
