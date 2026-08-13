import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./LivePipeline.css";

const STAGES = [
  { id: "01", label: "Spec" },
  { id: "02", label: "Build" },
  { id: "03", label: "Test" },
  { id: "04", label: "Gate" },
  { id: "05", label: "Release" },
];

function LivePipelineInner() {
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reducedMotion || paused) return undefined;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % STAGES.length);
    }, 1600);
    return () => window.clearInterval(id);
  }, [reducedMotion, paused]);

  return (
    <aside
      className="live-pipeline"
      aria-label="Quality pipeline"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <p className="live-pipeline-head">
        <span className="live-dot" aria-hidden="true" />
        Running · {STAGES[active].label}
      </p>
      <ol>
        {STAGES.map((stage, index) => (
          <li key={stage.id}>
            <button
              type="button"
              className={index === active ? "is-active" : ""}
              onClick={() => setActive(index)}
            >
              {index === active && !reducedMotion && (
                <motion.span
                  className="live-scan"
                  layoutId="live-scan"
                  transition={{ type: "spring", stiffness: 280, damping: 32 }}
                />
              )}
              <span className="live-id">{stage.id}</span>
              {stage.label}
            </button>
          </li>
        ))}
      </ol>
    </aside>
  );
}

const LivePipeline = memo(LivePipelineInner);
export default LivePipeline;
