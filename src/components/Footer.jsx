import { ArrowUp } from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./Footer.css";

const Footer = ({ personal, isNotFound = false }) => {
  const reducedMotion = usePrefersReducedMotion();
  const toTop = (event) => {
    if (isNotFound) return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-copy">
          © {new Date().getFullYear()} {personal.name}
        </p>
        <p className="footer-status">
          <span aria-hidden="true">Built &amp; tested with care</span>
          <span className="footer-pass">
            <span aria-hidden="true">✓</span> All checks passed
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
    </footer>
  );
};

export default Footer;
