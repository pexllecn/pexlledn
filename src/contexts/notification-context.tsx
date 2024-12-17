"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  DynamicIslandNotification,
  NotificationType,
} from "@/components/dynamic-island-notification";

interface NotificationContextType {
  showNotification: (
    type: NotificationType,
    title: string,
    message: string
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<React.ReactNode | null>(
    null
  );

  const showNotification = useCallback(
    (type: NotificationType, title: string, message: string) => {
      setNotification(
        <DynamicIslandNotification
          type={type}
          title={title}
          message={message}
          onClose={() => setNotification(null)}
        />
      );
    },
    []
  );

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
