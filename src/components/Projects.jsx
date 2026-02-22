import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import "./Projects.css";

const Projects = ({ data }) => {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {data.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="project-header">
                <div>
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                </div>
                <div className="project-links">
                  <a href={project.link} className="icon-link">
                    <Github size={20} />
                  </a>
                  <a href={project.link} className="icon-link">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-details">
                <div className="detail-item">
                  <strong>Problem:</strong> {project.details.problem}
                </div>
                <div className="detail-item">
                  <strong>Solution:</strong> {project.details.solution}
                </div>
                <div className="detail-item highlight">
                  <strong>Outcome:</strong> {project.details.outcome}
                </div>
              </div>

              <div className="tech-stack">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
