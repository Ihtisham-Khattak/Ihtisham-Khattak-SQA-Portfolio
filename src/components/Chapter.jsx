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

// Two-tone headline: the lead is white, the tail takes the accent tint on its own line.
export function SecTitle({ id, lead, tail, className = "" }) {
  return (
    <h2 id={id} className={`sec-title ${className}`.trim()}>
      {lead}
      {tail && (
        <>
          {" "}
          <span className="tail">{tail}</span>
        </>
      )}
    </h2>
  );
}

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
      {status === "passed" && <Check size={13} strokeWidth={2.5} aria-hidden="true" />}
      {status === "failed" && <X size={13} strokeWidth={2.5} aria-hidden="true" />}
      <span className="stamp-text">
        {LABEL[status]}
        {status === "passed" || status === "failed" ? count : ""}
      </span>
      <span className="sr-only">. {open ? "Hide" : "Show"} the checks for this section</span>
    </button>
  );
}

// One section of the page. Its header carries a pill tag and a stamp; the stamp reports
// the real checks the page runs on the section, and opens the list behind it.
export default function Chapter({ id, labelledBy, ariaLabel, className = "", titlePage = false, children }) {
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
      data-state={status}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : ariaLabel}
    >
      <div className="container">
        <header className={`chapter-head ${titlePage ? "is-title" : ""}`} data-chapter-head={id}>
          {!titlePage && (
            <span className="pill chapter-pill">
              <span className="pill-dot" data-state={status} aria-hidden="true" />
              {meta?.label}
            </span>
          )}
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
                ? "Running checks on this section."
                : "Not run yet. The checks run as this section scrolls into view."}
            </p>
          )}
        </div>

        <div className="chapter-body">{children}</div>
      </div>
    </section>
  );
}
