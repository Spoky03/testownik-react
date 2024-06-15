import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NewSetForm } from "./NewSetForm";
import { QuestionSet } from "../../types";
import { useState } from "react";
import {
  deleteOneQuestionSet,
  switchPrivacyOfSet,
} from "../../reducers/userReducer";
import { AppDispatch, RootState } from "../../store";

import { DeleteConfirmation } from "../DeleteConfirmation";
import { FaPlay as PlayIcon } from "react-icons/fa6";
import { MdEdit as EditIcon } from "react-icons/md";
import { MdPublicOff as PrivateIcon } from "react-icons/md";
import { MdPublic as PublicIcon } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const SingleSet = ({ set }: { set: QuestionSet }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [effect, setEffect] = useState(false);
  const handleDelete = () => {
    window.confirm("Are you sure you want to delete this set? This action is irreversible") &&
    setEffect(true);
  };
  const handlePrivate = () => {
    dispatch(switchPrivacyOfSet(set._id));
  };
  const effectCleanup = () => {
    if (effect) {
      dispatch(deleteOneQuestionSet(set._id));
      setEffect(false);
    }
  };

  return (
    <div className="flex">
      {" "}
      <Link to={`/quiz/${set._id}`} className="py-3 mr-3">
        <PlayIcon
          className="text-success opacity-80 hover:opacity-100"
          size={24}
        />
      </Link>
      <div
        className={`bg-w-ternary dark:bg-ternary font-bold rounded-md px-2 flex justify-between w-full ${
          effect && "animate-explode"
        }`}
        onAnimationEnd={effectCleanup}
      >
        <div className="flex">
          <Link to={`${set._id}`} className="w-full h-full py-3">
            <p className="flex opacity-90 hover:opacity-100">
              {set.name}
              <EditIcon className="place-self-center duration-300 transition-colors" />
            </p>
          </Link>
        </div>
        <div className="flex place-items-center gap-2 ">
          <DeleteConfirmation handleDelete={handleDelete} />
          <div
            onClick={handlePrivate}
            className="flex place-items-center gap-2"
          >
            {set.private ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {" "}
                    <PrivateIcon
                      className="hover:text-warning transition-colors duration-300"
                      size={24}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This set is currently private. Press to publish it.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {" "}
                    <PublicIcon
                      className="hover:text-success transition-colors duration-300"
                      size={24}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This set is public. Press to hide it.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <h1 className="p-3">{set.questions.length}</h1>
        </div>
      </div>
    </div>
  );
};
export const SetList = () => {
  const sets = useSelector((state: RootState) => state.user.user.questionSets);
  const usersSets = sets?.filter((set: QuestionSet) => !set.foreign);
  return (
    <div className="w-full">
      <NewSetForm />
      <br />
      <div className="flex justify-between">
        <h1 className="py-1">Your Sets</h1>
        <h1 className="py-1">Questions</h1>
      </div>
      <div className="flex gap-2 w-full flex-col">
        {usersSets ? (
          usersSets.map((set: QuestionSet) => {
            return (
              <div key={set._id} className="flex flex-col">
                <SingleSet set={set} />
              </div>
            );
          })
        ) : (
          <h1>No sets</h1>
        )}
      </div>
    </div>
  );
};
