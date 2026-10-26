import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { MagnifierBug } from "./Illustrations";
import { SkillIcon } from "./SkillIcon";
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
          <MagnifierBug />
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
