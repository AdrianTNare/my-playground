import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BoothHeader } from "@/components/booth/BoothHeader";
import { BoothPage } from "@/components/booth/BoothPage";
import { ProjectLinks } from "@/components/booth/ProjectLinks";
import { getProject, getProjects } from "@/lib/content";
import { formatDay } from "@/lib/dates";
import { getRepoStats } from "@/lib/github";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export const generateStaticParams = async () =>
  (await getProjects()).map(({ slug }) => ({ slug }));

export const generateMetadata = async ({
  params,
}: ProjectPageProps): Promise<Metadata> => {
  const project = await getProject((await params).slug);
  return project ? { title: project.name, description: project.summary } : {};
};

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const project = await getProject((await params).slug);
  if (!project) notFound();
  const source = project.links.find((link) => link.kind === "source");
  const stats = source ? await getRepoStats(source.href) : null;

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

      {stats && (
        <p className="mt-5 font-mono text-[12px] text-muted">
          <span className="text-amber">$ stat</span>{" "}
          {[
            stats.language,
            `★ ${stats.stars}`,
            `last push ${formatDay(stats.pushed)}`,
          ]
            .filter(Boolean)
            .join("  ·  ")}
        </p>
      )}

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
