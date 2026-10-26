import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./Contact.css";

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for non-secure contexts / older browsers
    try {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      const ok = document.execCommand("copy");
      field.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

const Contact = ({ contactInfo }) => {
  const reducedMotion = usePrefersReducedMotion();
  const [status, setStatus] = useState(null);
  const timer = useRef();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = useCallback(async () => {
    const ok = await copyText(contactInfo.email);
    setStatus(ok ? "copied" : "failed");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus(null), 2200);
  }, [contactInfo.email]);

  const cards = [
    {
      label: "Email",
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      Icon: Mail,
    },
    {
      label: "Phone",
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone.replace(/[^+\d]/g, "")}`,
      Icon: Phone,
    },
    {
      label: "LinkedIn",
      value: "ihtisham-khattak",
      href: contactInfo.social.linkedin,
      Icon: Linkedin,
      external: true,
    },
    {
      label: "Location",
      value: contactInfo.location,
      Icon: MapPin,
    },
  ];

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="contact-head">
          <p className="eyebrow">{"// 07 — CONTACT"}</p>
          <h2 id="contact-title" className="contact-title">
            Let&apos;s build something <em>reliable</em> together.
          </h2>

          <button type="button" className="contact-email" onClick={onCopy}>
            <span>{contactInfo.email}</span>
            <span className="contact-copy" aria-hidden="true">
              {status === "copied" ? (
                <Check size={18} strokeWidth={2} />
              ) : (
                <Copy size={18} strokeWidth={1.75} />
              )}
            </span>
            <span className="sr-only">Copy email address to clipboard</span>
          </button>

          <div className="contact-toast" role="status" aria-live="polite">
            <AnimatePresence>
              {status && (
                <motion.span
                  key={status}
                  className={`toast ${status === "failed" ? "is-error" : ""}`}
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  {status === "copied"
                    ? "✓ Copied"
                    : "Couldn't copy — select the address manually"}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        <RevealGroup as="ul" className="contact-grid">
          {cards.map((card) => {
            const { label, value, href, external } = card;
            const CardIcon = card.Icon;
            const body = (
              <>
                <span className="contact-icon">
                  <CardIcon size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span className="contact-text">
                  <span className="contact-label">{label}</span>
                  <span className="contact-value">{value}</span>
                </span>
                {href && (
                  <ArrowUpRight
                    className="contact-arrow"
                    size={18}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                )}
              </>
            );
            return (
              <RevealItem as="li" key={label}>
                {href ? (
                  <a
                    className="card contact-card"
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {body}
                  </a>
                ) : (
                  <div className="card contact-card is-static">{body}</div>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
};

export default Contact;
