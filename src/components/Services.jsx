import { motion } from "framer-motion";
import { FileText, Bot, Activity, GitBranch } from "lucide-react";
import { usePrefersReducedMotion, inViewFade } from "../hooks/usePrefersReducedMotion";
import "./Services.css";

const ICONS = [FileText, Bot, Activity, GitBranch];

const Services = ({ data }) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <div className="services-head">
          <h2 className="section-title">How I Help</h2>
          <p className="section-intro">
            Practical quality engineering that reduces risk, speeds feedback, and
            keeps delivery predictable.
          </p>
        </div>
        <div className="services-grid">
          {data.map((service, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.article
                key={service.title}
                className="service-card"
                {...inViewFade(reducedMotion, index * 0.08)}
              >
                <span className="service-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="service-icon" aria-hidden="true">
                  <Icon size={22} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
