import { useCallback, useEffect, useRef, useState } from "react";
import { Check, RotateCcw, ScanSearch } from "lucide-react";
import { SkillIcon } from "./SkillIcon";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./BugHunt.css";

// Demo bugs, one per principle. Coordinates are percentages of the demo screen (centre + size).
// They are illustrations of what each principle catches, not claims about past projects.
const BUGS = [
  { id: "strategy", x: 32, y: 53, w: 48, h: 11, tag: "Card field accepts letters" },
  { id: "automation", x: 27, y: 74, w: 38, h: 12, tag: "Pay disabled after Back" },
  { id: "ai", x: 81, y: 70, w: 30, h: 16, tag: "Bot invents an order ID", right: true },
];
const DWELL_MS = 380;

// The same demo screen is drawn twice: once normally, once as an X-ray under the lens.
function Screen({ xray = false }) {
  return (
    <div className={`screen ${xray ? "is-xray ground-ink" : ""}`} aria-hidden="true">
      <div className="scr-panel scr-form" />
      <div className="scr-panel scr-chat" />
      <p className="scr-title">Checkout</p>
      <p className="scr-label scr-l1">Email</p>
      <div className="scr-input scr-i1">name@example.com</div>
      <p className="scr-label scr-l2">Card number</p>
      <div className={`scr-input scr-i2 ${xray ? "is-defect" : ""}`}>4242 4242 42ab</div>
      <div className={`scr-btn ${xray ? "is-defect" : ""}`}>Pay now</div>
      <p className="scr-link">Back to cart</p>
      <p className="scr-chat-title">Support</p>
      <div className="scr-bubble scr-user">Where is my order?</div>
      <div className={`scr-bubble scr-bot ${xray ? "is-defect" : ""}`}>Order #48213 ships tomorrow.</div>
    </div>
  );
}

const inside = (b, x, y) => Math.abs(x - b.x) <= b.w / 2 && Math.abs(y - b.y) <= b.h / 2;

export default function BugHunt({ values }) {
  const reduced = usePrefersReducedMotion();
  const stage = useRef(null);
  const timers = useRef({});
  const [found, setFound] = useState([]);
  const [engaged, setEngaged] = useState(false);

  const place = useCallback((x, y) => {
    const el = stage.current;
    if (!el) return;
    el.style.setProperty("--lx", `${x}%`);
    el.style.setProperty("--ly", `${y}%`);
  }, []);

  const mark = useCallback((id) => {
    setFound((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const clearTimers = () => {
    Object.values(timers.current).forEach((t) => window.clearTimeout(t));
    timers.current = {};
  };
  useEffect(() => clearTimers, []);

  const track = (event) => {
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((event.clientX - r.left) / r.width) * 100));
    const y = Math.min(100, Math.max(0, ((event.clientY - r.top) / r.height) * 100));
    setEngaged(true);
    place(x, y);
    BUGS.forEach((b) => {
      const over = inside(b, x, y);
      if (over && !found.includes(b.id) && !timers.current[b.id]) {
        timers.current[b.id] = window.setTimeout(() => {
          mark(b.id);
          delete timers.current[b.id];
        }, DWELL_MS);
      } else if (!over && timers.current[b.id]) {
        window.clearTimeout(timers.current[b.id]);
        delete timers.current[b.id];
      }
    });
    if (event.type === "pointerdown") BUGS.forEach((b) => inside(b, x, y) && mark(b.id));
  };

  const goTo = (b, reveal) => {
    setEngaged(true);
    place(b.x, b.y);
    if (reveal) mark(b.id);
  };

  const reset = () => {
    clearTimers();
    setFound([]);
    setEngaged(false);
    place(50, 50);
  };

  const complete = found.length === BUGS.length;

  return (
    <div className="hunt">
      <div className="hunt-side">
        <ul className="findings">
          {values.map((value, i) => {
            const bug = BUGS[i];
            const isFound = found.includes(bug.id);
            return (
              <li key={value.title}>
                <button
                  type="button"
                  className={`finding ${isFound ? "is-found" : ""}`}
                  aria-pressed={isFound}
                  onClick={() => goTo(bug, true)}
                  onMouseEnter={() => goTo(bug, false)}
                  onFocus={() => goTo(bug, false)}
                >
                  <span className="icon-tile">
                    <SkillIcon name={value.icon} size={20} />
                  </span>
                  <span className="finding-body">
                    <span className="finding-title">{value.title}</span>
                    <span className="finding-text">{value.text}</span>
                    <span className="finding-bug">
                      {isFound ? `Found: ${bug.tag}` : "Tap to reveal the bug it catches"}
                    </span>
                  </span>
                  <span className="finding-chip" aria-hidden="true">
                    {isFound ? <Check size={15} strokeWidth={2.6} /> : <span className="chip-dot" />}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="hunt-hint">
          <ScanSearch size={16} strokeWidth={1.8} aria-hidden="true" />
          Move the lens over the demo screen, or pick a principle. Three bugs are planted.
        </p>
      </div>

      <figure className={`hunt-window bezel ${complete ? "is-complete" : ""}`}>
        <div className="bezel-in">
          <div className="hunt-bar">
            <span className="hunt-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="hunt-name" aria-hidden="true">checkout.demo</span>
            <span className="hunt-count" role="status" aria-live="polite">
              {found.length} of {BUGS.length} found
            </span>
          </div>

          <div
            ref={stage}
            className={`hunt-stage ${engaged || reduced ? "" : "is-hint"}`}
            onPointerMove={track}
            onPointerDown={track}
            onPointerLeave={clearTimers}
            onPointerCancel={clearTimers}
            role="img"
            aria-label="Demo checkout screen with a card field, a Pay button and a support chat. Three bugs are planted in it."
          >
            <Screen />
            <div className="hunt-xray">
              <Screen xray />
            </div>
            {BUGS.map((b) => (
              <span
                key={b.id}
                className={`bug-rect ${found.includes(b.id) ? "is-found" : ""}`}
                style={{ left: `${b.x - b.w / 2}%`, top: `${b.y - b.h / 2}%`, width: `${b.w}%`, height: `${b.h}%` }}
                aria-hidden="true"
              >
                <span className={`bug-tag ${b.right ? "is-right" : ""}`}>{b.tag}</span>
              </span>
            ))}
            <span className="lens" aria-hidden="true">
              <span className="lens-ring" />
              <span className="lens-handle" />
            </span>
          </div>

          <div className="hunt-foot">
            {complete ? (
              <p className="hunt-done">
                <Check size={16} strokeWidth={2.6} aria-hidden="true" />
                Release gate passed: all 3 bugs found before users did.
              </p>
            ) : (
              <p className="hunt-note">Demo screen, for illustration.</p>
            )}
            {(complete || found.length > 0) && (
              <button type="button" className="hunt-reset" onClick={reset}>
                <RotateCcw size={14} strokeWidth={2} aria-hidden="true" />
                Reset
              </button>
            )}
          </div>
        </div>
      </figure>
    </div>
  );
}
