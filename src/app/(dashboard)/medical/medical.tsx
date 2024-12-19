"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  User,
  Mail,
  Plus,
  Star,
  Phone,
  Building,
  Stethoscope,
  Users,
  UserPlus,
  UserCog,
  MoreHorizontal,
  Search,
  Bell,
  Zap,
  TrendingUp,
  Clock,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { DoctorSidebar } from "./components/doctor-sidebar";
import { QuickActions } from "./components/quick-actions";
import { StatsCards } from "./components/stats-cards";
import { PatientVisitsChart } from "./components/patient-visits-chart";
import { RecentPatients } from "./components/recent-patients";
import { UpcomingAppointments } from "./components/upcoming-appointments";
import { PerformanceMetrics } from "./components/performance-metrics";
import { PatientReviews } from "./components/patient-reviews";
import { MobileNavigation } from "./components/mobile-navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddPatientDialog } from "./components/add-patient-dialog";

export default function DashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Dashboard">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
        className="p-6 flex min-h-screen bg-background"
      >
        <DoctorSidebar />
        <MobileNavigation open={mobileMenuOpen} setOpen={setMobileMenuOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </Button>
                <h1 className="text-2xl font-bold">Welcome, Dr. Insburry</h1>
              </div>
              <div className="flex items-center space-x-4">
                <AddPatientDialog />
              </div>
            </div>

            <QuickActions />
            <StatsCards />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <PatientVisitsChart />
              <RecentPatients />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <UpcomingAppointments />
              <PerformanceMetrics />
            </div>

            <PatientReviews />
          </div>
        </main>
      </motion.div>
    </ContentLayout>
  );
}
