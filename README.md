# A T M Hasan Portfolio

## Project Goal

Rebuild the portfolio shown in the supplied design as a responsive, accessible,
JSON-driven website that can be hosted on GitHub Pages.

The website will present A T M Hasan as an AI Engineer, AI Researcher, Senior
Software Engineer, and Java Software Engineer while keeping portfolio content
editable through JSON files.

## Recommended Stack

- React
- TypeScript
- Vite
- CSS with reusable design tokens
- Lucide icons
- JSON files as the content database
- GitHub Actions and GitHub Pages for deployment

## Project Structure

```text
atmhasan/
|-- public/
|   |-- data/
|   |   |-- profile.json
|   |   |-- statistics.json
|   |   |-- research.json
|   |   |-- experience.json
|   |   |-- projects.json
|   |   |-- skills.json
|   |   |-- education.json
|   |   |-- publications.json
|   |   |-- certifications.json
|   |   |-- references.json
|   |   |-- navigation.json
|   |   `-- site.json
|   |-- images/
|   |   |-- profile.webp
|   |   `-- og-image.jpg
|   |-- documents/
|   |   `-- A-T-M-Hasan-CV.pdf
|   |-- images/logo-light.png (favicon)
|   |-- robots.txt
|   `-- sitemap.xml
|-- src/
|   |-- components/
|   |   |-- Header.tsx
|   |   |-- MobileMenu.tsx
|   |   |-- SectionHeader.tsx
|   |   |-- MetricCard.tsx
|   |   |-- Tag.tsx
|   |   `-- Icon.tsx
|   |-- sections/
|   |   |-- HeroSection.tsx
|   |   |-- ResearchSection.tsx
|   |   |-- AboutSection.tsx
|   |   |-- ExperienceSection.tsx
|   |   |-- ProjectsSection.tsx
|   |   |-- SkillsSection.tsx
|   |   |-- EducationSection.tsx
|   |   |-- PublicationsSection.tsx
|   |   |-- CertificationsSection.tsx
|   |   |-- ReferencesSection.tsx
|   |   `-- ContactSection.tsx
|   |-- data/
|   |   `-- content.ts
|   |-- hooks/
|   |   `-- usePortfolioData.ts
|   |-- types/
|   |   `-- portfolio.ts
|   |-- utils/
|   |   |-- formatters.ts
|   |   `-- paths.ts
|   |-- styles/
|   |   |-- tokens.css
|   |   |-- global.css
|   |   `-- responsive.css
|   |-- App.tsx
|   `-- main.tsx
|-- .github/
|   `-- workflows/
|       `-- deploy.yml
|-- index.html
|-- package.json
|-- tsconfig.json
|-- vite.config.ts
`-- README.md
```

## Page Structure

### 1. Header and Navigation

- Sticky desktop navigation
- Active-section indicator
- Compact mobile menu
- Download CV button
- Keyboard-accessible navigation controls

### 2. Hero Section

- Name and professional positioning
- Senior software engineering and AI specializations
- Location, phone, email, LinkedIn, and GitHub links
- Professional portrait
- Introductory summary
- Downloadable CV

### 3. Career Statistics

- Years of experience
- Key projects
- Team leadership
- Publications
- Certifications

Statistics will be loaded from `statistics.json` instead of being hardcoded.

### 4. Research Focus

- Privacy-preserving RAG heading
- Current PhD research summary
- Research methods and keyword tags
- Dark-blue visual treatment matching the design

### 5. About and Core Strengths

- Concise professional biography
- Backend engineering strengths
- AI, RAG, and document-intelligence expertise
- Team leadership and production support experience

### 6. Professional Experience

- Vertical timeline
- Role, organization, location, and date range
- Short impact-oriented highlights
- Current-role indication
- JSON-driven ordering and visibility

### 7. Featured Projects

- Responsive project-card grid
- Project category and technology stack
- Short project summary
- Optional repository, demo, and paper links
- Featured and visible controls in JSON

### 8. Technical Skills

- Languages
- Frameworks
- Databases
- AI and data
- Tools and engineering practices

### 9. Education and Publications

- Current PhD research
- Previous degrees
- Published and under-review research
- DOI and publication links where available

### 10. Certifications and References

- Certification name, issuer, and issue date
- Selected academic and professional references
- Optional contact-details-on-request policy

### 11. Contact Banner

- Collaboration message
- Email, phone, and location
- Dark-blue footer treatment based on the supplied design

## JSON Content Model

Each content item should support the relevant fields plus common display fields:

```json
{
  "id": "unique-id",
  "visible": true,
  "featured": false,
  "sortOrder": 1
}
```

The application will:

- Load JSON through one central content service.
- Define TypeScript interfaces for every JSON document.
- Handle missing optional fields safely.
- Filter hidden records.
- Sort records using `sortOrder`.
- Show a loading state while content is being fetched.
- Show a useful error state when required data cannot be loaded.

## Visual System

- White and very light gray page background
- Deep navy text and section backgrounds
- Bright blue accents
- Restrained borders and shadows
- Compact cards with consistent spacing
- Clear typographic hierarchy
- Lucide icons for navigation, metrics, contact details, and section labels

The supplied image is a visual reference, not a page background. The layout will
be recreated with semantic HTML and responsive CSS.

## Responsive Requirements

- Desktop should closely follow the supplied layout.
- Tablet should use two-column grids where appropriate.
- Mobile should use a single-column reading flow.
- Navigation should collapse into a mobile menu.
- Project, metric, and skills grids must not overflow.
- Timeline content must remain readable on narrow screens.
- Contact links and buttons must have comfortable tap targets.

## Accessibility Requirements

- Semantic headings and landmark elements
- One descriptive `h1`
- Keyboard-accessible navigation and mobile menu
- Visible focus states
- Descriptive image alternative text
- Sufficient color contrast
- Reduced-motion support
- Accessible labels for icon-only controls

## SEO and Metadata

Static metadata is included in `index.html` so Google, OpenAI, social crawlers,
and non-JavaScript clients do not depend on the React application or JSON fetches.
Runtime metadata is synchronized from `public/data/site.json`.

Target terms include:

- AI Engineer
- AI Researcher
- Senior Software Engineer
- Java Software Engineer
- Java Backend Developer
- Backend Engineer
- RAG Engineer
- LLM Engineer
- Machine Learning Engineer
- Spring Boot Developer
- Microservices Engineer
- Document AI Engineer
- Multimodal Document Intelligence
- Privacy-Preserving AI

SEO deliverables:

- Descriptive page title
- Meta description
- Canonical URL
- Open Graph metadata
- Twitter card metadata
- Absolute social-preview image URL
- `ProfilePage`, `Person`, `WebSite`, `ImageObject`, and publication JSON-LD
- Explicit Googlebot, OAI-SearchBot, GPTBot, and ChatGPT-User access in `robots.txt`
- Canonical `sitemap.xml` with an accurate `lastmod` date
- `llms.txt` and `llms-full.txt` as supplemental AI-readable profile summaries
- A branded 1200 x 630 Open Graph and Twitter preview image
- Semantic visible content supporting the target search terms

## GitHub Pages Deployment

1. Configure the Vite base path for the selected repository/domain setup.
2. Add a GitHub Actions workflow that installs dependencies and runs the build.
3. Publish the generated `dist` directory to GitHub Pages.
4. Configure the repository and DNS for the included `public/CNAME` custom domain.
5. Verify asset paths, canonical URLs, robots, sitemap, and direct page loading after deployment.

## Implementation Phases

## Current Implementation Status

Completed:

- Project foundation, dependency setup, and production build configuration
- Typed JSON content loader
- Responsive header and mobile navigation
- Hero, career statistics, and research-focus sections
- About Me and Core Strengths sections
- Professional Experience timeline
- Featured Projects grid
- Technical Skills grid
- Education and Publications panel
- Certifications and References panel
- Contact banner and copyright footer
- Viewport-triggered section reveals with staggered card animations
- Reduced-motion accessibility support
- Persistent light and dark themes with a header toggle
- Static SEO metadata, JSON-LD, robots, and sitemap files
- New high-resolution portrait integration from `public/images/atm_hasan.png`

In progress / next:

- Final responsive review and production-domain verification

### Phase 1: Project Foundation

Status: Complete

- Scaffold React, TypeScript, and Vite.
- Add linting and basic build scripts.
- Create the proposed folder structure.
- Establish design tokens and global styles.

### Phase 2: Content System

Status: Complete - all planned portfolio datasets are implemented.

- Create TypeScript content interfaces.
- Create the JSON files.
- Migrate verified content from the existing portfolio.
- Add centralized loading, filtering, and sorting utilities.

### Phase 3: Core Layout

Status: Complete

- Implement header and responsive navigation.
- Implement hero, metrics, research, and about sections.
- Add the supplied visual styling and responsive foundations.

### Phase 4: Portfolio Sections

Status: Complete

- Implement experience timeline.
- Implement project and skill grids.
- Implement education, publications, certifications, and references.
- Implement the contact banner and footer.

### Phase 5: SEO and Accessibility

Status: Complete

- Added static and JSON-driven runtime metadata.
- Added ProfilePage/Person structured data, sitemap, crawler rules, AI-readable files, and social previews.
- Completed keyboard, focus, contrast, semantic-image, and reduced-motion foundations.

### Phase 6: Verification and Deployment

- Validate every JSON file. (Complete)
- Run TypeScript, lint, and production builds. (Complete locally; rerun before release)
- Test desktop, tablet, and mobile layouts.
- Check all links and downloadable assets.
- Add the GitHub Pages workflow. (Complete)
- Confirm the production deployment and custom-domain DNS.

## Required Assets

- A clean, high-resolution professional portrait
- Final CV PDF
- Favicon: `public/images/logo-light.png`
- Social-preview image: `public/images/og-image.png` (1200 x 630)
- Confirmed email, phone, LinkedIn, and GitHub URLs

The portrait should be supplied as a separate image rather than extracted from
the design screenshot.

## Contact Form Delivery

The contact modal submits through FormSubmit's AJAX endpoint and forwards messages
to atmhasan.oop@gmail.com without leaving the portfolio. No private API key is
stored in GitHub.

After deploying the site, submit the form once and approve the one-time activation
email sent by FormSubmit to atmhasan.oop@gmail.com. Email delivery will begin after
that confirmation. The modal also provides direct email and WhatsApp fallbacks.
Local development environments or restrictive browser networks may block the
cross-origin request even when the deployed GitHub Pages form works normally.

## Certificate Gallery

Certificate assets live in public/images/cert/gallery with URL-safe JPG filenames.
The Certifications section shows eight preview cards, expands through View All, and
opens available certificate images in an accessible modal viewer. Source PDFs remain
in public/images/cert for archival purposes.

## Definition of Done

- The page visually follows the supplied design.
- All portfolio content is loaded from JSON.
- The layout works on mobile, tablet, and desktop.
- Metadata and structured data are valid.
- All local and external links work.
- Lint, TypeScript, and production builds pass.
- GitHub Pages deployment succeeds.
- The site is ready to connect to `atmhasan.com`.

## Post-Launch SEO and Analytics Notes

- Regional search phrases now include Malaysia-focused variants such as Malaysia AI Engineer, Malaysia AI Researcher, Malaysia Senior Software Engineer, and Malaysia Java Software Engineer.
- Runtime JSON content is fetched with a build-version query string to reduce stale content after GitHub Pages deployments.
- Google Analytics events are tracked for CV downloads, email and phone clicks, WhatsApp clicks, social profile clicks, and contact-form submissions.
- Google Search Console sitemap submission remains a manual account step: verify the domain property, submit `https://atmhasan.com/sitemap.xml`, then use URL Inspection to request indexing for `https://atmhasan.com/`.
## Search Launch Checklist

After the production site is available at `https://atmhasan.com/`:

1. Create a Google Search Console **Domain property** and verify it through DNS.
2. Submit `https://atmhasan.com/sitemap.xml` in Search Console.
3. Use URL Inspection to test the homepage and request initial indexing.
4. Test the deployed page in Google's Rich Results Test and confirm the `ProfilePage` main entity.
5. Confirm `https://atmhasan.com/robots.txt`, `/llms.txt`, `/llms-full.txt`, and `/images/og-image.png` return HTTP 200.
6. Ensure the hosting firewall permits OpenAI's published `OAI-SearchBot` IP ranges; `robots.txt` already allows the bot.
7. Monitor Search Console indexing, Core Web Vitals, queries, and structured-data reports after launch.

`llms.txt` is supplemental. OpenAI's documented control for ChatGPT Search discovery is
`OAI-SearchBot` access in `robots.txt`; GPTBot is independently allowed for model-training crawls.
