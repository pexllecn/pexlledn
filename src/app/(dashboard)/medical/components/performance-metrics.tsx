import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function PerformanceMetrics() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Patient Satisfaction
              </p>
              <p className="text-sm font-medium text-green-600">
                98%
              </p>
            </div>
            <Progress value={98} className="mt-2" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Appointment Efficiency
              </p>
              <p className="text-sm font-medium text-amber-600">
                85%
              </p>
            </div>
            <Progress value={85} className="mt-2" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Treatment Success Rate
              </p>
              <p className="text-sm font-medium text-blue-600">
                92%
              </p>
            </div>
            <Progress value={92} className="mt-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

