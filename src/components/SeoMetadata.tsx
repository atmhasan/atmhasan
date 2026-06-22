import { useEffect } from "react";
import type { PortfolioData } from "../types/portfolio";

const setNamedMeta = (name: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.append(element);
  }
  element.content = content;
};

const setPropertyMeta = (property: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.append(element);
  }
  element.content = content;
};

const setCanonicalUrl = (url: string) => {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.append(element);
  }
  element.href = url;
};

const normalizePersonName = (name: string) => name.replace(/[.\s]/g, "").toLowerCase();

const buildStructuredData = (data: PortfolioData) => {
  const { site, profile } = data;
  const websiteId = `${site.url}#website`;
  const pageId = `${site.url}#profile-page`;
  const personId = `${site.url}#person`;
  const imageId = `${site.url}#primaryimage`;
  const profileImageUrl = new URL(profile.profileImage, site.url).href;
  const currentOrganizations = data.experience.items
    .filter((item) => item.visible && item.endDate === "Present")
    .map((item) => ({ "@type": "Organization", name: item.organization }));
  const currentEducation = data.education.items
    .filter((item) => item.visible && item.endDate === "Present")
    .map((item) => ({ "@type": "EducationalOrganization", name: item.institution }));
  const completedEducation = data.education.items
    .filter((item) => item.visible && item.endDate !== "Present")
    .map((item) => ({ "@type": "EducationalOrganization", name: item.institution }));
  const publicationNodes = data.publications.items
    .filter((publication) => publication.visible && publication.doiUrl)
    .map((publication) => ({
      "@type": "ScholarlyArticle",
      "@id": publication.doiUrl,
      headline: publication.title,
      author: publication.authors.map((author) =>
        normalizePersonName(author) === "atmhasan"
          ? { "@id": personId }
          : { "@type": "Person", name: author }
      ),
      isPartOf: { "@type": "Periodical", name: publication.venue },
      identifier: publication.doi,
      url: publication.doiUrl
    }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.siteName,
        alternateName: "ATM Hasan Portfolio",
        inLanguage: site.language,
        publisher: { "@id": personId }
      },
      {
        "@type": "ProfilePage",
        "@id": pageId,
        url: site.url,
        name: site.title,
        description: site.description,
        inLanguage: site.language,
        dateModified: site.dateModified,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        primaryImageOfPage: { "@id": imageId }
      },
      {
        "@type": "ImageObject",
        "@id": imageId,
        contentUrl: profileImageUrl,
        width: 1122,
        height: 1402,
        caption: site.imageAlt
      },
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        alternateName: ["ATM Hasan", "A. T. M. Hasan"],
        url: site.url,
        image: { "@id": imageId },
        description: site.description,
        email: `mailto:${profile.email}`,
        telephone: profile.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kuala Lumpur",
          addressCountry: "MY"
        },
        jobTitle: site.roles,
        hasOccupation: site.roles.map((role) => ({ "@type": "Occupation", name: role })),
        worksFor: currentOrganizations,
        affiliation: currentEducation,
        alumniOf: completedEducation,
        identifier: {
          "@type": "PropertyValue",
          propertyID: "ORCID",
          value: "0009-0001-7171-2676",
          url: "https://orcid.org/0009-0001-7171-2676"
        },
        sameAs: profile.socialLinks.map((link) => link.url),
        knowsAbout: site.keywords
      },
      ...publicationNodes
    ]
  };
};

export const SeoMetadata = ({ data }: { data: PortfolioData }) => {
  useEffect(() => {
    const { site } = data;
    const imageUrl = new URL(site.image, site.url).href;
    const crawlDirective = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    document.title = site.title;
    document.documentElement.lang = site.language;
    setCanonicalUrl(site.url);
    setNamedMeta("description", site.description);
    setNamedMeta("author", site.author);
    setNamedMeta("keywords", site.keywords.join(", "));
    setNamedMeta("robots", crawlDirective);
    setNamedMeta("googlebot", crawlDirective);
    setPropertyMeta("og:title", site.title);
    setPropertyMeta("og:description", site.description);
    setPropertyMeta("og:url", site.url);
    setPropertyMeta("og:site_name", site.siteName);
    setPropertyMeta("og:locale", site.locale);
    setPropertyMeta("og:image", imageUrl);
    setPropertyMeta("og:image:alt", site.imageAlt);
    setNamedMeta("twitter:title", site.title);
    setNamedMeta("twitter:description", site.description);
    setNamedMeta("twitter:image", imageUrl);
    setNamedMeta("twitter:image:alt", site.imageAlt);

    const schema = document.getElementById("profile-structured-data");
    if (schema) schema.textContent = JSON.stringify(buildStructuredData(data));
  }, [data]);

  return null;
};