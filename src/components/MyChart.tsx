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
import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

const totals = {
  totalRevenue: {
    current: 16614,
    previous: 15544,
  },
  averagePerDay: {
    current: 2373,
    previous: 2421,
  },
  totalCovers: {
    current: 933,
    previous: 852,
  },
};
const chartData = [
  {
    day: "Monday",
    posRevenue: 1752,
    eatclubRevenue: 270,
    labourCosts: 650,
    posRevenuePre: 1652,
    eatclubRevenuePre: 263,
    labourCostsPre: 650,
  },
  {
    day: "Tueday",
    posRevenue: 1812,
    eatclubRevenue: 260,
    labourCosts: 690,
    posRevenuePre: 1652,
    eatclubRevenuePre: 263,
    labourCostsPre: 650,
  },
  {
    day: "Wednesday",
    posRevenue: 1830,
    eatclubRevenue: 307,
    labourCosts: 810,
    posRevenuePre: 1652,
    eatclubRevenuePre: 263,
    labourCostsPre: 650,
  },
  {
    day: "Thurday",
    posRevenue: 1890,
    eatclubRevenue: 283,
    labourCosts: 680,
    posRevenuePre: 1652,
    eatclubRevenuePre: 263,
    labourCostsPre: 650,
  },
  {
    day: "Friday",
    posRevenue: 1730,
    eatclubRevenue: 279,
    labourCosts: 660,
    posRevenuePre: 1652,
    eatclubRevenuePre: 263,
    labourCostsPre: 650,
  },
  {
    day: "Saturdady",
    posRevenue: 2040,
    eatclubRevenue: 674,
    labourCosts: 800,
    posRevenuePre: 1652,
    eatclubRevenuePre: 263,
    labourCostsPre: 650,
  },
  {
    day: "Sunday",
    posRevenue: 2440,
    eatclubRevenue: 474,
    labourCosts: 1200,
    posRevenuePre: 1652,
    eatclubRevenuePre: 263,
    labourCostsPre: 650,
  },
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
const chartPreConfig = {
  posRevenue: {
    label: "POS Revenue (Current)",
    color: "var(--pos-revenue1)",
  },
  eatclubRevenue: {
    label: "Eatclub Revenue (Current)",
    color: "var(--eatclub-revenue1)",
  },
  labourCosts: {
    label: "Labour Costs (Current)",
    color: "var(--labour-cost1)",
  },
  posRevenuePre: {
    label: "POS Revenue (Previous)",
    color: "var(--pos-revenue2)",
  },
  eatclubRevenuePre: {
    label: "Eatclub Revenue (Previous)",
    color: "var(--eatclub-revenue2)",
  },
  labourCostsPre: {
    label: "Labour Costs (Previous)",
    color: "var(--labour-cost2)",
  },
} satisfies ChartConfig;
function TotalCart({
  label,
  value,
  isMoney,
  preChecked,
}: {
  label: string;
  value: { current: number; previous: number };
  isMoney: boolean;
  preChecked: boolean;
}) {
  return (
    <div className="bg-[#f8f6f5] rounded-xl p-3 flex-1">
      <div className="text-md font-medium text-gray-600">{label}</div>
      <span className="text-2xl font-semibold">
        {isMoney
          ? value.current.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
          : value.current}
      </span>
      {preChecked && (
        <>
          <span className="ml-4 text-md font-semibold text-gray-600">
            vs{" "}
            {isMoney
              ? value.previous.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              : value.previous}
            {value.current - value.previous >= 0 ? (
              <span className="text-green-600 font-bold">
                {` (+${(
                  ((value.current - value.previous) / value.previous) *
                  100
                ).toFixed(1)}%)`}
              </span>
            ) : (
              <span className="text-red-600 font-bold">
                {` (-${(
                  ((value.previous - value.current) / value.previous) *
                  100
                ).toFixed(1)}%)`}
              </span>
            )}
          </span>
        </>
      )}
    </div>
  );
}

export default function MyChart() {
  const [posChecked, setPosChecked] = useState(true);
  const [eatclubChecked, setEatclubChecked] = useState(true);
  const [labourChecked, setLabourChecked] = useState(true);
  const [preChecked, setPreChecked] = useState(true);
  return (
    <Card className="w-3/4">
      <CardHeader className="">
        {/* Show title and button */}
        <div className="flex justify-between items-center mb-16">
          <CardTitle className="text-2xl w-90">{preChecked ? "This Week's Revenue Trend vs Previous Period" : "This Week's Revenue Trend"}</CardTitle>
          <div className="flex gap-4 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <Checkbox
                id="pos"
                checked={posChecked}
                onClick={() => setPosChecked(!posChecked)}
              />
              <Label htmlFor="pos" className="text-md">
                <div className="w-[14px] h-[2px] bg-pos-revenue1"></div>
                POS Revenue
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="eatclub"
                checked={eatclubChecked}
                onClick={() => setEatclubChecked(!eatclubChecked)}
              />
              <Label htmlFor="eatclub" className="text-md">
                <div className="w-[14px] h-[2px] bg-eatclub-revenue1"></div>
                Eatclub Revenue
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="labour"
                checked={labourChecked}
                onClick={() => setLabourChecked(!labourChecked)}
              />
              <Label htmlFor="labour" className="text-md">
                <div className="w-[14px] h-[2px] bg-labour-cost1"></div>Labour
                Costs
              </Label>
            </div>
            <Button
              className="rounded-2xl border-2 border-gray-300 text-md"
              variant={`${preChecked ? "default" : "preBtn"}`}
              onClick={() => setPreChecked(!preChecked)}
            >
              <ChartColumn /> Compare to Previous
            </Button>
            <Button
              variant={"secondary"}
              className="rounded-2xl border-2 border-gray-300 text-md"
            >
              <Download /> Export PNG
            </Button>
          </div>
        </div>
        {/* Show total cart */}
        <div className="flex gap-4">
          <TotalCart
            label={"Total Revenue"}
            value={totals.totalRevenue}
            isMoney={true}
            preChecked={preChecked}
          />
          <TotalCart
            label={"Average per Day"}
            value={totals.averagePerDay}
            isMoney={true}
            preChecked={preChecked}
          />
          <TotalCart
            label={"Total Covers"}
            value={totals.totalCovers}
            isMoney={false}
            preChecked={preChecked}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={preChecked ? chartPreConfig : chartConfig}
          className="h-[400px] w-full"
        >
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
            {posChecked && (
              <Bar
                dataKey="posRevenue"
                stackId="a"
                fill="var(--color-posRevenue)"
                radius={[0, 0, 4, 4]}
              />
            )}
            {eatclubChecked && (
              <Bar
                dataKey="eatclubRevenue"
                stackId="a"
                fill="var(--color-eatclubRevenue)"
                radius={[4, 4, 0, 0]}
              />
            )}
            {labourChecked && (
              <Bar
                dataKey="labourCosts"
                fill="var(--color-labourCosts)"
                radius={4}
              />
            )}
            {posChecked && preChecked && (
              <Bar
                dataKey="posRevenuePre"
                stackId="b"
                fill="var(--color-posRevenuePre)"
                radius={[0, 0, 4, 4]}
              />
            )}
            {eatclubChecked && preChecked && (
              <Bar
                dataKey="eatclubRevenuePre"
                stackId="b"
                fill="var(--color-eatclubRevenuePre)"
                radius={[4, 4, 0, 0]}
              />
            )}
            {labourChecked && preChecked && (
              <Bar
                dataKey="labourCostsPre"
                fill="var(--color-labourCostsPre)"
                radius={4}
              />
            )}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
