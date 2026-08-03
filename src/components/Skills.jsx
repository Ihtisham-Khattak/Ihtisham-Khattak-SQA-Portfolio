import { useId, useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Activity,
  GitBranch,
  ClipboardCheck,
  Users,
} from "lucide-react";
import { usePrefersReducedMotion, inViewFade } from "../hooks/usePrefersReducedMotion";
import "./Skills.css";

const CATEGORIES = [
  {
    key: "automation",
    label: "Automation",
    blurb: "E2E frameworks and patterns that keep regression fast and maintainable.",
    Icon: Bot,
  },
  {
    key: "apiPerformance",
    label: "API & Performance",
    blurb: "Contract checks and load suites that catch bottlenecks before users do.",
    Icon: Activity,
  },
  {
    key: "cicdDevops",
    label: "CI/CD & DevOps",
    blurb: "Quality gates wired into the pipeline so every commit gets the same bar.",
    Icon: GitBranch,
  },
  {
    key: "qualityPractice",
    label: "Quality Practice",
    blurb: "Manual and exploratory craft that finds risk automation alone will miss.",
    Icon: ClipboardCheck,
  },
  {
    key: "collaboration",
    label: "Collaboration & Tracking",
    blurb: "Sprint tooling that keeps defects, stories, and release readiness visible.",
    Icon: Users,
  },
];

const Skills = ({ data }) => {
  const reducedMotion = usePrefersReducedMotion();
  const filterId = useId();
  const [active, setActive] = useState("all");

  const visible =
    active === "all"
      ? CATEGORIES
      : CATEGORIES.filter((category) => category.key === active);

  const totalTools = CATEGORIES.reduce(
    (sum, category) => sum + (data[category.key]?.length || 0),
    0,
  );

  return (
    <section id="skills" className="section skills-section" aria-labelledby="skills-title">
      <div className="container">
        <div className="skills-head">
          <div>
            <h2 id="skills-title" className="section-title">
              Tool Stack
            </h2>
            <p className="skills-count" aria-live="polite">
              {totalTools} tools across {CATEGORIES.length} quality layers
            </p>
          </div>
          <p className="section-intro">
            Grouped by how they show up in day-to-day quality work — from
            automation and APIs to CI gates and sprint delivery.
          </p>
        </div>

        <div
          className="skills-filters"
          role="tablist"
          aria-label="Filter tool categories"
        >
          <button
            type="button"
            role="tab"
            id={`${filterId}-all`}
            aria-selected={active === "all"}
            className={`skills-filter ${active === "all" ? "is-active" : ""}`}
            onClick={() => setActive("all")}
          >
            All
          </button>
          {CATEGORIES.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              role="tab"
              id={`${filterId}-${key}`}
              aria-selected={active === key}
              className={`skills-filter ${active === key ? "is-active" : ""}`}
              onClick={() => setActive(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="skills-list" role="tabpanel" aria-labelledby={`${filterId}-${active}`}>
          {visible.map(({ key, label, blurb, Icon }, index) => {
            const items = data[key] || [];

            return (
              <motion.article
                key={key}
                className="skills-row"
                {...inViewFade(reducedMotion, index * 0.06)}
              >
                <div className="skills-row-meta">
                  <div className="skills-row-heading">
                    <span className="skills-icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={2} />
                    </span>
                    <div>
                      <h3 className="skills-row-title">{label}</h3>
                      <span className="skills-row-count">
                        {items.length} {items.length === 1 ? "tool" : "tools"}
                      </span>
                    </div>
                  </div>
                  <p className="skills-row-blurb">{blurb}</p>
                </div>

                <ul className="skill-tags">
                  {items.map((skill) => (
                    <li key={skill}>
                      <span className="skill-tag">{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
