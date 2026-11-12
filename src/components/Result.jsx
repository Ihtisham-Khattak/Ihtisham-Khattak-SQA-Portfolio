import { useEffect, useRef, useState } from "react";
import Chapter, { SecTitle } from "./Chapter";
import { Reveal } from "./Reveal";
import { useAudit } from "../audit/AuditContext";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./Result.css";

// Core Web Vitals thresholds: good / needs improvement / poor.
const rate = (value, good, poor) =>
  value <= good ? "good" : value <= poor ? "needs improvement" : "poor";
const toneOf = (value, good, poor) => (value <= good ? "" : value <= poor ? "is-warn" : "is-bad");

// The run summary. Every number is measured live in the visitor's browser: the audit
// totals, plus LCP and CLS when the browser reports them. The lines print once the
// card scrolls into view, then the seal lands.
const Result = ({ personal }) => {
  const audit = useAudit();
  const reduced = usePrefersReducedMotion();
  const { summary, perf, errors } = audit;
  const [printed, setPrinted] = useState(reduced);
  const card = useRef(null);

  useEffect(() => {
    if (reduced || !card.current) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPrinted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(card.current);
    return () => io.disconnect();
  }, [reduced]);

  const lines = [
    { k: "Sections verified", v: `${summary.done} of ${summary.chapters}` },
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

  const verdict = !summary.complete ? "running" : summary.failed > 0 || errors > 0 ? "failed" : "passed";

  return (
    <Chapter id="result" labelledBy="result-title">
      <Reveal className="sec-head has-aside">
        <SecTitle id="result-title" lead="Run" tail="summary" />
        <p className="sec-aside">
          Measured in your browser while you scrolled this page. Automated checks cover only part
          of accessibility. They are not a full audit.
        </p>
      </Reveal>

      <Reveal className="bezel" delay={0.04}>
        <div className="bezel-in result-in" ref={card}>
          <dl className="result-lines">
            {lines.map((line, i) => (
              <div
                key={line.k}
                className={`result-line ${printed ? "is-printed" : ""} ${line.bad ? "is-bad" : ""} ${line.tone || ""}`.trim()}
                style={{ "--i": i }}
              >
                <dt>{line.k}</dt>
                <span className="result-leader" aria-hidden="true" />
                <dd>{line.v}</dd>
              </div>
            ))}
          </dl>

          <div className={`seal ${printed ? "is-printed" : ""}`} data-verdict={verdict} role="status">
            <span className="seal-word">
              {verdict === "passed" ? "Passed" : verdict === "failed" ? "Failed" : "Running"}
            </span>
            <span className="seal-sign">
              Signed {personal.name}, {personal.title}
            </span>
          </div>
        </div>
      </Reveal>
    </Chapter>
  );
};

export default Result;
