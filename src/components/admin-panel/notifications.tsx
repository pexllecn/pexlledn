"use client";

import * as React from "react";
import { CheckCheck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  type: "comment" | "invitation" | "file";
  user: {
    name: string;
    avatar: string;
  };
  content: {
    action: string;
    target: string;
    timestamp: string;
    category: string;
  };
  file?: {
    name: string;
    type: string;
  };
}

// Removed getRandomColor function

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function NotificationsPopover() {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: "1",
      type: "comment",
      user: {
        name: "Insan Kamil",
        avatar: "insankamil",
      },
      content: {
        action: "Commented in",
        target: "SaaS Management",
        timestamp: "Friday 3:12 PM",
        category: "SaaS Product",
      },
    },
    {
      id: "2",
      type: "invitation",
      user: {
        name: "John",
        avatar: "john",
      },
      content: {
        action: "Invited you to",
        target: "Dashboard Payment",
        timestamp: "Thursday 2:20 PM",
        category: "New Product",
      },
    },
    {
      id: "3",
      type: "file",
      user: {
        name: "Miguel Lorenzo",
        avatar: "miguellorenzo",
      },
      content: {
        action: "Imported a new file in",
        target: "SaaS Management",
        timestamp: "Friday 3:12 PM",
        category: "SaaS Product",
      },
      file: {
        name: "Data Management.csv",
        type: "csv",
      },
    },
  ]);

  return (
    <Card className="border-none shadow-none rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 pt-4">
        <CardTitle className="text-base font-semibold">Notification</CardTitle>
        <Button
          variant="link"
          className="text-blue-500 hover:text-blue-600 font-normal p-0 h-auto"
          onClick={() => {
            // Mark all as read logic
            console.log("Marking all as read");
          }}
        >
          <CheckCheck className="h-4 w-4 mr-1" />
          Make all as read
        </Button>
      </CardHeader>
      <CardContent className="px-2">
        <ScrollArea className="">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-4 border-b p-4 last:border-0"
            >
              <Avatar className="text-primary-foreground">
                <AvatarImage
                  src={`https://i.pravatar.cc/40?u=${notification.user.avatar}`}
                  alt={notification.user.name}
                />
                <AvatarFallback>
                  {getInitials(notification.user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm leading-none">
                  <span className="font-semibold">
                    {notification.user.name}
                  </span>{" "}
                  <span className="text-muted-foreground">
                    {notification.content.action}
                  </span>{" "}
                  <span className="font-semibold">
                    {notification.content.target}
                  </span>
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {notification.type === "comment"}
                  {notification.type === "invitation"}
                  {notification.type === "file"}
                  <span>{notification.content.timestamp}</span>
                  <span>•</span>
                  <span>{notification.content.category}</span>
                </div>
                {notification.type === "invitation" && (
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-4 text-xs"
                    >
                      Decline
                    </Button>
                    <Button variant="black" size="sm">
                      Accept
                    </Button>
                  </div>
                )}
                {notification.type === "file" && notification.file && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 h-8 px-2 text-xs"
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
