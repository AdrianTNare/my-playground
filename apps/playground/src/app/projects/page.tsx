import type { Metadata } from "next";
import Link from "next/link";
import { BoothHeader } from "@/components/booth/BoothHeader";
import { BoothPage } from "@/components/booth/BoothPage";
import { ProjectLinks } from "@/components/booth/ProjectLinks";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things Adrian Nare has built, with source and live links.",
};

export const revalidate = 3600;

const ProjectsPage = async () => {
  const projects = await getProjects();
  return (
    <BoothPage>
      <BoothHeader command="ls ~/projects" title="Projects">
        <p>
          Things I&apos;ve built. Open one for the details, or jump straight to
          the source.
        </p>
      </BoothHeader>

      <ul className="mt-10 divide-y divide-[#2f2722] overflow-hidden rounded-[10px] border border-edge bg-panel">
        {projects.map((project) => (
          <li
            key={project.slug}
            className="relative flex flex-wrap items-start justify-between gap-5 px-[clamp(18px,3vw,26px)] py-[22px] transition-colors hover:bg-panel2"
          >
            <div className="min-w-[230px] flex-1">
              <h2 className="font-mono text-[18px] font-semibold text-bright">
                {/* Stretched link: the whole row opens the project. */}
                <Link
                  href={`/projects/${project.slug}`}
                  data-nav-sound
                  className="outline-offset-4 after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {project.name}/
                </Link>
              </h2>
              <p className="mt-2 max-w-[440px] font-mono text-[14px] leading-[1.6] text-clay">
                {project.summary}
              </p>
              <div className="mt-3.5">
                <ProjectLinks links={project.links} />
              </div>
            </div>
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
          </li>
        ))}
      </ul>
    </BoothPage>
  );
};

export default ProjectsPage;
