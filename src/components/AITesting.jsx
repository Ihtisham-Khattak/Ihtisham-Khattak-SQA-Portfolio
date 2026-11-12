import Chapter, { SecTitle } from "./Chapter";
import Frame from "./Frame";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { ChatProbe } from "./Illustrations";
import { SkillIcon } from "./SkillIcon";
import "./AITesting.css";

const AITesting = ({ data }) => (
  <Chapter id="ai-testing" labelledBy="ai-title">
    <Reveal className="sec-head has-aside">
      <SecTitle id="ai-title" lead="Testing the systems" tail="that talk back." />
      <p className="sec-aside">{data.intro}</p>
    </Reveal>

    <div className="ai-grid">
      <Reveal delay={0.05}>
        <Frame className="ai-frame">
          <div className="ai-art">
            <ChatProbe />
          </div>
        </Frame>
      </Reveal>

      <RevealGroup as="ul" className="probes">
        {data.cards.map((card, index) => (
          <RevealItem as="li" key={card.title} className="bezel probe">
            <div className="bezel-in probe-in">
              <span className="icon-tile">
                <SkillIcon name={card.icon} size={20} />
              </span>
              <span className="probe-no" aria-hidden="true">
                P{index + 1}
              </span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  </Chapter>
);

export default AITesting;
