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
          <span className="sr-only">Verified</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              className="fill-background"
              d="M3.046 8.277A4.402 4.402 0 0 1 8.303 3.03a4.4 4.4 0 0 1 7.411 0 4.397 4.397 0 0 1 5.19 3.068c.207.713.23 1.466.067 2.19a4.4 4.4 0 0 1 0 7.415 4.403 4.403 0 0 1-3.06 5.187 4.398 4.398 0 0 1-2.186.072 4.398 4.398 0 0 1-7.422 0 4.398 4.398 0 0 1-5.257-5.248 4.4 4.4 0 0 1 0-7.437Z"
            />
            <path
              className="fill-primary"
              d="M4.674 8.954a3.602 3.602 0 0 1 4.301-4.293 3.6 3.6 0 0 1 6.064 0 3.598 3.598 0 0 1 4.3 4.302 3.6 3.6 0 0 1 0 6.067 3.6 3.6 0 0 1-4.29 4.302 3.6 3.6 0 0 1-6.074 0 3.598 3.598 0 0 1-4.3-4.293 3.6 3.6 0 0 1 0-6.085Z"
            />
            <path
              className="fill-background"
              d="M15.707 9.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L11 12.586l3.293-3.293a1 1 0 0 1 1.414 0Z"
            />
          </svg>
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
