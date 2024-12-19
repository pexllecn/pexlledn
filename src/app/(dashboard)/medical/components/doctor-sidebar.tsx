"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Mail, Building, Stethoscope, User } from "lucide-react";

export function DoctorSidebar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <aside className="hidden w-80 flex-col bg-muted p-6 rounded-lg lg:flex">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gray-100">
          <img
            src="https://i.pravatar.cc/150?img=4"
            alt="Dr. Insburry"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold">Dr. Petr Insburry</h2>
          <p className="text-sm text-muted-foreground">WNH-GM-001</p>
        </div>
        <Badge variant="secondary" className="bg-green-50 text-green-700">
          Available
        </Badge>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <h3 className="mb-2 text-sm font-medium">Specialist</h3>
          <p className="text-sm">Routine Check-Ups</p>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">About</h3>
          <p className="text-sm">
            Dr. Petr Insburry is a seasoned general medicine practitioner with
            over 15 years of experience in providing comprehensive healthcare
            services.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4" />
            <span>(808) 555-0111</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4" />
            <span>p.insburry@example.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Building className="h-4 w-4" />
            <span>2464 Royal Ln. Mesa, New Jersey 45463</span>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-medium">Work Experience</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <Stethoscope className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium">General Practitioner</p>
                <p className="text-xs text-muted-foreground">
                  VitalHealth Hospital
                </p>
                <p className="text-xs text-muted-foreground">
                  Full-Time • 2010-Present
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                <User className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Resident Doctor</p>
                <p className="text-xs text-muted-foreground">
                  City General Hospital
                </p>
                <p className="text-xs text-muted-foreground">
                  Full-Time • 2005-2010
                </p>
              </div>
            </div>
          </div>
        </div>

        <Card className="bg-card">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md"
          />
        </Card>
      </div>
    </aside>
  );
}
