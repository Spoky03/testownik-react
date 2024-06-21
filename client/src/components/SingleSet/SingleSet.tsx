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
      className={`py-3 mr-3  place-self-center ${styles}`}
      onClick={(event) => event.stopPropagation()}
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
      className={`bg-w-ternary cursor-pointer dark:bg-ternary hover:outline font-bold rounded-md px-2 pb-3 flex flex-col justify-between w-full relative`}
    >
      <div className="flex w-full h-full pt-3 text-left">
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

        <h1 className="">{set.name}</h1>
      </div>
      <p className="text-xs opacity-80">
        {"by "}
        {foreign
          ? `you`
          : `${(set.author as { username: string; _id: string }).username}`}
      </p>
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
      {(bookmarked || foreign) && !completed && (
        <StartQuizIcon id={set._id} styles="absolute right-0 top-0" />
        // <div className="absolute right-1 top-1 rounded-full p-2 bg-success bg-opacity-30">
        //   <Link className=" w-4 h-4" to={`/dashboard/${set._id}`} onClick={(event) => event.stopPropagation()} />
        // </div>
      )}
    </div>
  );
};
