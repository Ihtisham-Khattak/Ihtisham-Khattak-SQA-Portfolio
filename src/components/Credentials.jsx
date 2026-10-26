import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SkillIcon } from "./SkillIcon";
import "./Credentials.css";

const Credentials = ({ data }) => (
  <section
    id="credentials"
    className="section credentials"
    aria-labelledby="credentials-title"
  >
    <div className="container">
      <Reveal className="section-head">
        <p className="eyebrow">{"// 06 — CREDENTIALS"}</p>
        <h2 id="credentials-title" className="section-title">
          Education &amp; certifications
        </h2>
      </Reveal>

      <RevealGroup as="ul" className="credential-grid">
        {data.map((item) => (
          <RevealItem as="li" key={item.title} className="card credential-card">
            <span className="credential-icon">
              <SkillIcon name={item.icon} size={22} />
            </span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {item.meta && <p className="credential-meta">{item.meta}</p>}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  </section>
);

export default Credentials;
