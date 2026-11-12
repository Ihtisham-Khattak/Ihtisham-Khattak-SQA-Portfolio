import Chapter, { SecTitle } from "./Chapter";
import Frame from "./Frame";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { MagnifierBug } from "./Illustrations";
import { SkillIcon } from "./SkillIcon";
import "./About.css";

// Title split into a white lead and a tinted tail, at its natural break.
const splitAt = (text, word) => {
  const i = text.indexOf(word);
  return i > 0 ? [text.slice(0, i).trim(), text.slice(i)] : [text, ""];
};

const About = ({ data }) => {
  const [lead, tail] = splitAt(data.title, "your users");
  return (
    <Chapter id="about" labelledBy="about-title">
      <Reveal className="sec-head has-aside">
        <SecTitle id="about-title" lead={lead} tail={tail} />
        <p className="sec-aside about-body">{data.body}</p>
      </Reveal>

      <div className="about-grid">
        <RevealGroup as="ul" className="rows">
          {data.values.map((value) => (
            <RevealItem as="li" key={value.title} className="row">
              <span className="icon-circle">
                <SkillIcon name={value.icon} size={19} />
              </span>
              <div>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.08}>
          <Frame className="about-frame">
            <div className="about-art" aria-hidden="true">
              <MagnifierBug />
            </div>
          </Frame>
        </Reveal>
      </div>
    </Chapter>
  );
};

export default About;
