"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useUserManagement } from "@/hooks/use-user-management";
import usersData from "@/data/users.json";
import AddUserSheet from "@/app/(dashboard)/user/AddUserSheet";
import EditUserSheet from "@/app/(dashboard)/user/EditUserSheet";
import { User } from "@/types/user";
import { UserTable } from "@/app/(dashboard)/user/UserTable";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

export default function UsersPage() {
  const { users, addUser, editUser, deleteUser } = useUserManagement(usersData);

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
        transition={{ duration: 0.3 }}
        variants={variants}
        className="w-full max-w-7xl mx-auto"
      >
        <UserTable
          data={users}
          onAddUser={() => setIsAddUserSheetOpen(true)}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
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
