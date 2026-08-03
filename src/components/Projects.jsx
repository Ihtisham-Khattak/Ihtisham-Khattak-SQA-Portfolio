import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Lock,
  AlertCircle,
  Wrench,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { usePrefersReducedMotion, inViewFade } from "../hooks/usePrefersReducedMotion";
import "./Projects.css";

function isValidLink(link) {
  return Boolean(link) && link !== "#";
}

function isGithubLink(link) {
  return /github\.com/i.test(link);
}

const NARRATIVE_STEPS = [
  { key: "problem", label: "Problem", Icon: AlertCircle },
  { key: "solution", label: "Approach", Icon: Wrench },
  { key: "outcome", label: "Outcome", Icon: TrendingUp },
];

function CaseStudy({ project, index, defaultOpen, reducedMotion }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const hasLink = isValidLink(project.link) && !project.private;
  const github = hasLink && isGithubLink(project.link);

  return (
    <motion.article
      className={`case-card ${open ? "is-open" : ""}`}
      {...inViewFade(reducedMotion, index * 0.08)}
    >
      <button
        type="button"
        className="case-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <div className="case-toggle-main">
          <span className="case-index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="case-toggle-copy">
            <div className="case-meta">
              <span className="case-category">{project.category}</span>
              {project.role && <span className="case-role">{project.role}</span>}
              {project.private && (
                <span className="case-private">
                  <Lock size={12} aria-hidden="true" />
                  Private
                </span>
              )}
            </div>
            <h3 className="case-title">{project.title}</h3>
            <p className="case-description">{project.description}</p>
          </div>
        </div>

        <div className="case-toggle-aside">
          {project.impact && (
            <span className="case-impact">{project.impact}</span>
          )}
          <span className="case-chevron" aria-hidden="true">
            <ChevronDown size={18} className={open ? "is-open" : ""} />
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            className="case-body"
            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="case-body-inner">
              <div className="case-narrative" aria-label="Case narrative">
                {NARRATIVE_STEPS.map(({ key, label, Icon }, stepIndex) => (
                  <div
                    key={key}
                    className={`case-step ${key === "outcome" ? "is-outcome" : ""}`}
                  >
                    <div className="case-step-head">
                      <span className="case-step-icon" aria-hidden="true">
                        <Icon size={15} />
                      </span>
                      <span className="case-step-label">
                        <span className="case-step-num">
                          {String(stepIndex + 1).padStart(2, "0")}
                        </span>
                        {label}
                      </span>
                    </div>
                    <p>{project.details[key]}</p>
                  </div>
                ))}
              </div>

              {project.highlights?.length > 0 && (
                <ul className="case-highlights">
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}

              <div className="case-footer">
                <div className="case-tech">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="case-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {hasLink ? (
                  <a
                    href={project.link}
                    className="case-cta"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {github ? (
                      <>
                        <Github size={16} aria-hidden="true" />
                        View on GitHub
                      </>
                    ) : (
                      <>
                        Open project
                        <ExternalLink size={16} aria-hidden="true" />
                      </>
                    )}
                  </a>
                ) : project.private ? (
                  <span className="case-cta is-muted">
                    <Lock size={15} aria-hidden="true" />
                    Available on request
                  </span>
                ) : null}
              </div>

              {project.lookFor && hasLink && (
                <p className="case-lookfor">
                  <strong>In the repo:</strong> {project.lookFor}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

const Projects = ({ data }) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="projects"
      className="section projects-section"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <div className="projects-head">
          <div>
            <h2 id="projects-title" className="section-title">
              Case Studies
            </h2>
            <p className="projects-count">
              {data.length} projects · problem to measurable outcome
            </p>
          </div>
          <p className="section-intro">
            Selected quality work with the trade-offs that mattered — and repos
            you can inspect where available.
          </p>
        </div>

        <div className="case-list">
          {data.map((project, index) => (
            <CaseStudy
              key={project.title}
              project={project}
              index={index}
              defaultOpen={index === 0}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
