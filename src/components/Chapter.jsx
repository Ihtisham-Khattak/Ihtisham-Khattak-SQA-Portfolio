import { useId, useState } from "react";
import { Check, X } from "lucide-react";
import { chapters } from "../audit/chapters";
import { useAudit } from "../audit/AuditContext";
import "./Chapter.css";

const LABEL = {
  unverified: "Unverified",
  running: "Running",
  passed: "Passed",
  failed: "Failed",
};

function Stamp({ status, results, open, onToggle, controls }) {
  const passed = results.filter((r) => r.pass).length;
  const count = results.length ? ` ${passed}/${results.length}` : "";
  return (
    <button
      type="button"
      className="stamp"
      data-state={status}
      aria-expanded={open}
      aria-controls={controls}
      onClick={onToggle}
    >
      <span className="stamp-hatch" aria-hidden="true" />
      {status === "passed" && <Check size={14} strokeWidth={2.5} aria-hidden="true" />}
      {status === "failed" && <X size={14} strokeWidth={2.5} aria-hidden="true" />}
      <span className="stamp-text">
        {LABEL[status]}
        {status === "passed" || status === "failed" ? count : ""}
      </span>
      <span className="sr-only">. {open ? "Hide" : "Show"} the checks for this chapter</span>
    </button>
  );
}

// One numbered test case in the report: header with a rule that fills when the
// chapter is verified, a stamp, an expandable list of the real checks, then the body.
export default function Chapter({
  id,
  ground = "base",
  labelledBy,
  ariaLabel,
  className = "",
  children,
}) {
  const audit = useAudit();
  const meta = chapters.find((c) => c.id === id);
  const status = audit?.state[id]?.status ?? "unverified";
  const results = audit?.state[id]?.results ?? [];
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section
      id={id}
      className={`chapter ${className}`.trim()}
      data-ground={ground}
      data-state={status}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : ariaLabel}
    >
      <div className="container">
        <header className="chapter-head" data-chapter-head={id}>
          <span className="chapter-rule" aria-hidden="true" />
          <p className="chapter-id">
            <span className="chapter-tc">TC-{meta?.tc}</span>
            <span className="chapter-name">{meta?.label}</span>
          </p>
          {audit && (
            <Stamp
              status={status}
              results={results}
              open={open}
              controls={panelId}
              onToggle={() => setOpen((v) => !v)}
            />
          )}
        </header>

        <div id={panelId} className="chapter-checks" hidden={!open}>
          {results.length ? (
            <ul>
              {results.map((r) => (
                <li key={r.id} data-pass={r.pass}>
                  <span className="check-mark" aria-hidden="true">
                    {r.pass ? "✓" : "✗"}
                  </span>
                  <span className="check-label">
                    {r.label}
                    <span className="sr-only">{r.pass ? ": passed" : ": failed"}</span>
                  </span>
                  <span className="check-detail">{r.detail}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="check-empty">
              {status === "running"
                ? "Running checks on this chapter."
                : "Not run yet. The checks run as this chapter crosses the run line."}
            </p>
          )}
        </div>

        <div className="chapter-body">{children}</div>
      </div>
    </section>
  );
}
