import { ArrowUp } from "lucide-react";
import { useAudit } from "../audit/AuditContext";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./Footer.css";

// The colophon. The status line reports the real result of the page's own run.
const Footer = ({ personal, isNotFound = false }) => {
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
    <footer className="footer" data-ground="base">
      <div className="container footer-inner">
        <p className="footer-copy">
          © {new Date().getFullYear()} {personal.name}
        </p>
        <p className="footer-status">
          <span>Built &amp; tested with care</span>
          {status && (
            <span className={`footer-pass ${s.failed > 0 ? "is-bad" : ""}`}>{status}</span>
          )}
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
    </footer>
  );
};

export default Footer;
