"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  GridIcon,
  ListIcon,
  SearchIcon,
  PlusIcon,
  FilterIcon,
} from "lucide-react";

interface UserManagementHeaderProps {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: {
    roles: string[];
    departments: string[];
    statuses: string[];
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      roles: string[];
      departments: string[];
      statuses: string[];
    }>
  >;
  onAddUser: () => void;
}

export const UserManagementHeader: React.FC<UserManagementHeaderProps> = React.memo(
  ({ view, setView, searchTerm, setSearchTerm, filters, setFilters, onAddUser }) => {
    const handleFilterChange = (category: 'roles' | 'departments' | 'statuses', item: string) => {
      setFilters(prev => ({
        ...prev,
        [category]: prev[category].includes(item)
          ? prev[category].filter(i => i !== item)
          : [...prev[category], item]
      }));
    };

    return (
      <Card className="p-0 bg-background shadow-none border-none mb-8">
        <CardHeader>
          <CardTitle className="font-normal text-3xl">User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0 sm:space-x-4">
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0">
                <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8 w-full sm:w-[300px] border-none bg-muted shadow-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <FilterIcon className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {['Admin', 'User', 'Manager'].map(role => (
                    <DropdownMenuCheckboxItem
                      key={role}
                      checked={filters.roles.includes(role)}
                      onCheckedChange={() => handleFilterChange('roles', role)}
                    >
                      {role}
                    </DropdownMenuCheckboxItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Filter by Department</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {['IT', 'HR', 'Sales', 'Marketing'].map(dept => (
                    <DropdownMenuCheckboxItem
                      key={dept}
                      checked={filters.departments.includes(dept)}
                      onCheckedChange={() => handleFilterChange('departments', dept)}
                    >
                      {dept}
                    </DropdownMenuCheckboxItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {['Active', 'Inactive'].map(status => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={filters.statuses.includes(status)}
                      onCheckedChange={() => handleFilterChange('statuses', status)}
                    >
                      {status}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-grow sm:flex-grow-0"
                onClick={onAddUser}
              >
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
    );
  }
);

UserManagementHeader.displayName = "UserManagementHeader";