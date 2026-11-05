import { useEffect, useRef, useState } from "react";
import Chapter from "./Chapter";
import { useAudit } from "../audit/AuditContext";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./Result.css";

// Core Web Vitals thresholds: good / needs improvement / poor.
const rate = (value, good, poor) =>
  value <= good ? "good" : value <= poor ? "needs improvement" : "poor";
const toneOf = (value, good, poor) => (value <= good ? "" : value <= poor ? "is-warn" : "is-bad");

// The peak. A hard cut to the one dark ground; the run summary prints line by line
// as the sticky stage is scrolled, then the seal lands. Every number is measured live.
const Result = ({ personal }) => {
  const audit = useAudit();
  const reduced = usePrefersReducedMotion();
  const { summary, perf, errors } = audit;

  const lines = [
    { k: "Chapters verified", v: `${summary.done} of ${summary.chapters}` },
    { k: "Checks passed", v: `${summary.passed} of ${summary.total}` },
    { k: "Checks failed", v: String(summary.failed), bad: summary.failed > 0 },
    {
      k: "Largest Contentful Paint",
      v:
        perf.lcp == null
          ? "not reported by this browser"
          : `${(perf.lcp / 1000).toFixed(2)} s, ${rate(perf.lcp, 2500, 4000)}`,
      tone: perf.lcp == null ? "" : toneOf(perf.lcp, 2500, 4000),
    },
    {
      k: "Cumulative Layout Shift",
      v:
        perf.cls == null
          ? "not reported by this browser"
          : `${perf.cls.toFixed(3)}, ${rate(perf.cls, 0.1, 0.25)}`,
      tone: perf.cls == null ? "" : toneOf(perf.cls, 0.1, 0.25),
    },
    { k: "Uncaught runtime errors", v: String(errors), bad: errors > 0 },
  ];
  const steps = lines.length + 1; // the seal is the last step

  const [printed, setPrinted] = useState(0);
  const sentinels = useRef([]);
  const crossed = useRef(Array(steps).fill(false));

  useEffect(() => {
    if (reduced) return undefined;
    const recompute = () => {
      sentinels.current.forEach((el, i) => {
        if (el) crossed.current[i] = el.getBoundingClientRect().top <= window.innerHeight * 0.55;
      });
      let n = 0;
      while (n < steps && crossed.current[n]) n += 1;
      setPrinted(n);
    };
    const io = new IntersectionObserver(recompute, { threshold: [0, 1] });
    const track = sentinels.current[0]?.parentElement;
    if (track) io.observe(track);
    sentinels.current.forEach((s) => s && io.observe(s));
    return () => io.disconnect();
  }, [reduced, steps]);

  const shown = reduced ? steps : printed;
  const verdict = !summary.complete
    ? "running"
    : summary.failed > 0 || errors > 0
      ? "failed"
      : "passed";

  return (
    <Chapter id="result" ground="alt" labelledBy="result-title" className="chapter-result">
      <div className={`result-track ${reduced ? "is-static" : ""}`}>
        <div className="result-stage">
          <h2 id="result-title" className="result-title">
            Run summary
          </h2>

          <dl className="result-lines" aria-live="off">
            {lines.map((line, i) => (
              <div
                key={line.k}
                className={`result-line ${shown > i ? "is-printed" : ""} ${line.bad ? "is-bad" : ""} ${line.tone || ""}`.trim()}
              >
                <dt>{line.k}</dt>
                <span className="result-leader" aria-hidden="true" />
                <dd>{line.v}</dd>
              </div>
            ))}
          </dl>

          <div className="result-foot">
            <p className={`result-note ${shown > 2 ? "is-printed" : ""}`}>
              Measured in your browser while you scrolled this page. Automated checks cover only
              part of accessibility. They are not a full audit.
            </p>
            <div
              className={`seal ${shown >= steps ? "is-printed" : ""}`}
              data-ground="base"
              data-verdict={verdict}
              role="status"
            >
              <span className="seal-word">{verdict === "passed" ? "Passed" : verdict === "failed" ? "Failed" : "Running"}</span>
              <span className="seal-sign">
                Signed {personal.name}, {personal.title}
              </span>
            </div>
          </div>
        </div>

        {!reduced &&
          Array.from({ length: steps }, (_, i) => (
            <span
              key={i}
              className="result-sentinel"
              data-step={i}
              ref={(el) => {
                sentinels.current[i] = el;
              }}
              style={{ "--at": (i + 1) / (steps + 1) }}
              aria-hidden="true"
            />
          ))}
      </div>
    </Chapter>
  );
};

export default Result;
