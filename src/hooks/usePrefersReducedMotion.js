import { useReducedMotion } from "framer-motion";

export function usePrefersReducedMotion() {
  return Boolean(useReducedMotion());
}

export function fadeUp(reducedMotion, delay = 0) {
  if (reducedMotion) {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      transition: { duration: 0 },
    };
  }
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6 },
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
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay, duration: 0.5 },
  };
}
