import { UserRound, UsersRound } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import type { ReferencesData } from "../types/portfolio";

export const ReferencesSection = ({ references }: { references: ReferencesData }) => {
  const items = references.items.filter((item) => item.visible).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="content-card references-section section-block reveal reveal-up" id="references">
      <div className="references-header">
        <SectionHeading title="References" icon={UsersRound} />
        <span>{references.note}</span>
      </div>
      <div className="references-grid stagger-children">
        {items.map((item) => (
          <article className="reference-card" key={item.id}>
            <div className="reference-icon"><UserRound size={21} /></div>
            <div><h4>{item.name}</h4><p>{item.title}</p><p>{item.affiliation}</p><span>Relationship: {item.relationship}</span></div>
          </article>
        ))}
      </div>
    </section>
  );
};
