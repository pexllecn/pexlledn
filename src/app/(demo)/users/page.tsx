"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { UserCard } from "@/app/(demo)/user/UserCard";
import { UserListItem } from "@/app/(demo)/user/UserListItem";
import { UserManagementHeader } from "@/app/(demo)/user/usermanagementheader";
import { UserManagementPagination } from "@/app/(demo)/user/usermanagementpagination";
import { useUserManagement } from "@/hooks/use-user-management";
import usersData from "@/data/users.json";
import AddUserSheet from "@/app/(demo)/user/AddUserSheet";
import EditUserSheet from "@/app/(demo)/user/EditUserSheet";
import { User } from "@/types/user";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

export default function UsersPage() {
  const {
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
  } = useUserManagement(usersData);

  const [isAddUserSheetOpen, setIsAddUserSheetOpen] = useState(false);
  const [isEditUserSheetOpen, setIsEditUserSheetOpen] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState<User | null>(null);

  const handleAddUser = (newUser: User) => {
    addUser(newUser);
    setIsAddUserSheetOpen(false);
  };

  const handleEditUser = (user: User) => {
    setCurrentEditUser(user);
    setIsEditUserSheetOpen(true);
  };

  const handleEditSubmit = (updatedUser: User) => {
    editUser(updatedUser.id, updatedUser);
    setIsEditUserSheetOpen(false);
  };

  const handleDeleteUser = (user: User) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      deleteUser(user.id);
    }
  };

  return (
    <ContentLayout title="Users">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        variants={variants}
        className="w-full max-w-7xl mx-auto"
      >
        <UserManagementHeader
          view={view}
          setView={setView}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          onAddUser={() => setIsAddUserSheetOpen(true)}
        />

        {view === "grid" ? (
          <div className="px-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onSelect={toggleUserSelection}
                isSelected={selectedUsers.includes(user.id)}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {paginatedUsers.map((user) => (
              <UserListItem
                key={user.id}
                user={user}
                onSelect={toggleUserSelection}
                isSelected={selectedUsers.includes(user.id)}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            ))}
          </div>
        )}

        <UserManagementPagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          selectedUsersCount={selectedUsers.length}
          totalUsersCount={filteredAndSortedUsers.length}
        />

        <AddUserSheet
          isOpen={isAddUserSheetOpen}
          onOpenChange={setIsAddUserSheetOpen}
          onAddUser={handleAddUser}
        />

        <EditUserSheet
          isOpen={isEditUserSheetOpen}
          onOpenChange={setIsEditUserSheetOpen}
          onEditUser={handleEditSubmit}
          user={currentEditUser}
        />
      </motion.div>
    </ContentLayout>
  );
}
