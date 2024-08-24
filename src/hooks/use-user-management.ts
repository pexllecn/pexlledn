"use client";
import { useState, useMemo, useCallback } from "react";
import { User } from "@/types/user";

export const useUserManagement = (initialUsers: User[]) => {
  const [users] = useState<User[]>(initialUsers);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<keyof User>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterRole, setFilterRole] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
  }, [users, searchTerm, sortBy, sortOrder, filterRole]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredAndSortedUsers.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredAndSortedUsers, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / rowsPerPage);

  const toggleUserSelection = useCallback((userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  }, []);

  const toggleSort = useCallback((field: keyof User) => {
    setSortBy((prevSortBy) => {
      if (prevSortBy === field) {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
      } else {
        setSortOrder("asc");
      }
      return field;
    });
  }, []);

  return {
    view,
    setView,
    searchTerm,
    setSearchTerm,
    selectedUsers,
    setSelectedUsers,
    sortBy,
    sortOrder,
    filterRole,
    setFilterRole,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    filteredAndSortedUsers,
    paginatedUsers,
    totalPages,
    toggleUserSelection,
    toggleSort
  };
};
