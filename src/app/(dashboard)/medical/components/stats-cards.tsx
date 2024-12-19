import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, UserPlus, UserCog, TrendingUp } from 'lucide-react';

export function StatsCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-blue-500/10 text-blue-500 border-none">
        <CardContent className="p-6">
          <div className="flex items-center justify-between ">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <Badge variant="blue">+15.9%</Badge>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-muted-foreground">
              Total Patients
            </p>
            <p className="mt-2 text-3xl font-bold">1,250</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-500/10 text-green-500 border-none">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
              <UserPlus className="h-6 w-6 text-emerald-500" />
            </div>
            <Badge variant="success">+22.4%</Badge>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-muted-foreground">
              New Patients
            </p>
            <p className="mt-2 text-3xl font-bold">260</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-purple-500/10 text-purple-500 border-none">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
              <UserCog className="h-6 w-6 text-purple-500" />
            </div>
            <Badge
              variant="secondary"
              className="bg-purple-50 text-purple-700"
            >
              +12.7%
            </Badge>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-muted-foreground">
              Follow-Up Patients
            </p>
            <p className="mt-2 text-3xl font-bold">560</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/10 text-primary border-none">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <Badge variant="primary">98%</Badge>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-muted-foreground">
              Patient Satisfaction
            </p>
            <Progress value={98} className="mt-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

