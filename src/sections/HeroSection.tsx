import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaOrcid, FaPhoneAlt, FaResearchgate, FaUserCircle } from "react-icons/fa";
import type { ProfileData } from "../types/portfolio";
import { withBase } from "../utils/paths";

const socialIcons = {
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
  ORCID: FaOrcid,
  ResearchGate: FaResearchgate,
};

export const HeroSection = ({ profile }: { profile: ProfileData }) => (
  <section className="hero reveal reveal-fade" id="home">
    <div className="shell hero-grid">
      <div className="hero-copy">
        <h1>{profile.name}</h1>
        <p className="hero-headline">{profile.headline}</p>
        <div className="contact-row" aria-label="Contact information">
          <span><FaMapMarkerAlt size={16} aria-hidden="true" />{profile.shortLocation}</span>
          <a href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}><FaPhoneAlt size={16} aria-hidden="true" />{profile.phone}</a>
          <a href={`mailto:${profile.email}`}><FaEnvelope size={16} aria-hidden="true" />{profile.email}</a>
        </div>
        <div className="social-row">
          {profile.socialLinks.map((link) => {
            const Icon = socialIcons[link.label as keyof typeof socialIcons] ?? FaUserCircle;
            return <a className={`social-link social-link-${link.label.toLowerCase()}`} key={link.label} href={link.url} target="_blank" rel="me noreferrer"><Icon size={17} />{link.label}</a>;
          })}
        </div>
        <p className="hero-summary">{profile.summary}</p>
      </div>
      <div className="portrait-wrap" aria-label={`Portrait of ${profile.name}`}>
        <div className="portrait-pattern" aria-hidden="true" />
        <img src={withBase(profile.profileImage)} alt={`${profile.name}, AI Researcher and Senior Software Engineer`} width={1122} height={1402} loading="eager" decoding="async" fetchPriority="high" />
      </div>
    </div>
  </section>
);
