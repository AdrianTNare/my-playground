import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { findBooth } from "@/booths";

export const OG_SIZE = { width: 1200, height: 630 };

// Satori reads woff/ttf, not woff2, so the OG fonts are separate files.
const font = (file: string) => readFile(join(process.cwd(), "src/og", file));

interface OgCardProps {
  /** The prompt line, e.g. `cd ~/now`. */
  command: string;
  title: string;
  description: string;
}

/** A terminal window in the site palette: prompt, title, one line of copy. */
export const ogImage = async ({ command, title, description }: OgCardProps) => {
  const [mono, monoBold, display] = await Promise.all([
    font("jetbrains-mono-400.woff"),
    font("jetbrains-mono-700.woff"),
    font("space-grotesk-700.woff"),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#1e1916",
        padding: 56,
        fontFamily: "JetBrains Mono",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          border: "1px solid #38302a",
          borderRadius: 18,
          background: "#251e1a",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "20px 28px",
            borderBottom: "1px solid #2f2722",
          }}
        >
          {["#c0613f", "#cf9b5c", "#8a9a6d"].map((color) => (
            <div
              key={color}
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                background: color,
              }}
            />
          ))}
          <div style={{ marginLeft: 18, fontSize: 22, color: "#8a7c6e" }}>
            adrian@nare: ~
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "44px 56px",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, color: "#cf9b5c" }}>
            $ {command}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginTop: 28,
              fontFamily: "Space Grotesk",
              fontSize: title.length > 26 ? 68 : 88,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#f3e9d8",
            }}
          >
            {title}
            <div
              style={{
                width: 34,
                height: 72,
                marginLeft: 14,
                marginBottom: 8,
                background: "#c0613f",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              maxWidth: 940,
              fontSize: 30,
              lineHeight: 1.5,
              color: "#b6a892",
            }}
          >
            {description}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "auto",
              fontSize: 24,
              color: "#8a7c6e",
            }}
          >
            <span style={{ color: "#f3e9d8", fontWeight: 700 }}>
              Adrian Nare
            </span>
            <span style={{ margin: "0 14px" }}>·</span>
            full-stack engineer
          </div>
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "JetBrains Mono", data: await mono, weight: 400 },
        { name: "JetBrains Mono", data: await monoBold, weight: 700 },
        { name: "Space Grotesk", data: await display, weight: 700 },
      ],
    },
  );
};

/** OG image for a booth, from its entry in the booth tree. */
export const boothOgImage = (href: string) => {
  const booth = findBooth(href);
  if (!booth) throw new Error(`No booth registered for ${href}`);
  return ogImage({
    command: href === "/" ? "whoami" : `cd ~${href}`,
    title: booth.title,
    description: booth.description,
  });
};
