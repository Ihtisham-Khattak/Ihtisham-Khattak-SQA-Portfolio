import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Menu, X, Sun, Moon, Download } from "lucide-react";
import resumePDF from "../assets/Ihtisham_Khattak_SQA.pdf";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./Navbar.css";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "AI Testing", href: "#ai-testing" },
  { name: "Contact", href: "#contact" },
];

function ThemeToggle({ theme, onToggle }) {
  const toDark = theme !== "dark";
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={toDark ? "Switch to dark mode" : "Switch to light mode"}
    >
      {toDark ? (
        <Moon size={18} strokeWidth={1.6} aria-hidden="true" />
      ) : (
        <Sun size={18} strokeWidth={1.6} aria-hidden="true" />
      )}
    </button>
  );
}

const Navbar = ({ theme, onToggleTheme, isNotFound = false }) => {
  const links = navLinks.map((link) => ({
    ...link,
    href: isNotFound ? `/${link.href}` : link.href,
  }));
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const reducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  useEffect(() => {
    const update = (value) => setScrolled(value > 8);
    update(scrollY.get());
    return scrollY.on("change", update);
  }, [scrollY]);

  useEffect(() => {
    if (isNotFound) return undefined;
    const sections = navLinks
      .map((link) => document.getElementById(link.href.replace("#", "")))
      .filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.1, 0.3] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isNotFound]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const nav = document.getElementById("mobile-nav");
    nav?.querySelector("a")?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.querySelector(".mobile-menu-btn")?.focus();
      }
      if (event.key !== "Tab" || !nav) return;
      const focusable = [
        ...nav.querySelectorAll("a"),
        document.querySelector(".mobile-menu-btn"),
      ].filter(Boolean);
      const firstNode = focusable[0];
      const lastNode = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === firstNode) {
        event.preventDefault();
        lastNode?.focus();
      } else if (!event.shiftKey && document.activeElement === lastNode) {
        event.preventDefault();
        firstNode?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
    <header className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container navbar-inner">
        <a
          href={isNotFound ? "/" : "#top"}
          className="logo"
          onClick={closeMenu}
        >
          <span className="logo-mark" aria-hidden="true">
            IK
          </span>
          <span className="logo-name">Ihtisham Khattak</span>
        </a>

        <nav className="nav-desktop" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`nav-link ${active === link.href ? "is-active" : ""}`}
              aria-current={active === link.href ? "location" : undefined}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a
            href={resumePDF}
            download="Ihtisham_Khattak_Resume.pdf"
            className="btn btn-outline nav-resume"
          >
            <Download size={15} strokeWidth={1.75} aria-hidden="true" />
            Download Resume
          </a>
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? (
              <X size={22} strokeWidth={1.6} aria-hidden="true" />
            ) : (
              <Menu size={22} strokeWidth={1.6} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>

    {/* Outside <header>: its backdrop-filter would otherwise trap this fixed overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            className="nav-mobile"
            aria-label="Mobile"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {links.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`nav-link-mobile ${active === link.href ? "is-active" : ""}`}
                aria-current={active === link.href ? "location" : undefined}
                onClick={closeMenu}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reducedMotion ? 0 : index * 0.05 }}
              >
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {link.name}
              </motion.a>
            ))}
            <a
              href={resumePDF}
              download="Ihtisham_Khattak_Resume.pdf"
              className="btn btn-primary nav-mobile-resume"
              onClick={closeMenu}
            >
              <span className="btn-label">
                <Download size={16} strokeWidth={1.75} aria-hidden="true" />
                Download Resume
              </span>
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
