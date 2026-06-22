import { BriefcaseBusiness } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import type { ExperienceData } from "../types/portfolio";

export const ExperienceSection = ({ experience }: { experience: ExperienceData }) => {
  const items = experience.items.filter((item) => item.visible).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="content-card section-block reveal reveal-left" id="experience">
      <SectionHeading title="Professional Experience" icon={BriefcaseBusiness} />
      <div className="timeline stagger-children">
        {items.map((item) => (
          <article className="timeline-item" key={item.id}>
            <span className="timeline-dot" aria-hidden="true" />
            <div className="timeline-card">
              <div className="timeline-title-row">
                <div><h3>{item.title}</h3><p>{item.organization}, {item.location}</p></div>
                <time>{item.startDate} - {item.endDate}</time>
              </div>
              <p className="timeline-summary">{item.summary}</p>
              <ul className="timeline-responsibilities">
                {item.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
