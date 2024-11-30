"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Calendar,
  FileText,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CRMPage() {
  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  return (
    <ContentLayout title="Lead">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        variants={variants1}
      >
        <div className="flex flex-col lg:flex-row g-background py-4">
          {/* Left Sidebar */}
          <div className="w-full lg:w-80 p-4 lg:p-6 bg-muted/60 lg:rounded-l-lg lg:sticky lg:top-0 lg:max-h-screen lg:overflow-auto">
            <div className="flex items-center gap-2 mb-6 lg:mb-8">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to leads
              </Link>
            </div>

            <div className="text-center mb-6 lg:mb-8">
              <Avatar className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-4">
                <AvatarImage
                  src="https://i.pravatar.cc/128?u=jerome"
                  alt="Jerome Bell"
                />
                <AvatarFallback>JB</AvatarFallback>
              </Avatar>
              <h2 className="text-xl lg:text-2xl font-semibold mb-1">
                Jerome Bell
              </h2>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Image
                  src="https://logo.clearbit.com/google.com"
                  alt="Google"
                  width={20}
                  height={20}
                  className="rounded-sm"
                />
                Google
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-6 lg:mb-8">
              {[
                { icon: Plus, label: "Log" },
                { icon: Mail, label: "Email" },
                { icon: Phone, label: "Call" },
                { icon: Calendar, label: "Meet" },
              ].map((item, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="flex flex-col gap-1 h-auto py-2 lg:py-3 bg-background hover:bg-muted"
                >
                  <item.icon className="h-4 w-4 lg:h-5 lg:w-5" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              ))}
            </div>

            <Button className="w-full mb-6 lg:mb-8" variant="default">
              Convert to contact
            </Button>

            <div className="text-sm text-muted-foreground mb-4 lg:mb-6">
              Last activity: 2 Jan 2020 at 09:00 AM
            </div>

            <Tabs defaultValue="leads" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 lg:mb-6">
                <TabsTrigger value="leads">Leads info</TabsTrigger>
                <TabsTrigger value="address">Address info</TabsTrigger>
              </TabsList>
              <TabsContent value="leads" className="space-y-4">
                <InfoItem
                  icon={Mail}
                  label="Email"
                  value="jerome.bell@example.com"
                />
                <InfoItem icon={Phone} label="Phone" value="(405) 555-0128" />
                <InfoItem
                  icon={CheckCircle2}
                  label="Lead owner"
                  value="Esther Howard"
                />
                <InfoItem
                  icon={FileText}
                  label="Job Title"
                  value="Content Writer"
                />
                <InfoItem icon={Plus} label="Annual revenue" value="$ 5,000" />
                <InfoItem
                  icon={Plus}
                  label="Lead source"
                  value="Online store"
                />
              </TabsContent>
              <TabsContent value="address" className="space-y-4">
                <InfoItem icon={Plus} label="Street" value="123 Main St" />
                <InfoItem icon={Plus} label="City" value="New York" />
                <InfoItem icon={Plus} label="State" value="NY" />
                <InfoItem icon={Plus} label="Zip" value="10001" />
                <InfoItem icon={Plus} label="Country" value="United States" />
              </TabsContent>
            </Tabs>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-auto p-4 lg:p-6">
            <Tabs defaultValue="task" className="flex-1 w-auto overflow-hidden">
              <TabsList className="justify-start overflow-x-auto whitespace-nowrap">
                {[
                  "Activity",
                  "Notes",
                  "Emails",
                  "Calls",
                  "Task",
                  "Meetings",
                ].map((tab) => (
                  <TabsTrigger key={tab} value={tab.toLowerCase()}>
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent
                value="task"
                className="p-4 lg:p-6 overflow-auto h-full"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 lg:mb-8">
                  <Button variant="outline" size="sm" className="bg-background">
                    All users
                  </Button>
                  <Button>Create task</Button>
                </div>

                <div className="space-y-6">
                  <h3 className="font-semibold text-lg">Upcoming Tasks</h3>
                  <div className="bg-muted/30 p-4 lg:p-6 rounded-lg space-y-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                      <div className="flex gap-4">
                        <div className="w-5 h-5 rounded-full border-2 border-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Task created by Esther Howard
                          </div>
                          <h4 className="font-medium text-lg mb-2">
                            Prepare quote for Jerome Bell
                          </h4>
                          <p className="text-muted-foreground mb-4">
                            She's interested in our new product line and wants
                            our very best price. Please include a detailed
                            breakdown of costs.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-background"
                        >
                          Today, 12:00 PM
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 lg:gap-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Reminder
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-background"
                        >
                          No reminder
                        </Button>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Task Priority
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 bg-red-500/10"
                        >
                          High
                        </Button>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Assigned to
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-background"
                        >
                          <Avatar className="w-4 h-4 mr-2">
                            <AvatarImage
                              src="https://i.pravatar.cc/128?u=esther"
                              alt="Esther Howard"
                            />
                            <AvatarFallback>EH</AvatarFallback>
                          </Avatar>
                          Esther Howard
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 mt-8">
                  <h3 className="font-semibold text-lg">Completed Tasks</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Send follow-up email",
                        description:
                          "Sent a follow-up email regarding the product demo.",
                        date: "Yesterday, 3:00 PM",
                        priority: "Medium",
                        assignee: "Jane Cooper",
                      },
                      {
                        title: "Update client profile",
                        description:
                          "Updated client information in the CRM system.",
                        date: "2 days ago, 11:30 AM",
                        priority: "Low",
                        assignee: "Robert Fox",
                      },
                      {
                        title: "Schedule product demo",
                        description:
                          "Arranged a product demonstration for next week.",
                        date: "3 days ago, 2:15 PM",
                        priority: "High",
                        assignee: "Esther Howard",
                      },
                      {
                        title: "Prepare sales report",
                        description:
                          "Compiled monthly sales report for the team meeting.",
                        date: "4 days ago, 5:00 PM",
                        priority: "Medium",
                        assignee: "Cameron Williamson",
                      },
                      {
                        title: "Client onboarding call",
                        description:
                          "Conducted introductory call with new client.",
                        date: "5 days ago, 10:00 AM",
                        priority: "High",
                        assignee: "Leslie Alexander",
                      },
                    ].map((task, index) => (
                      <div
                        key={index}
                        className="bg-muted/30 p-4 lg:p-6 rounded-lg space-y-4"
                      >
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                          <div className="flex gap-4">
                            <div className="w-5 h-5 rounded-full bg-primary mt-1 flex-shrink-0 flex items-center justify-center">
                              <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <div>
                              <h4 className="font-medium text-lg mb-2">
                                {task.title}
                              </h4>
                              <p className="text-muted-foreground mb-4">
                                {task.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-background"
                            >
                              {task.date}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4 lg:gap-6">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">
                              Task Priority
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className={`${
                                task.priority === "High"
                                  ? "text-red-500 bg-red-500/10"
                                  : task.priority === "Medium"
                                  ? "text-yellow-500 bg-yellow-500/10"
                                  : "text-green-500 bg-green-500/10"
                              }`}
                            >
                              {task.priority}
                            </Button>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">
                              Completed by
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-background"
                            >
                              <Avatar className="w-4 h-4 mr-2">
                                <AvatarImage
                                  src={`https://i.pravatar.cc/128?u=${task.assignee.replace(
                                    " ",
                                    ""
                                  )}`}
                                  alt={task.assignee}
                                />
                                <AvatarFallback>
                                  {task.assignee
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              {task.assignee}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-80 p-4 lg:p-6 bg-muted/60 lg:rounded-r-lg lg:sticky lg:top-0 lg:max-h-screen lg:overflow-auto">
            <div className="mb-6 lg:mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="https://logo.clearbit.com/google.com"
                  alt="Google"
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">Google inc.</h3>
                  <div className="text-sm text-muted-foreground">
                    google.com
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>contact@google.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>(405) 555-0128</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">Deals</h3>
                  <span className="bg-muted text-muted-foreground rounded px-1.5 text-xs">
                    2
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </div>

              <Button
                className="w-full justify-start bg-background"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create new deal
              </Button>

              <div className="space-y-4">
                {[
                  {
                    date: "18 Jan 2021",
                    title: "Web development",
                    amount: 120000,
                  },
                  {
                    date: "22 Feb 2021",
                    title: "Mobile app development",
                    amount: 85000,
                  },
                ].map((deal, i) => (
                  <div key={i} className="bg-muted/50 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">
                      Closing date: {deal.date}
                    </div>
                    <div className="font-medium mb-1">{deal.title}</div>
                    <div className="text-lg font-semibold mb-2">
                      ${deal.amount.toLocaleString()}
                    </div>
                    <Button variant="link" className="h-auto p-0">
                      Contract sent
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <div>
        <label className="text-sm text-muted-foreground">{label}</label>
        <div>{value}</div>
      </div>
    </div>
  );
}
