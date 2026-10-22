import { ogImage } from "@/og/render";

export const alt = "Adrian Nare — full-stack engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const Image = () =>
  ogImage({
    command: "whoami",
    title: "Adrian Nare",
    description:
      "Full-stack engineer across TypeScript, Node and .NET. Come wander the booths.",
  });

export default Image;
