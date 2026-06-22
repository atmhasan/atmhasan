import { ExternalLink, GraduationCap } from "lucide-react";
import type { EducationData, PublicationsData } from "../types/portfolio";

interface AcademicSectionProps {
  education: EducationData;
  publications: PublicationsData;
}

export const AcademicSection = ({ education, publications }: AcademicSectionProps) => {
  const educationItems = education.items.filter((item) => item.visible).sort((a, b) => a.sortOrder - b.sortOrder);
  const publicationItems = publications.items.filter((item) => item.visible).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="content-card academic-section section-block reveal reveal-left" id="education">
      <div className="card-heading academic-heading"><GraduationCap size={25} /><h2>Education & Publications</h2></div>
      <div className="academic-grid">
        <div>
          <h3 className="subsection-title">Education</h3>
          <div className="education-list stagger-children">
            {educationItems.map((item) => (
              <article className="education-item" key={item.id}>
                <div className="item-title-row">
                  <h4>{item.degree}</h4>
                  <time>{item.startDate} - {item.endDate}</time>
                </div>
                <p className="institution">{item.institution}, {item.location}</p>
                <p>Focus: {item.focus}{item.grade ? ` | ${item.grade}` : ""}</p>
              </article>
            ))}
          </div>
        </div>
        <div id="publications" className="publications-anchor">
          <h3 className="subsection-title">Publications</h3>
          <div className="publication-list">
            {publicationItems.map((item, index) => (
              <article className="publication-card" key={item.id}>
                <span className="publication-number" aria-hidden="true">{index + 1}</span>
                <div>
                  <h4>{item.authors.join(", ")}, {item.title}</h4>
                  <p>{item.venue}. {item.status}</p>
                  {item.doi && <a href={item.doiUrl} target="_blank" rel="noreferrer">DOI: {item.doi}<ExternalLink size={12} /></a>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
