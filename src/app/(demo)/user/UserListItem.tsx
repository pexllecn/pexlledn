"use client";
import React from "react";
import Link from "next/link";
import { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontalIcon,
  UserPlusIcon,
  MailIcon,
  TrashIcon
} from "lucide-react";

interface UserListItemProps {
  user: User;
  onSelect: (id: number) => void;
  isSelected: boolean;
}

export const UserListItem: React.FC<UserListItemProps> = React.memo(
  ({ user, onSelect, isSelected }) => (
    <div
      className={`flex items-center space-x-4 p-4 hover:bg-muted/50 rounded-lg transition-colors ${
        isSelected ? "bg-muted" : ""
      }`}
    >
      <Checkbox
        checked={isSelected}
        onCheckedChange={() => onSelect(user.id)}
      />
      <Avatar>
        <AvatarImage src={user.avatarUrl} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <Link href={`/user/${user.id}`} className="font-medium hover:underline">
          {user.name}
        </Link>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Badge variant="default">{user.role}</Badge>
        <Badge variant="secondary">{user.department}</Badge>
        <Badge variant={user.status === "Active" ? "success" : "destructive"}>
          {user.status}
        </Badge>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <UserPlusIcon className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MailIcon className="mr-2 h-4 w-4" /> Email
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            <TrashIcon className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
);

UserListItem.displayName = "UserListItem";
