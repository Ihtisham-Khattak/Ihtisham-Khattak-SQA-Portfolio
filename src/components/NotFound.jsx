import { Fragment, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import Magnetic from "./Magnetic";
import ScrambleText from "./ScrambleText";
import FailTrace from "./FailTrace";
import "./NotFound.css";

const ease = [0.16, 1, 0.3, 1];

const wordVariants = {
  hidden: { opacity: 0, y: "0.6em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const recover = [
  { id: "01", name: "Experience", href: "/#experience", hint: "Where it shipped" },
  { id: "02", name: "Skills", href: "/#skills", hint: "Tools and methods" },
  { id: "03", name: "Contact", href: "/#contact", hint: "Write directly" },
];

const NotFound = () => {
  const reducedMotion = usePrefersReducedMotion();
  const headingRef = useRef(null);
  const path =
    typeof window === "undefined" ? "/" : window.location.pathname || "/";
  const headline = "This route never shipped.";

  useEffect(() => {
    document.title = "Page not found | Ihtisham Khattak";
    headingRef.current?.focus();
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, follow");
    return () => {
      document.title = "Ihtisham Khattak — Senior QA Engineer";
      robots?.remove();
    };
  }, []);

  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <p className="not-found-mark" aria-hidden="true">
        404
      </p>

      <div className="container not-found-layout">
        <motion.div
          className="not-found-copy"
          initial={reducedMotion ? false : "hidden"}
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: reducedMotion ? 0 : 0.08 },
            },
          }}
        >
          <motion.p
            className="not-found-kicker"
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
            }}
          >
            <ScrambleText text="Assertion failed" />
          </motion.p>

          <motion.h1
            ref={headingRef}
            id="not-found-title"
            className="not-found-title"
            tabIndex={-1}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: reducedMotion ? 0 : 0.05 },
              },
            }}
          >
            {headline.split(" ").map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                {index > 0 && " "}
                <span className="not-found-word-wrap">
                  <motion.span className="not-found-word" variants={wordVariants}>
                    {word}
                  </motion.span>
                </span>
              </Fragment>
            ))}
          </motion.h1>

          <motion.p
            className="not-found-body"
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            }}
          >
            The suite has no page at this URL. Home still holds the work, the
            practice, and a way to write.
          </motion.p>

          <motion.div
            className="not-found-cta"
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
            }}
          >
            <Magnetic href="/" className="btn btn-primary">
              Return home
              <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </Magnetic>
          </motion.div>

          <nav className="not-found-recover" aria-label="Continue on the site">
            {recover.map((item) => (
              <a key={item.href} href={item.href}>
                <span aria-hidden="true">{item.id}</span>
                <span>
                  {item.name}
                  <small>{item.hint}</small>
                </span>
                <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </motion.div>

        <FailTrace path={path} />
      </div>
    </section>
  );
};

export default NotFound;
