import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import resumePDF from "../assets/Ihtisham_Khattak_SQA.pdf";
import { chapters } from "../audit/chapters";
import { useAudit } from "../audit/AuditContext";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./RunRail.css";

function ThemeToggle({ theme, onToggle, className = "" }) {
  const toDark = theme !== "dark";
  return (
    <button
      type="button"
      className={`rail-btn ${className}`.trim()}
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

// The folio: a margin rail on wide screens, a status strip + sheet on small ones.
// It is also the navigation. Each chapter shows its live verification state.
export default function RunRail({ theme, onToggleTheme, isNotFound = false }) {
  const audit = useAudit();
  const [active, setActive] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const href = (id) => (isNotFound ? `/#${id}` : `#${id}`);
  const stateOf = (id) => (isNotFound ? null : audit?.state[id]?.status ?? "unverified");
  const done = audit?.summary.done ?? 0;

  useEffect(() => {
    if (isNotFound) return undefined;
    const sections = chapters.map((c) => document.getElementById(c.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit?.target.id) setActive(hit.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.01, 0.3] }
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
    const sheet = document.getElementById("run-sheet");
    sheet?.querySelector("a")?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.querySelector(".strip-menu")?.focus();
      }
      if (event.key !== "Tab" || !sheet) return;
      const nodes = [...sheet.querySelectorAll("a, button"), document.querySelector(".strip-menu")].filter(Boolean);
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
      {/* Wide screens: margin rail */}
      <nav className="rail" data-ground="base" aria-label="Report chapters">
        <a href={isNotFound ? "/" : "#top"} className="rail-mark" aria-label="Ihtisham Khattak, title page">
          IK
        </a>
        <ol className="rail-list">
          {chapters.map((c) => {
            const st = stateOf(c.id);
            return (
              <li key={c.id}>
                <a
                  href={href(c.id)}
                  className={`rail-item ${active === c.id ? "is-active" : ""}`}
                  aria-current={active === c.id ? "location" : undefined}
                >
                  <span className="rail-dot" data-state={st} aria-hidden="true" />
                  <span className="rail-n">{c.tc}</span>
                  <span className="rail-label">{c.label}</span>
                  {st && <span className="sr-only">, {st}</span>}
                </a>
              </li>
            );
          })}
        </ol>
        <div className="rail-foot">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a
            href={resumePDF}
            download="Ihtisham_Khattak_Resume.pdf"
            className="rail-btn"
            aria-label="Download resume"
          >
            <Download size={18} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </div>
      </nav>

      {/* Small screens: sticky status strip */}
      <div className="strip" data-ground="base">
        <a href={isNotFound ? "/" : "#top"} className="rail-mark" aria-label="Ihtisham Khattak, title page">
          IK
        </a>
        {!isNotFound && (
          <div className="strip-run" aria-hidden="true">
            <ol className="meter">
              {chapters.map((c) => (
                <li key={c.id} data-state={stateOf(c.id)} />
              ))}
            </ol>
            <span className="strip-count">
              {String(done).padStart(2, "0")}/{chapters.length}
            </span>
          </div>
        )}
        <div className="strip-actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className="rail-btn strip-menu"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close chapter list" : "Open chapter list"}
            aria-expanded={menuOpen}
            aria-controls="run-sheet"
          >
            {menuOpen ? <X size={22} strokeWidth={1.6} aria-hidden="true" /> : <Menu size={22} strokeWidth={1.6} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="run-sheet"
            className="sheet"
            data-ground="base"
            aria-label="Chapters"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <ol>
              {chapters.map((c) => {
                const st = stateOf(c.id);
                return (
                  <li key={c.id}>
                    <a
                      href={href(c.id)}
                      className={`sheet-item ${active === c.id ? "is-active" : ""}`}
                      aria-current={active === c.id ? "location" : undefined}
                      onClick={closeMenu}
                    >
                      <span className="rail-n">{c.tc}</span>
                      <span className="sheet-label">{c.label}</span>
                      {st && <span className="sheet-state" data-state={st}>{st}</span>}
                    </a>
                  </li>
                );
              })}
            </ol>
            <a
              href={resumePDF}
              download="Ihtisham_Khattak_Resume.pdf"
              className="btn btn-primary sheet-resume"
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
