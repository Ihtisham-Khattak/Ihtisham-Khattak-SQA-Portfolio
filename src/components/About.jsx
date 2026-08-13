import { motion } from "framer-motion";
import { usePrefersReducedMotion, inViewFade } from "../hooks/usePrefersReducedMotion";
import "./About.css";

const About = ({ data, quotes }) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <motion.div {...inViewFade(reducedMotion)}>
          <p className="section-kicker">
            <span aria-hidden="true">04</span>
            About
          </p>
          <h2 id="about-title" className="about-lead">
            {data.lead}
          </h2>
          <p className="about-body">{data.body}</p>
        </motion.div>

        {quotes?.length > 0 && (
          <div className="about-quotes">
            {quotes.map((item, index) => (
              <motion.blockquote
                key={item.name}
                {...inViewFade(reducedMotion, 0.08 + index * 0.06)}
              >
                <p>{item.feedback}</p>
                <footer>
                  <cite>{item.name}</cite>
                  <span>{item.role}</span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
