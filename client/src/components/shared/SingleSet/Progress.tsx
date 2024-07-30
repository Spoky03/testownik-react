import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ResetProgressButton } from "./ResetProgressButton";
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
  
  return (
    <div className="flex place-items-center">
      <p className="px-3">
        {completed ? "Completed" : `${progress.correct}/${progress.total}`}{" "}
      </p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <ResetProgressButton setId={setId} setCompleted={setCompleted} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset your progress</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
