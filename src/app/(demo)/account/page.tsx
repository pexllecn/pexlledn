"use client";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMemo, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { ComputerIcon, Download, XIcon } from "lucide-react";
import { Textarea } from "@/registry/default/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AccountPage() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 }
  };

  function TodoForm({ className }: React.ComponentProps<"form">) {
    return (
      <form className={className}>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input id="title" placeholder="Todo title..." />
          </div>
          <div className="grid gap-2">
            <Textarea id="description" placeholder="Description..." />
          </div>
        </div>
        <div className={isDesktop ? "flex justify-end" : ""}>
          <Button type="submit">Confirm</Button>
        </div>
      </form>
    );
  }

  const DrawerDialogDemo = () => {
    if (isDesktop) {
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Click here!
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm</DialogTitle>
              <DialogDescription>
                What do you want to get done today?
              </DialogDescription>
            </DialogHeader>
            <TodoForm />
          </DialogContent>
        </Dialog>
      );
    }
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Confirm</DrawerTitle>
            <DrawerDescription>
              What do you want to get done today?
            </DrawerDescription>
          </DrawerHeader>
          <TodoForm className="px-4" />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };

  function ComputerIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="14" height="8" x="5" y="2" rx="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" />
        <path d="M6 18h2" />
        <path d="M12 18h6" />
      </svg>
    );
  }

  function XIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    );
  }

  return (
    <ContentLayout title="Account">
      <PlaceholderContent />

      <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6">
        <Tabs defaultValue="account" className="space-y-8">
          <TabsList className="flex border-b">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your personal information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john@example.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src="/placeholder-user.jpg"
                          alt="@shadcn"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Button variant="outline">Change</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="notifications">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Choose what you want to be notified about.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Email Notifications</Label>
                    <div className="flex items-center gap-2">
                      <Checkbox id="email-notifications" defaultChecked />
                      <Label htmlFor="email-notifications">
                        Receive email notifications
                      </Label>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Push Notifications</Label>
                    <div className="flex items-center gap-2">
                      <Checkbox id="push-notifications" defaultChecked />
                      <Label htmlFor="push-notifications">
                        Receive push notifications
                      </Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="preferences">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>
                    Customize your account preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Dark Mode</Label>
                    <div className="flex items-center gap-2">
                      <Checkbox id="dark-mode" />
                      <Label htmlFor="dark-mode">Enable dark mode</Label>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="language">Language</Label>
                    <Select>
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="timezone">Time Zone</Label>
                    <Select>
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">
                          EST (Eastern Standard Time)
                        </SelectItem>
                        <SelectItem value="pst">
                          PST (Pacific Standard Time)
                        </SelectItem>
                        <SelectItem value="cst">
                          CST (Central Standard Time)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="security">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Manage your account security settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Two-Factor Authentication</Label>
                    <div className="flex items-center gap-2">
                      <Checkbox id="two-factor" />
                      <Label htmlFor="two-factor">
                        Enable two-factor authentication
                      </Label>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Authorized Devices</Label>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ComputerIcon className="w-5 h-5" />
                          <div>
                            <div className="font-medium">iPhone 12</div>
                            <div className="text-muted-foreground text-sm">
                              Logged in 2 hours ago
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ComputerIcon className="w-5 h-5" />
                          <div>
                            <div className="font-medium">MacBook Pro</div>
                            <div className="text-muted-foreground text-sm">
                              Logged in 1 day ago
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ContentLayout>
  );
}
