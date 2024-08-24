"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  GridIcon,
  ListIcon,
  SearchIcon,
  PlusIcon,
  FilterIcon,
  SortAscIcon,
  SortDescIcon,
  MoreHorizontalIcon,
  TrashIcon,
  UserPlusIcon,
  MailIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon
} from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  department: string;
  joinDate: string;
  status: string;
  lastActive: string;
};

const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    department: "IT",
    joinDate: "2022-03-15",
    status: "Active",
    lastActive: "2023-08-23T14:30:00Z"
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "User",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    department: "Sales",
    joinDate: "2021-11-02",
    status: "Active",
    lastActive: "2023-08-22T10:15:00Z"
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Editor",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    department: "Marketing",
    joinDate: "2023-01-20",
    status: "Inactive",
    lastActive: "2023-07-15T09:00:00Z"
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    role: "User",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    department: "HR",
    joinDate: "2022-07-11",
    status: "Active",
    lastActive: "2023-08-21T16:45:00Z"
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan@example.com",
    role: "Admin",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    department: "Operations",
    joinDate: "2021-09-30",
    status: "Active",
    lastActive: "2023-08-23T11:30:00Z"
  },
  {
    id: 6,
    name: "Fiona Gallagher",
    email: "fiona@example.com",
    role: "User",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    department: "Finance",
    joinDate: "2023-04-05",
    status: "Active",
    lastActive: "2023-08-22T13:20:00Z"
  },
  {
    id: 7,
    name: "George Lucas",
    email: "george@example.com",
    role: "Editor",
    avatarUrl: "https://i.pravatar.cc/150?img=7",
    department: "Creative",
    joinDate: "2022-12-18",
    status: "Active",
    lastActive: "2023-08-23T09:10:00Z"
  },
  {
    id: 8,
    name: "Hannah Montana",
    email: "hannah@example.com",
    role: "User",
    avatarUrl: "https://i.pravatar.cc/150?img=8",
    department: "Entertainment",
    joinDate: "2023-02-28",
    status: "Inactive",
    lastActive: "2023-07-01T09:15:00Z"
  },
  {
    id: 9,
    name: "Ian Malcolm",
    email: "ian@example.com",
    role: "User",
    avatarUrl: "https://i.pravatar.cc/150?img=9",
    department: "Research",
    joinDate: "2022-08-14",
    status: "Active",
    lastActive: "2023-08-23T15:40:00Z"
  },
  {
    id: 10,
    name: "Julia Roberts",
    email: "julia@example.com",
    role: "Editor",
    avatarUrl: "https://i.pravatar.cc/150?img=10",
    department: "Public Relations",
    joinDate: "2023-05-20",
    status: "Active",
    lastActive: "2023-08-22T17:55:00Z"
  }
];

const UserCard = ({
  user,
  onSelect,
  isSelected
}: {
  user: User;
  onSelect: (id: number) => void;
  isSelected: boolean;
}) => (
  <Card
    className={`hover:border-ring shadow-none ${
      isSelected ? "border-primary" : ""
    }`}
  >
    <CardContent className="p-4">
      <div className="flex items-center space-x-3">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(user.id)}
          className="self-start mt-1"
        />
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <Link
            href={`/users/${user.id}`}
            className="text-sm font-semibold hover:underline hover:text-ring truncate block"
          >
            {user.name}
          </Link>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          <div className="flex flex-wrap items-center mt-1 gap-1">
            <Badge variant="default" className="text-xs">
              {user.role}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {user.department}
            </Badge>
            <Badge
              variant={user.status === "Active" ? "success" : "decline"}
              className="text-xs"
            >
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
    </CardContent>
  </Card>
);

const UserListItem = ({
  user,
  onSelect,
  isSelected
}: {
  user: User;
  onSelect: (id: number) => void;
  isSelected: boolean;
}) => (
  <div
    className={`flex items-center space-x-4 p-4 hover:bg-muted/50 rounded-lg transition-colors ${
      isSelected ? "bg-muted" : ""
    }`}
  >
    <Checkbox checked={isSelected} onCheckedChange={() => onSelect(user.id)} />
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
);

export default function UsersPage() {
  const [view, setView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<keyof User>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterRole, setFilterRole] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 }
  };

  const filteredAndSortedUsers = useMemo(() => {
    return users
      .filter(
        (user) =>
          (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (filterRole === "All" || user.role === filterRole)
      )
      .sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [searchTerm, sortBy, sortOrder, filterRole]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredAndSortedUsers.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredAndSortedUsers, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / rowsPerPage);

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleSort = (field: keyof User) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <ContentLayout title="Users">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        variants={variants1}
      >
        <Card className="bg-muted shadow-none border-none mb-8">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0 sm:space-x-4">
              <div className="flex space-x-2">
                <div className="relative">
                  <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8 w-[300px]  bg-background "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size={"sm"}>
                      <FilterIcon className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFilterRole("All")}>
                      All Roles
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterRole("Admin")}>
                      Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterRole("User")}>
                      User
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterRole("Editor")}>
                      Editor
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add User
                </Button>
                <Button
                  variant={view === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("grid")}
                >
                  <GridIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "list" ? "default" : "outline"}
                  size="sm"
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
            {paginatedUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onSelect={toggleUserSelection}
                isSelected={selectedUsers.includes(user.id)}
              />
            ))}
          </div>
        ) : (
          <Card className="border-none">
            <Table>
              <TableHeader className="bg-muted border-none">
                <TableRow className="border-none">
                  <TableHead className="w-[50px] rounded-tl-lg">
                    <Checkbox
                      checked={
                        selectedUsers.length === filteredAndSortedUsers.length
                      }
                      onCheckedChange={(checked) => {
                        setSelectedUsers(
                          checked ? filteredAndSortedUsers.map((u) => u.id) : []
                        );
                      }}
                    />
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => toggleSort("name")}
                  >
                    Name{" "}
                    {sortBy === "name" &&
                      (sortOrder === "asc" ? (
                        <SortAscIcon className="inline h-4 w-4" />
                      ) : (
                        <SortDescIcon className="inline h-4 w-4" />
                      ))}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => toggleSort("email")}
                  >
                    Email{" "}
                    {sortBy === "email" &&
                      (sortOrder === "asc" ? (
                        <SortAscIcon className="inline h-4 w-4" />
                      ) : (
                        <SortDescIcon className="inline h-4 w-4" />
                      ))}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => toggleSort("role")}
                  >
                    Role{" "}
                    {sortBy === "role" &&
                      (sortOrder === "asc" ? (
                        <SortAscIcon className="inline h-4 w-4" />
                      ) : (
                        <SortDescIcon className="inline h-4 w-4" />
                      ))}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => toggleSort("department")}
                  >
                    Department{" "}
                    {sortBy === "department" &&
                      (sortOrder === "asc" ? (
                        <SortAscIcon className="inline h-4 w-4" />
                      ) : (
                        <SortDescIcon className="inline h-4 w-4" />
                      ))}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => toggleSort("status")}
                  >
                    Status{" "}
                    {sortBy === "status" &&
                      (sortOrder === "asc" ? (
                        <SortAscIcon className="inline h-4 w-4" />
                      ) : (
                        <SortDescIcon className="inline h-4 w-4" />
                      ))}
                  </TableHead>
                  <TableHead className="rounded-tr-lg">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedUsers.map((user) => (
                  <TableRow key={user.id} className="border-none">
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => toggleUserSelection(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatarUrl} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "Active" ? "success" : "decline"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {selectedUsers.length} of {filteredAndSortedUsers.length} row(s)
            selected.
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={`${rowsPerPage}`}
                onValueChange={(value) => {
                  setRowsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={rowsPerPage} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
