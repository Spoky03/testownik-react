import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { Question, Answer, QuestionSet } from "../../types";
import { useEffect, useState } from "react";
import { Button } from "../Button";
const SingleQuestion = ({ question }: { question: Question }) => {
  return (
    <div className="bg-w-ternary dark:bg-ternary rounded-md px-2 py-1 flex justify-between flex-col">
      <h1 className="p-2">{question.question}</h1>
      <hr />
      <div className="grid grid-cols-2 gap-2 p-2">
        {question.answers.map((answer: Answer) => {
          return (
            <div key={answer._id}
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
  );
};
type CreatedAnswer = Omit<Answer, "_id"> & { id: number };
const NewQuestionForm = () => {
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<CreatedAnswer[]>([
    { answer: "", correct: false, id: 0 },
  ]);
  
  const handleAnswerChange = (id: number, value: string) => {
  setAnswers((prevAnswers) => {
    const updatedAnswers = prevAnswers.map((answer) =>
      answer.id === id ? { ...answer, answer: value } : answer
    );

    if (value.trim() !== "" && id === updatedAnswers.length - 1) {
      return [...updatedAnswers, { answer: "", correct: false, id: id + 1 }];
    } else if (value.trim() === "") {
      let lastNonEmpty = updatedAnswers.length - 1;
      while (lastNonEmpty > id && updatedAnswers[lastNonEmpty].answer.trim() === "") {
        lastNonEmpty--;
      }
      return updatedAnswers.slice(0, lastNonEmpty + 1);
    } else {
      return updatedAnswers;
    }
  });
  };
  const match = useMatch("/profile/sets/:id")
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const strippedAnswers = answers.filter((answer) => answer.answer.trim() !== "");
    console.log(question, strippedAnswers, (match?.params.id))
    // TODO
  }
  return (
    <div className="bg-w-ternary dark:bg-ternary rounded-md px-2 py-1 flex justify-between flex-col mt-3">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <input
            className="p-1 mx-3 my-2 rounded-md border-primary border"
            placeholder="your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <div className="h-8 w-8 place-self-center">
            <Button type="submit" label="+" onclick={() => {}} />
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
                    "flex p-1 justify-between border-2 rounded-md bg-w-secondary dark:bg-secondary relative " +
                    (answer.correct ? "border-success" : "border-error")
                  }
                >
                  <input
                    className="p-1 w-full"
                    placeholder="answer"
                    value={answer.answer}
                    onChange={(e) => handleAnswerChange(answer.id, e.target.value)}
                  />
                  <input
                    type="checkbox"
                    className={
                      "rounded-full w-4 h-4 absolute -top-1 -right-1 " +
                      (answer.correct ? "bg-success" : "bg-error")
                    }
                    onChange={() => {
                        setAnswers((prevAnswers) =>
                            prevAnswers.map((prevAnswer) =>
                            prevAnswer.id === answer.id
                                ? { ...prevAnswer, correct: !prevAnswer.correct }
                                : prevAnswer
                            )
                        );
                        }}
                        
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
  const singleSet = useSelector((state: any) =>
    state.user.user.questionSets.find(
      (set: QuestionSet) => set._id === match.params.id
    )
  );

  return (
    <div className="flex flex-col place-items-center justify-center align-center w-full ">
      <div className="flex justify-between font-bold w-full p-2">
        <h1 className="py-1">{singleSet.name}</h1>
        <h1 className="py-1">Questions: {singleSet.questions.length}</h1>
      </div>
      <div className="px-2 flex flex-col justify-between w-full">
        <div className="flex flex-col gap-3">
          {singleSet.questions.map((question: Question) => {
            return <SingleQuestion key={question._id} question={question} />;
          })}
        </div>
        <NewQuestionForm />
      </div>
    </div>
  );
};
