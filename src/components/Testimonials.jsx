import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./Testimonials.css";

const Testimonials = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  }, [data.length]);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  }, [data.length]);

  useEffect(() => {
    if (paused || reducedMotion || data.length <= 1) return undefined;
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, [paused, reducedMotion, nextTestimonial, data.length]);

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <h2 className="section-title">What People Say</h2>

        <div
          className="carousel-container"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <button
            type="button"
            className="carousel-btn prev"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>

          <div
            className="testimonial-wrapper"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={currentIndex}
                className="testimonial-card carousel-card"
                initial={reducedMotion ? false : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, x: -40 }}
                transition={{ duration: reducedMotion ? 0 : 0.3 }}
              >
                <div className="quote-icon" aria-hidden="true">
                  <Quote size={32} />
                </div>
                <p className="testimonial-text">
                  "{data[currentIndex].feedback}"
                </p>
                <footer className="testimonial-author">
                  <div className="author-name">{data[currentIndex].name}</div>
                  <div className="author-role">{data[currentIndex].role}</div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <button
            type="button"
            className="carousel-btn next"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </div>

        <div className="carousel-dots" role="tablist" aria-label="Testimonials">
          {data.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-selected={index === currentIndex}
              role="tab"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
