import Chapter from "./Chapter";
import { Reveal } from "./Reveal";
import CountMetric from "./CountMetric";
import TestRunner from "./TestRunner";
import "./Stats.css";

// The "video block" of the page: the live terminal in a glowing frame, then the figures.
const Stats = ({ data }) => (
  <Chapter id="highlights" ariaLabel="Career highlights" className="chapter-stats">
    <Reveal className="showcase">
      <TestRunner />
    </Reveal>

    <Reveal className="bezel stats-bezel" delay={0.05}>
      <ul className="bezel-in stats-row">
        {data.map((stat) => (
          <CountMetric key={stat.label} raw={stat.value} label={stat.label} />
        ))}
      </ul>
    </Reveal>
  </Chapter>
);

export default Stats;
