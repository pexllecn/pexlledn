"use client";
import React from "react";
import { UserProfile } from "@/types/user";
import {
  CalendarIcon,
  PhoneIcon,
  MapPinIcon,
  ShoppingBagIcon,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProfileDetailsProps {
  user: UserProfile;
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = React.memo(
  ({ user }) => (
    <div className="mt-6 space-y-4">
      <div>
        <h3 className="font-normal mb-2">About</h3>
        <p className="text-sm text-muted-foreground">{user.bio}</p>
      </div>

      <div>
        <h3 className="font-normal mb-2">Seller Stats</h3>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-background p-2 rounded-lg flex items-center">
            <ShoppingBagIcon className="h-6 w-6 mr-2 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Items Sold</p>
              <p className="text-sm font-normal">{user.items}</p>
            </div>
          </div>
          <div className="bg-background p-2 rounded-lg flex items-center">
            <Star className="text-yellow-400 mr-2" fill="currentColor" />
            <div>
              <p className="text-xs text-muted-foreground">Avg Rating</p>
              <p className="text-sm font-normal">4.8/5</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-normal mb-2">Favorite Tags</h3>
        <div className="flex flex-wrap gap-1">
          {user.favoriteTags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-background text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
);

ProfileDetails.displayName = "ProfileDetails";
