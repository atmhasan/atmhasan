import { Header } from "./components/Header";
import { MetricCard } from "./components/MetricCard";
import { usePortfolioData } from "./hooks/usePortfolioData";
import { HeroSection } from "./sections/HeroSection";
import { ResearchSection } from "./sections/ResearchSection";
import { AboutSection } from "./sections/AboutSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { AcademicSection } from "./sections/AcademicSection";
import { CredentialsSection } from "./sections/CredentialsSection";
import { ContactSection } from "./sections/ContactSection";
import { useSectionReveal } from "./hooks/useSectionReveal";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { ReferencesSection } from "./sections/ReferencesSection";
import { SeoMetadata } from "./components/SeoMetadata";

const App = () => {
  const { data, error } = usePortfolioData();
  useSectionReveal(Boolean(data));

  if (error) {
    return <main className="status-screen"><h1>Portfolio unavailable</h1><p>{error}</p></main>;
  }

  if (!data) {
    return <main className="status-screen"><div className="loader" aria-label="Loading portfolio" /></main>;
  }

  const metrics = [...data.statistics.items].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <SeoMetadata data={data} />
      <Header items={data.navigation.items} cvUrl={data.profile.cvUrl} />
      <main>
        <HeroSection profile={data.profile} />
        <div className="shell metrics-grid reveal reveal-up reveal-stagger">
          {metrics.map((item) => <MetricCard key={item.id} item={item} />)}
        </div>
        <div className="shell reveal reveal-scale">
          <ResearchSection research={data.research} />
        </div>
        <div className="shell portfolio-sections">
          <AboutSection about={data.about} />
          <ExperienceSection experience={data.experience} />
          <ProjectsSection projects={data.projects} />
          <SkillsSection skills={data.skills} />
          <AcademicSection education={data.education} publications={data.publications} />
          <CredentialsSection certifications={data.certifications} />
          <ReferencesSection references={data.references} />
          <ContactSection contact={data.contact} profile={data.profile} />
        </div>
      </main>
      <FloatingWhatsApp phone={data.profile.phone} message={data.contact.whatsappMessage} />
    </>
  );
};

export default App;
