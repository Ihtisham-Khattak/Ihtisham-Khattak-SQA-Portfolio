import { ArrowUp, Moon, Sun } from "lucide-react";
import { useAudit } from "../audit/AuditContext";
import ikMark from "../assets/ik-mark.svg";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./Footer.css";

const links = [
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "AI Testing", id: "ai-testing" },
  { name: "Contact", id: "contact" },
];

// The colophon: wordmark, email and theme switcher, then links and the real run status.
const Footer = ({ personal, theme, onSetTheme, isNotFound = false }) => {
  const audit = useAudit();
  const reducedMotion = usePrefersReducedMotion();
  const toTop = (event) => {
    if (isNotFound) return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  const s = audit?.summary;
  let status = null;
  if (s) {
    if (s.failed > 0) status = `✗ ${s.failed} check${s.failed === 1 ? "" : "s"} failed`;
    else if (s.complete) status = "✓ All checks passed";
    else status = `Run ${s.done} of ${s.chapters}`;
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <a href={isNotFound ? "/" : "#top"} className="footer-brand" onClick={toTop}>
            <img className="nav-logo" src={ikMark} alt="" width="32" height="32" />
            {personal.name}
          </a>

          <div className="footer-right">
            <a className="footer-email" href={`mailto:${personal.email}`}>
              {personal.email}
            </a>
            <div className="theme-switch" role="group" aria-label="Theme">
              <button
                type="button"
                aria-pressed={theme === "dark"}
                aria-label="Dark theme"
                onClick={() => onSetTheme("dark")}
              >
                <Moon size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-pressed={theme === "light"}
                aria-label="Light theme"
                onClick={() => onSetTheme("light")}
              >
                <Sun size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <nav className="footer-nav" aria-label="Footer">
            {links.map((l) => (
              <a key={l.id} href={isNotFound ? `/#${l.id}` : `#${l.id}`}>
                {l.name}
              </a>
            ))}
          </nav>
          <p className="footer-meta">
            <span>
              © {new Date().getFullYear()} {personal.name}
            </span>
            <span className="footer-status">
              Built &amp; tested with care
              {status && <span className={`footer-pass ${s.failed > 0 ? "is-bad" : ""}`}>{status}</span>}
            </span>
          </p>
          <a
            href={isNotFound ? "/" : "#top"}
            className="back-to-top"
            onClick={toTop}
            aria-label={isNotFound ? "Back to home" : "Back to top"}
          >
            <ArrowUp size={16} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
