"use client";
import React from "react";
import Link from "next/link";
import { User } from "@/types/user";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontalIcon,
  UserPlusIcon,
  MailIcon,
  TrashIcon,
} from "lucide-react";

interface UserCardProps {
  user: User;
  onSelect: (id: number) => void;
  isSelected: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = React.memo(
  ({ user, onSelect, isSelected, onEdit, onDelete }) => (
    <Card
      className={`hover:border-ring shadow-none border-muted bg-muted ${
        isSelected ? "border-ring" : ""
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onSelect(user.id)}
            className="bg-background border-grey self-start mt-1"
          />
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <Link
              href={`/user/${user.id}`}
              className="text-sm font-normal hover:underline hover:text-ring truncate block"
            >
              {user.name}
            </Link>
            <p className="text-sm text-muted-foreground truncate">
              {user.email}
            </p>
            <div className="text-xs flex flex-wrap items-center mt-1 gap-1">
              <Badge variant="outline" className="bg-background">
                {user.role}
              </Badge>
              <Badge variant="outline">{user.department}</Badge>
              <Badge variant={user.status === "Active" ? "success" : "decline"}>
                {user.status}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(user)}>
                <UserPlusIcon className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MailIcon className="mr-2 h-4 w-4" /> Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(user)} className="text-destructive">
                <TrashIcon className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
);

UserCard.displayName = "UserCard";