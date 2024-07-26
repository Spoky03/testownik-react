import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { Card } from "@/components/ui/card";
import { RootState } from "@/types";
import { useSelector } from "react-redux";

export const MasteredQuestionsCard = () => {
  const totalMastered = useSelector(
    (state: RootState) => state.stats.totalMastered
  );
  return (
    <Card className="basis-full p-4">
      <div className="flex justify-between gap-2">
        <div className="">
          <h3 className="text-2xl font-semibold">Mastered Questions</h3>
          <p className="text-sm opacity-60">
            Total number of questions you have mastered this week
            <span>
              {totalMastered > 50 ? " 🔥" : totalMastered > 25 ? " 👍" : " 👀"}
            </span>
          </p>
        </div>
        <p className="text-4xl font-bold place-self-center">
          <AnimatedCounter from={0} to={totalMastered} animationOptions={{ease: "circOut", duration: 3}} />
        </p>
      </div>
    </Card>
  );
};
