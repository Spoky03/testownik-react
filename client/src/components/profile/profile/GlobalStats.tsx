import { TimeGoal } from "./TimeGoal";
import { PickChart } from "./PickChart";
import { RootState } from "@/types";
import { useSelector } from "react-redux";
import { MasteredQuestionsCard } from "./MasteredQuestionsCard";
import { FinishedSetsCard } from "./FinishedSetsCard";

export const GlobalStats = () => {
  const { chartData } = useSelector(
    (state: RootState) => state.stats
  );
  return (
    <div>
      <div className="flex flex-col gap-4">
        <TimeGoal />
        <div className="flex flex-col 2xl:flex-row gap-4">
          <MasteredQuestionsCard />
          <FinishedSetsCard />
        </div>
        <PickChart chartData={chartData} />
      </div>
      {/* <code>
        <pre>{JSON.stringify(lastWeek, null, 2)}</pre>
      </code> */}
    </div>
  );
};
