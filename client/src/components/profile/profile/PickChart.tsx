"use client";
import { TrendingUp, Sparkles } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Bar, BarChart } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChartData } from "@/types";
const chartConfig = {
  correct: {
    label: "Correct",
    color: "hsl(var(--chart-1))",
  },
  incorrect: {
    label: "Incorrect",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const CalculateRatio = (correct: number, incorrect: number) => {
  return Math.round((correct / (incorrect + correct)) * 100);
}
export const PickChart = ({ chartData }: { chartData: ChartData[] }) => {
  const [isBarChart, setIsBarChart] = useState(false);
  const correctSum = chartData.reduce((acc, curr) => acc + curr.correct, 0);
  const incorrectSum = chartData.reduce((acc, curr) => acc + curr.incorrect, 0);
  const ratio = CalculateRatio(correctSum, incorrectSum);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="w-full flex justify-between">
          <span>Twój tydzień</span>
          <div className="flex items-center space-x-2">
          <Button onClick={() => setIsBarChart(prev => !prev)} size={"icon"} variant={"ghost"}>
            <Sparkles className={isBarChart ? "fill-amber-500" : ""} />
          </Button>
        </div>
          </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        {isBarChart ? (
          <PickBarChart chartData={chartData} />
        ) : (
          <PickAreaChart chartData={chartData} />
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <span>{ratio}% twoich opdpowiedzi jest poprawne</span>
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Twój postęp w tym tygodniu
        </div>
      </CardFooter>
    </Card>
  );
}
const PickAreaChart = ({ chartData }: { chartData: ChartData[] }) => {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="weekday"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          //   tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="correct"
          type="natural"
          fill="var(--color-correct)"
          fillOpacity={0.7}
          stroke="var(--color-correct)"
          stackId="a"
        />
        <Area
          dataKey="incorrect"
          type="natural"
          fill="var(--color-incorrect)"
          fillOpacity={0.6}
          stroke="var(--color-incorrect)"
          stackId="a"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};
const PickBarChart = ({ chartData }: { chartData: ChartData[] }) => {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="weekday"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="correct"
          stackId="a"
          fillOpacity={0.9}
          fill="var(--color-correct)"
          radius={[0, 0, 4, 4]}
        />
        <Bar
          dataKey="incorrect"
          stackId="a"
          fillOpacity={0.6}
          fill="var(--color-incorrect)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
};