"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GridIcon, ListIcon, SearchIcon, PlusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample user data
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    department: "IT",
    joinDate: "2022-03-15"
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "User",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    department: "Sales",
    joinDate: "2021-11-02"
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Editor",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    department: "Marketing",
    joinDate: "2023-01-20"
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    role: "User",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    department: "HR",
    joinDate: "2022-07-11"
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan@example.com",
    role: "Admin",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    department: "Operations",
    joinDate: "2021-09-30"
  },
  {
    id: 6,
    name: "Fiona Gallagher",
    email: "fiona@example.com",
    role: "User",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    department: "Finance",
    joinDate: "2023-04-05"
  }
];

const UserCard = ({ user }: { user: (typeof users)[number] }) => (
  <Card className=" hover:shadow-md shadow-none">
    <CardContent className="p-6">
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <Link
            href={`/users/${user.id}`}
            className="text-lg font-semibold hover:underline"
          >
            {user.name}
          </Link>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <div className="flex items-center mt-2 space-x-2">
            <Badge variant="secondary">{user.role}</Badge>
            <Badge variant="outline">{user.department}</Badge>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const UserListItem = ({ user }: { user: (typeof users)[number] }) => (
  <div className="flex items-center space-x-4 p-4 hover:bg-muted/50 rounded-lg transition-colors">
    <Avatar>
      <AvatarImage src={user.avatarUrl} alt={user.name} />
      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
    </Avatar>
    <div className="flex-1 space-y-1">
      <Link href={`/users/${user.id}`} className="font-medium hover:underline">
        {user.name}
      </Link>
      <p className="text-sm text-muted-foreground">{user.email}</p>
    </div>
    <div className="flex items-center space-x-2">
      <Badge variant="secondary">{user.role}</Badge>
      <Badge variant="outline">{user.department}</Badge>
    </div>
  </div>
);

export default function UsersPage() {
  const [view, setView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ContentLayout title="Users">
      <Card className="bg-muted shadow-none border-none mb-8">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add User
              </Button>
              <Button
                variant={view === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setView("grid")}
              >
                <GridIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setView("list")}
              >
                <ListIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            {filteredUsers.map((user) => (
              <UserListItem key={user.id} user={user} />
            ))}
          </CardContent>
        </Card>
      )}
    </ContentLayout>
  );
}
