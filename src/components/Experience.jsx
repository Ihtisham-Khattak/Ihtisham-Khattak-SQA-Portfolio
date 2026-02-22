import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import "./Experience.css";

const Experience = ({ data }) => {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="timeline">
          {data.map((job, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="timeline-dot">
                <Briefcase size={16} color="white" />
              </div>
              <div className="timeline-content">
                <div className="job-header">
                  <h3>{job.role}</h3>
                  <span className="company">{job.company}</span>
                  <span className="duration">{job.duration}</span>
                </div>
                <ul className="responsibilities">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
