import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./FailTrace.css";

function FailTraceInner({ path }) {
  const reducedMotion = usePrefersReducedMotion();
  const steps = [
    { id: "01", label: "Request", value: "GET" },
    { id: "02", label: "Path", value: path },
    { id: "03", label: "Expected", value: "200" },
    { id: "04", label: "Received", value: "404" },
    { id: "05", label: "Gate", value: "FAIL" },
  ];
  const last = steps.length - 1;
  const [active, setActive] = useState(reducedMotion ? last : 0);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const id = window.setInterval(() => {
      setActive((current) => (current >= last ? 0 : current + 1));
    }, 1100);
    return () => window.clearInterval(id);
  }, [reducedMotion, last]);

  return (
    <aside className="fail-trace" aria-label="Failed request">
      <p className="fail-trace-head">
        <span className={reducedMotion ? "" : "is-live"} aria-hidden="true" />
        Trace
      </p>
      <ol>
        {steps.map((step, index) => (
          <li key={step.id}>
            <p className={index === active ? "is-active" : ""}>
              {index === active && !reducedMotion && (
                <motion.span
                  className="fail-scan"
                  layoutId="fail-scan"
                  transition={{ type: "spring", stiffness: 280, damping: 32 }}
                />
              )}
              <span className="fail-id">{step.id}</span>
              <span className="fail-label">{step.label}</span>
              <span className="fail-value" title={step.value}>
                {step.value}
              </span>
            </p>
          </li>
        ))}
      </ol>
    </aside>
  );
}

const FailTrace = memo(FailTraceInner);
export default FailTrace;
