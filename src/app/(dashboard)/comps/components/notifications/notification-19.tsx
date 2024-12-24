"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DialogAnimationDemo = () => {
  const [showToast, setShowToast] = React.useState(false);
  const [isExiting, setIsExiting] = React.useState(false);

  const handleShowToast = () => {
    if (!showToast && !isExiting) {
      setShowToast(true);
      setTimeout(() => {
        setIsExiting(true);
      }, 2000);
    }
  };

  const handleAnimationEnd = () => {
    if (isExiting) {
      setShowToast(false);
      setIsExiting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center p-8">
      {/* Toast Demo */}
      <div className="mb-8">
        <Button onClick={handleShowToast}>Show Toast</Button>
        {showToast && (
          <div
            className={`fixed bottom-4 right-4 p-4 bg-background border rounded-lg shadow-lg 
                ${isExiting ? "toast-exit" : "toast-enter"}`}
            style={{
              maxWidth: "350px",
              zIndex: 1000,
            }}
            onAnimationEnd={handleAnimationEnd}
          >
            <div className="font-semibold">Toast Notification</div>
            <div className="text-sm text-muted-foreground">
              This toast uses the same animation style as the dialog
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DialogAnimationDemo;
