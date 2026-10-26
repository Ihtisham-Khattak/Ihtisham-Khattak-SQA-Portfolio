import { Reveal } from "./Reveal";
import CountMetric from "./CountMetric";
import "./Stats.css";

const Stats = ({ data }) => (
  <section className="stats" aria-label="Career highlights">
    <div className="container">
      <Reveal>
        <ul className="stats-row">
          {data.map((stat) => (
            <CountMetric key={stat.label} raw={stat.value} label={stat.label} />
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

export default Stats;
