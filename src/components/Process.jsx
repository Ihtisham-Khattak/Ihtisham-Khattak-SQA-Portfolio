import Chapter from "./Chapter";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { PipelineDiagram } from "./Illustrations";
import "./Process.css";

const Process = ({ data }) => (
  <Chapter id="process" labelledBy="process-title">
    <Reveal className="process-head">
      <h2 id="process-title" className="section-title">
        {data.title}
      </h2>
    </Reveal>

    <Reveal className="process-diagram">
      <PipelineDiagram />
    </Reveal>

    <RevealGroup as="ol" className="steps">
      {data.steps.map((step) => (
        <RevealItem as="li" key={step.id} className="step">
          <span className="step-id">{step.id}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  </Chapter>
);

export default Process;
