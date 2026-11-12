import "./Frame.css";

// A framed window (three dots, then content) inside a bezel, with a soft glow under it.
export default function Frame({ children, className = "", caption }) {
  return (
    <figure className={`frame ${className}`.trim()}>
      <div className="bezel">
        <div className="bezel-in frame-in">
          <div className="frame-bar" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="frame-body">{children}</div>
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
