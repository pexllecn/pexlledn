"use client";

import { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light";

const ThemeContext = createContext<Theme>("dark");

export const useTheme = () => useContext(ThemeContext);

interface ComponentWrapperProps {
  children: React.ReactNode;
  /** Renders the light/dark switch for the demo surface. */
  hasLightMode?: boolean;
  className?: string;
}

/**
 * The demo surface the island lives on.
 *
 * It keeps its own theme rather than reading `next-themes`, because the point
 * of the light mode here is to check the island's contrast and shadow against
 * a bright backdrop — independent of whatever the dashboard chrome is doing.
 */
export default function ComponentWrapper({
  children,
  hasLightMode = false,
  className,
}: ComponentWrapperProps) {
  const [theme, setTheme] = useState<Theme>("dark");

  return (
    <ThemeContext.Provider value={theme}>
      <div
        className={cn(
          "relative isolate h-[380px] w-full overflow-hidden rounded-2xl border",
          // Not pure black. The island itself is #000, so a #09090B stage
          // leaves it legible only by its shadow — the surface has to sit a
          // few steps lighter for the shape to read at all.
          theme === "dark"
            ? "border-white/10 bg-[#16161A]"
            : "border-black/10 bg-[#F4F4F5]",
          // Colour is the only thing that crossfades here: the surface itself
          // never moves, so there is nothing for a transform to describe.
          "transition-colors duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
          className
        )}
      >
        {/* A very soft radial wash so the island has something to sit on and
            cast against, instead of floating on flat fill. */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 -z-10",
            theme === "dark"
              ? "bg-[radial-gradient(110%_75%_at_50%_0%,rgba(255,255,255,0.09),transparent_62%)]"
              : "bg-[radial-gradient(110%_75%_at_50%_0%,rgba(0,0,0,0.06),transparent_62%)]"
          )}
        />

        {hasLightMode ? (
          <button
            type="button"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className={cn(
              "absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border",
              // Instant, on-press feedback. 160ms is inside the 100-160ms
              // window for a press; anything slower reads as unresponsive.
              "transition-[transform,background-color,border-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.94]",
              theme === "dark"
                ? "border-white/10 bg-white/5 text-white/70 [@media(hover:hover)and(pointer:fine)]:hover:bg-white/10"
                : "border-black/10 bg-black/5 text-black/60 [@media(hover:hover)and(pointer:fine)]:hover:bg-black/10"
            )}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-13a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Zm0 14a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM4 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm14 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1ZM6.34 6.34a1 1 0 0 1 1.41 0l.71.71a1 1 0 0 1-1.41 1.41l-.71-.7a1 1 0 0 1 0-1.42Zm9.2 9.2a1 1 0 0 1 1.41 0l.71.71a1 1 0 0 1-1.41 1.41l-.71-.71a1 1 0 0 1 0-1.41Zm1.41-9.2a1 1 0 0 1 0 1.42l-.71.7a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0ZM8.46 15.54a1 1 0 0 1 0 1.41l-.71.71a1 1 0 0 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M21.07 13.11A9 9 0 1 1 10.9 2.93a7 7 0 0 0 10.17 10.18Z" />
              </svg>
            )}
          </button>
        ) : null}

        {children}
      </div>
    </ThemeContext.Provider>
  );
}
