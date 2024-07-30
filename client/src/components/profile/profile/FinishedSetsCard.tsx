import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { Card } from "@/components/ui/card";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export const FinishedSetsCard = () => {
    const finishedSets = useSelector((state: RootState) => state.stats.finishedSets);
    const finishedSetsLenght = finishedSets.length;
  return (
    <Card className="basis-full p-4 ">
      <div className="flex justify-between gap-2 h-full">
        <div>
          <h3 className="text-2xl font-semibold">Finished Sets</h3>
          <p className="text-sm opacity-60">
            Total number of sets you have finished this week
            <span>{finishedSetsLenght > 4 ? " 🔥" : finishedSetsLenght > 2 ? " 👍" : " 👀"}</span>
          </p>
        </div>
        <p className="text-4xl font-bold place-self-center">
            <AnimatedCounter from={0} to={finishedSetsLenght} animationOptions={{ease: "circOut", duration: 3}} />
        </p>
      </div>
    </Card>
  );
};