import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { usePrefersReducedMotion, inViewFade } from "../hooks/usePrefersReducedMotion";
import SectionIntro from "./SectionIntro";
import WorkDiagram from "./WorkDiagram";
import "./Projects.css";

const layouts = ["split", "reverse", "stacked"];

function WorkCase({ project, index, reducedMotion }) {
  const layout = layouts[index % layouts.length];
  const hasLink = Boolean(project.link) && !project.private;
  const enterFrom = layout === "reverse" ? 28 : -28;

  return (
    <motion.article
      id={project.id}
      className={`work-case work-case--${layout}`}
      {...(reducedMotion
        ? inViewFade(true)
        : {
            initial: { opacity: 0, x: enterFrom },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true, margin: "-10% 0px" },
            transition: { type: "spring", stiffness: 90, damping: 20 },
          })}
    >
      <div className="work-copy">
        <p className="work-index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className="work-meta">
          {project.category}
          {project.private && (
            <>
              {"  ·  "}
              <Lock size={12} strokeWidth={1.5} aria-hidden="true" />
              Private
            </>
          )}
        </p>
        <h3>{project.title}</h3>
        <p className="work-statement">{project.description}</p>

        <dl className="work-facts">
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Domain</dt>
            <dd>{project.domain}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{project.techStack.join(" · ")}</dd>
          </div>
        </dl>

        <div className="work-story">
          <div>
            <p>Problem</p>
            <p>{project.details.problem}</p>
          </div>
          <div>
            <p>Approach</p>
            <p>{project.details.approach}</p>
          </div>
          <div>
            <p>Result</p>
            <p>{project.details.outcome}</p>
          </div>
        </div>

        {hasLink ? (
          <a
            className="work-link"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Repository
            <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </a>
        ) : (
          <p className="work-link is-muted">Available on request</p>
        )}
      </div>

      <WorkDiagram type={project.diagram} reducedMotion={reducedMotion} />
    </motion.article>
  );
}

const Projects = ({ data }) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="work" className="section work-section" aria-labelledby="work-title">
      <div className="container">
        <SectionIntro
          index="01"
          label="Selected work"
          title="Proof from the release path."
          aside="Problems, the suite that replaced guesswork, and the result."
          titleId="work-title"
        />

        <div className="work-list">
          {data.map((project, index) => (
            <WorkCase
              key={project.id}
              project={project}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
