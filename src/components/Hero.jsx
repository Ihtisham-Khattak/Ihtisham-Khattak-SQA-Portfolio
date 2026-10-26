import { Briefcase, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { RevealGroup, RevealItem } from "./Reveal";
import Magnetic from "./Magnetic";
import TestRunner from "./TestRunner";
import "./Hero.css";

const Hero = ({ data, personal }) => {
  const socials = [
    { label: "LinkedIn", href: personal.social.linkedin, Icon: Linkedin, external: true },
    { label: "Email", href: `mailto:${personal.email}`, Icon: Mail },
    { label: "GitHub", href: personal.social.github, Icon: Github, external: true },
  ];

  return (
    <section id="top" className="hero" aria-label="Introduction">
      <span className="hero-glow" aria-hidden="true" />
      <div className="container hero-layout">
        <RevealGroup className="hero-copy">
          <RevealItem as="p" className="hero-status">
            <span className="status-dot" aria-hidden="true" />
            {data.status}
          </RevealItem>

          <RevealItem as="h1" className="hero-name">
            {data.name}
          </RevealItem>

          <RevealItem as="p" className="hero-sub">
            {data.subheadline.map((part, index) =>
              typeof part === "string" ? (
                part
              ) : (
                <strong key={index}>{part.strong}</strong>
              )
            )}
          </RevealItem>

          <RevealItem as="p" className="hero-meta">
            <span>
              <MapPin size={16} strokeWidth={1.6} aria-hidden="true" />
              {personal.location}
            </span>
            <span>
              <Briefcase size={16} strokeWidth={1.6} aria-hidden="true" />
              {data.experience}
            </span>
          </RevealItem>

          <RevealItem className="hero-cta">
            <Magnetic href="#experience" className="btn btn-primary">
              View My Work
            </Magnetic>
            <a href="#contact" className="btn btn-ghost">
              Get in Touch
            </a>
          </RevealItem>

          <RevealItem as="ul" className="hero-social" aria-label="Social links">
            {socials.map((item) => {
              const { label, href, external } = item;
              const SocialIcon = item.Icon;
              return (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <SocialIcon size={19} strokeWidth={1.6} aria-hidden="true" />
                </a>
              </li>
              );
            })}
          </RevealItem>
        </RevealGroup>

        <div className="hero-visual">
          <TestRunner />
        </div>
      </div>
    </section>
  );
};

export default Hero;
