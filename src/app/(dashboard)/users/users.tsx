"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useUserManagement } from "@/hooks/use-user-management";
import usersData from "@/data/users.json";
import AddUserSheet from "@/app/(dashboard)/users/components/AddUserSheet";
import EditUserSheet from "@/app/(dashboard)/users/components/EditUserSheet";
import { User } from "@/types/user";
import { UserTable } from "@/app/(dashboard)/users/components/UserTable";
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, ShieldCheck, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

function Stat({
  icon: Icon,
  label,
  value,
  hint,
  tint,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  hint: string;
  tint: string;
}) {
  return (
    <Card className="border-none bg-muted">
      <CardContent className="flex items-start gap-3 p-4">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            tint
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-0.5 text-2xl font-semibold leading-none tabular-nums">
            {value}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
        </div>
      </CardContent>
    </Card>
  );
}

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

export default function UsersPage() {
  const { users, addUser, editUser, deleteUser } = useUserManagement(usersData);

  const total = users.length;
  const activeCount = users.filter((u) => u.status === "Active").length;
  const adminCount = users.filter((u) => u.role === "Admin").length;
  const departmentCount = new Set(users.map((u) => u.department)).size;

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
        className="w-full max-w-7xl mx-auto space-y-6 p-2 sm:p-4"
      >
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Stat
            icon={Users}
            label="Total users"
            value={String(total)}
            hint="in your workspace"
            tint="bg-primary/10 text-primary"
          />
          <Stat
            icon={UserCheck}
            label="Active"
            value={String(activeCount)}
            hint={`${Math.round((activeCount / Math.max(total, 1)) * 100)}% of all users`}
            tint="bg-emerald-500/10 text-emerald-500"
          />
          <Stat
            icon={ShieldCheck}
            label="Admins"
            value={String(adminCount)}
            hint="with full access"
            tint="bg-violet-500/10 text-violet-500"
          />
          <Stat
            icon={Building2}
            label="Departments"
            value={String(departmentCount)}
            hint="represented"
            tint="bg-sky-500/10 text-sky-500"
          />
        </div>

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
