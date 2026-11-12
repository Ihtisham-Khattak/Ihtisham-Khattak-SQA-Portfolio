import Chapter, { SecTitle } from "./Chapter";
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

const GROUP_ICON = {
  "testing-ai": "brain",
  "automation-api": "automation",
  "ai-dev": "sparkles",
  cicd: "workflow",
  "project-management": "kanban",
  methodologies: "agile",
};

function seenIn(skill, experience) {
  return experience
    .filter((job) => job.tags.some((tag) => tag === skill || UMBRELLA[tag]?.includes(skill)))
    .map((job) => job.company.split(" ")[0]);
}

const Skills = ({ data, experience }) => {
  const words = data.title.split(" ");
  const tail = words.pop();
  const lead = words.join(" ");
  return (
    <Chapter id="skills" labelledBy="skills-title">
      <Reveal className="sec-head has-aside">
        <SecTitle id="skills-title" lead={lead} tail={tail} />
        <p className="sec-aside">
          Grouped by discipline. A company name on the right means the skill appears in that
          role&apos;s focus areas.
        </p>
      </Reveal>

      <RevealGroup className="skill-grid">
        {data.groups.map((group) => (
          <RevealItem
            as="section"
            key={group.id}
            className={`bezel skill-card ${group.size ? `is-${group.size}` : ""}`}
            aria-labelledby={`g-${group.id}`}
          >
            <div className="bezel-in">
              <header className="skill-head">
                <span className="icon-tile">
                  <SkillIcon name={GROUP_ICON[group.id] || "target"} size={19} />
                </span>
                <h3 id={`g-${group.id}`}>{group.title}</h3>
                <span className="skill-count" aria-hidden="true">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </header>
              <ul className="skill-list">
                {group.items.map((item) => {
                  const seen = seenIn(item.label, experience);
                  return (
                    <li key={item.label} className="skill-row">
                      <SkillIcon name={item.icon} size={17} />
                      <span className="skill-name">{item.label}</span>
                      {seen.length > 0 && (
                        <span className="skill-seen">
                          <span className="sr-only">Seen in </span>
                          {seen.join(", ")}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Chapter>
  );
};

export default Skills;
