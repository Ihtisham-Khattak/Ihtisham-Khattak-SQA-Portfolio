import { memo, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import LivePipeline from "./LivePipeline";

function PortraitStageInner({ webp, png, alt }) {
  const reducedMotion = usePrefersReducedMotion();
  const nodeRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 90, damping: 18 });
  const springY = useSpring(my, { stiffness: 90, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const onMove = (event) => {
    if (reducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const node = nodeRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div
      ref={nodeRef}
      className="hero-visual"
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.figure
        className="hero-portrait"
        style={
          reducedMotion
            ? undefined
            : { rotateX, rotateY, transformPerspective: 900 }
        }
      >
        <span className="hero-tick hero-tick-tl" aria-hidden="true" />
        <span className="hero-tick hero-tick-br" aria-hidden="true" />
        <picture>
          <source srcSet={webp} type="image/webp" />
          <img
            src={png}
            alt={alt}
            width={473}
            height={480}
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </motion.figure>
      <LivePipeline />
    </div>
  );
}

const PortraitStage = memo(PortraitStageInner);
export default PortraitStage;
