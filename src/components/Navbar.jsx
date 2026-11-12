import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import resumePDF from "../assets/Ihtisham_Khattak_SQA.pdf";
import ikMark from "../assets/ik-mark.svg";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./Navbar.css";

const links = [
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "AI Testing", id: "ai-testing" },
  { name: "Contact", id: "contact" },
];

// Floating glass pill, centred at the top: wordmark, links, and two actions.
export default function Navbar({ isNotFound = false }) {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const href = (id) => (isNotFound ? `/#${id}` : `#${id}`);

  useEffect(() => {
    if (isNotFound) return undefined;
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit?.target.id) setActive(hit.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.05, 0.3] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isNotFound]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const sheet = document.getElementById("nav-sheet");
    sheet?.querySelector("a")?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.querySelector(".nav-menu-btn")?.focus();
      }
      if (event.key !== "Tab" || !sheet) return;
      const nodes = [...sheet.querySelectorAll("a, button"), document.querySelector(".nav-menu-btn")].filter(Boolean);
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header className="nav">
        <div className="nav-pill">
          <a href={isNotFound ? "/" : "#top"} className="nav-brand" onClick={closeMenu}>
            <img className="nav-logo" src={ikMark} alt="" width="32" height="32" />
            <span className="nav-name">Ihtisham Khattak</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {links.map((l) => (
              <a
                key={l.id}
                href={href(l.id)}
                className={active === l.id ? "is-active" : ""}
                aria-current={active === l.id ? "location" : undefined}
              >
                {l.name}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <a
              href={resumePDF}
              download="Ihtisham_Khattak_Resume.pdf"
              className="btn btn-ghost btn-sm nav-resume"
            >
              Download Resume
            </a>
            <a href={href("contact")} className="btn btn-primary btn-sm" onClick={closeMenu}>
              Get in Touch
            </a>
            <button
              type="button"
              className="nav-menu-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="nav-sheet"
            >
              {menuOpen ? (
                <X size={20} strokeWidth={1.7} aria-hidden="true" />
              ) : (
                <Menu size={20} strokeWidth={1.7} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="nav-sheet"
            className="nav-sheet"
            aria-label="Menu"
            initial={reducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ul>
              {links.map((l, i) => (
                <li key={l.id}>
                  <a
                    href={href(l.id)}
                    className={active === l.id ? "is-active" : ""}
                    aria-current={active === l.id ? "location" : undefined}
                    onClick={closeMenu}
                  >
                    <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={resumePDF}
              download="Ihtisham_Khattak_Resume.pdf"
              className="btn btn-ghost nav-sheet-resume"
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
}
