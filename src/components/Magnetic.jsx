import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const spring = { stiffness: 160, damping: 14, mass: 0.25 };

function setEntrySide(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const dist = {
    left: x,
    right: rect.width - x,
    top: y,
    bottom: rect.height - y,
  };
  event.currentTarget.dataset.from = Object.entries(dist).sort(
    (a, b) => a[1] - b[1]
  )[0][0];
}

const Magnetic = ({ children, className, ...props }) => {
  const reducedMotion = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  const onMove = (event) => {
    if (reducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.28);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.28);
  };

  return (
    <motion.a
      className={className}
      style={reducedMotion ? undefined : { x: springX, y: springY }}
      onPointerEnter={setEntrySide}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      {...props}
    >
      <span className="btn-label">{children}</span>
    </motion.a>
  );
};

export default Magnetic;
