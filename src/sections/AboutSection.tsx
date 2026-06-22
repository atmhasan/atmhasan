import { CircleCheck, CircleUserRound, Star } from "lucide-react";
import type { AboutData } from "../types/portfolio";

export const AboutSection = ({ about }: { about: AboutData }) => (
  <section className="about-grid section-block reveal reveal-up reveal-stagger" id="about">
    <article className="content-card about-card">
      <div className="card-heading"><CircleUserRound size={22} /><h2>About Me</h2></div>
      <p>{about.summary}</p>
    </article>
    <article className="content-card strengths-card">
      <div className="card-heading"><Star size={22} fill="currentColor" /><h2>Core Strengths</h2></div>
      <ul>
        {about.strengths.map((strength) => <li key={strength}><CircleCheck size={15} fill="currentColor" />{strength}</li>)}
      </ul>
    </article>
  </section>
);
