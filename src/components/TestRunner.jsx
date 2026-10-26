import { memo, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./TestRunner.css";

const COMMAND = "npx playwright test";

const RESULTS = [
  { name: "auth › login with valid credentials", time: "412ms" },
  { name: "api › POST /orders returns 201", time: "188ms" },
  { name: "chatbot › retains context across 10 turns", time: "1.2s" },
  { name: "chatbot › no hallucinated order IDs", time: "940ms" },
  { name: "regression › checkout flow", time: "2.1s" },
];

const SUMMARY = "5 passed · coverage 95.4%";

const TYPE_MS = 42;
const RESULT_MS = 520;

function CoverageRing({ active }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="coverage-card" aria-hidden="true">
      <svg viewBox="0 0 56 56" width="56" height="56">
        <circle className="ring-track" cx="28" cy="28" r={radius} />
        <circle
          className="ring-value"
          cx="28"
          cy="28"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={active ? circumference * 0.05 : circumference}
          transform="rotate(-90 28 28)"
        />
      </svg>
      <div>
        <p className="coverage-value">95%</p>
        <p className="coverage-label">coverage</p>
      </div>
    </div>
  );
}

function TestRunnerInner() {
  const reducedMotion = usePrefersReducedMotion();
  const [typed, setTyped] = useState(reducedMotion ? COMMAND.length : 0);
  const [shown, setShown] = useState(reducedMotion ? RESULTS.length : 0);
  const [done, setDone] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return undefined;
    let timer;
    let cancelled = false;
    const wait = (ms, fn) => {
      timer = window.setTimeout(() => !cancelled && fn(), ms);
    };

    const typeNext = (count) => {
      setTyped(count);
      if (count < COMMAND.length) wait(TYPE_MS, () => typeNext(count + 1));
      else wait(450, () => showNext(1));
    };
    const showNext = (count) => {
      setShown(count);
      if (count < RESULTS.length) wait(RESULT_MS, () => showNext(count + 1));
      else wait(600, () => setDone(true));
    };

    wait(500, () => typeNext(1));
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reducedMotion]);

  return (
    <div className="test-runner">
      <div className="runner-card">
        <div className="runner-bar">
          <span className="runner-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="runner-title">playwright — zsh</span>
        </div>

        {/* Screen readers get the final result, not the typewriter */}
        <p className="sr-only">
          Test run: {RESULTS.length} tests passed. {SUMMARY}.
        </p>

        <div className="runner-body" aria-hidden="true">
          <p className="runner-line">
            <span className="runner-prompt">$</span> {COMMAND.slice(0, typed)}
            {typed < COMMAND.length || !done ? (
              <span className="runner-caret" />
            ) : null}
          </p>
          <ul className="runner-results">
            {RESULTS.slice(0, shown).map((result) => (
              <li key={result.name} className="runner-line runner-result">
                <span className="runner-check">✓</span>
                <span className="runner-name">{result.name}</span>
                <span className="runner-time">({result.time})</span>
              </li>
            ))}
          </ul>
          <p className={`runner-line runner-summary ${done ? "is-visible" : ""}`}>
            {SUMMARY}
          </p>
        </div>
        <span className="runner-scan" aria-hidden="true" />
      </div>
      <CoverageRing active={done} />
    </div>
  );
}

const TestRunner = memo(TestRunnerInner);
export default TestRunner;
