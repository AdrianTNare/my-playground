import type { Metadata } from "next";
import { findBooth } from "@/booths";
import { entriesFor } from "@/content/entries";
import { BoothHeader } from "./BoothHeader";
import { BoothPage } from "./BoothPage";
import { EntryList } from "./EntryList";

interface EntryBoothProps {
  href: string;
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
export const EntryBooth = ({ href }: EntryBoothProps) => {
  const booth = boothFor(href);

  return (
    <BoothPage>
      <BoothHeader command={`ls ~${href}`} title={booth.title}>
        <p>{booth.description}</p>
      </BoothHeader>
      <EntryList entries={entriesFor(href)} />
    </BoothPage>
  );
};
