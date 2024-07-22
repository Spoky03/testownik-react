import { useState } from "react";
import { AppDispatch } from "@/store";
import { deleteOneQuestion } from "@/reducers/userReducer";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { MdEdit as EditIcon } from "react-icons/md";
import { useDispatch} from "react-redux";
import { Question, Answer} from "@/types";
import { NewQuestionForm } from "./NewQuestionForm";

export const SingleQuestion = ({ question }: { question: Question }) => {
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
          <div className="bg-ternary rounded-md px-2 py-1 mb-3 flex justify-between flex-col">
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
                      "flex p-1 justify-between border-2 rounded-md bg-secondary " +
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