import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ResetProgressButton } from "./ResetProgressButton";
import { Link } from "react-router-dom";
import { FaPlay as PlayIcon } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addBookmark } from "@/reducers/userReducer";
export const StartQuizIcon = ({
  id,
  className,
  completed,
  setCompleted,
  variant,
}: {
  id: string;
  className?: string;
  completed?: boolean;
  setCompleted?: (value: boolean) => void;
  variant?: "default" | "bookmark";
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event?.stopPropagation();
    if (completed) {
      return;
    }
    if (variant === "bookmark") {
      dispatch(addBookmark(id));
    }
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="h-fit relative">
          {completed ? (
            <div className="-right-10 top-2 absolute h-6 w-40 bg-success rotate-45">
              <span className="text-center ml-4 font-semibold text-white">
                Completed
              </span>
            </div>
          ) : (
            <div className={completed ? "opacity-20 cursor-not-allowed" : ""}>
              <Link
                to={`/quiz/${id}`}
                className={`${
                  completed && "pointer-events-none"
                } px-2 py-0.5 ${className} flex border-success border rounded-2xl hover:bg-success hover:bg-opacity-30 transition-colors`}
                onClick={handleClick}
              >
                <span className="hidden sm:block font-medium mr-1">
                  {variant === "bookmark" ? "Bookmark & " : "Play Quiz"}
                </span>
                <PlayIcon
                  className="ml-0.5 place-self-center text-success opacity-100"
                  size={18}
                />
              </Link>
            </div>
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p className="break-words text-wrap max-w-sm">
            {completed ? (
              <>
                "You've already completed this quiz. Reset your progress below
                to play again"{" "}
                <ResetProgressButton setId={id} setCompleted={setCompleted} />
              </>
            ) : (
              "Press to play this quiz"
            )}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
