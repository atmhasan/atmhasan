import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Award, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Eye, ImageOff, X } from "lucide-react";
import type { CertificationItem, CertificationsData } from "../types/portfolio";
import { withBase } from "../utils/paths";

interface CredentialsSectionProps {
  certifications: CertificationsData;
}

const PREVIEW_COUNT = 8;

export const CredentialsSection = ({ certifications }: CredentialsSectionProps) => {
  const viewerRef = useRef<HTMLDialogElement>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificationItem | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [pages, setPages] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const certificationItems = certifications.items
    .filter((item) => item.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const visibleItems = showAll ? certificationItems : certificationItems.slice(0, PREVIEW_COUNT);

  useEffect(() => () => document.body.classList.remove("certificate-viewer-open"), []);

  useEffect(() => {
    // initial measurements
    updateScrollButtons();
    const onResize = () => updateScrollButtons();
    window.addEventListener("resize", onResize);

    let interval: number | undefined;
    if (!showAll) {
      interval = window.setInterval(() => {
        if (!isPaused && galleryRef.current) {
          scrollGallery(1);
        }
      }, 3500);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (interval) window.clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAll, isPaused, certificationItems.length]);

  const openCertificate = (item: CertificationItem) => {
    if (!item.image) return;
    setSelectedCertificate(item);
    document.body.classList.add("certificate-viewer-open");
    requestAnimationFrame(() => viewerRef.current?.showModal());
  };

  const updateScrollButtons = () => {
    const el = galleryRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);

    // compute pages and active page
    const cardEl = el.querySelector<HTMLDivElement>(".certificate-card");
    const gap = 14;
    const itemWidth = cardEl ? cardEl.offsetWidth + gap : 274;
    const itemsPerView = Math.max(1, Math.floor(el.clientWidth / itemWidth));
    const newPages = Math.max(1, Math.ceil(certificationItems.length / itemsPerView));
    setPages(newPages);
    const newActive = Math.min(newPages - 1, Math.round(el.scrollLeft / el.clientWidth));
    setActivePage(newActive);
  };

  const scrollToPage = (page: number) => {
    const el = galleryRef.current;
    if (!el) return;
    el.scrollTo({ left: page * el.clientWidth, behavior: "smooth" });
    setTimeout(updateScrollButtons, 300);
  };

  const scrollGallery = (direction: number) => {
    const el = galleryRef.current;
    if (!el) return;
    const offset = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: direction * offset, behavior: "smooth" });
    // schedule update
    setTimeout(updateScrollButtons, 300);
  };

  const closeCertificate = () => viewerRef.current?.close();

  const handleViewerClick = (event: MouseEvent<HTMLDialogElement>) => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const bounds = viewer.getBoundingClientRect();
    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;
    if (clickedOutside) closeCertificate();
  };

  return (
    <>
      <section className="content-card credentials-section section-block reveal reveal-right" id="certifications">
        <header className="certification-header">
          <div className="card-heading">
            <Award size={24} fill="currentColor" aria-hidden="true" />
            <div>
              <h2>Certifications</h2>
              <span>Professional and academic credentials</span>
            </div>
          </div>
          {certificationItems.length > PREVIEW_COUNT && (
            <button
              className="certification-view-all"
              type="button"
              aria-expanded={showAll}
              aria-controls="certificate-gallery"
              onClick={() => setShowAll((current) => !current)}
            >
              {showAll ? <ChevronUp size={17} aria-hidden="true" /> : <ChevronDown size={17} aria-hidden="true" />}
              <span>{showAll ? "Show Less" : "View All"}</span>
            </button>
          )}
        </header>
        {showAll ? (
          <div className="certificate-gallery" id="certificate-gallery">
            {visibleItems.map((item) => (
              <article className="certificate-card" key={item.id}>
              <button
                className="certificate-thumbnail"
                type="button"
                onClick={() => openCertificate(item)}
                disabled={!item.image}
                aria-label={item.image ? "View " + item.name : item.name + " image unavailable"}
              >
                {item.image ? (
                  <>
                    <img src={withBase(item.image)} alt={item.name + " certificate issued by " + item.issuer} loading="lazy" />
                    <span className="certificate-view-overlay"><Eye size={17} aria-hidden="true" />View Certificate</span>
                  </>
                ) : (
                  <span className="certificate-image-missing"><ImageOff size={28} aria-hidden="true" />Image pending</span>
                )}
              </button>
              <div className="certificate-card-content">
                <h3>{item.name}</h3>
                <p>{item.issuer}</p>
                <time>{item.date}</time>
              </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="certificate-carousel-wrapper">
            <button
              className="carousel-nav prev"
              type="button"
              onClick={() => scrollGallery(-1)}
              aria-label="Previous certificates"
              disabled={!canScrollPrev}
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <div
              ref={galleryRef}
              className="certificate-carousel"
              role="list"
              onScroll={updateScrollButtons}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
            >
              {certificationItems.map((item) => (
                <article className="certificate-card" key={item.id}>
                  <button
                    className="certificate-thumbnail"
                    type="button"
                    onClick={() => openCertificate(item)}
                    disabled={!item.image}
                    aria-label={item.image ? "View " + item.name : item.name + " image unavailable"}
                  >
                    {item.image ? (
                      <>
                        <img src={withBase(item.image)} alt={item.name + " certificate issued by " + item.issuer} loading="lazy" />
                        <span className="certificate-view-overlay"><Eye size={17} aria-hidden="true" />View Certificate</span>
                      </>
                    ) : (
                      <span className="certificate-image-missing"><ImageOff size={28} aria-hidden="true" />Image pending</span>
                    )}
                  </button>
                  <div className="certificate-card-content">
                    <h3>{item.name}</h3>
                    <p>{item.issuer}</p>
                    <time>{item.date}</time>
                  </div>
                </article>
              ))}
            </div>
            <button
              className="carousel-nav next"
              type="button"
              onClick={() => scrollGallery(1)}
              aria-label="Next certificates"
              disabled={!canScrollNext}
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
            <div className="carousel-dots" aria-hidden={pages <= 1}>
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  className={"carousel-dot" + (i === activePage ? " active" : "")}
                  type="button"
                  aria-label={`Go to page ${i + 1}`}
                  onClick={() => scrollToPage(i)}
                />
              ))}
            </div>
          </div>
        )}
      </section>
      <dialog
        ref={viewerRef}
        className="certificate-viewer"
        aria-labelledby="certificate-viewer-title"
        onClick={handleViewerClick}
        onClose={() => {
          document.body.classList.remove("certificate-viewer-open");
          setSelectedCertificate(null);
        }}
      >
        {selectedCertificate && (
          <>
            <header className="certificate-viewer-header">
              <div>
                <h2 id="certificate-viewer-title">{selectedCertificate.name}</h2>
                <p>{selectedCertificate.issuer} | {selectedCertificate.date}</p>
              </div>
              <button type="button" onClick={closeCertificate} aria-label="Close certificate viewer">
                <X size={20} aria-hidden="true" />
              </button>
            </header>
            <div className="certificate-viewer-image">
              <img
                src={withBase(selectedCertificate.image ?? "")}
                alt={selectedCertificate.name + " certificate issued by " + selectedCertificate.issuer}
              />
            </div>
          </>
        )}
      </dialog>
    </>
  );
};
