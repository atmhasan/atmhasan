import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { NavigationItem } from "../types/portfolio";
import { withBase } from "../utils/paths";

interface HeaderProps {
  items: NavigationItem[];
  cvUrl: string;
}

export const Header = ({ items, cvUrl }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light"
  );
  const visibleItems = useMemo(
    () => items.filter((item) => item.visible).sort((a, b) => a.sortOrder - b.sortOrder),
    [items]
  );

  useEffect(() => {
    let frameId = 0;

    const updateActiveSection = () => {
      frameId = 0;
      let current = visibleItems[0]?.sectionId || "home";
      let closestTop = Number.NEGATIVE_INFINITY;

      for (const item of visibleItems) {
        const section = document.getElementById(item.sectionId);
        const sectionTop = section?.getBoundingClientRect().top;

        if (sectionTop !== undefined && sectionTop <= 120 && sectionTop > closestTop) {
          current = item.sectionId;
          closestTop = sectionTop;
        }
      }

      setActiveSection(current);
      setIsScrolled(window.scrollY > 24);
    };

    const handleViewportChange = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", handleViewportChange, { passive: true });
    window.addEventListener("resize", handleViewportChange);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
    };
  }, [visibleItems]);

  const selectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setOpen(false);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", nextTheme === "dark" ? "#06162f" : "#06265c");
  };

  return (
    <header className={isScrolled ? "site-header is-scrolled" : "site-header"}>
      <div className="shell header-inner">
        <a className="brand" href="#home" aria-label="A T M Hasan home" onClick={() => selectSection("home")}>
          <span className="brand-logo" aria-hidden="true">
            <img className="theme-logo theme-logo-on-light" src={withBase("images/logo-light-with-name.png")} alt="" width={1673} height={303} />
            <img className="theme-logo theme-logo-on-dark" src={withBase("images/logo-dark-with-name.png")} alt="" width={1794} height={325} />
          </span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className={open ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
          {visibleItems.map((item) => (
            <a
              key={item.sectionId}
              href={`#${item.sectionId}`}
              className={activeSection === item.sectionId ? "active" : undefined}
              aria-current={activeSection === item.sectionId ? "location" : undefined}
              onClick={() => selectSection(item.sectionId)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="cv-button" href={withBase(cvUrl)} download>
          Download CV <Download size={16} aria-hidden="true" />
        </a>
        <button
          className="theme-toggle"
          type="button"
          role="switch"
          aria-checked={theme === "dark"}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          onClick={toggleTheme}
        >
          <Sun className="theme-symbol" size={14} aria-hidden="true" />
          <span className="theme-track" aria-hidden="true"><span className="theme-thumb" /></span>
          <Moon className="theme-symbol" size={14} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};
