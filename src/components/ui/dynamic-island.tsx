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
      damping: 25,
      mass: 1,
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
          }, 500);
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
        startDismissal();
      },
      [startDismissal]
    );

    const variants = {
      hidden: {
        scale: 0.8,
        y: 20,
        opacity: 0,
        filter: "blur(10px)",
      },
      visible: {
        maxWidth: "320px",
        scale: 1,
        y: 0,
        opacity: 1,
        height: "50px",
        filter: "blur(0px)",
        transition: elasticTransition,
      },
      expanded: {
        maxWidth: "380px",
        minHeight: "160px",
        scale: 1,
        y: 0,
        opacity: 1,
        height: "auto",
        filter: "blur(0px)",
        transition: elasticTransition,
      },
      exit: {
        scale: 0.8,
        y: 20,
        opacity: 0,
        filter: "blur(10px)",
        transition: elasticTransition,
      },
    };

    if (dismissalStage === "dismissed") return null;

    return (
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            layout
            transition={elasticTransition}
            className={cn(
              "fixed top-4 left-0 right-0 mx-auto bg-foreground text-background rounded-3xl overflow-hidden z-[1000001]",
              "shadow-lg backdrop-blur-sm",
              theme === "light"
                ? "bg-white/90 text-black"
                : "bg-black/90 text-white",
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
                initial={{ opacity: 0, scale: 0.8, filter: "blur(5px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(5px)" }}
                transition={elasticTransition}
                onClick={handleDismissClick}
                className={cn(
                  "absolute top-2 right-2 z-10",
                  theme === "light"
                    ? "bg-black/10 hover:bg-black/20 text-black/70 hover:text-black/90"
                    : "bg-white/10 hover:bg-white/20 text-white/70 hover:text-white/90",
                  "rounded-full p-1"
                )}
                aria-label="Dismiss notification"
              >
                <X size={16} strokeWidth={2.5} />
              </motion.button>
            )}

            <motion.div
              layout
              transition={elasticTransition}
              className="p-2 pr-8 mr-3"
            >
              {content}
            </motion.div>
            <AnimatePresence>
              {isExpanded && dismissalStage === "visible" && (
                <motion.div
                  initial={{ opacity: 0, height: 0, filter: "blur(5px)" }}
                  animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
                  exit={{ opacity: 0, height: 0, filter: "blur(5px)" }}
                  transition={elasticTransition}
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
