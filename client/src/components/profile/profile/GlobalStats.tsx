import userService from "@/services/userService";
import { useEffect, useState } from "react";
import { StatsBarChart } from "./BarChart";
import { StackedBarChart } from "./StackedBarChart";
import { TimeGoal } from "./TimeGoal";

export interface GlobalStatsProps {
  correctAnswers: number;
  incorrectAnswers: number;
  masteredQuestions: number;
  totalQuestions: number;
  time: number;
  date: Date;
}
export const GlobalStats = () => {
  const [stats, setStats] = useState<GlobalStatsProps[]>();
  const { startDate, endDate } = {
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
    endDate: new Date(),
  };
  const todayTime = stats?.find(
    (stat: GlobalStatsProps) =>
      new Date(stat.date).toLocaleDateString() ===
      new Date().toLocaleDateString()
  )?.time;
  useEffect(() => {
    const fetchStats = async () => {
      const response = await userService.getGlobalStats(startDate, endDate);
      // sort by date
      response.sort(
        (a: GlobalStatsProps, b: GlobalStatsProps) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setStats(response);
    };
    fetchStats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data = stats?.map((stat: GlobalStatsProps) => {
    //parse date to weekday
    return {
      weekday: new Date(stat.date).toLocaleDateString("en-US", {
        weekday: "long",
      }),
      correct: stat.correctAnswers,
      incorrect: stat.incorrectAnswers,
    };
  });
  return (
    <div>
      <div className="flex flex-col gap-4">
        {todayTime && <TimeGoal currentTime={todayTime} />}
        {data && <StackedBarChart chartData={data} />}
      </div>
      <code>
        <pre>{JSON.stringify(stats, null, 2)}</pre>
      </code>
    </div>
  );
};
