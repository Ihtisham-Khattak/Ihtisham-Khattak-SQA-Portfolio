import { ArrowUpRight, Lock } from "lucide-react";
import Chapter from "./Chapter";
import { Reveal } from "./Reveal";
import "./Projects.css";

// Each project reads as a test case: what was tested, what broke, what was fixed,
// the result. Every line is the project's own content; nothing is added here.
function Case({ project, index }) {
  const hasLink = Boolean(project.link) && !project.private;
  return (
    <Reveal as="article" id={project.id} className="case" delay={0.04}>
      <header className="case-meta">
        <p className="case-no">
          Case {String(index + 1).padStart(2, "0")}
          <span aria-hidden="true"> / </span>
          {project.category}
        </p>
        <h3>{project.title}</h3>
        <p className="case-role">
          {project.role}
          <span aria-hidden="true"> / </span>
          {project.domain}
        </p>
        <p className="case-impact">
          <span>Impact</span>
          {project.impact}
        </p>
      </header>

      <div className="case-file">
        <dl className="case-rows">
          <div>
            <dt>Tested</dt>
            <dd>{project.description}</dd>
          </div>
          <div>
            <dt className="is-broke">Broke</dt>
            <dd>{project.details.problem}</dd>
          </div>
          <div>
            <dt>Fixed</dt>
            <dd>{project.details.approach}</dd>
          </div>
          <div>
            <dt className="is-result">Result</dt>
            <dd>{project.details.outcome}</dd>
          </div>
        </dl>

        <div className="case-foot">
          <ul className="chips" aria-label="Stack">
            {project.techStack.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>
          {hasLink ? (
            <a className="case-link" href={project.link} target="_blank" rel="noopener noreferrer">
              Repository
              <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </a>
          ) : (
            <p className="case-link is-muted">
              <Lock size={14} strokeWidth={1.75} aria-hidden="true" />
              Available on request
            </p>
          )}
        </div>
      </div>
    </Reveal>
  );
}

const Projects = ({ data }) => (
  <Chapter id="projects" labelledBy="projects-title">
    <Reveal className="cases-head">
      <h2 id="projects-title" className="section-title">
        Proof from the release path.
      </h2>
      <p className="lead">Problems, the suite that replaced guesswork, and the result.</p>
    </Reveal>

    <div className="cases">
      {data.map((project, index) => (
        <Case key={project.id} project={project} index={index} />
      ))}
    </div>
  </Chapter>
);

export default Projects;
