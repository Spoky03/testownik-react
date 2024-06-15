import { MdAutorenew as ResetIcon } from "react-icons/md";
import { AppDispatch, RootState } from "../../store";
import { resetSingleProgress } from "../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QuestionSet } from "@/types";
export const Progress = ({ set }: { set: QuestionSet }) => {
  const [effect, setEffect] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const fetchedProgress = useSelector(
    (state: RootState) => state.user.progress
  );
  const setProgress = fetchedProgress.find((p) => p.questionSetId === set._id);
  const progress = {
    correct: setProgress?.questions.filter((q) => q.repeats === 0).length || 0,
    total: set.questions.length,
  };
  const handleReset = async () => {
    setEffect(true);
  };
  const effectCleanup = () => {
    if (effect) {
      dispatch(resetSingleProgress(set._id));
      setEffect(false);
    }
  };

  return (
    <div className="flex place-items-center">
      <h1 className="px-3">
        {progress.correct === progress.total
          ? "Completed"
          : `${progress.correct}/${progress.total}`}{" "}
      </h1>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <ResetIcon
              size={24}
              className={`hover:text-success transition-colors duration-300 ${
                effect && "animate-rotateSemi"
              }`}
              onClick={handleReset}
              onAnimationEnd={effectCleanup}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset your progress</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
