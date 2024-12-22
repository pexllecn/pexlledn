"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: {
    src?: string;
    fallback: string;
  }[];
  max?: number;
}

export function AvatarGroup({
  avatars,
  max = 4,
  className,
  ...props
}: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);
  const remainingAvatars = avatars.length - max;

  return (
    <div className={cn("flex -space-x-4", className)} {...props}>
      {displayAvatars.map((avatar, i) => (
        <Avatar key={i} className="border-2 border-background">
          <AvatarImage src={avatar.src} />
          <AvatarFallback>{avatar.fallback}</AvatarFallback>
        </Avatar>
      ))}
      {remainingAvatars > 0 && (
        <Avatar className="border-2 border-background">
          <AvatarFallback>+{remainingAvatars}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
