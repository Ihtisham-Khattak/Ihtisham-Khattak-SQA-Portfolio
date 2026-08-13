import { motion } from "framer-motion";
import { ArrowDownRight, Download } from "lucide-react";
import resumePDF from "../assets/Ihtisham_Khattak_SQA.pdf";
import portraitCutoutWebp from "../assets/ihtisham-portrait-cutout.webp";
import portraitCutoutPng from "../assets/ihtisham-portrait-cutout.png";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import Magnetic from "./Magnetic";
import PortraitStage from "./PortraitStage";
import CountMetric from "./CountMetric";
import ScrambleText from "./ScrambleText";
import "./Hero.css";

const ease = [0.16, 1, 0.3, 1];

const wordVariants = {
  hidden: { opacity: 0, y: "0.6em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const Hero = ({ data, personal, metrics }) => {
  const reducedMotion = usePrefersReducedMotion();
  const lines = data.headline.split("\n");

  return (
    <section id="top" className="hero-section" aria-label="Introduction">
      <div className="container">
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
              className="hero-eyebrow"
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
              }}
            >
              <ScrambleText text={data.eyebrow} />
            </motion.p>

            <motion.h1
              className="hero-headline"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: reducedMotion ? 0 : 0.12 },
                },
              }}
            >
              {lines.map((line) => (
                <motion.span
                  key={line}
                  className="hero-line"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: reducedMotion ? 0 : 0.045,
                      },
                    },
                  }}
                >
                  {line.split(" ").map((word, index) => (
                    <span key={`${word}-${index}`} className="hero-word-wrap">
                      <motion.span className="hero-word" variants={wordVariants}>
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="hero-subheadline"
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
            >
              {data.subheadline}
            </motion.p>

            <motion.div
              className="hero-cta"
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
              }}
            >
              <Magnetic href="#work" className="btn btn-primary">
                View work
                <ArrowDownRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </Magnetic>
              <Magnetic
                href={resumePDF}
                className="btn btn-outline"
                download="Ihtisham_Khattak_Resume.pdf"
              >
                <Download size={16} strokeWidth={1.5} aria-hidden="true" />
                Resume
              </Magnetic>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 18,
              delay: reducedMotion ? 0 : 0.15,
            }}
          >
            <PortraitStage
              webp={portraitCutoutWebp}
              png={portraitCutoutPng}
              alt={`${personal.name}, ${personal.title}`}
            />
          </motion.div>
        </div>

        {metrics?.length > 0 && (
          <ul className="hero-metrics" aria-label="Selected outcomes">
            {metrics.map((metric) => (
              <CountMetric
                key={metric.label}
                raw={metric.value}
                label={metric.label}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Hero;
