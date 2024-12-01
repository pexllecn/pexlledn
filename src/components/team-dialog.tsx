"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Globe, X } from "lucide-react";

export default function TeamDialog() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const teamMembers = [
    {
      name: "John Smith",
      email: "johnsmith@gmail.com",
      image: "https://i.pravatar.cc/150?u=js.member",
    },
    {
      name: "Mario Rodriguez",
      email: "mariorodriguez@gmail.com",
      image: "https://i.pravatar.cc/150?u=mr.member",
    },
    {
      name: "Emily Chen",
      email: "emilychen@gmail.com",
      image: "https://i.pravatar.cc/150?u=ec.member",
    },
  ];

  const dialogContent = (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src="https://i.pravatar.cc/150?u=owner"
              alt="Profile"
            />
            <AvatarFallback>IN</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base sm:text-lg">insank@gmail.com</span>
              <Badge variant="primary" className="h-6">
                Owner
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Startup Plan, Free, for trying things out.
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="members" className="flex-1">
            Team Members
          </TabsTrigger>
          <TabsTrigger value="developer" className="flex-1">
            Developer Mode
          </TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="space-y-6">
          <div className="space-y-4 pt-4">
            <DialogTitle className="text-lg font-semibold">
              Invite Members
            </DialogTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="johndoe@gmail.com" className="pl-8" />
              </div>
              <Button className="w-full sm:w-auto">Send Invite</Button>
            </div>
          </div>

          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.email}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm sm:text-base">
                      {member.name}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive dark:text-red-600"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:ml-2">Remove</span>
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <div className="h-px bg-border" />
        <Button className="w-full bg-[#1c2834] text-white hover:bg-[#1c2834]/90">
          <Globe className="mr-2 h-4 w-4" />
          Upgrade Plan
        </Button>
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Do you need any help? </span>
          <Button
            variant="link"
            className="p-0 text-primary-foreground dark:text-primary"
          >
            Contact us
          </Button>
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Invite team member</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              Team Members
            </DialogTitle>
          </DialogHeader>
          {dialogContent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Invite team member</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-2xl font-semibold">
            Team Members
          </DrawerTitle>
          <DrawerDescription>
            Invite and manage your team members
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">{dialogContent}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
