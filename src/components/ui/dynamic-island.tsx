"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Size presets                                                              */
/*                                                                            */
/*  The real Dynamic Island morphs between a handful of discrete shapes.      */
/*  We model each shape as a fixed width / height / corner radius and let     */
/*  Framer Motion spring between them, exactly like iOS.                      */
/* -------------------------------------------------------------------------- */

export type IslandSize =
  | "idle" // the resting pill (mimics the notch)
  | "minimal" // tiny circle-ish pill (single glyph)
  | "compact" // leading + trailing blobs with a gap
  | "long" // a wider single line
  | "default" // one-line notification
  | "expanded" // rich card
  | "tall" // taller rich card
  | "ultra"; // full live-activity card

interface SizeSpec {
  width: number;
  height: number;
  radius: number;
}

export const ISLAND_SIZES: Record<IslandSize, SizeSpec> = {
  idle: { width: 130, height: 36, radius: 22 },
  minimal: { width: 90, height: 36, radius: 22 },
  compact: { width: 236, height: 37, radius: 22 },
  long: { width: 320, height: 44, radius: 22 },
  default: { width: 354, height: 62, radius: 30 },
  expanded: { width: 360, height: 168, radius: 38 },
  tall: { width: 366, height: 210, radius: 42 },
  ultra: { width: 372, height: 252, radius: 44 },
};

/* -------------------------------------------------------------------------- */
/*  Springs                                                                    */
/* -------------------------------------------------------------------------- */

// The signature "gooey" morph of the shell.
const SHELL_SPRING = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
  mass: 1.1,
  stiffness: 510,
  damping: 34,
  mass: 0.82,
  restDelta: 0.08,
  restSpeed: 0.08,
};

// Content fades / blurs a touch quicker than the shell.
const CONTENT_SPRING = {
// Expansion has a fraction more travel than retraction. This is what gives the
// shell its soft, rubber-like overshoot without making every interaction slow.
const EXPAND_SPRING = {
  type: "spring" as const,
  stiffness: 500,
  damping: 34,
  mass: 0.7,
  stiffness: 430,
  damping: 31,
  mass: 0.88,
  restDelta: 0.08,
  restSpeed: 0.08,
};

/* -------------------------------------------------------------------------- */
/*  Presentation of a single activity                                         */
/* -------------------------------------------------------------------------- */

export interface IslandActivity {
  id: string;
  /** Collapsed shape. */
  size?: IslandSize;
