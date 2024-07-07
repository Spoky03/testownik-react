import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { QuestionSet } from "../../types";
import { RootState } from "../../types";
import { SetListTypes } from "../../types";
import { Progress } from "./Progress";
import { Socials } from "./Socials";
import { FaPlay as PlayIcon } from "react-icons/fa6";
import { FaBookmark as MarkIcon } from "react-icons/fa";
import { AppDispatch } from "@/store";
import { addBookmark, deleteBookmark } from "@/reducers/userReducer";
import { likeSet } from "@/reducers/browserReducer";

const StartQuizIcon = ({ id, styles }: { id: string; styles?: string }) => {
  return (
    <Link
      to={`/dashboard/${id}`}
      className={`px-3 py-2 ${styles} flex border-success border rounded-2xl hover:bg-success hover:bg-opacity-30 transition-colors`}
      onClick={(event) => event.stopPropagation()}
    >
      <span className="hidden sm:block text-success font-medium mr-2">Start Quiz</span>
      <PlayIcon
        className="text-success opacity-100"
        size={24}
      />
    </Link>
  );
};
export const SingleSet = ({
  set,
  type,
}: {
  set: QuestionSet;
  type: SetListTypes;
}) => {
  const [foreign, setForeign] = useState(false);
  const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.user?.sub);
  const bookmarks = useSelector((state: RootState) => state.user.bookmarks);
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
  }
  useEffect(() => {
    if (bookmarks.includes(set._id)) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  }, [bookmarks, set._id]);
  return (
    <div
      className={`border border-faint bg-ternary font-bold rounded-md px-2 pb-1 flex flex-col justify-between w-full relative ${type!==SetListTypes.QUIZ ? "cursor-pointer hover:outline" : "hover:border-text"}`}
    >
      <div className="flex justify-between w-full h-full pt-3 text-left">
        <div className="flex">
          {type === SetListTypes.QUIZ && (
            <button             onClick={handleBookmark} >
            <MarkIcon
              size={16}
              className={` transition-colors place-self-center duration-300 ${
                bookmarked
                  ? "text-amber-500 hover:text-amber-400"
                  : "hover:text-amber-200"
              }`}
            />
            </button>
          )}
          <div>
            <h1 className="place-self-start text-wrap break-all">{set.name}</h1>
            <p className="text-xs opacity-80">
                    {"by "}
                    {foreign
            ? `you`
            : `${(set.author as { username: string; _id: string }).username}`}
                  </p>
          </div>
        </div>
        {(bookmarked || foreign) && !completed && (
        <StartQuizIcon id={set._id} styles="place-self-end" />
      )}
      </div>
      {type !== SetListTypes.BROWSER && (
        <p className="text-base font-medium text-wrap py-2 break-words">
          {set.description}
        </p>
      )}
      <hr className="w-full border-gray-300 dark:border-gray-700 my-2" />
      {type === SetListTypes.QUIZ && (
        <Progress set={set} completed={completed} setCompleted={setCompleted} />
      )}
      {(type === SetListTypes.BROWSER || type === SetListTypes.MODAL) && (
        <Socials set={set} type={type} handleBookmark={handleBookmark} handleLike={handleLike} />
      )}
    </div>
  );
};
