import Chapter, { SecTitle } from "./Chapter";
import Frame from "./Frame";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { PipelineDiagram } from "./Illustrations";
import { SkillIcon } from "./SkillIcon";
import "./Process.css";

const STEP_ICON = { Plan: "target", Automate: "automation", Integrate: "workflow", Verify: "regression" };

const Process = ({ data }) => (
  <Chapter id="process" labelledBy="process-title">
    <Reveal className="sec-head">
      <SecTitle id="process-title" lead="Quality built into" tail="every sprint" />
    </Reveal>

    <Reveal delay={0.04}>
      <Frame className="process-frame">
        <PipelineDiagram />
      </Frame>
    </Reveal>

    <RevealGroup as="ol" className="steps">
      {data.steps.map((step) => (
        <RevealItem as="li" key={step.id} className="bezel step">
          <div className="bezel-in step-in">
            <div className="step-top">
              <span className="icon-circle">
                <SkillIcon name={STEP_ICON[step.title] || "target"} size={18} />
              </span>
              <span className="label-caps">Step {step.id}</span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  </Chapter>
);

export default Process;
