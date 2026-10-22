import { getProject, getProjects } from "@/lib/content";
import { ogImage } from "@/og/render";

export const alt = "A project by Adrian Nare";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const generateStaticParams = async () =>
  (await getProjects()).map((project) => ({ slug: project.slug }));

interface ImageProps {
  params: Promise<{ slug: string }>;
}

const Image = async ({ params }: ImageProps) => {
  const { slug } = await params;
  const project = await getProject(slug);
  return ogImage({
    command: `cd ~/projects/${slug}`,
    title: project?.name ?? slug,
    description: project?.summary ?? "A project by Adrian Nare.",
  });
};

export default Image;
