import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, UserPlus, Mail, Zap } from 'lucide-react';

export function QuickActions() {
  return (
    <Card className="bg-card border-none">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Button
          variant="outline"
          className="h-20 flex-col bg-background hover:bg-muted"
        >
          <CalendarIcon className="mb-2 h-5 w-5" />
          Schedule Appointment
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col bg-background hover:bg-muted"
        >
          <UserPlus className="mb-2 h-5 w-5" />
          Add New Patient
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col bg-background hover:bg-muted"
        >
          <Mail className="mb-2 h-5 w-5" />
          Send Message
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col bg-background hover:bg-muted"
        >
          <Zap className="mb-2 h-5 w-5" />
          View Reports
        </Button>
      </CardContent>
    </Card>
  );
}

