import Chapter from "./Chapter";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SkillIcon } from "./SkillIcon";
import banner1200 from "../assets/banner-keep-earth-green-1200.webp";
import banner2400 from "../assets/banner-keep-earth-green-2400.webp";
import "./Credentials.css";

const Credentials = ({ data, initiative }) => (
  <Chapter id="credentials" labelledBy="credentials-title">
    <Reveal className="credentials-head">
      <h2 id="credentials-title" className="section-title">
        Education &amp; certifications
      </h2>
    </Reveal>

    <RevealGroup as="ul" className="credential-list">
      {data.map((item) => (
        <RevealItem as="li" key={item.title} className="credential">
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

    {/* The still moment before the Result: the "Keep the Earth Green" reminder */}
    <Reveal as="figure" className="plate">
      <img
        src={banner2400}
        srcSet={`${banner1200} 1200w, ${banner2400} 2400w`}
        sizes="(min-width: 1200px) 1160px, 100vw"
        width="2400"
        height="600"
        alt={initiative.alt}
        loading="lazy"
        decoding="async"
      />
    </Reveal>
  </Chapter>
);

export default Credentials;
