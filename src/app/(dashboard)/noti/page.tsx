"use client";

import React, { useState } from "react";
import { DynamicIslandManager } from "@/components/dynamic-island-wrapper";
import {
  DefaultNotification,
  DefaultExpandedNotification,
  CallNotification,
  CallExpandedNotification,
  MusicNotification,
  MusicExpandedNotification,
  TimerNotification,
  TimerExpandedNotification,
  WifiNotification,
  WifiExpandedNotification,
  BatteryNotification,
  BatteryExpandedNotification,
  GPSNotification,
} from "@/components/ui/notification-contents";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { motion } from "framer-motion";
import {
  Wifi,
  Battery,
  Download,
  Navigation,
  MessageCircle,
  Bluetooth,
  Timer,
} from "lucide-react";

export default function DynamicIslandDemo() {
  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <DynamicIslandManager>
      {({ showNotification }) => (
        <ContentLayout title="Dynamic Island Demo">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }}
            variants={variants1}
          >
            <div className="pt-16 md:pt-32 lg:pt-64 bg-background flex flex-col items-center justify-center p-4">
              <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Dynamic Island Playground
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Existing Notifications */}
                <Button
                  onClick={() =>
                    showNotification(
                      "default",
                      <DefaultNotification
                        message="New message received"
                        avatar="https://i.pravatar.cc/150?u=john.smith"
                      />,
                      <DefaultExpandedNotification message="You have a new message from John Doe. Click to read." />
                    )
                  }
                  className="w-full"
                >
                  Default Notification
                </Button>

                <Button
                  onClick={() =>
                    showNotification(
                      "call",
                      <CallNotification
                        caller="John Doe"
                        avatar="https://i.pravatar.cc/150?u=emma.thompso"
                      />,
                      <CallExpandedNotification
                        caller="John Doe"
                        avatar="https://i.pravatar.cc/150?u=emma.thompso"
                      />
                    )
                  }
                  className="w-full"
                >
                  Incoming Call
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
                  className="w-full"
                >
                  Music Playing
                </Button>

                {/* New Notifications */}
                <Button
                  onClick={() =>
                    showNotification(
                      "wifi",
                      <WifiNotification networkName="Home Network" />,
                      <WifiExpandedNotification
                        networkName="Home Network"
                        signalStrength={85}
                      />
                    )
                  }
                  className="w-full"
                >
                  <Wifi className="mr-2 h-4 w-4" /> Wi-Fi Connection
                </Button>

                <Button
                  onClick={() =>
                    showNotification(
                      "battery",
                      <BatteryNotification percentage={45} />,
                      <BatteryExpandedNotification
                        percentage={45}
                        isCharging={false}
                      />
                    )
                  }
                  className="w-full"
                >
                  <Battery className="mr-2 h-4 w-4" /> Battery Status
                </Button>

                <Button
                  onClick={() =>
                    showNotification(
                      "gps",
                      <GPSNotification destination="Home" />,
                      <motion.div
                        className="mt-2 space-y-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                      >
                        <div className="flex items-center justify-center space-x-4">
                          <Navigation className="h-8 w-8 text-green-500" />
                          <div>
                            <p className="text-sm font-medium">Navigation</p>
                            <p className="text-xs text-gray-500">
                              Destination: Home
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-around">
                          <Button variant="primary" size="sm">
                            Stop
                          </Button>
                          <Button variant="secondary" size="sm">
                            Reroute
                          </Button>
                        </div>
                      </motion.div>
                    )
                  }
                  className="w-full"
                >
                  <Navigation className="mr-2 h-4 w-4" /> GPS Navigation
                </Button>

                <Button
                  onClick={() =>
                    showNotification(
                      "timer",
                      <TimerNotification time="00:05:30" />,
                      <TimerExpandedNotification time="00:05:30" />
                    )
                  }
                  className="w-full"
                >
                  <Timer className="mr-2 h-4 w-4" /> Timer
                </Button>
              </div>
            </div>
          </motion.div>
        </ContentLayout>
      )}
    </DynamicIslandManager>
  );
}
