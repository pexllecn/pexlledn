"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import useClickOutside from "@/hooks/useClickOutside";
import { XIcon } from "lucide-react";

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLDivElement>;
}

const DialogContext = React.createContext<DialogContextType | null>(null);

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
}

type DialogProviderProps = {
  children: React.ReactNode;
};

function DialogProvider({ children }: DialogProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);

  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen, uniqueId, triggerRef }),
    [isOpen, uniqueId]
  );

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
    </DialogContext.Provider>
  );
}

type DialogProps = {
  children: React.ReactNode;
};

function Dialog({ children }: DialogProps) {
  return <DialogProvider>{children}</DialogProvider>;
}

type DialogTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

function DialogTrigger({ children, className }: DialogTriggerProps) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useDialog();

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    },
    [isOpen, setIsOpen]
  );

  return (
    <div
      ref={triggerRef}
      className={cn("cursor-pointer", className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={`dialog-content-${uniqueId}`}
    >
      {children}
    </div>
  );
}

type DialogContentProps = {
  children: React.ReactNode;
  className?: string;
};

function DialogContent({ children, className }: DialogContentProps) {
  const { setIsOpen, isOpen, uniqueId } = useDialog();
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden",
        className
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`dialog-title-${uniqueId}`}
      aria-describedby={`dialog-description-${uniqueId}`}
    >
      {children}
    </div>
  );
}

type DialogContainerProps = {
  children: React.ReactNode;
};

function DialogContainer({ children }: DialogContainerProps) {
  const { isOpen } = useDialog();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <MotionConfig transition={{ duration: 0.15 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg max-h-[calc(100vh-2rem)]"
            >
              {children}
            </motion.div>
          </div>
        </MotionConfig>
      )}
    </AnimatePresence>,
    document.body
  );
}

type DialogCloseProps = {
  children?: React.ReactNode;
  className?: string;
};

function DialogClose({ children, className }: DialogCloseProps) {
  const { setIsOpen } = useDialog();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <button
      onClick={handleClose}
      type="button"
      aria-label="Close dialog"
      className={cn(
        "absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
        className
      )}
    >
      {children || <XIcon size={24} />}
    </button>
  );
}

type DialogTitleProps = {
  children: React.ReactNode;
  className?: string;
};

function DialogTitle({ children, className }: DialogTitleProps) {
  const { uniqueId } = useDialog();

  return (
    <h2
      id={`dialog-title-${uniqueId}`}
      className={cn("text-lg font-semibold mb-2", className)}
    >
      {children}
    </h2>
  );
}

type DialogDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

function DialogDescription({ children, className }: DialogDescriptionProps) {
  const { uniqueId } = useDialog();

  return (
    <div
      id={`dialog-description-${uniqueId}`}
      className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
    >
      {children}
    </div>
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogContainer,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
};
