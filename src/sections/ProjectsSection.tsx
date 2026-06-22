import { BrainCircuit, FileText, Folder, Globe2, ReceiptText, Scale } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import type { ProjectItem, ProjectsData } from "../types/portfolio";

const projectIcons = { globe: Globe2, file: FileText, receipt: ReceiptText, brain: BrainCircuit, scale: Scale };

const ProjectCard = ({ project }: { project: ProjectItem }) => {
  const Icon = projectIcons[project.icon];
  return (
    <article className="project-card">
      <div className="project-title"><Icon size={22} /><h3>{project.title}</h3></div>
      <p className="project-stack">{project.techStack.join(" | ")}</p>
      <p>{project.description}</p>
    </article>
  );
};

export const ProjectsSection = ({ projects }: { projects: ProjectsData }) => {
  const items = projects.items.filter((item) => item.visible).sort((a, b) => a.sortOrder - b.sortOrder);
  return (
    <section className="content-card section-block reveal reveal-up" id="projects">
      <SectionHeading title="Featured Projects" icon={Folder} />
      <div className="projects-grid stagger-children">{items.map((project) => <ProjectCard project={project} key={project.id} />)}</div>
    </section>
  );
};
