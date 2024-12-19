import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from 'lucide-react';

const upcomingAppointments = [
  { id: 1, name: "John Doe", time: "10:00 AM", type: "Check-up" },
  { id: 2, name: "Jane Smith", time: "11:30 AM", type: "Follow-up" },
  { id: 3, name: "Mike Johnson", time: "2:00 PM", type: "New Patient" },
];

export function UpcomingAppointments() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{appointment.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {appointment.type}
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium">
                {appointment.time}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

