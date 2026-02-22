import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Linkedin,
  Github,
  Mail,
  CheckCircle,
  Loader,
} from "lucide-react";
import "./Contact.css";

const Contact = ({ contactInfo }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      // Reset status after a few seconds so they can send another if needed
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-container">
        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
                <Mail className="contact-icon" />
                <span>{contactInfo.email}</span>
              </a>
              <a
                href={contactInfo.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="contact-method"
              >
                <Linkedin className="contact-icon" />
                <span>LinkedIn</span>
              </a>
              <a
                href={contactInfo.social.github}
                target="_blank"
                rel="noreferrer"
                className="contact-method"
              >
                <Github className="contact-icon" />
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
