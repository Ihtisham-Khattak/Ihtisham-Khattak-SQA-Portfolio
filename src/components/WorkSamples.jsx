import { motion } from "framer-motion";
import { Github, FileText, ExternalLink } from "lucide-react";
import { usePrefersReducedMotion, inViewFade } from "../hooks/usePrefersReducedMotion";
import "./WorkSamples.css";

function SampleIcon({ type }) {
  if (type === "Document") return <FileText size={20} aria-hidden="true" />;
  return <Github size={20} aria-hidden="true" />;
}

const WorkSamples = ({ data }) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="samples" className="section samples-section">
      <div className="container">
        <h2 className="section-title">QA Work Samples</h2>
        <p className="section-intro">
          Evidence recruiters can open — repos today, documentation samples when
          available.
        </p>
        <div className="samples-grid">
          {data.map((sample, index) => {
            const available = Boolean(sample.link) && !sample.comingSoon;

            return (
              <motion.article
                key={sample.title}
                className={`sample-card ${sample.comingSoon ? "is-soon" : ""}`}
                {...inViewFade(reducedMotion, index * 0.08)}
              >
                <div className="sample-icon" aria-hidden="true">
                  <SampleIcon type={sample.type} />
                </div>
                <div className="sample-body">
                  <div className="sample-meta">
                    <span className="sample-type">{sample.type}</span>
                    {sample.comingSoon && (
                      <span className="sample-soon">Coming soon</span>
                    )}
                  </div>
                  <h3>{sample.title}</h3>
                  <p>{sample.description}</p>
                  {available ? (
                    <a
                      href={sample.link}
                      className="sample-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open sample
                      <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="sample-link disabled">
                      Add files under public/samples/
                    </span>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkSamples;
