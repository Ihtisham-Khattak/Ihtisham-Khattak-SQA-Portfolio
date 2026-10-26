import { createElement, useEffect, useRef } from "react";
import "./Reveal.css";

// One shared IntersectionObserver reveals every element once. The animation
// itself is CSS (see Reveal.css), so there is no per-element JS animation cost
// and prefers-reduced-motion is handled in the stylesheet.
let observer;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );
  }
  return observer;
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const io = getObserver();
    io.observe(node);
    return () => io.unobserve(node);
  }, []);
  return ref;
}

// Fade + 16px rise when scrolled into view.
export function Reveal({ children, delay = 0, as = "div", className = "", style, ...props }) {
  const ref = useReveal();
  return createElement(
    as,
    {
      ref,
      className: `reveal ${className}`.trim(),
      style: { ...style, "--reveal-delay": `${delay}s` },
      ...props,
    },
    children
  );
}

// Parent that staggers its <RevealItem> children by 60ms each.
export function RevealGroup({ children, as = "div", className = "", ...props }) {
  const ref = useReveal();
  return createElement(
    as,
    { ref, className: `reveal-group ${className}`.trim(), ...props },
    children
  );
}

export function RevealItem({ children, as = "div", className = "", ...props }) {
  return createElement(
    as,
    { className: `reveal-item ${className}`.trim(), ...props },
    children
  );
}
