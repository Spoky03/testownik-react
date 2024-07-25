import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

export const SetTimeGoal = ({
    goalTime,
    setGoalTime,
    }: {
    goalTime: number;
    setGoalTime: (time: number) => void;  
    }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 items-center">
            <h3 className="font-semibold basis-fit text-nowrap">Set Weekly Goal</h3>
            <input
                type="number"
                value={goalTime}
                onChange={(e) => setGoalTime(Number(e.target.value))}
                className="w-full h-10 px-4 bg-faint rounded-full"
            />
        </div>
    );
    };
export const TimeGoal = ({
  currentTime,
}: {
  currentTime: number;
}) => {
  //   const timeLeft = goalTime - currentTime;
  //   const timeLeftInMinutes = timeLeft / 60;
  const [goalTime, setGoalTime] = useState(0);

  useEffect(() => {
    setGoalTime(53*60);
  }, [currentTime]);
  return (
    <Card>
        <div className="flex flex-col md:flex-row gap-4 p-4 items-center">
          <h3 className="font-semibold basis-fit text-nowrap">Weekly Goal</h3>
          <div
            className={`w-full h-4 bg-faint rounded-full relative overflow-hidden`}
          >
            <div
              className="bg-success h-full rounded-l-full rounded-r-full transition-all"
              style={{
                width: `${
                  (Math.min(currentTime, goalTime) / goalTime) * 100
                }%`,
              }}
            ></div>
            <p className="top-0 left-2 place-content-center h-full absolute text-xs font-semibold">
              {Math.round(currentTime/60)} minutes
            </p>
            <p className="top-0 right-2 place-content-center h-full absolute text-xs font-semibold">
              {Math.round((goalTime - currentTime)/60)} minutes
            </p>
          </div>
        </div>
        <SetTimeGoal goalTime={goalTime} setGoalTime={setGoalTime} />
    </Card>
  );
};
