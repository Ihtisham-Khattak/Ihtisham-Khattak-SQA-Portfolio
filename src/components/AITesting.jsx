import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { ChatProbe } from "./Illustrations";
import { SkillIcon } from "./SkillIcon";
import "./AITesting.css";

const AITesting = ({ data }) => (
  <section
    id="ai-testing"
    className="section ai-testing"
    aria-labelledby="ai-title"
  >
    <span className="ai-glow" aria-hidden="true" />
    <div className="container">
      <div className="ai-head">
        <Reveal>
          <p className="eyebrow">{"// 04 — AI TESTING"}</p>
          <h2 id="ai-title" className="section-title">
            {data.title}
          </h2>
          <p className="lead ai-intro">{data.intro}</p>
        </Reveal>
        <Reveal className="ai-art" delay={0.1}>
          <ChatProbe />
        </Reveal>
      </div>

      <RevealGroup as="ul" className="ai-grid">
        {data.cards.map((card) => (
          <RevealItem as="li" key={card.title} className="card ai-card">
            <span className="ai-icon">
              <SkillIcon name={card.icon} size={22} />
            </span>
            <div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  </section>
);

export default AITesting;
