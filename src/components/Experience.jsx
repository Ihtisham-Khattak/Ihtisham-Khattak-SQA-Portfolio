import { Check } from "lucide-react";
import Chapter from "./Chapter";
import { Reveal } from "./Reveal";
import "./Experience.css";

const Experience = ({ data }) => (
  <Chapter id="experience" ground="subtle" labelledBy="experience-title">
    <Reveal className="log-head">
      <h2 id="experience-title" className="section-title">
        Where I&apos;ve shipped quality
      </h2>
    </Reveal>

    <ol className="log">
      {data.map((job, index) => (
        <Reveal
          as="li"
          key={`${job.company}-${job.role}`}
          className={`log-entry ${job.current ? "is-current" : ""}`}
          delay={index * 0.06}
        >
          <p className="log-dates">
            {job.current && (
              <span className="log-badge">
                <span className="status-dot" aria-hidden="true" />
                Current
              </span>
            )}
            <span className="log-range">{job.duration}</span>
          </p>

          <article className="log-body">
            <h3>{job.role}</h3>
            <p className="log-company">
              {job.company}
              <span aria-hidden="true"> / </span>
              {job.location}
            </p>

            <ul className="log-points">
              {job.highlights.map((point) => (
                <li key={point}>
                  <Check size={16} strokeWidth={2.25} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>

            <ul className="chips" aria-label="Technologies">
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
  </Chapter>
);

export default Experience;
