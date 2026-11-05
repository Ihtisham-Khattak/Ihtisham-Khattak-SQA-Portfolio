import Chapter from "./Chapter";
import { Reveal } from "./Reveal";
import CountMetric from "./CountMetric";
import "./Stats.css";

const Stats = ({ data }) => (
  <Chapter id="highlights" ariaLabel="Career highlights" className="chapter-stats">
    <Reveal>
      <ul className="stats-row">
        {data.map((stat) => (
          <CountMetric key={stat.label} raw={stat.value} label={stat.label} />
        ))}
      </ul>
    </Reveal>
  </Chapter>
);

export default Stats;
