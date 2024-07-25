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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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

interface ChartData {
  weekday: string;
  correct: number;
  incorrect: number;
}
function CalculateRatio(correct: number, incorrect: number) {
  return Math.round((correct / (incorrect+correct)) * 100);
}
export function StackedBarChart({ chartData }: { chartData: ChartData[] }) {
  const correctSum = chartData.reduce((acc, curr) => acc + curr.correct, 0);
  const incorrectSum = chartData.reduce((acc, curr) => acc + curr.incorrect, 0);
  const ratio = CalculateRatio(correctSum, incorrectSum);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Twój tydzień</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
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
              fill="var(--color-correct)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="incorrect"
              stackId="a"
              fill="var(--color-incorrect)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
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
