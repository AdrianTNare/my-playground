import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BoothHeader } from "@/components/booth/BoothHeader";
import { BoothPage } from "@/components/booth/BoothPage";
import { ProjectLinks } from "@/components/booth/ProjectLinks";
import { findProject, projects } from "@playground/content";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export const generateStaticParams = () =>
  projects.map(({ slug }) => ({ slug }));

export const generateMetadata = async ({
  params,
}: ProjectPageProps): Promise<Metadata> => {
  const project = findProject((await params).slug);
  return project ? { title: project.name, description: project.summary } : {};
};

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const project = findProject((await params).slug);
  if (!project) notFound();

  return (
    <BoothPage>
      <Link
        href="/projects"
        data-nav-sound
        className="font-mono text-[13px] text-muted transition-colors hover:text-accent"
      >
        $ cd ..
      </Link>

      <div className="mt-6">
        <BoothHeader
          command={`cat ~/projects/${project.slug}/README.md`}
          title={project.name}
        >
          <p>{project.summary}</p>
        </BoothHeader>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <ProjectLinks links={project.links} />
        <div className="flex flex-wrap gap-[7px]">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[5px] border border-[#3a302a] px-[9px] py-1 font-mono text-[11px] text-clay"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {project.preview && (
        <figure className="mt-10 overflow-hidden rounded-xl border border-edge bg-panel">
          <figcaption className="border-b border-edge bg-panel2 px-[15px] py-[11px] font-mono text-[11px] text-muted">
            {project.name}: preview
          </figcaption>
          {/* eslint-disable-next-line @next/next/no-img-element -- preview may be a remote URL from the CMS */}
          <img
            src={project.preview}
            alt={`Screenshot of ${project.name}`}
            className="w-full"
          />
        </figure>
      )}

      <p className="mt-10 max-w-[68ch] font-mono text-[14.5px] leading-[1.8] text-[#d6c8b3]">
        {project.description}
      </p>
    </BoothPage>
  );
};

export default ProjectPage;
