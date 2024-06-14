import { useSelector } from "react-redux";
import { QuestionSet, RootState } from "../../types";
import { SingleSet } from "../SingleSet/SingleSet";
import { SetListTypes } from "../../types";
export const SetList = () => {
  const setList = useSelector(
    (state: RootState) => state.user.user?.questionSets
  );
  return (
    <div className="flex flex-col place-items-center w-screen px-5 sm:p-8">
      <div className="flex flex-col p-5 rounded-xl shadow-2xl w-full h-full bg-w-primary dark:bg-primary max-w-[900px]  ">
        <br />
        <div>
          <div className="flex justify-between">
            <h1 className="py-1">Sets</h1>
            <h1 className="py-1">Your Progress</h1>
          </div>
          <div className="flex gap-2 w-full flex-col">
            {setList ? (
              setList.map((set: QuestionSet) => {
                return (
                  <div key={set._id} className="flex flex-col">
                    <SingleSet set={set} type={SetListTypes.QUIZ} />
                  </div>
                );
              })
            ) : (
              <h1>No sets</h1>
            )}
          </div>
        </div>
        <hr />
        <div className="w-full h-1 rounded-full place-self-center dark:bg-faint bg-w-faint m-3"></div>
      </div>
    </div>
  );
};
