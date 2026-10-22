import { boothOgImage } from "@/og/render";

export const alt = "Adrian Nare — /writing/blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const Image = () => boothOgImage("/writing/blog");

export default Image;
