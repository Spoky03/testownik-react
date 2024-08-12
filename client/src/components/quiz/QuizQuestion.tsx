import { Answer } from "./Answer";
import { Answer as AnswerType, RootState } from "../../types";
import { useSelector } from "react-redux";

export const QuizQuestion = () => {
    const { selected, active: question } = useSelector(
      (state: RootState) => state.quiz
    );
    if (!question) {
      return (
        <h2 className="text-center font-semibold text-xl place-self-center">
          Loading...
        </h2>
      );
    }
    return (
      <div className="flex relative flex-col place-items-center sm:mt-10 gap-y-5 grow h-full">
        <div className="container justify-content-center py-5">
          <h2 className="text-center font-semibold sm:text-xl text-wrap">
            {question.question}
          </h2>
        </div>
        <ul className="flex gap-5 flex-wrap justify-center container max-w-2xl">
          {question.answers.map((answer: AnswerType) => (
            <Answer key={answer.id} answer={answer} selected={selected} />
          ))}
        </ul>
        <div className="rounded-full py-2 px-4 text-sm absolute bottom-20 shadow-md bg-primary">
          {"Total Answers"}
          <span className="text-success">{question.repeats}</span>
        </div>
      </div>
    );
  };