import { memo, useCallback, useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./QuoteCarousel.css";

const INTERVAL = 7000;
const spring = { type: "spring", stiffness: 100, damping: 20 };

function QuoteCarouselInner({ quotes }) {
  const reducedMotion = usePrefersReducedMotion();
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const count = quotes.length;
  const current = quotes[index];

  const go = useCallback(
    (step) => {
      setDirection(step);
      setIndex((value) => (value + step + count) % count);
    },
    [count]
  );

  const goTo = useCallback(
    (next) => {
      if (next === index) return;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index]
  );

  useEffect(() => {
    if (reducedMotion || paused || count < 2) return undefined;
    const id = window.setInterval(() => go(1), INTERVAL);
    return () => window.clearInterval(id);
  }, [reducedMotion, paused, count, go, index]);

  if (!count) return null;

  return (
    <div
      className={`quote-carousel ${paused ? "is-paused" : ""}`}
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(-1);
        }
      }}
    >
      <p id={labelId} className="quote-kicker">
        Heard from
      </p>

      <div className="quote-stage">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.blockquote
            key={current.name}
            className="quote-slide"
            custom={direction}
            initial={
              reducedMotion ? false : { opacity: 0, x: direction * 28 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, x: direction * -28 }
            }
            transition={reducedMotion ? { duration: 0 } : spring}
            drag={reducedMotion || count < 2 ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -56) go(1);
              if (info.offset.x > 56) go(-1);
            }}
            aria-live="polite"
          >
            <p>{current.feedback}</p>
            <footer>
              <cite>{current.name}</cite>
              <span>{current.role}</span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <div className="quote-controls">
          <ol className="quote-index">
            {quotes.map((item, itemIndex) => (
              <li key={item.name}>
                <button
                  type="button"
                  className={itemIndex === index ? "is-active" : ""}
                  aria-label={`Show quote from ${item.name}`}
                  aria-current={itemIndex === index ? "true" : undefined}
                  onClick={() => goTo(itemIndex)}
                >
                  {itemIndex === index && !reducedMotion && (
                    <motion.span
                      className="quote-scan"
                      layoutId="quote-scan"
                      transition={{ type: "spring", stiffness: 280, damping: 32 }}
                    />
                  )}
                  <span className="quote-num" aria-hidden="true">
                    {String(itemIndex + 1).padStart(2, "0")}
                  </span>
                  {item.name}
                </button>
              </li>
            ))}
          </ol>

          <div className="quote-nav">
            <button
              type="button"
              aria-label="Previous quote"
              onClick={() => go(-1)}
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Next quote"
              onClick={() => go(1)}
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}

      {count > 1 && !reducedMotion && (
        <div className="quote-progress" aria-hidden="true">
          <span key={index} />
        </div>
      )}
    </div>
  );
}

const QuoteCarousel = memo(QuoteCarouselInner);
export default QuoteCarousel;
