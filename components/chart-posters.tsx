"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  numberOfPosterReceived: {
    label: "Posters reçus",
    color: "hsl(var(--primary))",
  },
  employeeName: {
    label: "Employé",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ChartPosters({
  data,
}: {
  data: {
    employeeName: string;
    receivedPosters: string[];
    numberOfPosterReceived: number;
  }[];
}) {
  return (
    <Card>
      <CardHeader>Nombre de posters reçus par employé</CardHeader>
      <CardContent className="max-h-[516px] min-h-96">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="employeeName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="numberOfPosterReceived"
              fill="var(--color-numberOfPosterReceived)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
