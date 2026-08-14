import { motion } from "framer-motion";
import { usePrefersReducedMotion, inViewFade } from "../hooks/usePrefersReducedMotion";
import QuoteCarousel from "./QuoteCarousel";
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

        {quotes?.length > 0 && <QuoteCarousel quotes={quotes} />}
      </div>
    </section>
  );
};

export default About;
