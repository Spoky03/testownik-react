import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { Question, Answer, QuestionSet, RootState } from "../../types";
import { useState } from "react";
import { AppDispatch } from "../../store";
import { deleteOneQuestion } from "../../reducers/userReducer";
import { DeleteConfirmation } from "../DeleteConfirmation";
import { MdEdit as EditIcon } from "react-icons/md";
import { DropFiles } from "./DropFiles";
import { GoBackArrow } from "../GoBackArrow";

import { NewQuestionForm } from "./NewQuestionForm";

const SingleQuestion = ({ question }: { question: Question }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const handleDelete = () => {
    dispatch(deleteOneQuestion(question._id));
  };
  const handleEdit = () => {
    setEditMode(true);
  };
  return (
    <>
      {editMode === false ? (
        <div className="bg-w-ternary dark:bg-ternary rounded-md px-2 py-1 mb-3 flex justify-between flex-col">
          <div className="flex justify-between p-2">
            <h1 className="">{question.question}</h1>
            <div></div>
            <div className="flex gap-2">
              <DeleteConfirmation handleDelete={handleDelete} />
              <EditIcon
                className="hover:text-success duration-300 transition-colors place-self-center"
                size={24}
                onClick={handleEdit}
              />
            </div>
          </div>
          <hr />
          <div className="grid grid-cols-2 gap-2 p-2">
            {question.answers.map((answer: Answer) => {
              return (
                <div
                  key={answer.id}
                  className={
                    "flex p-1 justify-between border-2 rounded-md bg-w-secondary dark:bg-secondary " +
                    (answer.correct ? "border-success" : "border-error")
                  }
                >
                  <h1>{answer.answer}</h1>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <NewQuestionForm
          editMode={editMode}
          setEditMode={setEditMode}
          questionToEdit={question}
        />
      )}
    </>
  );
};

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
