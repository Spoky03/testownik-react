import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import { QuestionSet } from "../../types";
import { RootState } from "../../types";
import { MdAutorenew as ResetIcon } from "react-icons/md";
import { AppDispatch } from "../../store";
import { resetSingleProgress } from "../../reducers/userReducer";
import { SetListTypes } from "../../types";
import { Progress } from "./Progress";
import { Socials } from "./Socials";
export const SingleSet = ({ set, type }: { set: QuestionSet, type: SetListTypes }) => {
    const [foreign, setForeign] = useState(false);
    const userId = useSelector((state: RootState) => state.user.user?.sub);
    useEffect(() => {
      if (typeof set.author === "object" && set.author._id === userId) {
        setForeign(true);
      } else if (set.author === userId) {
        setForeign(true);
      }
    },[setForeign, set.author, userId]);
    return (
      <div
        className={`bg-w-ternary dark:bg-ternary font-bold rounded-md px-2 flex justify-between w-full`}
      >
        <Link to={`${set._id}`} className="w-full h-full py-3">
          <h1 className="">{set.name}</h1>
          <p className="text-xs opacity-80">{"by "}
            {foreign ?  `you` :  `${(set.author as { username: string; _id: string; }).username}`}
          </p>
        </Link>
        {type===SetListTypes.QUIZ && <Progress set={set} />}
        {type===SetListTypes.BROWSER && <Socials set={set} />}
      </div>
    );
  };