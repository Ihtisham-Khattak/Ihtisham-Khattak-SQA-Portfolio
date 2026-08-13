const SectionIntro = ({ index, label, title, aside, titleId }) => {
  return (
    <header className="section-head">
      <div>
        <p className="section-kicker">
          <span aria-hidden="true">{index}</span>
          {label}
        </p>
        <h2 id={titleId} className="section-title">
          {title}
        </h2>
      </div>
      {aside ? <p className="section-intro">{aside}</p> : null}
    </header>
  );
};

export default SectionIntro;
