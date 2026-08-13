import { motion } from "framer-motion";
import { usePrefersReducedMotion, inViewFade } from "../hooks/usePrefersReducedMotion";
import Magnetic from "./Magnetic";
import "./Contact.css";

const Contact = ({ contactInfo }) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <div className="container">
        <motion.div {...inViewFade(reducedMotion)}>
          <p className="section-kicker">
            <span aria-hidden="true">05</span>
            Contact
          </p>
          <h2 id="contact-title" className="contact-title">
            Open to quality engineering work.
          </h2>
          <Magnetic href={`mailto:${contactInfo.email}`} className="contact-email">
            {contactInfo.email}
          </Magnetic>
          <div className="contact-links">
            <a
              href={contactInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href={contactInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
