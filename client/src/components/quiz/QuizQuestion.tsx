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
      <div className="flex relative flex-col place-items-center gap-y-5 grow min-h-full">
          <h2 className="text-center font-semibold sm:text-xl my-2 sm:my-5 text-wrap max-w-3xl mx-auto">
            {question.question}
          </h2>

        <ul className="flex gap-5 flex-wrap justify-center items-stretch max-w-4xl mb-20">
          {question.answers.map((answer: AnswerType) => (
            <Answer key={answer.id} answer={answer} selected={selected} />
          ))}
        </ul>
        <div className="rounded-full py-2 px-4 text-sm absolute bottom-2 shadow-md bg-primary">
          {"Total Answers"}
          <span className="text-success">{question.repeats}</span>
        </div>
      </div>
    );
  };