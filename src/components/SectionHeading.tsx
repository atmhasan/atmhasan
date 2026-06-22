import type { LucideIcon } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  icon: LucideIcon;
}

export const SectionHeading = ({ title, icon: Icon }: SectionHeadingProps) => (
  <div className="section-heading">
    <Icon size={21} strokeWidth={2.2} aria-hidden="true" />
    <h2>{title}</h2>
  </div>
);
