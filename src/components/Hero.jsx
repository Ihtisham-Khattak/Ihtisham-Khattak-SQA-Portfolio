import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, Download } from "lucide-react";
import resumePDF from "../assets/Ihtisham_Khattak_SQA.pdf";
import portraitCutoutWebp from "../assets/ihtisham-portrait-cutout.webp";
import portraitCutoutPng from "../assets/ihtisham-portrait-cutout.png";
import {
  usePrefersReducedMotion,
  fadeUp,
} from "../hooks/usePrefersReducedMotion";
import "./Hero.css";

const ease = [0.22, 1, 0.36, 1];

const Hero = ({ data, personal, metrics }) => {
  const reducedMotion = usePrefersReducedMotion();
  const role = data.role || personal.title;
  const headline = data.headline || personal.tagline;
  const portraitRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 90, damping: 18 });
  const springY = useSpring(my, { stiffness: 90, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const shiftX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const shiftY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const node = portraitRef.current;
    if (!node) return undefined;

    const onMove = (event) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      mx.set(x);
      my.set(y);
    };

    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [reducedMotion, mx, my]);

  return (
    <section id="top" className="hero-section" aria-label="Introduction">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-beam" />
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
      </div>

      <div className="container hero-container">
        <div className="hero-layout">
          <motion.div
            className="hero-copy"
            initial={reducedMotion ? false : "hidden"}
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: reducedMotion ? 0 : 0.09 },
              },
            }}
          >
            <motion.p
              className="hero-brand"
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
              }}
            >
              {personal.name}
            </motion.p>

            <motion.p
              className="hero-role"
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
            >
              {role}
            </motion.p>

            <motion.h1
              className="hero-headline"
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
              }}
            >
              {headline}
            </motion.h1>

            <motion.p
              className="hero-subheadline"
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
              }}
            >
              {data.subheadline}
            </motion.p>

            <motion.div
              className="hero-cta"
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
            >
              <a href="#experience" className="btn btn-primary">
                View Experience
                <ArrowDownRight size={18} aria-hidden="true" />
              </a>
              <a href="#projects" className="btn btn-outline">
                Case Studies
              </a>
              <a
                href={resumePDF}
                className="btn btn-outline"
                download="Ihtisham_Khattak_Resume.pdf"
              >
                <Download size={18} aria-hidden="true" /> Resume
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.9, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.95,
              delay: reducedMotion ? 0 : 0.18,
              ease,
            }}
          >
            <div
              ref={portraitRef}
              className={`hero-portrait ${hovered ? "is-hovered" : ""}`}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <div className="hero-portrait-glow" aria-hidden="true" />
              <div className="hero-portrait-ring" aria-hidden="true" />
              <div className="hero-portrait-orbit" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <motion.div
                className="hero-portrait-float"
                style={
                  reducedMotion
                    ? undefined
                    : {
                        rotateX,
                        rotateY,
                        x: shiftX,
                        y: shiftY,
                        transformPerspective: 900,
                      }
                }
                animate={
                  reducedMotion
                    ? undefined
                    : { y: hovered ? -4 : [0, -12, 0] }
                }
                transition={
                  reducedMotion
                    ? undefined
                    : hovered
                      ? { duration: 0.35 }
                      : {
                          duration: 5.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                }
              >
                <picture>
                  <source srcSet={portraitCutoutWebp} type="image/webp" />
                  <img
                    src={portraitCutoutPng}
                    alt={`${personal.name}, ${role}`}
                    width={473}
                    height={480}
                    decoding="async"
                    fetchPriority="high"
                    className="hero-portrait-img"
                  />
                </picture>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {metrics?.length > 0 && (
          <motion.ul
            className="hero-metrics"
            aria-label="Impact metrics"
            {...fadeUp(reducedMotion, 0.4)}
          >
            {metrics.map((metric, index) => (
              <motion.li
                key={metric.label}
                className="hero-metric"
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.45,
                  delay: reducedMotion ? 0 : 0.5 + index * 0.07,
                  ease,
                }}
              >
                <span className="metric-value">{metric.value}</span>
                <span className="metric-label">{metric.label}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
};

export default Hero;
