export interface SiteData {
  url: string;
  siteName: string;
  title: string;
  description: string;
  author: string;
  language: string;
  locale: string;
  image: string;
  imageAlt: string;
  dateModified: string;
  roles: string[];
  keywords: string[];
}
export interface SocialLink {
  label: string;
  url: string;
}

export interface ProfileData {
  name: string;
  headline: string;
  summary: string;
  location: string;
  shortLocation: string;
  email: string;
  phone: string;
  profileImage: string;
  cvUrl: string;
  socialLinks: SocialLink[];
}

export interface StatisticItem {
  id: string;
  value: string;
  label: string;
  icon: "calendar" | "box" | "users" | "book" | "badge";
  sortOrder: number;
}

export interface StatisticsData {
  items: StatisticItem[];
}

export interface ResearchData {
  eyebrow: string;
  title: string;
  subtitle: string;
  summary: string;
  keywords: string[];
}

export interface NavigationItem {
  label: string;
  sectionId: string;
  visible: boolean;
  sortOrder: number;
}

export interface NavigationData {
  items: NavigationItem[];
}

export interface AboutData {
  summary: string;
  strengths: string[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
  responsibilities: string[];
  visible: boolean;
  sortOrder: number;
}

export interface ExperienceData {
  items: ExperienceItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  icon: "globe" | "file" | "receipt" | "brain" | "scale";
  techStack: string[];
  description: string;
  visible: boolean;
  sortOrder: number;
}

export interface ProjectsData {
  items: ProjectItem[];
}

export interface SkillGroup {
  id: string;
  label: string;
  icon: "globe" | "layers" | "database" | "brain" | "wrench";
  items: string[];
  sortOrder: number;
}

export interface SkillsData {
  groups: SkillGroup[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  focus: string;
  grade?: string;
  visible: boolean;
  sortOrder: number;
}

export interface EducationData {
  items: EducationItem[];
}

export interface PublicationItem {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  status: string;
  doi?: string;
  doiUrl?: string;
  visible: boolean;
  sortOrder: number;
}

export interface PublicationsData {
  items: PublicationItem[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  image?: string;
  visible: boolean;
  sortOrder: number;
}

export interface CertificationsData {
  items: CertificationItem[];
}

export interface ReferenceItem {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  relationship: string;
  visible: boolean;
  sortOrder: number;
}

export interface ReferencesData {
  note: string;
  items: ReferenceItem[];
}

export interface ContactData {
  title: string;
  message: string;
  whatsappMessage: string;
  formTitle: string;
  formMessage: string;
  formRecipientEmail: string;
  formSubject: string;
}

export interface PortfolioData {
  site: SiteData;
  profile: ProfileData;
  statistics: StatisticsData;
  research: ResearchData;
  navigation: NavigationData;
  about: AboutData;
  experience: ExperienceData;
  projects: ProjectsData;
  skills: SkillsData;
  education: EducationData;
  publications: PublicationsData;
  certifications: CertificationsData;
  references: ReferencesData;
  contact: ContactData;
}
