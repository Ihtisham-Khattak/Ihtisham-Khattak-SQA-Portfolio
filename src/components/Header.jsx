import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./Header.css";

const Header = ({ theme, onToggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        ticking = false;
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const navLinks = [
    { name: "How I Help", href: "#services" },
    { name: "Tools", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Case Studies", href: "#projects" },
    { name: "Samples", href: "#samples" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      className={`header ${scrolled ? "scrolled" : ""}`}
      initial={reducedMotion ? false : { y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.5 }}
    >
      <div className="container header-content">
        <a href="#top" className="logo" onClick={closeMenu}>
          Ihtisham Khattak
        </a>

        <nav className="nav-desktop" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle mobile-theme"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-nav"
              className="nav-mobile"
              aria-label="Mobile"
              initial={reducedMotion ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="nav-link mobile"
                  onClick={closeMenu}
                >
                  {link.name}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
