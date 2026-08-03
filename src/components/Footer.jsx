import { Github, Linkedin, Mail } from "lucide-react";
import "./Footer.css";

const Footer = ({ personal }) => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-left">
          <h3 className="footer-name">{personal.name}</h3>
          <p className="footer-title">{personal.title}</p>
          <div className="footer-copyright">
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </div>
        </div>

        <div className="footer-right">
          <div className="social-links">
            <a
              href={personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={20} aria-hidden="true" />
            </a>
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} aria-hidden="true" />
            </a>
            <a href={`mailto:${personal.email}`} aria-label="Email">
              <Mail size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
