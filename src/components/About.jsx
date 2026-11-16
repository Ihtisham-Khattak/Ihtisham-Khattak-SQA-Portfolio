import Chapter, { SecTitle } from "./Chapter";
import BugHunt from "./BugHunt";
import { Reveal } from "./Reveal";
import "./About.css";

// Title split into a white lead and a tinted tail, at its natural break.
const splitAt = (text, word) => {
  const i = text.indexOf(word);
  return i > 0 ? [text.slice(0, i).trim(), text.slice(i)] : [text, ""];
};

// Marks the key phrases in the paragraph so it can be skimmed. The text itself is unchanged.
function emphasize(text, phrases = []) {
  if (!phrases.length) return text;
  const pattern = new RegExp(`(${phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text.split(pattern).map((part, i) =>
    phrases.includes(part) ? (
      <strong key={i} className="mark">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

const About = ({ data }) => {
  const [lead, tail] = splitAt(data.title, "your users");
  return (
    <Chapter id="about" labelledBy="about-title" className="chapter-about">
      <Reveal className="sec-head has-aside">
        <SecTitle id="about-title" lead={lead} tail={tail} className="about-title" />
        <p className="sec-aside about-body">{emphasize(data.body, data.highlights)}</p>
      </Reveal>

      <Reveal delay={0.06}>
        <BugHunt values={data.values} />
      </Reveal>
    </Chapter>
  );
};

export default About;
