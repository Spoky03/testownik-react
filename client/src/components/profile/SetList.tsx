import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NewSetForm } from "./NewSetForm";

const SingleSet = ({ set }) => {
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
  console.log(setList);
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
          setList.map((set: any) => {
            return (
              <div key={set.id} className="flex flex-col">
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
