import { motion } from "framer-motion";
import "./About.css";

const About = ({ data }) => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{data.title}</h2>
          <div className="about-text">
            <p>{data.narrative}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
