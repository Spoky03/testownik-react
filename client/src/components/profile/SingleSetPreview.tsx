import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { Question, QuestionSet, RootState } from "../../types";
import { DropFiles } from "./DropFiles";
import { GoBackArrow } from "../GoBackArrow";
import { NewQuestionForm } from "./NewQuestionForm";
import { SingleQuestion } from "./SingleQuestion";
export const SingleSetPreview = () => {
  const match = useMatch("/profile/sets/:id");
  const singleSet = useSelector((state: RootState) => {
    return state.user?.user?.questionSets?.find(
      (set: QuestionSet) => set._id === match?.params.id
    );
  });

  return (
    <div className="flex flex-col place-items-center justify-center align-center w-full gap-5 ">
      <div className="place-self-start">
        <GoBackArrow />
      </div>
      {singleSet ? (
        <>
          <div className="flex justify-between font-bold w-full px-2">
            <h1 className="py-1">{singleSet.name}</h1>
            <h1 className="py-1">Questions: {singleSet.questions.length}</h1>
          </div>
          <DropFiles setId={singleSet._id} />
          <div className="px-2 flex flex-col justify-between w-full">
            <NewQuestionForm />
            <div className="flex flex-col">
              {singleSet.questions.map((question: Question) => {
                return (
                  <SingleQuestion key={question._id} question={question} />
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <h1>Set not found/Not authorized/Loading</h1>
      )}
    </div>
  );
};
