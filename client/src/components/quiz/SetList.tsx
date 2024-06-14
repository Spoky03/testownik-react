import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { QuestionSet } from "../../types";
import { RootState } from "../../types";
import { MdAutorenew as ResetIcon } from "react-icons/md";
import { useState } from "react";
import { AppDispatch } from "../../store";
import { resetSingleProgress } from "../../reducers/userReducer";
const SingleSet = ({ set }: { set: QuestionSet }) => {
  const [effect, setEffect] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const fetchedProgress = useSelector(
    (state: RootState) => state.user.progress
  );
  const setProgress = fetchedProgress.find((p) => p.questionSetId === set._id);
  const progress = {
    correct: setProgress?.questions.filter((q) => q.repeats === 0).length || 0,
    total: set.questions.length,
  };
  const handleReset = async () => {
      setEffect(true);
  };
  const effectCleanup = () => {
    if (effect) {
      dispatch(resetSingleProgress(set._id));
      setEffect(false);
    }
  };
  return (
    <div className={`bg-w-ternary dark:bg-ternary font-bold rounded-md px-2 flex justify-between w-full`}>
      <Link to={`${set._id}`} className="w-full h-full py-3">
        <h1 className="">{set.name}</h1>
      </Link>
      <div className="flex place-items-center">
        <h1 className="p-3">
          {progress.correct === progress.total
            ? "Completed"
            : `${progress.correct}/${progress.total}`}{" "}
        </h1>
        <ResetIcon
          size={24}
          className={`hover:text-success transition-colors duration-300 ${
            effect && "animate-rotateSemi"
          }`}
          onClick={handleReset}
          onAnimationEnd={effectCleanup}
        />
      </div>
    </div>
  );
};
export const SetList = () => {
  const setList = useSelector(
    (state: RootState) => state.user.user?.questionSets
  );
  return (
    <div className="flex flex-col place-items-center w-screen px-5 sm:p-8">
      <div className="flex flex-col p-5 rounded-xl shadow-2xl w-full h-full bg-w-primary dark:bg-primary max-w-[900px]  ">
        <br />
        <div className="flex justify-between">
          <h1 className="py-1">Sets</h1>
          <h1 className="py-1">Your Progress</h1>
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
    </div>
  );
};
