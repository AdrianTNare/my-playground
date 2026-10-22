import type { Metadata } from "next";
import { BoothHeader } from "@/components/booth/BoothHeader";
import { BoothPage } from "@/components/booth/BoothPage";
import { getUnofficeHours } from "@/lib/content";

export const metadata: Metadata = {
  title: "Unoffice hours",
  description:
    "Book a 30-minute call with Adrian Nare to talk shop, or nothing in particular.",
};

interface DiffListProps {
  heading: string;
  marker: "+" | "-";
  items: string[];
}

const DiffList = ({ heading, marker, items }: DiffListProps) => {
  const markerColor = marker === "+" ? "text-sage" : "text-muted";

  return (
    <section>
      <h2 className="font-mono text-[15px] font-semibold text-bright">
        {heading}
      </h2>
      <ul className="mt-4 flex flex-col gap-2.5 font-mono text-[14px] leading-[1.6] text-[#d6c8b3]">
        {items.map((item) => (
          <li key={item} className="grid grid-cols-[1.25em_1fr]">
            <span aria-hidden className={markerColor}>
              {marker}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const revalidate = 3600;

const UnofficeHoursPage = async () => {
  const { bookingUrl, durationMinutes, timezone, intro, goodFor, notFor } =
    await getUnofficeHours();
  // Until a booking page exists the link is an email; it opens in place.
  const byEmail = bookingUrl?.startsWith("mailto:") ?? false;

  return (
    <BoothPage>
      <BoothHeader command="cal --unoffice-hours" title="Unoffice hours">
        {intro.map((paragraph) => (
          <p key={paragraph} className="mt-3 first:mt-0">
            {paragraph}
          </p>
        ))}
      </BoothHeader>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
        {bookingUrl ? (
          <a
            href={bookingUrl}
            {...(byEmail ? {} : { target: "_blank", rel: "noopener" })}
            data-nav-sound
            className="inline-flex items-center gap-2 rounded-md bg-accent px-[18px] py-[11px] font-mono text-[13px] font-semibold text-ink"
          >
            {byEmail ? "./email-to-book.sh" : "./book-a-call.sh"}
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-md border border-dashed border-[#4a3f37] px-[18px] py-[11px] font-mono text-[13px] text-muted">
            booking opens soon
          </span>
        )}
        <span className="font-mono text-[12.5px] text-muted">
          {durationMinutes} min, times in {timezone}
          {byEmail && ", reply with a couple of slots that suit you"}
        </span>
      </div>

      <div className="mt-14 grid gap-10 sm:grid-cols-2">
        <DiffList heading="Good for" marker="+" items={goodFor} />
        <DiffList heading="Not for" marker="-" items={notFor} />
      </div>
    </BoothPage>
  );
};

export default UnofficeHoursPage;
