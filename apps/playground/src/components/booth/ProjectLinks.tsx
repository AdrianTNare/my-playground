import type { ProjectLink } from "@playground/contracts";

interface ProjectLinksProps {
  links: ProjectLink[];
}

export const ProjectLinks = ({ links }: ProjectLinksProps) => {
  return (
    <div className="flex flex-wrap gap-3.5">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener"
          className={`relative z-10 font-mono text-[12px] font-medium transition-colors hover:text-bright ${
            link.kind === "source" ? "text-accent" : "text-amber"
          }`}
        >
          {link.kind} ↗
        </a>
      ))}
    </div>
  );
};
