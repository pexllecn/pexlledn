"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";

export type NotificationType = "default" | "call" | "music" | "timer";

interface DynamicIslandProps {
  type: NotificationType;
  content: React.ReactNode;
  expandedContent: React.ReactNode;
  isVisible: boolean;
  onDismiss: () => void;
}

const DynamicIsland: React.FC<DynamicIslandProps> = ({
  type,
  content,
  expandedContent,
  isVisible,
  onDismiss,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    }
  }, [isVisible]);

  const handleDismiss = useCallback(() => {
    setIsExpanded(false);
    onDismiss();
  }, [onDismiss]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(handleDismiss, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, handleDismiss]);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick();
    } else if (event.key === "Escape") {
      handleDismiss();
    }
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      setShouldRender(false);
    }
  };

  const springConfig = {
    type: "spring",
    stiffness: 400,
    damping: 30,
    restDelta: 0.001,
  };

  const variants = {
    hidden: {
      width: "120px",
      height: "44px",
      y: -50,
      opacity: 0,
      scale: 0.8,
      transition: { ...springConfig, duration: 0.3 },
    },
    visible: {
      width: "250px",
      height: "50px",
      y: 0,
      opacity: 1,
      scale: 1,
      transition: springConfig,
    },
    expanded: {
      width: "min(380px, 90vw)",
      height: "auto",
      minHeight: "120px",
      y: 0,
      opacity: 1,
      scale: 1,
      transition: springConfig,
    },
    exit: {
      width: "120px",
      height: "44px",
      opacity: 0,
      y: -50,
      scale: 0.8,
      transition: {
        ...springConfig,
        duration: 0.3,
      },
    },
  };

  if (!shouldRender) return null;

  return (
    <AnimatePresence mode="wait" onExitComplete={handleAnimationComplete}>
      {isVisible && (
        <LayoutGroup>
          <motion.div
            layout
            className={cn(
              "fixed top-2 bg-foreground text-background rounded-3xl overflow-hidden cursor-pointer z-[9999]",
              "shadow-lg border border-white/10"
            )}
            initial="hidden"
            animate={isExpanded ? "expanded" : "visible"}
            exit="exit"
            variants={variants}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            role="alert"
            aria-live="polite"
            tabIndex={0}
          >
            <motion.div layout className="p-2">
              {content}
            </motion.div>
            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={springConfig}
                  className="px-4 pb-4"
                >
                  {expandedContent}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      )}
    </AnimatePresence>
  );
};

export default DynamicIsland;
