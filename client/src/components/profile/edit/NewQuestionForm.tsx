import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { FaCheck as CheckIcon } from "react-icons/fa6";
import { MdAdd as AddIcon } from "react-icons/md";
import { MdClose as CloseIcon } from "react-icons/md";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createQuestion, editQuestion } from "@//reducers/userReducer";
import { Question, Answer } from "@/types";
import { AppDispatch } from "@/store";
import { useMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoMdImage as UploadImageIcon } from "react-icons/io";
import { Modal } from "@/components/shared/Modal";
import { DropImage } from "./DropImage";
type CreatedAnswer = Omit<Answer, "_id"> & { id: string | number };

export const NewQuestionForm = ({
  editMode,
  setEditMode,
  questionToEdit,
}: {
  editMode?: boolean;
  setEditMode?: (value: boolean) => void;
  questionToEdit?: Question;
}) => {
  const { toast } = useToast();
  const [openImageModal, setOpenImageModal] = useState(false);
  const match = useMatch("/profile/sets/:id");
  const dispatch = useDispatch<AppDispatch>();
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const createdQuestion = {
      question,
      answers: answers.filter((answer) => answer.answer.trim() !== ""),
    };
    if (match?.params.id) {
      let res;
      if (editMode && setEditMode && questionToEdit) {
        res = await dispatch(
          editQuestion(createdQuestion, questionToEdit._id, match.params.id)
        );
        setEditMode(false);
      } else {
        res = await dispatch(
          createQuestion([createdQuestion], match.params.id)
        );
      }
      toast({
        variant: res.status === 200 ? "success" : "destructive",
        title:
          res.status === 200
            ? "Question added successfully!"
            : "There was a problem with your request.",
        description: res.message,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong.",
        description: "You need to be in a set to add a question.",
      });
    }
    setQuestion("");
    setAnswers([{ answer: "", correct: false, id: 0 }]);
  };
  return (
    <div className="bg-ternary rounded-md px-2 py-1 flex justify-between flex-col mb-3">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className="grid w-full gap-1.5 p-2">
            <Label htmlFor="question">Create new question</Label>
            <Textarea
              className="min-h-24"
              placeholder="Type your question here."
              id="question"
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
            />
          </div>
          <div className="flex justify-between  p-2">
            <div className="w-full flex flex-row gap-2">
              <Button
                className="place-self-center"
                type="submit"
                variant="outline"
                size={"icon"}
              >
                {editMode && setEditMode ? (
                  <CheckIcon size={22} />
                ) : (
                  <AddIcon size={24} className="mx-2" />
                )}
              </Button>
              {editMode && setEditMode && (
                <Button
                  className=" place-self-center"
                  type="button"
                  variant={"outline"}
                  size={"icon"}
                  onClick={() => setEditMode(false)}
                >
                  {<CloseIcon size={24} />}
                </Button>
              )}
            </div>
            <div className="w-full flex flex-row-reverse gap-2 place-self-end">
              <Button
                className="place-self-center"
                type="submit"
                variant="outline"
                size={"icon"}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenImageModal(true);
                }}
              >
                <UploadImageIcon size={24} />
              </Button>
              <Label
                htmlFor="image"
                className="place-self-center opacity-80 font-normal"
              >
                No image selected
              </Label>
            </div>
          </div>
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
                    "flex p-1 justify-between border-2 rounded-md bg-secondary relative " +
                    (answer.correct ? "border-success" : "border-error")
                  }
                >
                  <Input
                    className="p-1 w-full"
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
      <Modal
        open={openImageModal}
        setOpen={setOpenImageModal}
        content={
          <DropImage question={questionToEdit as Question} />
        }
      />
    </div>
  );
};
