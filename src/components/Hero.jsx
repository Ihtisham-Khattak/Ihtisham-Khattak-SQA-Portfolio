import { Briefcase, Github, Linkedin, Mail, MapPin } from "lucide-react";
import Chapter from "./Chapter";
import { RevealGroup, RevealItem } from "./Reveal";
import Magnetic from "./Magnetic";
import portrait480 from "../assets/portrait-480.webp";
import portrait880 from "../assets/portrait-880.webp";
import "./Hero.css";

const Hero = ({ data, personal, portraitAlt }) => {
  const [first, ...rest] = data.name.split(" ");
  const socials = [
    { label: "LinkedIn", href: personal.social.linkedin, Icon: Linkedin, external: true },
    { label: "Email", href: `mailto:${personal.email}`, Icon: Mail },
    { label: "GitHub", href: personal.social.github, Icon: Github, external: true },
  ];

  return (
    <Chapter id="top" ariaLabel="Title page" titlePage className="chapter-hero">
      <span className="stars" aria-hidden="true" />
      <div className="hero">
        <RevealGroup className="hero-copy">
          <RevealItem as="p" className="pill hero-pill">
            <span className="pill-dot" aria-hidden="true" />
            {data.status}
          </RevealItem>

          <RevealItem as="h1" className="hero-name">
            {first} <span className="tail">{rest.join(" ")}</span>
          </RevealItem>

          <RevealItem as="p" className="hero-sub">
            {data.subheadline.map((part, index) =>
              typeof part === "string" ? (
                part
              ) : (
                <strong key={index} className="mark">
                  {part.strong}
                </strong>
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
              <span className="mark">{data.experience}</span>
            </span>
          </RevealItem>

          <RevealItem className="hero-cta">
            <a href="#experience" className="btn btn-ghost">
              View My Work
            </a>
            <Magnetic href="#contact" className="btn btn-primary">
              Get in Touch
            </Magnetic>
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
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <SocialIcon size={19} strokeWidth={1.6} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </RevealItem>
        </RevealGroup>

        <figure className="hero-portrait">
          <span className="portrait-aura" aria-hidden="true" />
          <img
            src={portrait880}
            srcSet={`${portrait480} 480w, ${portrait880} 880w`}
            sizes="(min-width: 640px) 24rem, 78vw"
            width="880"
            height="1167"
            alt={portraitAlt}
            fetchPriority="high"
            decoding="async"
          />
        </figure>
      </div>
    </Chapter>
  );
};

export default Hero;
