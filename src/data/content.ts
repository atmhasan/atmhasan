import type {
  AboutData,
  CertificationsData,
  ContactData,
  EducationData,
  ExperienceData,
  NavigationData,
  PortfolioData,
  ProfileData,
  ProjectsData,
  PublicationsData,
  ReferencesData,
  ResearchData,
  SkillsData,
  SiteData,
  StatisticsData
} from "../types/portfolio";
import { withBase } from "../utils/paths";

declare const __CONTENT_VERSION__: string;

const contentVersion = typeof __CONTENT_VERSION__ === "string" ? __CONTENT_VERSION__ : "dev";

const withContentVersion = (path: string) => {
  const url = withBase(path);
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}v=${encodeURIComponent(contentVersion)}`;
};

const loadJson = async <T,>(path: string): Promise<T> => {
  const response = await fetch(withContentVersion(path), { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Unable to load ${path}`);
  }
  return response.json() as Promise<T>;
};

export const loadPortfolioData = async (): Promise<PortfolioData> => {
  const [site, profile, statistics, research, navigation, about, experience, projects, skills, education, publications, certifications, references, contact] = await Promise.all([
    loadJson<SiteData>("data/site.json"),
    loadJson<ProfileData>("data/profile.json"),
    loadJson<StatisticsData>("data/statistics.json"),
    loadJson<ResearchData>("data/research.json"),
    loadJson<NavigationData>("data/navigation.json"),
    loadJson<AboutData>("data/about.json"),
    loadJson<ExperienceData>("data/experience.json"),
    loadJson<ProjectsData>("data/projects.json"),
    loadJson<SkillsData>("data/skills.json"),
    loadJson<EducationData>("data/education.json"),
    loadJson<PublicationsData>("data/publications.json"),
    loadJson<CertificationsData>("data/certifications.json"),
    loadJson<ReferencesData>("data/references.json"),
    loadJson<ContactData>("data/contact.json")
  ]);

  return { site, profile, statistics, research, navigation, about, experience, projects, skills, education, publications, certifications, references, contact };
};
