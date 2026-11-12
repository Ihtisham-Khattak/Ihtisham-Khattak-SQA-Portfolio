import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Compass, Globe, Lock, Smartphone, Wrench, X } from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import Chapter, { SecTitle } from "./Chapter";
import { Reveal } from "./Reveal";
import "./Projects.css";

// Projects either carry a full test-case story (details: broke / fixed / result) or, when
// that story is not written yet, plain facts (platform, tooling, approach).
const FACT_ICON = { tooling: Wrench, approach: Compass };

// Each project reads as a test case: what was tested, what broke, what was fixed, the
// result. Every line is the project's own content; nothing is added here.
function Case({ project, index, total }) {
  const hasLink = Boolean(project.link) && !project.private;
  const headline = project.headline ?? { label: "Impact", value: project.impact };
  const PlatformIcon = project.platform === "mobile" ? Smartphone : Globe;
  return (
    <article
      id={project.id}
      className="bezel plan"
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${project.title}`}
    >
      <div className="bezel-in plan-in">
        <p className="label-caps plan-no">
          <span>
            Case {String(index + 1).padStart(2, "0")}
            <span aria-hidden="true"> / </span>
            {project.category}
          </span>
          {project.platform && <PlatformIcon size={16} strokeWidth={1.7} aria-hidden="true" />}
        </p>

        <h3 className="plan-title">{project.title}</h3>
        <p className="plan-meta">
          {project.role && (
            <>
              {project.role}
              <span aria-hidden="true"> / </span>
            </>
          )}
          {project.domain}
        </p>

        <p className="plan-impact">
          <span className="plan-impact-label">{headline.label}</span>
          {headline.value}
        </p>
        <p className="plan-desc">{project.description}</p>

        <dl className="plan-rows">
          {project.details ? (
            <>
              <div>
                <span className="row-mark is-broke" aria-hidden="true">
                  <X size={13} strokeWidth={2.4} />
                </span>
                <dt>Broke</dt>
                <dd>{project.details.problem}</dd>
              </div>
              <div>
                <span className="row-mark" aria-hidden="true">
                  <Check size={13} strokeWidth={2.4} />
                </span>
                <dt>Fixed</dt>
              </div>
              <div>
                <span className="row-mark is-result" aria-hidden="true">
                  <Check size={13} strokeWidth={2.4} />
                </span>
                <dt>Result</dt>
                <dd>{project.details.outcome}</dd>
              </div>
            </>
          ) : (
            (project.facts ?? []).map((fact) => {
              const FactIcon = fact.icon === "platform" ? PlatformIcon : FACT_ICON[fact.icon] ?? Compass;
              return (
                <div key={fact.label}>
                  <span className="row-mark" aria-hidden="true">
                    <FactIcon size={12} strokeWidth={2} />
                  </span>
                  <dt>{fact.label}</dt>
                  <dd>{fact.text}</dd>
                </div>
              );
            })
          )}
        </dl>

        <ul className="chips plan-stack" aria-label="Stack">
          {project.techStack.map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

const Projects = ({ data }) => {
  const reduced = usePrefersReducedMotion();
  const track = useRef(null);
  const [view, setView] = useState({ first: 1, last: 1, atStart: true, atEnd: false, thumb: 0, span: 100 });

  // Which slides are in view, and where the scroll thumb sits (all read from the track itself).
  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const slides = [...el.children];
    const left = el.scrollLeft;
    const right = left + el.clientWidth;
    const inView = slides
      .map((s, i) => ({ i, c: s.offsetLeft + s.offsetWidth / 2 - el.offsetLeft }))
      .filter(({ c }) => c >= left && c <= right)
      .map(({ i }) => i + 1);
    const next = {
      first: inView[0] ?? 1,
      last: inView[inView.length - 1] ?? 1,
      atStart: left <= 2,
      atEnd: left + el.clientWidth >= el.scrollWidth - 2,
      thumb: (left / el.scrollWidth) * 100,
      span: (el.clientWidth / el.scrollWidth) * 100,
    };
    setView((prev) =>
      prev.first === next.first &&
      prev.last === next.last &&
      prev.atStart === next.atStart &&
      prev.atEnd === next.atEnd &&
      Math.abs(prev.thumb - next.thumb) < 0.4
        ? prev
        : next
    );
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return undefined;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(el);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [measure]);

  const go = (dir) => {
    const el = track.current;
    if (!el) return;
    const slide = el.children[0];
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = slide.offsetWidth + gap;
    const page = Math.max(1, view.last - view.first + 1);
    el.scrollBy({ left: dir * step * page, behavior: reduced ? "auto" : "smooth" });
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  };

  return (
    <Chapter id="projects" labelledBy="projects-title">
      <Reveal className="sec-head has-aside">
        <SecTitle id="projects-title" lead="Proof from the" tail="release path." />
        <p className="sec-aside">Problems, the suite that replaced guesswork, and the result.</p>
      </Reveal>

      <Reveal className="carousel" delay={0.04}>
        <div className="carousel-bar">
          <p className="carousel-status" aria-live="polite">
            {view.first === view.last ? `Project ${view.first}` : `Projects ${view.first} to ${view.last}`} of {data.length}
          </p>
          <div className="carousel-controls">
            <button
              type="button"
              className="carousel-btn"
              onClick={() => go(-1)}
              disabled={view.atStart}
              aria-label="Previous projects"
            >
              <ChevronLeft size={20} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="carousel-btn"
              onClick={() => go(1)}
              disabled={view.atEnd}
              aria-label="Next projects"
            >
              <ChevronRight size={20} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="plans"
          ref={track}
          role="region"
          aria-roledescription="carousel"
          aria-label="Projects"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          {data.map((project, index) => (
            <Case key={project.id} project={project} index={index} total={data.length} />
          ))}
        </div>

        <div className="carousel-progress" aria-hidden="true">
          <span style={{ left: `${view.thumb}%`, width: `${view.span}%` }} />
        </div>
      </Reveal>
    </Chapter>
  );
};

export default Projects;
