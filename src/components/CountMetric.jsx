import { memo, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

function parseMetric(raw) {
  const match = String(raw).match(/^(\d+)(.*)$/);
  if (!match) return { value: 0, suffix: raw };
  return { value: Number(match[1]), suffix: match[2] };
}

function CountMetricInner({ raw, label }) {
  const reducedMotion = usePrefersReducedMotion();
  const { value, suffix } = parseMetric(raw);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const [display, setDisplay] = useState(() => (reducedMotion ? value : 0));

  useEffect(() => {
    if (!inView || reducedMotion) return undefined;

    let frame;
    let start;
    const duration = 900;

    const tick = (time) => {
      if (start === undefined) start = time;
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion, value]);

  return (
    <li ref={ref}>
      <span>
        {display}
        {suffix}
      </span>
      {label}
    </li>
  );
}

const CountMetric = memo(CountMetricInner);
export default CountMetric;
