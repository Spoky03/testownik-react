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

const StartQuizIcon = ({ id, styles }: { id: string; styles?: string }) => {
  return (
    <Link
      to={`/quiz/${id}`}
      className={`py-3 mr-3  place-self-center ${styles}`}
    >
      <PlayIcon
        className="text-success opacity-80 hover:opacity-100"
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
  const [showMore, setShowMore] = useState(false);
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
  const handleBookmark = async () => {
    if (bookmarks.includes(set._id)) {
      dispatch(deleteBookmark(set._id));
    } else {
      dispatch(addBookmark(set._id));
    }
  };
  useEffect(() => {
    if (bookmarks.includes(set._id)) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  }, [bookmarks, set._id]);
  return (
    <div
      className={`bg-w-ternary dark:bg-ternary hover:outline font-bold rounded-md px-2 pb-3 flex flex-col justify-between w-full relative`}
    >
      <button
        className="w-full h-full py-3 text-left"
        onClick={() => setShowMore(!showMore)}
        type="button"
      >
        <div className="flex">
          {type === SetListTypes.QUIZ && (
            <MarkIcon
              size={16}
              className={` transition-colors place-self-center duration-300 ${
                bookmarked
                  ? "text-amber-500 hover:text-amber-400"
                  : "hover:text-amber-200"
              }`}
              onClick={handleBookmark}
            />
          )}

          <h1 className="">{set.name}</h1>
        </div>
        <p className="text-xs opacity-80">
          {"by "}
          {foreign
            ? `you`
            : `${(set.author as { username: string; _id: string }).username}`}
        </p>
        {showMore && (
          <p className="text-base font-medium text-wrap break-words">
            {set.description}
          </p>
        )}
      </button>
      <hr className="w-full border-gray-300 dark:border-gray-700 my-2" />
      {type === SetListTypes.QUIZ && <Progress set={set} />}
      {type === SetListTypes.BROWSER && (
        <Socials set={set} handleBookmark={handleBookmark} />
      )}
      <StartQuizIcon id={set._id} styles="absolute right-0 top-0" />
    </div>
  );
};
