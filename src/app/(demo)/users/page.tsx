"use client";
import React from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { UserCard } from "@/app/(demo)/user/UserCard";
import { UserListItem } from "@/app/(demo)/user/UserListItem";
import { UserManagementHeader } from "@/app/(demo)/user/usermanagementheader";
import { UserManagementPagination } from "@/app/(demo)/user/usermanagementpagination";
import { useUserManagement } from "@/hooks/use-user-management";
import usersData from "@/data/users.json";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

export default function UsersPage() {
  const {
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
  } = useUserManagement(usersData);

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
        />

        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="space-y-2">
            {paginatedUsers.map((user) => (
              <UserListItem
                key={user.id}
                user={user}
                onSelect={toggleUserSelection}
                isSelected={selectedUsers.includes(user.id)}
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
      </motion.div>
    </ContentLayout>
  );
}
