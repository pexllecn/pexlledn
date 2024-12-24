"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleCheck, X } from "lucide-react";
import { toast } from "sonner";

// Separate component for toast content
function ToastContent({ dismiss }: { dismiss: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      dismiss();
    }, 200); // Match this with your CSS animation duration
  };

  return (
    <div
      className={`rounded-lg border border-muted/20 bg-foreground text-background px-4 py-3 ${
        isExiting ? "toast-exit" : "toast-enter"
      }`}
    >
      <div className="flex gap-2 ">
        <div className="flex grow gap-3">
          <CircleCheck
            className="mt-0.5 shrink-0 text-emerald-500"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          <div className="flex grow justify-between gap-12">
            <p className="text-sm">Message sent</p>
            <div className="whitespace-nowrap text-sm">
              <button className="text-sm font-medium hover:underline">
                View
              </button>{" "}
              <span className="mx-1 text-muted-foreground">·</span>{" "}
              <button
                className="text-sm font-medium hover:underline"
                onClick={handleDismiss}
              >
                Undo
              </button>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 p-0 hover:bg-transparent"
          onClick={handleDismiss}
          aria-label="Close banner"
        >
          <X
            size={16}
            strokeWidth={2}
            className="opacity-60 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  );
}

export default function NotificationDemo() {
  return (
    <Button
      variant="outline"
      onClick={() => {
        toast.custom((t) => <ToastContent dismiss={() => toast.dismiss(t)} />);
      }}
    >
      Custom sonner
    </Button>
  );
}
