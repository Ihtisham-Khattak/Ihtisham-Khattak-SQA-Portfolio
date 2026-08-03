import { motion } from "framer-motion";
import { Linkedin, Github, Mail } from "lucide-react";
import { usePrefersReducedMotion, inViewFade } from "../hooks/usePrefersReducedMotion";
import "./Contact.css";

const Contact = ({ contactInfo }) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-container">
        <motion.div
          className="contact-content"
          {...inViewFade(reducedMotion)}
        >
          <div className="contact-info">
            <h2 className="section-title">Let's Connect</h2>
            <p className="contact-text">
              Interested in discussing QA strategies, automation frameworks, or
              DevOps implementations? I'm always open to new opportunities and
              collaborations.
            </p>

            <div className="contact-methods">
              <a
                href={`mailto:${contactInfo.email}`}
                className="contact-method"
              >
                <Mail className="contact-icon" aria-hidden="true" />
                <span>{contactInfo.email}</span>
              </a>
              <a
                href={contactInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-method"
              >
                <Linkedin className="contact-icon" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
              <a
                href={contactInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-method"
              >
                <Github className="contact-icon" aria-hidden="true" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
