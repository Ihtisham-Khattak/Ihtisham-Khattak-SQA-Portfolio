import "./Footer.css";

const links = [
  { name: "Work", href: "#work" },
  { name: "Expertise", href: "#expertise" },
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const Footer = ({ personal, isNotFound = false }) => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>
          {personal.name}
          <span aria-hidden="true"> / </span>
          {personal.title}
        </p>
        <nav className="footer-nav" aria-label="Footer">
          {links.map((link) => (
            <a key={link.href} href={isNotFound ? `/${link.href}` : link.href}>
              {link.name}
            </a>
          ))}
        </nav>
        <p>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
