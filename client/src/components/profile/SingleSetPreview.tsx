import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { Question, Answer, QuestionSet, RootState } from "../../types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { AppDispatch } from "../../store";
import {
  createQuestion,
  deleteOneQuestion,
  editQuestion,
  notifyUser,
} from "../../reducers/userReducer";
import { DeleteConfirmation } from "../DeleteConfirmation";
import { MdAdd as AddIcon } from "react-icons/md";
import { MdEdit as EditIcon } from "react-icons/md";
import { MdClose as CloseIcon } from "react-icons/md";
import { DropFiles } from "./DropFiles";
import { FaCheck as CheckIcon } from "react-icons/fa6";
import { GoBackArrow } from "../GoBackArrow";
import { Input } from "../ui/input";

type CreatedAnswer = Omit<Answer, "_id"> & { id: string | number };

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
const NewQuestionForm = ({
  editMode,
  setEditMode,
  questionToEdit,
}: {
  editMode?: boolean;
  setEditMode?: (value: boolean) => void;
  questionToEdit?: Question;
}) => {
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<CreatedAnswer[]>([
    { answer: "", correct: false, id: 0 },
  ]);
  useEffect(() => {
    if (questionToEdit) {
      setQuestion(questionToEdit.question);
      setAnswers(
        questionToEdit.answers.map((answer, index) => ({
          answer: answer.answer,
          correct: answer.correct,
          id: index,
        }))
      );
    }
  }, [questionToEdit]);
  const handleAnswerChange = (id: number, value: string) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.map((answer) =>
        answer.id === id ? { ...answer, answer: value } : answer
      );

      if (value.trim() !== "" && id === updatedAnswers.length - 1) {
        return [...updatedAnswers, { answer: "", correct: false, id: id + 1 }];
      } else if (value.trim() === "") {
        let lastNonEmpty = updatedAnswers.length - 1;
        while (
          lastNonEmpty > id &&
          updatedAnswers[lastNonEmpty].answer.trim() === ""
        ) {
          lastNonEmpty--;
        }
        return updatedAnswers.slice(0, lastNonEmpty + 1);
      } else {
        return updatedAnswers;
      }
    });
  };
  const match = useMatch("/profile/sets/:id");
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const createdQuestion = {
      question,
      answers: answers.filter((answer) => answer.answer.trim() !== ""),
    };
    if (match?.params.id) {
      editMode && questionToEdit
        ? dispatch(
            editQuestion(createdQuestion, questionToEdit._id, match.params.id)
          )
        : dispatch(createQuestion([createdQuestion], match.params.id));
      dispatch(notifyUser({ text: "Question added", type: "success" }));
      setEditMode && setEditMode(false);
    } else {
      dispatch(notifyUser({ text: "Please select a set", type: "error" }));
    }
    setQuestion("");
    setAnswers([{ answer: "", correct: false, id: 0 }]);
  };
  return (
    <div className="bg-w-ternary dark:bg-ternary rounded-md px-2 py-1 flex justify-between flex-col mb-3">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <div className="flex justify-center">
            <Input
              className="p-1 mx-3 my-2 rounded-md border-primary border w-full max-w-64 dark:text-primary"
              placeholder="your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Button
              className="place-self-center"
              type="submit"
              onClick={() => {}}
            >
              {editMode && setEditMode ? <CheckIcon /> : <AddIcon />}
            </Button>
          </div>
          {editMode && setEditMode ? (
              <Button className=" place-self-center" type="button" onClick={() => setEditMode(false)}>
                {<CloseIcon />}
              </Button>
          ) : (
            <div className="w-8"></div>
          )}
        </div>
        <hr />
        <div className="grid grid-cols-2 gap-2 p-2">
          {answers
            .filter((answer: CreatedAnswer) => answer)
            .map((answer: CreatedAnswer) => {
              return (
                <div
                  key={answer.id}
                  className={
                    "flex p-1 justify-between border-2 rounded-md bg-w-secondary dark:bg-secondary relative " +
                    (answer.correct ? "border-success" : "border-error")
                  }
                >
                  <Input
                    className="p-1 w-full dark:text-primary"
                    placeholder="answer"
                    value={answer.answer}
                    onChange={(e) =>
                      handleAnswerChange(answer.id, e.target.value)
                    }
                  />
                  <Input
                    type="checkbox"
                    className={
                      "rounded-full w-4 h-4 absolute -top-1 -right-1 " +
                      (answer.correct ? "bg-success" : "bg-error")
                    }
                    onChange={() =>
                      setAnswers((prevAnswers) =>
                        prevAnswers.map((ans) =>
                          ans.id === answer.id
                            ? { ...ans, correct: !ans.correct }
                            : ans
                        )
                      )
                    }
                    checked={answer.correct}
                  />
                </div>
              );
            })}
        </div>
      </form>
    </div>
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
