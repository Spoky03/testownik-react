import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NewSetForm } from "./NewSetForm";
import { QuestionSet } from "../../types";
import { useEffect, useState } from "react";
import {
  deleteOneQuestionSet,
  fetchQuestionSets,
} from "../../reducers/userReducer";
import { AppDispatch } from "../../store";

import { DeleteConfirmation } from "../DeleteConfirmation";

const SingleSet = ({ set }: { set: QuestionSet }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [effect, setEffect] = useState(false);
  const handleDelete = (event: React.MouseEvent) => {
    setEffect(true);
  };
  const effectCleanup = () => {
    if (effect) {
      dispatch(deleteOneQuestionSet(set._id));
      setEffect(false);
    }
  };

  return (
    <div
      className={`bg-w-ternary dark:bg-ternary font-bold rounded-md px-2 flex justify-between w-full ${
        effect && "animate-explode"}`}
      onAnimationEnd={effectCleanup}
    >
      <Link to={`${set._id}`} className="w-full h-full py-3">
        <h1 className="">{set.name}</h1>
      </Link>
      <div className="flex place-items-center">
        <DeleteConfirmation handleDelete={handleDelete} />
        <h1 className="p-3">{set.questions.length}</h1>
      </div>
    </div>
  );
};
export const SetList = () => {
  const setList = useSelector((state: any) => state.user.user.questionSets);
  return (
    <div className="w-full">
      <NewSetForm />
      <br />
      <div className="flex justify-between">
        <h1 className="py-1">Your Sets</h1>
        <h1 className="py-1">Questions</h1>
      </div>
      <div className="flex gap-2 w-full flex-col">
        {setList ? (
          setList.map((set: QuestionSet) => {
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
