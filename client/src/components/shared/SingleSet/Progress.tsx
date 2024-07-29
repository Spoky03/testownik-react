import { MdAutorenew as ResetIcon } from "react-icons/md";
import { AppDispatch } from "@/store";
import { resetSingleProgress } from "@/reducers/userReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
export const Progress = ({
  setId,
  progress,
  completed,
  setCompleted,
}: {
  setId: string;
  progress: {
    correct: number;
    total: number;
  }
  completed: boolean;
  setCompleted: (value: boolean) => void;
}) => {
  const [effect, setEffect] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const handleReset = async () => {
    setEffect(true);
  };
  const effectCleanup = async () => {
    if (effect) {
      const res = await dispatch(resetSingleProgress(setId));
      if (res) {
        toast({
          variant: "destructive",
          title: "This set could not be reset.",
          description: "Please try again later.",
        });
      }
      setEffect(false);
      setCompleted(false);
    }
  };

  return (
    <div className="flex place-items-center">
      <p className="px-3">
        {completed ? "Completed" : `${progress.correct}/${progress.total}`}{" "}
      </p>
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
