import { memo } from "react";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SkillIcon } from "./SkillIcon";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./Skills.css";

const LogoMarquee = memo(function LogoMarquee({ keys, labels, reduced }) {
  const items = reduced ? keys : [...keys, ...keys];
  return (
    <div className="logo-marquee" aria-hidden="true">
      <div className={`logo-track ${reduced ? "is-static" : ""}`}>
        {items.map((key, index) => (
          <span className="logo-marquee-item" key={`${key}-${index}`}>
            <SkillIcon name={key} size={22} />
            {labels[key]}
          </span>
        ))}
      </div>
    </div>
  );
});

const Skills = ({ data }) => {
  const reduced = usePrefersReducedMotion();
  const labels = Object.fromEntries(
    data.groups.flatMap((group) => group.items.map((i) => [i.icon, i.label]))
  );

  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{"// 02 — SKILLS"}</p>
          <h2 id="skills-title" className="section-title">
            {data.title}
          </h2>
        </Reveal>
      </div>

      <Reveal>
        <LogoMarquee keys={data.marquee} labels={labels} reduced={reduced} />
      </Reveal>

      <div className="container">
        <RevealGroup as="ul" className="bento">
          {data.groups.map((group) => (
            <RevealItem
              as="li"
              key={group.id}
              className={`card bento-card ${group.size ? `is-${group.size}` : ""}`}
            >
              <h3>{group.title}</h3>
              <ul className="bento-chips">
                {group.items.map((item) => (
                  <li key={item.label} className="chip">
                    <SkillIcon name={item.icon} size={16} />
                    {item.label}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};

export default Skills;
