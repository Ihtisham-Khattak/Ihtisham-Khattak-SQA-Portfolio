import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { PipelineDiagram } from "./Illustrations";
import "./Process.css";

const Process = ({ data }) => (
  <section id="process" className="section process" aria-labelledby="process-title">
    <div className="container">
      <Reveal className="section-head">
        <p className="eyebrow">{"// 05 — PROCESS"}</p>
        <h2 id="process-title" className="section-title">
          {data.title}
        </h2>
      </Reveal>

      <Reveal className="process-diagram card">
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
    </div>
  </section>
);

export default Process;
