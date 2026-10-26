import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./Illustrations.css";

// Line-art blueprint illustrations. Colors come from CSS variables,
// so they follow the light/dark theme with no extra work.

export function MagnifierBug() {
  return (
    <svg
      className="illustration"
      viewBox="0 0 360 300"
      role="img"
      aria-label="A magnifying glass examining a bug"
    >
      {/* blueprint frame + crosshair */}
      <path className="il-faint" d="M18 44V18h26M342 44V18h-26M18 256v26h26M342 256v26h-26" />
      <path className="il-grid" d="M180 26v248M26 150h308" />

      {/* faint bug outside the lens, for scale */}
      <g className="il-faint" opacity="0.5" transform="translate(40 190) scale(0.42)">
        <ellipse cx="60" cy="70" rx="28" ry="38" />
        <circle cx="60" cy="24" r="13" />
      </g>

      {/* the bug, magnified inside the lens */}
      <g className="il-danger" transform="translate(110 70)">
        <ellipse cx="60" cy="76" rx="30" ry="42" />
        <path d="M60 36v82" />
        <circle cx="60" cy="24" r="14" />
        <path d="M52 12 42 -2M68 12 78 -2" />
        <path d="M31 62 8 52M31 80H4M33 98 12 112M89 62l23-10M91 80h26M87 98l21 14" />
        <circle className="il-dot-danger" cx="48" cy="64" r="2.5" />
        <circle className="il-dot-danger" cx="72" cy="64" r="2.5" />
      </g>

      {/* lens + handle */}
      <circle className="il-lens" cx="170" cy="142" r="96" />
      <circle className="il-faint" cx="170" cy="142" r="84" strokeDasharray="2 6" />
      <path className="il-accent" d="M104 112a72 72 0 0 1 44-40" strokeWidth="3" />
      <path className="il-glare" d="M238 210l58 58" />

      <text className="il-mono" x="58" y="278">defect.found</text>
    </svg>
  );
}

const NODES = [
  { title: "Commit", sub: "git push" },
  { title: "Build", sub: "Docker" },
  { title: "Test", sub: "Playwright / Cypress" },
  { title: "Deploy", sub: "on green only" },
];

function PipelineSvg({ vertical, reduced }) {
  const nodeW = vertical ? 260 : 185;
  const nodeH = 64;
  const gap = vertical ? 46 : 40;
  const pad = vertical ? 20 : 10;
  const viewBox = vertical ? "0 0 300 414" : "0 0 880 120";
  const pos = (i) =>
    vertical
      ? { x: pad, y: 10 + i * (nodeH + gap) }
      : { x: pad + i * (nodeW + gap), y: 28 };
  const first = pos(0);
  const last = pos(NODES.length - 1);
  const dotPath = vertical
    ? `M150 ${first.y + nodeH / 2} V${last.y + nodeH / 2}`
    : `M${first.x + nodeW / 2} 60 H${last.x + nodeW / 2}`;

  return (
    <svg
      className={`illustration pipeline ${vertical ? "pipe-v" : "pipe-h"}`}
      viewBox={viewBox}
      role="img"
      aria-label="CI/CD pipeline: commit, build with Docker, test with Playwright or Cypress, then deploy"
    >
      {NODES.slice(0, -1).map((_, i) => {
        const a = pos(i);
        const b = pos(i + 1);
        const d = vertical
          ? `M150 ${a.y + nodeH}V${b.y}`
          : `M${a.x + nodeW} 60H${b.x}`;
        return <path key={i} className="il-line" d={d} />;
      })}

      {NODES.map((node, i) => {
        const { x, y } = pos(i);
        const isLast = i === NODES.length - 1;
        return (
          <g key={node.title}>
            <rect
              className={isLast ? "il-node il-node-accent" : "il-node"}
              x={x}
              y={y}
              width={nodeW}
              height={nodeH}
              rx="12"
            />
            <text className="il-title" x={x + 18} y={y + 29}>
              {node.title}
            </text>
            <text className="il-mono" x={x + 18} y={y + 48}>
              {node.sub}
            </text>
            <circle
              className="il-step"
              cx={x + nodeW - 22}
              cy={y + 22}
              r="9"
            />
            <text className="il-step-num" x={x + nodeW - 22} y={y + 25.5}>
              {i + 1}
            </text>
          </g>
        );
      })}

      {!reduced && (
        <circle className="il-travel" r="4.5">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path={dotPath}
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="linear"
          />
          <animate
            attributeName="opacity"
            dur="6s"
            repeatCount="indefinite"
            values="0;1;1;0"
            keyTimes="0;0.08;0.92;1"
          />
        </circle>
      )}
    </svg>
  );
}

export function PipelineDiagram() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="pipeline-wrap">
      <PipelineSvg reduced={reduced} />
      <PipelineSvg vertical reduced={reduced} />
    </div>
  );
}

export function ChatProbe() {
  return (
    <svg
      className="illustration"
      viewBox="0 0 420 300"
      role="img"
      aria-label="A chat between a user and a chatbot, with a verification badge on the reply"
    >
      {/* user bubble */}
      <rect className="il-node" x="150" y="24" width="244" height="68" rx="18" />
      <rect className="il-bar" x="172" y="46" width="170" height="7" rx="3.5" />
      <rect className="il-bar" x="172" y="64" width="110" height="7" rx="3.5" />

      {/* bot bubble */}
      <rect className="il-node il-node-accent" x="26" y="120" width="264" height="92" rx="18" />
      <rect className="il-bar il-bar-accent" x="48" y="142" width="196" height="7" rx="3.5" />
      <rect className="il-bar il-bar-accent" x="48" y="160" width="150" height="7" rx="3.5" />
      <rect className="il-bar il-bar-accent" x="48" y="178" width="172" height="7" rx="3.5" />

      {/* shield + check badge */}
      <g transform="translate(262 190)">
        <circle className="il-badge-bg" cx="26" cy="26" r="30" />
        <path
          className="il-accent"
          d="M26 10 41 16v11c0 9-6 16-15 19-9-3-15-10-15-19V16z"
        />
        <path className="il-accent" d="m19 27 5 5 9-10" strokeWidth="2.5" />
      </g>

      {/* probes */}
      <path className="il-faint" d="M26 238h150" strokeDasharray="3 5" />
      <text className="il-mono" x="26" y="262">grounded</text>
      <text className="il-mono" x="26" y="282">context kept · 10 turns</text>
    </svg>
  );
}
