import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { TrendingUp } from 'lucide-react';

const chartData = [
  { month: "January", newPatients: 186, followUp: 80 },
  { month: "February", newPatients: 305, followUp: 200 },
  { month: "March", newPatients: 237, followUp: 120 },
  { month: "April", newPatients: 73, followUp: 190 },
  { month: "May", newPatients: 209, followUp: 130 },
  { month: "June", newPatients: 214, followUp: 140 },
];

const chartConfig = {
  newPatients: {
    label: "New Patients",
    color: "hsl(var(--primary))",
  },
  followUp: {
    label: "Follow-Up",
    color: "hsl(var(--secondary))",
  },
};

export function PatientVisitsChart() {
  return (
    <Card className="bg-card lg:col-span-4">
      <CardHeader className="items-center pb-4">
        <CardTitle>Patient Visits - Last 6 Months</CardTitle>
        <CardDescription>
          Showing new and follow-up patients
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <RadarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              bottom: 10,
              left: 10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis
              dataKey="month"
              tick={({
                x,
                y,
                textAnchor,
                value,
                index,
                ...props
              }) => {
                const data = chartData[index];

                return (
                  <text
                    x={x}
                    y={index === 0 ? y - 10 : y}
                    textAnchor={textAnchor}
                    fontSize={13}
                    fontWeight={500}
                    className="fill-foreground"
                    {...props}
                  >
                    <tspan>{data.newPatients}</tspan>
                    <tspan className="fill-muted-foreground">
                      /
                    </tspan>
                    <tspan>{data.followUp}</tspan>
                    <tspan
                      x={x}
                      dy={"1rem"}
                      fontSize={12}
                      className="fill-muted-foreground"
                    >
                      {data.month}
                    </tspan>
                  </text>
                );
              }}
            />

            <PolarGrid className="stroke-border" />
            <Radar
              dataKey="newPatients"
              fill="hsl(var(--primary))"
              fillOpacity={0.6}
              strokeOpacity={0.8}
            />
            <Radar
              dataKey="followUp"
              fill="hsl(var(--secondary))"
              fillOpacity={0.6}
              strokeOpacity={0.8}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          New patients trending up by 5.2% this month{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  );
}

