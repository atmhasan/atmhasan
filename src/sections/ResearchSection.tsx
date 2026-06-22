import { BrainCircuit } from "lucide-react";
import type { ResearchData } from "../types/portfolio";

export const ResearchSection = ({ research }: { research: ResearchData }) => (
  <section className="research-panel" id="research">
    <div className="research-main">
      <span className="research-eyebrow">{research.eyebrow}</span>
      <div className="research-copy">
        <div className="research-icon"><BrainCircuit size={42} strokeWidth={1.5} /></div>
        <div>
          <h2>{research.title}</h2>
          <p className="research-subtitle">{research.subtitle}</p>
          <p className="research-summary">{research.summary}</p>
        </div>
      </div>
    </div>
    <div className="research-tags" aria-label="Research keywords">
      {research.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
    </div>
  </section>
);
