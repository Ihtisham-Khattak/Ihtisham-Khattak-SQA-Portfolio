import { Briefcase, Check } from "lucide-react";
import Chapter, { SecTitle } from "./Chapter";
import { Reveal } from "./Reveal";
import "./Experience.css";

const Experience = ({ data }) => (
  <Chapter id="experience" labelledBy="experience-title">
    <Reveal className="sec-head">
      <SecTitle id="experience-title" lead="Where I’ve shipped" tail="quality" />
    </Reveal>

    <ol className="roles">
      {data.map((job, index) => (
        <Reveal
          as="li"
          key={`${job.company}-${job.role}`}
          className={`bezel role ${job.current ? "is-current" : ""}`}
          delay={index * 0.07}
        >
          <article className="bezel-in role-in">
            <header className="role-head">
              <span className="icon-circle">
                <Briefcase size={18} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <p className="label-caps role-dates">
                {job.current && (
                  <span className="role-now">
                    <span className="status-dot" aria-hidden="true" />
                    Current
                    <span aria-hidden="true"> · </span>
                  </span>
                )}
                {job.duration}
              </p>
            </header>

            <h3 className="role-title">{job.role}</h3>
            <p className="role-company">
              {job.company}
              <span aria-hidden="true"> / </span>
              {job.location}
            </p>

            <ul className="checks-list">
              {job.highlights.map((point) => (
                <li key={point}>
                  <Check size={15} strokeWidth={2.4} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>

            <ul className="chips role-tags" aria-label="Technologies">
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
