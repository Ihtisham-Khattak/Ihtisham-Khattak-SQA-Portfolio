import { memo } from "react";

const Framework = () => (
  <svg viewBox="0 0 420 260" role="img" aria-label="Cypress framework flowing into a CI gate">
    <rect className="wd-frame" x="16" y="28" width="118" height="54" />
    <text x="75" y="61">Specs</text>
    <rect className="wd-frame" x="151" y="28" width="118" height="54" />
    <text x="210" y="61">Page objects</text>
    <rect className="wd-frame wd-live" x="286" y="28" width="118" height="54" />
    <text x="345" y="61">Cypress</text>
    <path className="wd-line" d="M134 55h17M269 55h17" />
    <path className="wd-line" d="M345 82v38H210v0" />
    <rect className="wd-frame" x="132" y="120" width="156" height="54" />
    <text x="210" y="153">GitHub Actions</text>
    <path className="wd-line" d="M210 174v28" />
    <rect className="wd-gate" x="148" y="202" width="124" height="36" />
    <text x="210" y="225">Release gate</text>
  </svg>
);

const Commerce = () => (
  <svg viewBox="0 0 420 260" role="img" aria-label="Commerce path from browse to checkout">
    <rect className="wd-frame" x="24" y="88" width="100" height="84" />
    <text x="74" y="126">Browse</text>
    <text className="wd-sub" x="74" y="148">catalog</text>
    <path className="wd-line" d="M124 130h36" />
    <rect className="wd-frame wd-live" x="160" y="72" width="100" height="116" />
    <text x="210" y="118">Cart</text>
    <text className="wd-sub" x="210" y="140">covered</text>
    <path className="wd-line" d="M260 130h36" />
    <rect className="wd-frame wd-live" x="296" y="88" width="100" height="84" />
    <text x="346" y="126">Checkout</text>
    <text className="wd-sub" x="346" y="148">Allure</text>
  </svg>
);

const K6 = () => (
  <svg viewBox="0 0 420 260" role="img" aria-label="k6 smoke load and stress against a threshold">
    <text className="wd-axis" x="28" y="48">latency</text>
    <path className="wd-line" d="M40 56v148H392" />
    <path className="wd-threshold" d="M40 118H392" />
    <text className="wd-sub" x="352" y="108">threshold</text>
    <path className="wd-plot" d="M64 168 C 110 160, 150 148, 190 132 S 270 96, 318 84 S 370 70, 388 62" />
    <rect className="wd-frame" x="52" y="196" width="88" height="32" />
    <text x="96" y="217">Smoke</text>
    <rect className="wd-frame" x="166" y="196" width="88" height="32" />
    <text x="210" y="217">Load</text>
    <rect className="wd-frame wd-live" x="280" y="196" width="88" height="32" />
    <text x="324" y="217">Stress</text>
  </svg>
);

const diagrams = {
  framework: Framework,
  commerce: Commerce,
  k6: K6,
};

const WorkDiagram = memo(function WorkDiagram({ type, reducedMotion }) {
  const Graphic = diagrams[type] || Framework;
  return (
    <figure className={`work-diagram ${reducedMotion ? "is-static" : ""}`}>
      <Graphic />
    </figure>
  );
});

export default WorkDiagram;
