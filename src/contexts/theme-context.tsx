"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

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

const usePersistentState = <T extends string | boolean>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const persistedValue = localStorage.getItem(key);
      if (persistedValue !== null) {
        if (typeof defaultValue === "boolean") {
          return (persistedValue === "true") as T;
        }
        return persistedValue as T;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, state.toString());
    }
  }, [key, state]);

  return [state, setState];
};

export function ThemeProvider({ children, ...props }: any) {
  const [radius, setRadius] = usePersistentState<string>("theme-radius", "1.5");
  const [color, setColor] = usePersistentState<Color>("theme-color", "yellow");
  const [menuPlacement, setMenuPlacement] = usePersistentState<MenuPlacement>(
    "theme-menu-placement",
    "horizontal"
  );
  const [menuBehavior, setMenuBehavior] = usePersistentState<MenuBehavior>(
    "theme-menu-behavior",
    "pinned"
  );
  const [layout, setLayout] = usePersistentState<Layout>(
    "theme-layout",
    "fluid"
  );
  const [sidebarOpen, setSidebarOpen] = usePersistentState<boolean>(
    "theme-sidebar-open",
    true
  );

  const updateDocumentStyles = useCallback(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty("--radius", `${radius}rem`);
      document.documentElement.setAttribute("data-color", color);
      document.documentElement.setAttribute("data-layout", layout);
      document.documentElement.setAttribute(
        "data-menu-placement",
        menuPlacement
      );
      document.documentElement.setAttribute("data-menu-behavior", menuBehavior);
    }
  }, [radius, color, layout, menuPlacement, menuBehavior]);

  useEffect(() => {
    updateDocumentStyles();
  }, [updateDocumentStyles]);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
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
