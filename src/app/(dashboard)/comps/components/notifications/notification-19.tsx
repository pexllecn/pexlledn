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
import { X } from "lucide-react";
import Image from "next/image";

import AvatarImg from "../../../../../../public/avatar-32-01.jpg";

const DialogAnimationDemo = () => {
  const [showToast, setShowToast] = React.useState(false);
  const [isExiting, setIsExiting] = React.useState(false);

  const handleShowToast = () => {
    if (!showToast && !isExiting) {
      setShowToast(true);
      setTimeout(() => {
        setIsExiting(true);
      }, 1500);
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
            <div className="flex gap-3">
              <Image
                className="size-9 rounded-full"
                src={AvatarImg}
                width={32}
                height={32}
                alt="Mary Palmer"
              />
              <div className="flex grow flex-col gap-3">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    <a
                      className="font-medium text-foreground hover:underline"
                      href="#"
                    >
                      Mary Palmer
                    </a>{" "}
                    mentioned you in{" "}
                    <a
                      className="font-medium text-foreground hover:underline"
                      href="#"
                    >
                      project-campaign-02
                    </a>
                    .
                  </p>
                  <p className="text-xs text-muted-foreground">2 min ago</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Accept</Button>
                  <Button size="sm" variant="outline">
                    Decline
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
                aria-label="Close notification"
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
        )}
      </div>
    </div>
  );
};

export default DialogAnimationDemo;
