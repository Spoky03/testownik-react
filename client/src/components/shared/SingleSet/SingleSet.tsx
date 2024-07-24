import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { QuestionSet } from "@/types";
import { RootState } from "@/types";
import { SetListTypes } from "@/types";
import { Progress } from "./Progress";
import { Socials } from "./Socials";
import { FaPlay as PlayIcon } from "react-icons/fa6";
import { FaBookmark as MarkIcon } from "react-icons/fa";
import { AppDispatch } from "@/store";
import { addBookmark, deleteBookmark } from "@/reducers/userReducer";
import { likeSet } from "@/reducers/browserReducer";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
const StartQuizIcon = ({
  id,
  className,
  completed,
}: {
  id: string;
  className?: string;
  completed?: boolean;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="h-fit">
          <div className={completed ? "opacity-20 cursor-not-allowed" : ""}>
            <Link
              to={`/quiz/${id}`}
              className={`${
                completed && "pointer-events-none"
              } px-3 py-2 ${className} flex border-success border rounded-2xl hover:bg-success hover:bg-opacity-30 transition-colors`}
              onClick={(event) => event.stopPropagation()}
            >
              <span className="hidden sm:block text-success font-medium mr-2">
                Start Quiz
              </span>
              <PlayIcon className="text-success opacity-100" size={24} />
            </Link>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="break-words text-wrap max-w-sm">
            {completed
              ? "You've already completed this quiz. Reset your progress below to play again"
              : "Press to play this quiz"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export const SingleSet = ({
  set,
  type,
}: {
  set: QuestionSet;
  type: SetListTypes;
}) => {
  const navigate = useNavigate();
  const [foreign, setForeign] = useState(false);
  const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.user?.sub);
  const bookmarks = useSelector((state: RootState) => state.user.bookmarks);
  const date = new Date(set.metaData.date);
  const [bookmarked, setBookmarked] = useState(
    bookmarks ? bookmarks.includes(set._id) : false
  );
  useEffect(() => {
    if (typeof set.author === "object" && set.author._id === userId) {
      setForeign(true);
    } else if (set.author === userId) {
      setForeign(true);
    }
  }, [setForeign, set.author, userId]);
  const handleBookmark = async (event: React.MouseEvent) => {
    event?.stopPropagation();
    if (bookmarks.includes(set._id)) {
      dispatch(deleteBookmark(set._id));
    } else {
      dispatch(addBookmark(set._id));
    }
  };
  const handleLike = (event: React.MouseEvent, id: string) => {
    event?.stopPropagation();
    dispatch(likeSet(id));
  };
  const handleEdit = (event: React.MouseEvent) => {
    event?.stopPropagation();
    window.location.href = `/profile/sets/${set._id}`;
  };
  useEffect(() => {
    if (bookmarks.includes(set._id)) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  }, [bookmarks, set._id]);

  const isAuthor =
    typeof set.author === "object"
      ? userId === set.author._id
      : userId === set.author;
  const modalRedirect = ({ event }: { event: React.MouseEvent }) => {
    event.preventDefault();
    navigate(`/browser/${set._id}`);
  }
  return (
    <div
      className={`border border-faint bg-ternary rounded-md px-2 pb-1 flex flex-col justify-between w-full relative ${
        type !== SetListTypes.QUIZ && type !== SetListTypes.MODAL
          ? "cursor-pointer hover:outline"
          : ""
      }`}
      onClick={
        type === SetListTypes.BROWSER || type === SetListTypes.MODAL
          ? (event) => modalRedirect({ event })
          : undefined
      }
    >
      <div className="flex justify-between w-full h-full pt-3 text-left">
        <div className="flex ml-2 w-full">
          <div className="w-full">
            <div className="flex gap-1 w-full justify-between">
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <h2 className="place-self-start max-h-7 overflow-y-hidden text-wrap break-all text-xl font-bold">
                    {set.name}
                  </h2>
                  {type === SetListTypes.QUIZ && (
                    <button
                      onClick={handleBookmark}
                      className="place-self-start ml-1 mt-1.5"
                    >
                      <MarkIcon
                        size={16}
                        className={`place-self-center ${
                          bookmarked && "text-amber-500"
                        }`}
                      />
                    </button>
                  )}
                </div>
                <p className="opacity-80 font-medium text-sm -translate-y-1.5">
                  {"by "}
                  {foreign
                    ? `you`
                    : `${
                        (set.author as { username: string; _id: string })
                          .username
                      }`}
                </p>
              </div>
              {(bookmarked || foreign) && (
                <StartQuizIcon
                  id={set._id}
                  className="shrink-0 text-nowrap"
                  completed={completed}
                />
              )}
            </div>
            <div className="flex flex-row gap-6">
              <div className="flex flex-col shrink-0 font-medium">
                <p className="text-sm opacity-80">
                  {set.metaData.subject}
                </p>
                <p className="text-sm opacity-80">
                  Questions: {set.questions.length}
                </p>
                <p className="opacity-80 text-sm">
                  {date.toLocaleDateString()}
                </p>
              </div>
              <div className="p-2 flex gap-4 md:gap-8 justify-between">
                <p
                  className={`text-wrap break-words ${
                    type === SetListTypes.BROWSER && "overflow-ellipsis overflow-hidden max-h-12 text-xs"
                  }`}
                >
                  {set.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator className="mt-1" />
      <div className="flex pt-2 pb-1.5 px-1 justify-between">
        {type === SetListTypes.QUIZ && (
          <Progress
            set={set}
            completed={completed}
            setCompleted={setCompleted}
          />
        )}
        {(type === SetListTypes.BROWSER || type === SetListTypes.MODAL) && (
          <Socials
            set={set}
            handleBookmark={handleBookmark}
            handleLike={handleLike}
          />
        )}
        {type === SetListTypes.QUIZ && isAuthor && (
          <div>
            <Button onClick={handleEdit} variant={"outline"}>
              Edit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
