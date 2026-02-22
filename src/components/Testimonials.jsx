import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import "./Testimonials.css";

const Testimonials = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]); // Reset timer on interaction

  return (
    <section className="section testimonials-section">
      <div className="container">
        <h2 className="section-title">What People Say</h2>

        <div className="carousel-container">
          <button
            className="carousel-btn prev"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="testimonial-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="testimonial-card carousel-card"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="quote-icon">
                  <Quote size={32} />
                </div>
                <p className="testimonial-text">
                  "{data[currentIndex].feedback}"
                </p>
                <div className="testimonial-author">
                  <div className="author-name">{data[currentIndex].name}</div>
                  <div className="author-role">{data[currentIndex].role}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            className="carousel-btn next"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="carousel-dots">
          {data.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
