import { useState, useMemo, useCallback } from "react";
import { User } from "@/types/user";

export const useUserManagement = (initialUsers: User[]) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  type Filters = {
    roles: string[];
    departments: string[];
    statuses: string[];
  };

  const [filters, setFilters] = useState<Filters>({
    roles: [],
    departments: [],
    statuses: [],
  });

  const filteredAndSortedUsers = useMemo(() => {
    return users
      .filter((user) => {
        const matchesSearch =
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRoles =
          filters.roles.length === 0 || filters.roles.includes(user.role);
        const matchesDepartments =
          filters.departments.length === 0 ||
          filters.departments.includes(user.department);
        const matchesStatuses =
          filters.statuses.length === 0 ||
          filters.statuses.includes(user.status);
        return (
          matchesSearch && matchesRoles && matchesDepartments && matchesStatuses
        );
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [users, searchTerm, filters]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / rowsPerPage);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredAndSortedUsers.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredAndSortedUsers, currentPage, rowsPerPage]);

  const toggleUserSelection = useCallback((id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  }, []);

  const addUser = useCallback((newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, { ...newUser, id: Date.now() }]);
    setCurrentPage(1); // Reset to first page after adding a new user
  }, []);

  const editUser = useCallback(
    (userId: number, updatedUserData: Partial<User>) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, ...updatedUserData } : user
        )
      );
    },
    []
  );

  const deleteUser = useCallback(
    (userId: number) => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));

      // Adjust current page if necessary
      const updatedUsers = users.filter((user) => user.id !== userId);
      const maxPage = Math.ceil(updatedUsers.length / rowsPerPage);
      if (currentPage > maxPage) {
        setCurrentPage(maxPage);
      }
    },
    [users, currentPage, rowsPerPage]
  );

  const bulkDeleteUsers = useCallback(() => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => !selectedUsers.includes(user.id))
    );
    setSelectedUsers([]);

    // Adjust current page if necessary
    const updatedUsers = users.filter(
      (user) => !selectedUsers.includes(user.id)
    );
    const maxPage = Math.ceil(updatedUsers.length / rowsPerPage);
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [users, selectedUsers, currentPage, rowsPerPage]);

  const selectAllUsers = useCallback(() => {
    if (selectedUsers.length === filteredAndSortedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredAndSortedUsers.map((user) => user.id));
    }
  }, [filteredAndSortedUsers, selectedUsers]);

  return {
    users,
    view,
    setView,
    searchTerm,
    setSearchTerm,
    selectedUsers,
    paginatedUsers,
    filteredAndSortedUsers,
    totalPages,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    toggleUserSelection,
    filters,
    setFilters,
    addUser,
    editUser,
    deleteUser,
    bulkDeleteUsers,
    selectAllUsers,
  };
};
