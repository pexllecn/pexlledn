"use client";

import { useState } from "react";
import {
  Bell,
  Mail,
  PencilLine,
  PlusIcon,
  ArrowLeft,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShipmentCard } from "./components/shipment-card";
import { MapView } from "./components/map-view";
import { ContactCard } from "./components/contact-card";
import { StopsList } from "./components/stops-list";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { motion } from "framer-motion";

export default function ShipmentsPage() {
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);

  const shipments = [
    {
      loadId: "9835",
      status: "Delivery",
      from: {
        city: "Los Angeles",
        state: "CA",
        zip: "90063",
        address: "3200 Malabar St",
        dateTime: "Tue, Feb 27 8:00 AM",
      },
      to: {
        city: "Thousand Oaks",
        state: "CA",
        zip: "91362",
        address: "2401 Thousand Oaks Blvd",
        dateTime: "Wed, Feb 28 12:00 PM",
      },
    },
    {
      loadId: "9834",
      status: "Transfer",
      from: {
        city: "Prineville",
        state: "OR",
        zip: "97754",
        address: "440 NW Madras Hwy",
        dateTime: "Wed, Feb 28 12:00 AM",
      },
      to: {
        city: "Portland",
        state: "OR",
        zip: "97217",
        address: "5420 N Interstate Ave",
        dateTime: "Thu, Feb 29 7:30 PM",
      },
    },
  ] as const;

  const stops = [
    {
      city: "Los Angeles",
      state: "CA",
      zip: "90063",
      address: "3200 Malabar St",
    },
    {
      city: "Mission Hills",
      state: "CA",
      zip: "91345",
      address: "15151 San Fernando Mission Blvd",
    },
    {
      city: "Woodland Hills",
      state: "CA",
      zip: "91367",
      address: "5601 De Soto Ave",
    },
    {
      city: "Agoura Hills",
      state: "CA",
      zip: "91301",
      address: "28924 Fountainwood St Ste 202",
    },
    {
      city: "Thousand Oaks",
      state: "CA",
      zip: "91362",
      address: "2401 Thousand Oaks Blvd",
    },
  ];

  const loadId = selectedShipment || shipments[0].loadId;

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Logistics">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants1}
      >
        <div className="min-h-screen">
          <div className="flex flex-col lg:flex-row h-full">
            {/* Sidebar / Mobile List View */}
            <div
              className={`w-full lg:w-[400px] bg-muted rounded-3xl p-6 ${
                selectedShipment ? "hidden lg:block" : ""
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-semibold">Shipments</h1>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    className="pl-10 pr-4 bg-background border-none shadow-none"
                    placeholder="Search Shipments"
                    type="search"
                  />
                </div>
                <Button className="w-full" variant="black">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  New Load
                </Button>
                <div className="space-y-2">
                  {shipments.map((shipment) => (
                    <div
                      key={shipment.loadId}
                      onClick={() => setSelectedShipment(shipment.loadId)}
                      className="cursor-pointer"
                    >
                      <ShipmentCard
                        loadId={shipment.loadId}
                        status={
                          shipment.status as "Delivery" | "Transfer" | "Pick Up"
                        }
                        from={shipment.from}
                        to={shipment.to}
                        isSelected={shipment.loadId === loadId}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div
              className={`flex-1 p-2 lg:p-6 rounded-3xl ${
                !selectedShipment ? "hidden lg:block" : ""
              }`}
            >
              <div className="max-w-[1400px] mx-auto">
                {/* Mobile Back Button */}
                <div className="lg:hidden mb-4">
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedShipment(null)}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to List
                  </Button>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl text-muted-foreground">Load ID:</h2>
                    <span className="text-xl font-semibold">#{loadId}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="gap-2">
                      <svg
                        className=" h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                      Export
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <svg
                        className=" h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      </svg>
                      Edit
                    </Button>
                  </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Overview Section */}
                    <div className="rounded-lg p-2 ">
                      <h3 className="text-lg font-semibold mb-4">Overview</h3>
                      <MapView />
                    </div>

                    {/* Contact Cards and Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
                      <div>
                        <div className="flex items-center justify-between ">
                          <h3 className="text-lg font-semibold">Driver</h3>
                          <Button variant="ghost" size="icon">
                            <PencilLine className="h-4 w-4" />
                          </Button>
                        </div>
                        <ContactCard
                          title="Driver"
                          name="Courtney Henry"
                          avatarId="12"
                          canEdit
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">Customer</h3>
                          <Button variant="ghost" size="icon">
                            <PencilLine className="h-4 w-4" />
                          </Button>
                        </div>
                        <ContactCard
                          title="Customer"
                          name="Kristin Watson"
                          avatarId="23"
                          canEdit
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">Equipment</h3>
                          <Button variant="ghost" size="icon">
                            <PencilLine className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="p-4 bg-background rounded-3xl border">
                          <div className="space-y-2">
                            <div className="text-sm text-muted-foreground">
                              Truck Number
                            </div>
                            <div className="font-bold">KT 71483</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">Pricing</h3>
                          <Button variant="ghost" size="icon">
                            <PencilLine className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="p-4 bg-background rounded-lg border">
                          <div className="space-y-2">
                            <div className="text-sm text-muted-foreground">
                              Load Price
                            </div>
                            <div className="font-bold">$6,533.44</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="rounded-lg py-10 px-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">Stops</h3>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <PencilLine className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <StopsList stops={stops} />
                    </div>

                    <div className="bg-background rounded-lg p-6 border">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">Notes</h3>
                        <Button variant="ghost" size="icon">
                          <PencilLine className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p className="mb-4">
                          Please ensure that all goods are in a safe and secure
                          condition before departure. Pay attention to meeting
                          the delivery deadlines and familiarize yourself with
                          the route to avoid any delays.
                        </p>
                        <p>
                          In case of any questions or setbacks, please contact
                          us immediately. Our support team is available 24/7 to
                          assist you with any concerns regarding the shipment,
                          route, or delivery requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
