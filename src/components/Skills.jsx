import { motion } from "framer-motion";
import "./Skills.css";

const Skills = ({ data }) => {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {Object.entries(data).map(([category, items], index) => (
            <motion.div
              key={category}
              className="skills-category"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <h3 className="category-title">
                {category.replace(/([A-Z])/g, " $1").toUpperCase()}
              </h3>
              <div className="skill-tags">
                {items.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
