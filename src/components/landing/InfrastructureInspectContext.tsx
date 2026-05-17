"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { OpsInspectState } from "@/lib/ops-inspection";

type InspectContextValue = {
  inspect: OpsInspectState;
  setInspect: (state: OpsInspectState) => void;
  clearInspect: () => void;
};

const InfrastructureInspectContext = createContext<InspectContextValue | null>(null);

export function InfrastructureInspectProvider({ children }: { children: ReactNode }) {
  const [inspect, setInspectState] = useState<OpsInspectState>(null);

  const setInspect = useCallback((state: OpsInspectState) => {
    setInspectState(state);
  }, []);

  const clearInspect = useCallback(() => {
    setInspectState(null);
  }, []);

  const value = useMemo(
    () => ({ inspect, setInspect, clearInspect }),
    [inspect, setInspect, clearInspect],
  );

  return (
    <InfrastructureInspectContext.Provider value={value}>
      {children}
    </InfrastructureInspectContext.Provider>
  );
}

export function useInfrastructureInspect() {
  const ctx = useContext(InfrastructureInspectContext);
  if (!ctx) {
    return {
      inspect: null as OpsInspectState,
      setInspect: () => {},
      clearInspect: () => {},
    };
  }
  return ctx;
}
