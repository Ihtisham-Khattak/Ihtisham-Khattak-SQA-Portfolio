import Chapter from "./Chapter";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import "./Testimonials.css";

// Two colleagues, quoted in full and always visible (no carousel to hide behind).
const Testimonials = ({ data }) => (
  <Chapter id="testimonials" ground="subtle" labelledBy="testimonials-title">
    <Reveal className="quotes-head">
      <h2 id="testimonials-title" className="section-title">
        Heard from
      </h2>
    </Reveal>

    <RevealGroup as="ul" className="quotes">
      {data.map((quote) => (
        <RevealItem as="li" key={quote.name}>
          <figure className="quote">
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
