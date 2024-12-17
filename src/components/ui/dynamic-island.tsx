"use client";
import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// Import all notification components

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

  // Optional customization props
  theme?: "light" | "dark";
  duration?: number;
  animationConfig?: {
    stiffness?: number;
    damping?: number;
  };
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
    animationConfig = {},
  }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [dismissalStage, setDismissalStage] = useState<
      "visible" | "collapsing" | "exiting" | "dismissed"
    >("visible");
    const dismissalTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Merged spring configuration with custom overrides
    const springConfig = {
      type: "spring",
      stiffness: animationConfig.stiffness || 300,
      damping: animationConfig.damping || 30,
      restDelta: 0.01,
    };

    const startDismissal = useCallback(() => {
      // Clear any existing timers
      if (dismissalTimerRef.current) {
        clearTimeout(dismissalTimerRef.current);
      }

      // Simulate haptic feedback
      window.navigator.vibrate?.(10);

      // First, collapse if expanded
      if (isExpanded) {
        setIsExpanded(false);
        setDismissalStage("collapsing");

        // After collapse animation, prepare to exit
        dismissalTimerRef.current = setTimeout(() => {
          setDismissalStage("exiting");

          // Final dismissal
          dismissalTimerRef.current = setTimeout(() => {
            setDismissalStage("dismissed");
            onDismiss();
          }, 500); // Exit animation duration
        }, 500); // Collapse animation duration
      } else {
        // If not expanded, immediately start exiting
        setDismissalStage("exiting");

        dismissalTimerRef.current = setTimeout(() => {
          setDismissalStage("dismissed");
          onDismiss();
        }, 500);
      }
    }, [isExpanded, onDismiss]);

    useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(startDismissal, duration);
        return () => clearTimeout(timer);
      }
    }, [isVisible, startDismissal, duration]);

    const handleClick = useCallback(() => {
      // Prevent interactions during dismissal
      if (dismissalStage !== "visible") return;

      // Simulate subtle haptic feedback
      window.navigator.vibrate?.(10);

      setIsExpanded(!isExpanded);
    }, [dismissalStage, isExpanded]);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        // Prevent interactions during dismissal
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
        e.stopPropagation(); // Prevent triggering main click handler
        startDismissal();
      },
      [startDismissal]
    );

    const variants = {
      hidden: {
        maxWidth: "120px",
        height: "44px",
        y: -50,
        opacity: 0,
      },
      visible: {
        maxWidth: "300px",
        height: "50px",
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.2,
          ease: "easeInOut",
        },
      },
      expanded: {
        maxWidth: "380px",
        height: "auto",
        minHeight: "120px",
        y: 0,
        opacity: 1,
      },
      exit: {
        maxWidth: "120px",
        height: "44px",
        opacity: 0,
        y: -50,
        transition: {
          duration: 0.2,
          ease: "easeInOut",
        },
      },
    };

    // Only render if not completely dismissed
    if (dismissalStage === "dismissed") return null;

    return (
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            layout="position"
            className={cn(
              "fixed top-4 left-0 right-0 mx-auto bg-foreground text-background rounded-3xl overflow-hidden z-[1000001]",
              "shadow-none border border-white/10 group",
              theme === "light" ? "bg-white text-black" : "bg-black text-white",
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
            transition={{
              ...springConfig,
              ease: "easeInOut",
              duration: 0.2,
            }}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="alert"
            aria-live="polite"
            aria-expanded={isExpanded}
            tabIndex={0}
          >
            {/* Dismiss Button */}
            {dismissalStage === "visible" && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={handleDismissClick}
                className={cn(
                  "absolute top-2 right-2 z-10",
                  theme === "light"
                    ? "bg-black/10 hover:bg-black/20 text-black/70 hover:text-black/90"
                    : "bg-white/10 hover:bg-white/20 text-white/70 hover:text-white/90",
                  "rounded-full p-1 transition-all duration-200 ease-in-out"
                )}
                aria-label="Dismiss notification"
              >
                <X size={16} strokeWidth={2.5} />
              </motion.button>
            )}

            <motion.div layout className="p-2 pr-8">
              {content}
            </motion.div>
            <AnimatePresence>
              {isExpanded && dismissalStage === "visible" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
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
