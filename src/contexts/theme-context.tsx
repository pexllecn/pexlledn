"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

type Color =
  | "black"
  | "red"
  | "pink"
  | "orange"
  | "green"
  | "blue"
  | "yellow"
  | "cyan"
  | "lime"
  | "violet";
type MenuPlacement = "horizontal" | "vertical";
type MenuBehavior = "pinned" | "unpinned";
type Layout = "fluid" | "boxed";

interface ThemeContextType {
  radius: string;
  color: Color;
  menuPlacement: MenuPlacement;
  menuBehavior: MenuBehavior;
  layout: Layout;
  setRadius: (radius: string) => void;
  setColor: (color: Color) => void;
  setMenuPlacement: (placement: MenuPlacement) => void;
  setMenuBehavior: (behavior: MenuBehavior) => void;
  setLayout: (layout: Layout) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [radius, setRadius] = useState("0.75");
  const [color, setColor] = useState<Color>("yellow");
  const [menuPlacement, setMenuPlacement] =
    useState<MenuPlacement>("horizontal");
  const [menuBehavior, setMenuBehavior] = useState<MenuBehavior>("pinned");
  const [layout, setLayout] = useState<Layout>("fluid");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    document.documentElement.style.setProperty("--radius", `${radius}rem`);
    document.documentElement.setAttribute("data-color", color);
    document.documentElement.setAttribute("data-layout", layout);
    document.documentElement.setAttribute("data-menu-placement", menuPlacement);
    document.documentElement.setAttribute("data-menu-behavior", menuBehavior);
  }, [radius, color, layout, menuPlacement, menuBehavior]);

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeContext.Provider
        value={{
          radius,
          color,
          menuPlacement,
          menuBehavior,
          layout,
          setRadius,
          setColor,
          setMenuPlacement,
          setMenuBehavior,
          setLayout,
          sidebarOpen,
          setSidebarOpen,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </NextThemesProvider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
