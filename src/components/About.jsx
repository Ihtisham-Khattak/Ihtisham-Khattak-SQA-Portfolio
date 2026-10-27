import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { MagnifierBug } from "./Illustrations";
import { SkillIcon } from "./SkillIcon";
import portrait480 from "../assets/portrait-480.webp";
import portrait880 from "../assets/portrait-880.webp";
import "./About.css";

const About = ({ data }) => (
  <section id="about" className="section about" aria-labelledby="about-title">
    <div className="container">
      <div className="about-grid">
        <Reveal className="about-copy">
          <p className="eyebrow">{"// 01 — ABOUT"}</p>
          <h2 id="about-title" className="section-title">
            {data.title}
          </h2>
          <p className="about-body lead">{data.body}</p>
        </Reveal>

        <Reveal className="about-art" delay={0.1}>
          <figure className="portrait">
            <img
              src={portrait880}
              srcSet={`${portrait480} 480w, ${portrait880} 880w`}
              sizes="(min-width: 1024px) 26rem, 80vw"
              width="880"
              height="1167"
              alt={data.portraitAlt}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="lens" aria-hidden="true">
            <MagnifierBug />
          </div>
        </Reveal>
      </div>

      <RevealGroup as="ul" className="values">
        {data.values.map((value) => (
          <RevealItem as="li" key={value.title} className="card value-card">
            <span className="value-icon">
              <SkillIcon name={value.icon} size={20} />
            </span>
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  </section>
);

export default About;
