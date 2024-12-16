"use client";

import React, { useState } from "react";
import DynamicIsland, {
  NotificationType,
} from "@/components/ui/dynamic-island";
import {
  DefaultNotification,
  DefaultExpandedNotification,
  CallNotification,
  CallExpandedNotification,
  MusicNotification,
  MusicExpandedNotification,
  TimerNotification,
  TimerExpandedNotification,
} from "@/components/ui/notification-contents";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { motion } from "framer-motion";

export default function DynamicIslandDemo() {
  const [notification, setNotification] = useState<{
    type: NotificationType;
    content: React.ReactNode;
    expandedContent: React.ReactNode;
  } | null>(null);

  const showNotification = (
    type: NotificationType,
    content: React.ReactNode,
    expandedContent: React.ReactNode
  ) => {
    setNotification({ type, content, expandedContent });
  };

  const dismissNotification = () => {
    setNotification(null);
  };

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Account">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants1}
      >
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl font-bold mb-8">Dynamic Island Demo</h1>
          <div className="space-x-4  gap-2">
            <Button
              onClick={() =>
                showNotification(
                  "default",
                  <DefaultNotification message="New message received" />,
                  <DefaultExpandedNotification message="You have a new message from John Doe. Click to read." />
                )
              }
            >
              Show Default Notification
            </Button>
            <Button
              onClick={() =>
                showNotification(
                  "call",
                  <CallNotification
                    caller="John Doe"
                    avatar="https://i.pravatar.cc/150?u=john.smith"
                  />,
                  <CallExpandedNotification
                    caller="John Doe"
                    avatar="https://i.pravatar.cc/150?u=john.smith"
                  />
                )
              }
            >
              Show Call Notification
            </Button>
            <Button
              onClick={() =>
                showNotification(
                  "music",
                  <MusicNotification
                    title="Blinding Lights"
                    artist="The Weeknd"
                    cover="https://i.pravatar.cc/150?u=mitchell.luo"
                  />,
                  <MusicExpandedNotification
                    title="Blinding Lights"
                    artist="The Weeknd"
                    cover="https://i.pravatar.cc/150?u=mitchell.luo"
                  />
                )
              }
            >
              Show Music Notification
            </Button>
            <Button
              onClick={() =>
                showNotification(
                  "timer",
                  <TimerNotification time="00:05:30" />,
                  <TimerExpandedNotification time="00:05:30" />
                )
              }
            >
              Show Timer Notification
            </Button>
          </div>
          {notification && (
            <DynamicIsland
              type={notification.type}
              content={notification.content}
              expandedContent={notification.expandedContent}
              isVisible={!!notification}
              onDismiss={dismissNotification}
            />
          )}
        </div>
      </motion.div>
    </ContentLayout>
  );
}
