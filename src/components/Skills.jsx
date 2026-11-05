import Chapter from "./Chapter";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SkillIcon } from "./SkillIcon";
import "./Skills.css";

// Where a skill is "seen in" is derived from the experience tags already in the
// data. A skill is matched only when a tag names it, or is an obvious umbrella for
// it; nothing is inferred beyond that.
const UMBRELLA = {
  "AI/LLM Testing": ["AI Chatbot Testing", "LLM Testing"],
  Regression: ["Regression Testing"],
};

function seenIn(skill, experience) {
  return experience
    .filter((job) =>
      job.tags.some((tag) => tag === skill || UMBRELLA[tag]?.includes(skill))
    )
    .map((job) => job.company.split(" ")[0]);
}

const Skills = ({ data, experience }) => (
  <Chapter id="skills" labelledBy="skills-title">
    <Reveal className="ledger-head">
      <h2 id="skills-title" className="section-title">
        {data.title}
      </h2>
      <p className="ledger-key">
        Grouped by discipline. A company name on the right means the skill appears in that
        role&apos;s focus areas.
      </p>
    </Reveal>

    <RevealGroup className="ledger">
      {data.groups.map((group) => (
        <RevealItem as="section" key={group.id} className="ledger-group" aria-labelledby={`g-${group.id}`}>
          <h3 id={`g-${group.id}`} className="ledger-title">
            {group.title}
            <span className="ledger-count">{String(group.items.length).padStart(2, "0")}</span>
          </h3>
          <ul>
            {group.items.map((item) => {
              const seen = seenIn(item.label, experience);
              return (
                <li key={item.label} className="ledger-row">
                  <SkillIcon name={item.icon} size={17} />
                  <span className="ledger-name">{item.label}</span>
                  <span className="ledger-leader" aria-hidden="true" />
                  {seen.length > 0 && (
                    <span className="ledger-seen">
                      <span className="sr-only">Seen in </span>
                      {seen.join(", ")}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </RevealItem>
      ))}
    </RevealGroup>
  </Chapter>
);

export default Skills;
