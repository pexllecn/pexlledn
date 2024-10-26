"use client";
import React from "react";
import { UserProfile } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, PhoneIcon } from "lucide-react";

interface ProfileHeaderProps {
  user: UserProfile;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = React.memo(
  ({ user }) => (
    <div className="flex flex-col items-center">
      <div className="relative mb-2">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0">
          <img src="/Verified_Badge.svg" alt="Verified" className="w-6 h-6" />
        </div>
      </div>
      <h2 className="text-xl font-normal mb-1">{user.name}</h2>
      {/* <p className="text-sm text-muted-foreground mb-4">{user.email}</p> */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <Badge variant="outline">{user.followers} followers</Badge>
      </div>
      <div className="flex space-x-2">
        <Button className="w-full" variant="default">
          Follow
        </Button>
        <Button className="w-full" variant="outline">
          Message
        </Button>
      </div>
      <div className="text-muted-foreground space-y-2 mt-4">
        <div className="flex items-center">
          <CalendarIcon className="h-3 w-3 mr-2" />
          <span>Joined {user.joinDate}</span>
        </div>
        <div className="flex items-center">
          <PhoneIcon className="h-3 w-3 mr-2 text-muted-foreground" />
          <span>{user.phone}</span>
        </div>
        <div className="flex items-center">
          <MapPinIcon className="h-3 w-3 mr-2 text-muted-foreground" />
          <span>{user.location}</span>
        </div>
      </div>
    </div>
  )
);

ProfileHeader.displayName = "ProfileHeader";
