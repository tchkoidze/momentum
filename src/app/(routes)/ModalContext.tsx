"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  showAddEmployeeMOdal: boolean;
  setShowAddEmployeeMOdal: (value: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [showAddEmployeeMOdal, setShowAddEmployeeMOdal] = useState(false);

  return (
    <ModalContext.Provider
      value={{ showAddEmployeeMOdal, setShowAddEmployeeMOdal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
