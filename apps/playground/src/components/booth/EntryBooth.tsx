import type { Entry } from "@playground/contracts";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { findBooth } from "@/booths";
import { entriesFor } from "@/content/entries";
import { BoothHeader } from "./BoothHeader";
import { BoothPage } from "./BoothPage";
import { EntryList } from "./EntryList";

interface EntryBoothProps {
  href: string;
  /** The booth's real entries; empty shows the coming-soon placeholder. */
  entries?: Entry[];
  /** Replaces the default list when the booth has its own layout. */
  children?: ReactNode;
}

const boothFor = (href: string) => {
  const booth = findBooth(href);
  if (!booth) throw new Error(`No booth registered for ${href}`);
  return booth;
};

export const entryBoothMetadata = (href: string): Metadata => {
  const booth = boothFor(href);
  return { title: booth.title, description: booth.description };
};

/** A booth whose page is a listing of entries (TIL, refs, media…). */
export const EntryBooth = ({
  href,
  entries = [],
  children,
}: EntryBoothProps) => {
  const booth = boothFor(href);
  const empty = entries.length === 0 && !children;

  return (
    <BoothPage>
      <BoothHeader command={`ls ~${href}`} title={booth.title}>
        <p>{booth.description}</p>
      </BoothHeader>
      {empty ? (
        <EntryList entries={entriesFor(href)} />
      ) : (
        (children ?? <EntryList entries={entries} />)
      )}
    </BoothPage>
  );
};
