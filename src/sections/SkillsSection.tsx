import { BrainCircuit, Code2, Database, Globe2, Layers3, Wrench } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import type { SkillGroup, SkillsData } from "../types/portfolio";

const skillIcons = { globe: Globe2, layers: Layers3, database: Database, brain: BrainCircuit, wrench: Wrench };

const SkillCard = ({ group }: { group: SkillGroup }) => {
  const Icon = skillIcons[group.icon];
  return (
    <article className="skill-card">
      <div className="skill-heading"><Icon size={23} /><h3>{group.label}</h3></div>
      <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
    </article>
  );
};

export const SkillsSection = ({ skills }: { skills: SkillsData }) => {
  const groups = [...skills.groups].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="content-card skills-section section-block reveal reveal-up" id="skills">
      <SectionHeading title="Technical Skills" icon={Code2} />
      <div className="skills-grid stagger-children">
        {groups.map((group) => <SkillCard group={group} key={group.id} />)}
      </div>
    </section>
  );
};