import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import SectionIntro from "./SectionIntro";
import "./Experience.css";

const Experience = ({ data }) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="experience"
      className="section experience-section"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <SectionIntro
          index="03"
          label="Experience"
          title="Where the practice was applied."
          aside="Dec 2020 — Present. Roles, companies, and what moved."
          titleId="experience-title"
        />

        <ol className="timeline">
          {data.map((job, index) => (
            <motion.li
              key={`${job.company}-${job.role}`}
              className={`timeline-item ${index === 0 ? "is-current" : ""}`}
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: index * 0.08,
                    }
              }
            >
              <p className="timeline-year">
                <span>{job.year}</span>
                {index === 0 && <span>Now</span>}
              </p>
              <article className="timeline-role">
                <p className="timeline-company">{job.company}</p>
                <h3>{job.role}</h3>
                <p className="timeline-meta">
                  {job.duration}
                  {job.location ? `  ·  ${job.location}` : ""}
                </p>
                <p className="timeline-copy">{job.contribution}</p>
                <ul>
                  {job.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {job.tech?.length > 0 && (
                  <p className="timeline-tech">{job.tech.join("  ·  ")}</p>
                )}
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
