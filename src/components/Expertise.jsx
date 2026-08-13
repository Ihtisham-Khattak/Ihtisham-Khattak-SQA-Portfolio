import { memo, useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion, inViewFade } from "../hooks/usePrefersReducedMotion";
import SectionIntro from "./SectionIntro";
import "./Expertise.css";

const ToolMarquee = memo(function ToolMarquee({ tools, reducedMotion }) {
  const items = [...tools, ...tools];
  return (
    <div className="tool-marquee" aria-hidden="true">
      <div className={`tool-track ${reducedMotion ? "is-static" : ""}`}>
        {items.map((tool, index) => (
          <span key={`${tool}-${index}`}>{tool}</span>
        ))}
      </div>
    </div>
  );
});

function CapabilityDetail({ item, projects, reducedMotion }) {
  const related = (item.related || [])
    .map((id) => projects.find((project) => project.id === id))
    .filter(Boolean);

  return (
    <motion.div
      className="capability-detail"
      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <p className="capability-kicker">Capability</p>
      <h3>{item.title}</h3>
      <p className="capability-solves">{item.solves}</p>

      <dl>
        <div>
          <dt>Tools</dt>
          <dd>{item.tools.join(" · ")}</dd>
        </div>
        <div>
          <dt>Methods</dt>
          <dd>
            <ul>
              {item.methods.map((method) => (
                <li key={method}>{method}</li>
              ))}
            </ul>
          </dd>
        </div>
        {related.length > 0 && (
          <div>
            <dt>Related work</dt>
            <dd>
              <ul className="capability-related">
                {related.map((project) => (
                  <li key={project.id}>
                    <a href={`#${project.id}`}>{project.title}</a>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}
      </dl>
    </motion.div>
  );
}

const Expertise = ({ data, tools, projects = [] }) => {
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const panelId = useId();
  const current = data[active] ?? data[0];

  useEffect(() => {
    const selected = document.getElementById(`capability-${current.id}`);
    if (selected && document.activeElement?.closest(".capability-index")) {
      selected.focus();
    }
  }, [current.id]);

  return (
    <section
      id="expertise"
      className="section expertise-section"
      aria-labelledby="expertise-title"
    >
      <div className="container">
        <SectionIntro
          index="02"
          label="Expertise"
          title="The disciplines behind the suites."
          aside="Four capabilities. Select one to see tools, methods, and related work."
          titleId="expertise-title"
        />

        <div className="capability-map">
          <div
            className="capability-index"
            role="tablist"
            aria-label="Capabilities"
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                event.preventDefault();
                setActive((value) => (value + 1) % data.length);
              }
              if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                event.preventDefault();
                setActive((value) => (value - 1 + data.length) % data.length);
              }
            }}
          >
            {data.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`capability-${item.id}`}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  className={`capability-tab ${selected ? "is-active" : ""}`}
                  onClick={() => setActive(index)}
                >
                  <span aria-hidden="true">{item.id}</span>
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          <div
            className="capability-panel"
            id={panelId}
            role="tabpanel"
            aria-labelledby={`capability-${current.id}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <CapabilityDetail
                key={current.id}
                item={current}
                projects={projects}
                reducedMotion={reducedMotion}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
      <motion.div {...inViewFade(reducedMotion, 0.08)}>
        <ToolMarquee tools={tools} reducedMotion={reducedMotion} />
      </motion.div>
    </section>
  );
};

export default Expertise;
