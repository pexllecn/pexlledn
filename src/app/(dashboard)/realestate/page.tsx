"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Bell, ChevronDown } from "lucide-react";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { WorkOrdersChart } from "./components/work-orders-chart";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function Dashboard() {
  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  return (
    <ContentLayout title={""}>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants1}
      >
        <div className="dashboard-container bg-background min-h-screen p-4 sm:p-8">
          <header className="flex flex-wrap justify-between items-center mb-6">
            <nav className="flex space-x-6 text-muted-foreground">
              <a
                href="#"
                className="font-semibold text-primary-foreground dark:text-primary"
              >
                Overview
              </a>
              <a href="#">Work Orders</a>
              <a href="#">Rent</a>
              <a href="#">Collection</a>
              <a href="#">Access</a>
            </nav>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="col-span-1 md:col-span-4">
              <Card className="p-4 bg-muted border-none">
                <CardContent className="p-0">
                  <div className="relative mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop"
                      alt="Sobha Garden Residential Building"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Badge className="absolute top-3 left-3">Residential</Badge>
                  </div>
                  <div className="space-y-6 px-4">
                    <div>
                      <h2 className="text-2xl font-semibold">Sobha Garden</h2>
                      <div className="flex gap-10 mt-4">
                        <div>
                          <p className="text-2xl font-semibold tracking-tight">
                            1810
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Residents
                          </p>
                        </div>
                        <div>
                          <p className="text-2xl font-semibold tracking-tight">
                            1032
                          </p>
                          <p className="text-sm text-muted-foreground">Units</p>
                        </div>
                        <div>
                          <p className="text-2xl font-semibold tracking-tight">
                            134
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Vacant
                          </p>
                        </div>
                        <div>
                          <p className="text-2xl font-semibold tracking-tight">
                            73
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Upcoming
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Leased by 87%</p>
                      </div>
                      <Progress value={87} className="bg-yellow-100" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Work Orders
                      </h3>
                      <WorkOrdersChart />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        On-site Staff
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium">Security</p>
                            <p className="text-sm text-muted-foreground">
                              Louie Hodges
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            +971 5 927 6701
                          </p>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium">Maintenance</p>
                            <p className="text-sm text-muted-foreground">
                              Haris Bowman
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            +971 5 927 6701
                          </p>
                        </div>
                        <AvatarGroup
                          avatars={[
                            {
                              src: "https://i.pravatar.cc/150?u=staff1",
                              fallback: "LH",
                            },
                            {
                              src: "https://i.pravatar.cc/150?u=staff2",
                              fallback: "HB",
                            },
                            {
                              src: "https://i.pravatar.cc/150?u=staff3",
                              fallback: "JD",
                            },
                            {
                              src: "https://i.pravatar.cc/150?u=staff4",
                              fallback: "AM",
                            },
                            {
                              src: "https://i.pravatar.cc/150?u=staff5",
                              fallback: "PK",
                            },
                          ]}
                          className="mt-4"
                        />
                        <p className="text-sm text-muted-foreground">
                          34 staff members
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-1 md:col-span-8 space-y-6">
              <Card className="border-none p-0">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Payments</CardTitle>
                  <Badge variant="secondary">This month</Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-2xl font-semibold tracking-tight">
                        $223,600
                      </p>
                      <p className="text-sm text-muted-foreground">Rent</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold tracking-tight">
                        $24,840
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Additional services
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold tracking-tight">
                        $31,840
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Maintenance
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold tracking-tight">
                        $16,485
                      </p>
                      <p className="text-sm text-muted-foreground">Debt</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>New Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Cora Richards",
                          avatar: "https://i.pravatar.cc/150?u=cora",
                          unit: "Unit 543",
                          issue:
                            "I've noticed that the water pressure in my bathroom has significantly decreased",
                        },
                        {
                          name: "Alistair Dunlap",
                          avatar: "https://i.pravatar.cc/150?u=alistair",
                          unit: "Unit 312",
                          issue:
                            "The air conditioning unit in my apartment is not cooling properly",
                        },
                        {
                          name: "Bibi Shelton",
                          avatar: "https://i.pravatar.cc/150?u=bibi",
                          unit: "Unit 340B",
                          issue:
                            "I would like to request a thorough cleaning of the common areas",
                        },
                      ].map((request, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage
                              src={request.avatar}
                              alt={request.name}
                            />
                            <AvatarFallback>{request.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {request.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {request.unit}
                            </p>
                            <p className="text-sm">{request.issue}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Delayed Work Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: "P-1925",
                          avatar: "https://i.pravatar.cc/150?u=addie",
                          unit: "Unit 304",
                          type: "Plumbing",
                          delay: "3 hrs late",
                          priority: "Urgent",
                          priorityColor: "destructive",
                        },
                        {
                          id: "H-482",
                          unit: "Unit 294",
                          type: "HVAC",
                          delay: "1 day late",
                          priority: "High",
                          priorityColor: "decline",
                        },
                        {
                          id: "G-3921",
                          unit: "Unit 1064",
                          type: "General maintenance",
                          delay: "1 day late",
                          priority: "Normal",
                          priorityColor: "default",
                        },
                      ].map((order, i) => (
                        <div
                          key={i}
                          className="flex items-start justify-between gap-4"
                        >
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage
                                src={order.avatar}
                                alt={`Staff member for ${order.id}`}
                              />
                              <AvatarFallback>WO</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">
                                {order.id}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {order.unit} - {order.type}
                              </p>
                            </div>
                          </div>
                          <div className="text-right space-y-1">
                            <p className="text-sm text-muted-foreground">
                              {order.delay}
                            </p>
                            <Badge
                              variant={
                                order.priorityColor as
                                  | "destructive"
                                  | "decline"
                                  | "default"
                              }
                            >
                              {order.priority}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Units</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      {
                        unit: "Unit 213B",
                        image:
                          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
                        price: "$2,340/m",
                        size: "1280 sqft",
                        date: "31 Aug 2023",
                      },
                      {
                        unit: "Unit 639",
                        image:
                          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
                        price: "$2,890/m",
                        size: "1420 sqft",
                        date: "24 Aug 2023",
                      },
                      {
                        unit: "Unit 202",
                        image:
                          "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&auto=format&fit=crop",
                        price: "$2,100/m",
                        size: "1280 sqft",
                        date: "15 Sep 2023",
                      },
                      {
                        unit: "Unit 309C",
                        image:
                          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop",
                        price: "$3,440/m",
                        size: "2360 sqft",
                        date: "12 Sep 2023",
                      },
                    ].map((unit, i) => (
                      <div key={i}>
                        <div className="relative mb-4">
                          <img
                            src={unit.image}
                            alt={unit.unit}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <Badge className="absolute top-3 left-3">
                            Residential
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">{unit.unit}</p>
                          <p className="text-sm text-muted-foreground">
                            {unit.price} - {unit.size}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Available from {unit.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
