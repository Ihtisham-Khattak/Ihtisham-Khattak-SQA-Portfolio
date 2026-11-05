import Chapter from "./Chapter";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { ChatProbe } from "./Illustrations";
import { SkillIcon } from "./SkillIcon";
import "./AITesting.css";

const AITesting = ({ data }) => (
  <Chapter id="ai-testing" labelledBy="ai-title">
    <div className="ai-head">
      <Reveal>
        <h2 id="ai-title" className="section-title">
          {data.title}
        </h2>
        <p className="lead ai-intro">{data.intro}</p>
      </Reveal>
      <Reveal className="ai-art" delay={0.1}>
        <ChatProbe />
      </Reveal>
    </div>

    <RevealGroup as="ul" className="probes">
      {data.cards.map((card, index) => (
        <RevealItem as="li" key={card.title} className="probe">
          <span className="probe-no" aria-hidden="true">
            P{index + 1}
          </span>
          <span className="probe-icon">
            <SkillIcon name={card.icon} size={22} />
          </span>
          <div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  </Chapter>
);

export default AITesting;
