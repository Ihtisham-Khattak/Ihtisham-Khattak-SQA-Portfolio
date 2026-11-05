import { useSelfAudit } from "../hooks/useSelfAudit";
import { AuditContext } from "./AuditContext";

// Owns the audit state so that updates re-render only the components that read it.
// `children` is created once by App, so React skips the rest of the tree.
export default function AuditProvider({ enabled, children }) {
  const audit = useSelfAudit(enabled);
  return <AuditContext.Provider value={enabled ? audit : null}>{children}</AuditContext.Provider>;
}
