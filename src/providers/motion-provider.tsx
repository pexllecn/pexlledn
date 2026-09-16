"use client";

import { MotionConfig } from "framer-motion";
import { SPRING } from "@/lib/motion";

/**
 * App-wide Framer Motion defaults.
 *
 * Two things, both of which are only worth doing at the root:
 *
 * `transition` makes the fluid spring the default for every `motion` element
 * that does not state its own. Components keep full control — a local
 * `transition` prop still wins — but the baseline stops being Framer's
 * generic tween, so motion nobody explicitly tuned still matches the rest of
 * the product.
 *
 * `reducedMotion="user"` is the larger win. It makes every animation in the
 * app honour the OS setting without a single component calling
 * `useReducedMotion` itself: Framer drops transforms and keeps opacity, which
 * is the behaviour we want anyway — gentler, not absent.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig transition={SPRING.fluid} reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
