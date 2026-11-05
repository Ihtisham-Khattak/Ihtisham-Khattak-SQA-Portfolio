import { Briefcase, Github, Linkedin, Mail, MapPin } from "lucide-react";
import Chapter from "./Chapter";
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
    <Chapter id="top" ariaLabel="Title page" className="chapter-title">
      <div className="title-page">
        <RevealGroup className="title-copy">
          <RevealItem as="p" className="title-status">
            <span className="status-dot" aria-hidden="true" />
            {data.status}
          </RevealItem>

          <RevealItem as="h1" className="title-name">
            {data.name}
          </RevealItem>

          <RevealItem as="p" className="title-sub">
            {data.subheadline.map((part, index) =>
              typeof part === "string" ? part : <strong key={index}>{part.strong}</strong>
            )}
          </RevealItem>

          <RevealItem as="p" className="title-meta">
            <span>
              <MapPin size={16} strokeWidth={1.6} aria-hidden="true" />
              {personal.location}
            </span>
            <span>
              <Briefcase size={16} strokeWidth={1.6} aria-hidden="true" />
              {data.experience}
            </span>
          </RevealItem>

          <RevealItem className="title-cta">
            <Magnetic href="#contact" className="btn btn-primary">
              Get in Touch
            </Magnetic>
            <a href="#experience" className="btn btn-ghost">
              View My Work
            </a>
          </RevealItem>

          <RevealItem as="ul" className="title-social" aria-label="Social links">
            {socials.map((item) => {
              const { label, href, external } = item;
              const SocialIcon = item.Icon;
              return (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <SocialIcon size={19} strokeWidth={1.6} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </RevealItem>
        </RevealGroup>

        <div className="title-visual">
          <TestRunner />
        </div>
      </div>
    </Chapter>
  );
};

export default Hero;
