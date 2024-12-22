"use client";

import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type NotificationType =
  | "default"
  | "call"
  | "music"
  | "timer"
  | "wifi"
  | "battery"
  | "gps";

interface DynamicIslandProps {
  type: NotificationType;
  content: React.ReactNode;
  expandedContent: React.ReactNode;
  isVisible: boolean;
  onDismiss: () => void;
  theme?: "light" | "dark";
  duration?: number;
}

const DynamicIsland: React.FC<DynamicIslandProps> = memo(
  ({
    type,
    content,
    expandedContent,
    isVisible,
    onDismiss,
    theme = "dark",
    duration = 5000,
  }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [dismissalStage, setDismissalStage] = useState<
      "visible" | "collapsing" | "exiting" | "dismissed"
    >("visible");
    const dismissalTimerRef = useRef<NodeJS.Timeout | null>(null);

    const elasticTransition = {
      type: "spring",
      stiffness: 400,
      damping: 50,
      mass: 1,
      restDelta: 0.01,
      restSpeed: 0.01,
    };

    const morphTransition = {
      type: "spring",
      stiffness: 240,
      damping: 13,
      mass: 0.6,
      restDelta: 0.01,
      restSpeed: 0.01,
    };

    const startDismissal = useCallback(() => {
      if (dismissalTimerRef.current) {
        clearTimeout(dismissalTimerRef.current);
      }

      window.navigator.vibrate?.(10);

      if (isExpanded) {
        setIsExpanded(false);
        setDismissalStage("collapsing");

        dismissalTimerRef.current = setTimeout(() => {
          setDismissalStage("exiting");

          dismissalTimerRef.current = setTimeout(() => {
            setDismissalStage("dismissed");
            onDismiss();
          }, 300);
        }, 300);
      } else {
        setDismissalStage("exiting");

        dismissalTimerRef.current = setTimeout(() => {
          setDismissalStage("dismissed");
          onDismiss();
        }, 300);
      }
    }, [isExpanded, onDismiss]);

    useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(startDismissal, duration);
        return () => clearTimeout(timer);
      }
    }, [isVisible, startDismissal, duration]);

    const handleClick = useCallback(() => {
      if (dismissalStage !== "visible") return;

      window.navigator.vibrate?.(10);
      setIsExpanded(!isExpanded);
    }, [dismissalStage, isExpanded]);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (dismissalStage !== "visible") return;

        if (event.key === "Enter" || event.key === " ") {
          handleClick();
        } else if (event.key === "Escape") {
          startDismissal();
        }
      },
      [dismissalStage, handleClick, startDismissal]
    );

    const handleDismissClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (dismissalStage !== "visible") return;

        window.navigator.vibrate?.(10);
        startDismissal();
      },
      [dismissalStage, startDismissal]
    );

    const variants = {
      hidden: {
        width: "120px",
        height: "36px",
        scale: 0.8,
        y: +20,
        opacity: 0,
        filter: "blur(10px)",
      },
      visible: {
        width: "320px",
        height: "50px",
        scale: 1,
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          ...morphTransition,
          opacity: { duration: 0.2 },
          filter: { duration: 0.2 },
        },
      },
      expanded: {
        width: "380px",
        height: "auto",
        minHeight: "160px",
        scale: 1,
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          ...morphTransition,
          height: { type: "spring", stiffness: 300, damping: 20 },
          opacity: { duration: 0.2 },
          filter: { duration: 0.2 },
        },
      },
      exit: {
        width: "120px",
        height: "36px",
        scale: 0.8,
        y: +20,
        opacity: 0,
        filter: "blur(10px)",
        transition: {
          ...morphTransition,
          opacity: { duration: 0.1, delay: 0.1 },
          filter: { duration: 0.1 },
          scale: { duration: 0.5, type: "spring", stiffness: 200, damping: 20 },
        },
      },
    };

    const contentVariants = {
      hidden: {
        opacity: 0,
        scale: 0.9,
        filter: "blur(8px)",
      },
      visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          stiffness: 450,
          damping: 25,
          mass: 0.8,
          filter: { duration: 0.1 },
        },
      },
      exit: {
        opacity: 0,
        scale: 0.9,
        filter: "blur(8px)",
        transition: {
          type: "spring",
          stiffness: 450,
          damping: 25,
          mass: 0.8,
          filter: { duration: 0.1 },
        },
      },
    };

    if (dismissalStage === "dismissed") return null;

    return (
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            layout
            layoutId="dynamic-island"
            className={cn(
              "fixed top-2 left-0 right-0 mx-auto bg-foreground text-background rounded-[24px] overflow-hidden z-[1000001]",
              "shadow-md backdrop-blur-sm",

              dismissalStage === "visible" && "cursor-pointer"
            )}
            initial="hidden"
            animate={
              dismissalStage === "exiting"
                ? "exit"
                : isExpanded
                ? "expanded"
                : "visible"
            }
            exit="exit"
            variants={variants}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="alert"
            aria-live="polite"
            aria-expanded={isExpanded}
            tabIndex={0}
          >
            {dismissalStage === "visible" && (
              <motion.button
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
                onClick={handleDismissClick}
                className={cn(
                  "absolute top-3 right-2 z-10",
                  "bg-white/10 ",
                  "rounded-full p-1"
                )}
                aria-label="Dismiss notification"
              >
                <X size={16} strokeWidth={2.5} />
              </motion.button>
            )}

            <motion.div
              layout
              layoutId="dynamic-island-content"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={contentVariants}
              className="p-2 pr-8 mr-3"
            >
              {content}
            </motion.div>

            <AnimatePresence mode="wait">
              {isExpanded && dismissalStage === "visible" && (
                <motion.div
                  layout
                  layoutId="dynamic-island-expanded"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={contentVariants}
                  className="px-4 pb-4"
                >
                  {expandedContent}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

export default DynamicIsland;
