import { findProject, projects } from "@/content/projects";
import { ogImage } from "@/og/render";

export const alt = "A project by Adrian Nare";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const generateStaticParams = () =>
  projects.map((project) => ({ slug: project.slug }));

interface ImageProps {
  params: Promise<{ slug: string }>;
}

const Image = async ({ params }: ImageProps) => {
  const { slug } = await params;
  const project = findProject(slug);
  return ogImage({
    command: `cd ~/projects/${slug}`,
    title: project?.name ?? slug,
    description: project?.summary ?? "A project by Adrian Nare.",
  });
};

export default Image;
