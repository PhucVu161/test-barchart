"use client";

import { Download, ChartColumn } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ReactNode } from "react";
import { Button } from "./ui/button";

export const description = "A stacked bar chart with a legend";

const chartData = [
  { day: "Monday", posRevenue: 1752, eatclubRevenue: 270, labourCosts: 650 },
  { day: "Tueday", posRevenue: 1812, eatclubRevenue: 260, labourCosts: 690 },
  { day: "Wednesday", posRevenue: 1830, eatclubRevenue: 307, labourCosts: 810 },
  { day: "Thurday", posRevenue: 1890, eatclubRevenue: 283, labourCosts: 680 },
  { day: "Friday", posRevenue: 1730, eatclubRevenue: 279, labourCosts: 660 },
  { day: "Saturdady", posRevenue: 2040, eatclubRevenue: 674, labourCosts: 800 },
  { day: "Sunday", posRevenue: 2440, eatclubRevenue: 474, labourCosts: 1200 },
];

const chartConfig = {
  posRevenue: {
    label: "POS Revenue",
    color: "var(--pos-revenue1)",
  },
  eatclubRevenue: {
    label: "Eatclub Revenue",
    color: "var(--eatclub-revenue1)",
  },
  labourCosts: {
    label: "Labour Costs",
    color: "var(--labour-cost1)",
  },
} satisfies ChartConfig;
function TotalCart({ label, value, isMoney }: { label: String; value: number; isMoney: boolean }) {
  return (
    <div className="bg-[#f8f6f5] rounded-xl p-3 w-full">
      <div className="text-md font-medium text-gray-600">{label}</div>
      <div className="text-2xl font-semibold">
        {isMoney ? value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) : value}
      </div>
    </div>
  );
}

export default function MyChart() {
  return (
    <Card className="w-7/10">
      <CardHeader className="">
        <div className="flex justify-between items-center mb-16">
          <CardTitle className="text-2xl">This Week's Revenue Trend</CardTitle>
          <div className="space-x-4">
            <Button className="rounded-2xl">
              <ChartColumn /> Compare to Previous
            </Button>
            <Button
              variant={"secondary"}
              className="rounded-2xl border-2 border-gray-300"
            >
              <Download /> Export PNG
            </Button>
          </div>
        </div>
        <div className="flex gap-4">
          <TotalCart label={"Total Revenue"} value={16177} isMoney={true} />
          <TotalCart label={"Average per Day"} value={2311} isMoney={true} />
          <TotalCart label={"Total Covers"} value={904} isMoney={false} />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid strokeDasharray="4 2" stroke="#dfdddd" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              tickMargin={8}
              tick={{ fontSize: 16, fontWeight: "600" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 16, fontWeight: "600" }}
              tickCount={5}
              tickFormatter={(value) =>
                `${parseFloat((value / 1000).toFixed(3))}k`
              }
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend
              content={<ChartLegendContent className="text-[16px]" />}
            />
            <Bar
              dataKey="posRevenue"
              stackId="a"
              fill="var(--color-posRevenue)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="eatclubRevenue"
              stackId="a"
              fill="var(--color-eatclubRevenue)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="labourCosts"
              fill="var(--color-labourCosts)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
