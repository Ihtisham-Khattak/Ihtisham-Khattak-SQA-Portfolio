import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./Header.css";

const navLinks = [
  { name: "Work", href: "#work" },
  { name: "Expertise", href: "#expertise" },
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const Header = ({ theme, onToggleTheme, isNotFound = false }) => {
  const links = navLinks.map((link) => ({
    ...link,
    href: isNotFound ? `/${link.href}` : link.href,
  }));
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollYProgress.on("change", (value) => {
      setScrolled(value > 0.018);
    });
  }, [scrollYProgress]);

  useEffect(() => {
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
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.12, 0.3] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const nav = document.getElementById("mobile-nav");
    const first = nav?.querySelector("a");
    first?.focus();

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
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: reducedMotion ? 0 : scaleX }}
        aria-hidden="true"
      />
      <div className="container header-content">
        <a href={isNotFound ? "/" : "#top"} className="logo" onClick={closeMenu}>
          <span className="logo-mark" aria-hidden="true">
            IK
          </span>
          Ihtisham Khattak
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
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <Sun size={16} strokeWidth={1.5} />
            ) : (
              <Moon size={16} strokeWidth={1.5} />
            )}
          </button>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <Sun size={16} strokeWidth={1.5} />
            ) : (
              <Moon size={16} strokeWidth={1.5} />
            )}
          </button>
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? (
              <X size={22} strokeWidth={1.5} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            className="nav-mobile"
            aria-label="Mobile"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
          >
            {links.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`nav-link mobile ${active === link.href ? "is-active" : ""}`}
                aria-current={active === link.href ? "location" : undefined}
                onClick={closeMenu}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reducedMotion ? 0 : index * 0.05 }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {link.name}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
