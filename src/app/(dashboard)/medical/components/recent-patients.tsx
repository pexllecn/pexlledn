import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const patientData = [
  {
    id: 1,
    name: "Alice Johnson",
    condition: "Hypertension",
    lastVisit: "2023-11-15",
    avatar: "A",
    status: "Stable",
  },
  {
    id: 2,
    name: "Bob Smith",
    condition: "Diabetes",
    lastVisit: "2023-11-18",
    avatar: "B",
    status: "Improving",
  },
  {
    id: 3,
    name: "Carol Williams",
    condition: "Asthma",
    lastVisit: "2023-11-20",
    avatar: "C",
    status: "Needs Attention",
  },
  {
    id: 4,
    name: "David Brown",
    condition: "Arthritis",
    lastVisit: "2023-11-22",
    avatar: "D",
    status: "Stable",
  },
  {
    id: 5,
    name: "Eva Davis",
    condition: "Migraine",
    lastVisit: "2023-11-25",
    avatar: "E",
    status: "Improving",
  },
];

export function RecentPatients() {
  return (
    <Card className="bg-card lg:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-medium">
            Recent Patients
          </CardTitle>
          <CardDescription>
            You have {patientData.length} patients in total
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {patientData.map((patient) => (
            <div
              key={patient.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{patient.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {patient.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {patient.condition}
                  </p>
                </div>
              </div>
              <Badge
                variant={
                  patient.status === "Stable"
                    ? "secondary"
                    : patient.status === "Improving"
                    ? "success"
                    : "destructive"
                }
              >
                {patient.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

