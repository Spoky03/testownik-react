import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NewSetForm } from "./NewSetForm";
import { QuestionSet } from "../../types";

const SingleSet = ({ set } : {set: QuestionSet}) => {
  return (
    <Link to={`${set._id}`}>
      <div className="bg-w-ternary dark:bg-ternary font-bold rounded-md py-3 px-2 flex justify-between w-full">
        <h1>{set.name}</h1>
        <h1>{set.questions.length}</h1>
      </div>
    </Link>
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
