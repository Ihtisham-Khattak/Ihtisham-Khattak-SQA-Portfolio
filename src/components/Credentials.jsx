import Chapter, { SecTitle } from "./Chapter";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SkillIcon } from "./SkillIcon";
import banner1200 from "../assets/banner-keep-earth-green-1200.webp";
import banner2400 from "../assets/banner-keep-earth-green-2400.webp";
import "./Credentials.css";

const Credentials = ({ data, initiative }) => (
  <Chapter id="credentials" labelledBy="credentials-title">
    <Reveal className="sec-head">
      <SecTitle id="credentials-title" lead="Education &" tail="certifications" />
    </Reveal>

    <RevealGroup as="ul" className="credential-list">
      {data.map((item) => (
        <RevealItem as="li" key={item.title} className="bezel">
          <div className="bezel-in credential">
            <span className="icon-circle">
              <SkillIcon name={item.icon} size={20} />
            </span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {item.meta && <p className="credential-meta">{item.meta}</p>}
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>

    {/* The "Keep the Earth Green" reminder */}
    <Reveal as="figure" className="plate">
      <div className="bezel">
        <img
          src={banner2400}
          srcSet={`${banner1200} 1200w, ${banner2400} 2400w`}
          sizes="(min-width: 1096px) 1064px, 100vw"
          width="2400"
          height="600"
          alt={initiative.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
    </Reveal>
  </Chapter>
);

export default Credentials;
