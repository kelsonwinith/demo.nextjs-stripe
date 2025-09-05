import { Package } from "@/types/package.type";
import { createContext, ReactNode, RefObject, useContext, useRef } from "react";

type PackageContextProps = {
  selectedPackage: RefObject<Package | null>;
};

const PackageContext = createContext<PackageContextProps | undefined>(
  undefined,
);

export function PackageProvider({ children }: { children: ReactNode }) {
  const selectedPackage = useRef<Package | null>(null);

  return (
    <PackageContext.Provider value={{ selectedPackage }}>
      {children}
    </PackageContext.Provider>
  );
}

export function usePackageContext() {
  const context = useContext(PackageContext);
  if (!context) {
    throw new Error("usePackageContext must be used within a PackageProvider");
  }
  return context;
}
