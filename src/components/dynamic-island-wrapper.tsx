"use client";

import React, { useState, useEffect } from "react";
import DynamicIsland, {
  NotificationType,
} from "@/components/ui/dynamic-island";
import { useStore } from "@/hooks/use-store";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { cn } from "@/lib/utils";

interface DynamicIslandManagerProps {
  children: ({
    showNotification,
  }: {
    showNotification: (
      type: NotificationType,
      content: React.ReactNode,
      expandedContent: React.ReactNode
    ) => void;
  }) => React.ReactNode;
}

export const DynamicIslandManager: React.FC<DynamicIslandManagerProps> = ({
  children,
}) => {
  const [notification, setNotification] = useState<{
    type: NotificationType;
    content: React.ReactNode;
    expandedContent: React.ReactNode;
  } | null>(null);

  // Get sidebar state
  const sidebar = useStore(useSidebarToggle, (state) => state);

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

  // Determine sidebar width dynamically
  const getSidebarAdjustment = () => {
    if (!sidebar) return "left-1/2 ";

    return sidebar.isOpen
      ? "left-[calc(50%+112px)] "
      : "left-[calc(50%+36px)] ";
  };

  return (
    <>
      {children({ showNotification })}
      {notification && (
        <div className={cn("fixed top-4 z-[1000]", getSidebarAdjustment())}>
          <DynamicIsland
            type={notification.type}
            content={notification.content}
            expandedContent={notification.expandedContent}
            isVisible={!!notification}
            onDismiss={dismissNotification}
          />
        </div>
      )}
    </>
  );
};
