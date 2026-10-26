import { Check } from "lucide-react";
import { Reveal } from "./Reveal";
import "./Experience.css";

const Experience = ({ data }) => (
  <section
    id="experience"
    className="section experience"
    aria-labelledby="experience-title"
  >
    <div className="container">
      <Reveal className="section-head">
        <p className="eyebrow">{"// 03 — EXPERIENCE"}</p>
        <h2 id="experience-title" className="section-title">
          Where I&apos;ve shipped quality
        </h2>
      </Reveal>

      <ol className="timeline">
        {data.map((job, index) => (
          <Reveal
            as="li"
            key={`${job.company}-${job.role}`}
            className={`timeline-item ${job.current ? "is-current" : ""}`}
            delay={index * 0.06}
          >
            <span className="timeline-node" aria-hidden="true" />
            <article className="card timeline-card">
              <header className="timeline-head">
                <div>
                  <h3>{job.role}</h3>
                  <p className="timeline-company">
                    {job.company}
                    <span aria-hidden="true"> · </span>
                    {job.location}
                  </p>
                </div>
                <p className="timeline-dates">
                  {job.current && (
                    <span className="timeline-badge">
                      <span className="status-dot" aria-hidden="true" />
                      Current
                    </span>
                  )}
                  <span className="timeline-range">{job.duration}</span>
                </p>
              </header>

              <ul className="timeline-points">
                {job.highlights.map((point) => (
                  <li key={point}>
                    <Check size={16} strokeWidth={2.25} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>

              <ul className="timeline-tags" aria-label="Technologies">
                {job.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

export default Experience;
