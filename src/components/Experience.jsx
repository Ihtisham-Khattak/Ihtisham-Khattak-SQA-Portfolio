import { useId, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  FolderKanban,
  SearchCheck,
  ChevronDown,
} from "lucide-react";
import { usePrefersReducedMotion, inViewFade } from "../hooks/usePrefersReducedMotion";
import "./Experience.css";

const ROLE_ICONS = [ShieldCheck, FolderKanban, SearchCheck];
const PREVIEW_COUNT = 4;

function splitCompany(company) {
  const [name, ...rest] = company.split(",").map((part) => part.trim());
  return {
    name,
    location: rest.length ? rest.join(", ") : null,
  };
}

function isCurrentRole(duration) {
  return /present/i.test(duration);
}

function ExperienceItem({ job, index, reducedMotion }) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const Icon = ROLE_ICONS[index % ROLE_ICONS.length];
  const { name, location } = splitCompany(job.company);
  const current = isCurrentRole(job.duration);
  const hasMore = job.responsibilities.length > PREVIEW_COUNT;
  const visible = expanded
    ? job.responsibilities
    : job.responsibilities.slice(0, PREVIEW_COUNT);
  const hiddenCount = job.responsibilities.length - PREVIEW_COUNT;

  return (
    <motion.article
      className={`experience-item ${current ? "is-current" : ""}`}
      {...inViewFade(reducedMotion, index * 0.08)}
    >
      <div className="experience-marker" aria-hidden="true">
        <span className="experience-dot">
          <Icon size={16} strokeWidth={2.25} />
        </span>
      </div>

      <div className="experience-body">
        <div className="experience-meta">
          <span className="experience-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <time className="experience-duration">{job.duration}</time>
          {current && <span className="experience-badge">Current</span>}
        </div>

        <h3 className="experience-role">{job.role}</h3>
        <p className="experience-company">
          <span>{name}</span>
          {location && (
            <span className="experience-location">{location}</span>
          )}
        </p>

        <ul id={listId} className="experience-list">
          {visible.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {hasMore && (
          <button
            type="button"
            className="experience-toggle"
            aria-expanded={expanded}
            aria-controls={listId}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded
              ? "Show less"
              : `Show ${hiddenCount} more ${hiddenCount === 1 ? "highlight" : "highlights"}`}
            <ChevronDown
              size={16}
              className={expanded ? "is-open" : ""}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
    </motion.article>
  );
}

const Experience = ({ data }) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="experience"
      className="section experience-section"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <div className="experience-head">
          <div>
            <h2 id="experience-title" className="section-title">
              Experience
            </h2>
            <p className="experience-count">
              {data.length} roles · QA, automation & delivery
            </p>
          </div>
          <p className="section-intro">
            From hands-on testing to leading quality strategy and Agile delivery —
            building the systems that keep releases predictable.
          </p>
        </div>

        <div className="experience-timeline">
          {data.map((job, index) => (
            <ExperienceItem
              key={`${job.role}-${job.company}`}
              job={job}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
