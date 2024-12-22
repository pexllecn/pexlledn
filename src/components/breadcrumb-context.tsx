"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbContextType {
  breadcrumbs: BreadcrumbItem[];
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined
);

export const BreadcrumbProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const linkPath = pathname.split("/");
    linkPath.shift();

    const pathArray = linkPath.map((path, i) => {
      return {
        label: path.charAt(0).toUpperCase() + path.slice(1),
        href: "/" + linkPath.slice(0, i + 1).join("/"),
      };
    });

    setBreadcrumbs([{ label: "Home", href: "/dashboard" }, ...pathArray]);
  }, [pathname]);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error("useBreadcrumbs must be used within a BreadcrumbProvider");
  }
  return context;
};
