import { useAudit } from "../audit/AuditContext";

// The thin sweep line. It retires itself once the whole report has run.
export default function RunLine() {
  const audit = useAudit();
  if (!audit || audit.summary.complete) return null;
  return (
    <div className="run-line" data-ground="base" aria-hidden="true">
      <span>run</span>
    </div>
  );
}
