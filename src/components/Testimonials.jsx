import Chapter, { SecTitle } from "./Chapter";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import "./Testimonials.css";

// Two colleagues, quoted in full and always visible (no carousel to hide behind).
const Testimonials = ({ data }) => (
  <Chapter id="testimonials" labelledBy="testimonials-title">
    <Reveal className="sec-head">
      <SecTitle id="testimonials-title" lead="Heard from" />
    </Reveal>

    <RevealGroup as="ul" className="quotes">
      {data.map((quote) => (
        <RevealItem as="li" key={quote.name} className="bezel">
          <figure className="bezel-in quote">
            <blockquote>
              <p>{quote.feedback}</p>
            </blockquote>
            <figcaption>
              <span className="quote-name">{quote.name}</span>
              <span className="quote-role">{quote.role}</span>
            </figcaption>
          </figure>
        </RevealItem>
      ))}
    </RevealGroup>
  </Chapter>
);

export default Testimonials;
