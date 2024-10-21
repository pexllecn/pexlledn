"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Globe,
  LogOut,
  Smartphone,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Head from "next/head";
import { useState } from "react";
import ThemeSelector from "./ThemeSelector";
import { Checkbox } from "@/components/ui/checkbox";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const tabOptions = [
    { value: "profile", label: "Profile" },
    { value: "notifications", label: "Notifications" },
    { value: "preferences", label: "Preferences" },
    { value: "security", label: "Security" },
  ];

  return (
    <ContentLayout title="Account">
      <Head>
        <title>Account Settings</title>
      </Head>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        variants={variants1}
      >
        <div className="container p-4 sm:p-6 max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-normal">
                Account Settings
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Manage your account preferences and settings
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-muted"
                  >
                    {tabOptions.find((tab) => tab.value === activeTab)?.label}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[calc(100vw-2rem)]">
                  {tabOptions.map((tab) => (
                    <DropdownMenuItem
                      key={tab.value}
                      onSelect={() => setActiveTab(tab.value)}
                    >
                      {tab.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="hidden sm:block">
              <Tabs
                defaultValue="profile"
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4">
                  {tabOptions.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value}>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="space-y-6">
            {activeTab === "profile" && (
              <Card className="shadow-none border-none">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal details and profile photo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src="/placeholder.svg?height=96&width=96"
                        alt="Profile picture"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex ml-4 flex-col space-y-2">
                      <Button variant="ghost" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload new picture
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive dark:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove picture
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <div className="items-top flex space-x-2">
                    <Checkbox id="terms1" />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Accept terms and conditions
                      </label>
                      <p className="text-sm text-muted-foreground">
                        You agree to our Terms of Service and Privacy Policy.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card className="shadow-none border-none">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Customize how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {["Email", "Push", "SMS", "In-app"].map((type) => (
                      <div
                        key={type}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <h3 className="font-normal">{type} Notifications</h3>
                          <p className="text-sm text-muted-foreground">
                            Receive {type.toLowerCase()} notifications
                          </p>
                        </div>
                        <Switch />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-normal">Notification Categories</h3>
                    {[
                      "Account activity",
                      "New features",
                      "Marketing",
                      "Security alerts",
                    ].map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Switch
                          id={category.replace(" ", "-")}
                          disabled
                          checked
                        />
                        <Label htmlFor={category.replace(" ", "-")}>
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "preferences" && (
              <Card className="shadow-none border-none">
                <CardHeader>
                  <CardTitle>Account Preferences</CardTitle>
                  <CardDescription>
                    Customize your account settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-normal mb-2">Theme</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Choose your preferred theme
                    </p>
                    <ThemeSelector />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
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
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Time Zone</Label>
                    <Select defaultValue="utc">
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
                        <SelectItem value="cet">
                          CET (Central European Time)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <Card className="shadow-none border-none">
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password or enable two-factor authentication
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Change Password</Button>
                  </CardFooter>
                </Card>

                <Card className="shadow-none border-none">
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                      Protect your account with 2FA
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-normal">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-sm">
                        <Smartphone className="h-3 w-3 mr-1" />
                        SMS
                      </Badge>
                      <Badge variant="outline" className="text-sm">
                        <Globe className="h-3 w-3 mr-1" />
                        Authenticator App
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      Set Up 2FA
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-none border-none">
                  <CardHeader>
                    <CardTitle>Active Sessions</CardTitle>
                    <CardDescription>
                      Manage your active sessions and devices
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        device: "MacBook Pro",
                        location: "San Francisco, CA",
                        lastActive: "2 minutes ago",
                      },
                      {
                        device: "iPhone 12",
                        location: "New York, NY",
                        lastActive: "1 hour ago",
                      },
                    ].map((session, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Smartphone className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-normal text-sm">
                              {session.device}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {session.location} • {session.lastActive}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                          <span className="sr-only sm:not-sr-only sm:ml-2">
                            End Session
                          </span>
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
            <Button
              variant="outline"
              className="text-destructive dark:text-red-600 w-full sm:w-auto"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out of all devices
            </Button>
            <Button variant="destructive" className="w-full sm:w-auto">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
