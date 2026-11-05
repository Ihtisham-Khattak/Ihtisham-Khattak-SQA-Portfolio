import { createContext, useContext } from "react";

export const AuditContext = createContext(null);

export function useAudit() {
  return useContext(AuditContext);
}
