import { useReducedMotion } from "framer-motion";

export function usePrefersReducedMotion() {
  return Boolean(useReducedMotion());
}

const spring = { type: "spring", stiffness: 100, damping: 20 };

export function fadeUp(reducedMotion, delay = 0) {
  if (reducedMotion) {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      transition: { duration: 0 },
    };
  }
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { ...spring, delay },
  };
}

export function inViewFade(reducedMotion, delay = 0) {
  if (reducedMotion) {
    return {
      initial: false,
      whileInView: { opacity: 1 },
      viewport: { once: true },
      transition: { duration: 0 },
    };
  }
  return {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-12% 0px" },
    transition: { ...spring, delay },
  };
}
