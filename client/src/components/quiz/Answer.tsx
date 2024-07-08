import { useDispatch, useSelector } from "react-redux";
import { Answer as AnswerType, RootState } from "../../types";
import { FaCheck as CheckIcon } from "react-icons/fa6";
import { AppDispatch } from "../../store";
import { addSelected } from "../../reducers/quizReducer";
export const Answer = ({
  answer,
  selected,
}: {
  answer: AnswerType;
  selected: number[] | null;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSelect = (id: number) => {
    dispatch(addSelected(id));
  };
  const state = useSelector((state: RootState) => state.quiz.state);
  const isIncluded = selected && selected.includes(answer.id as number);

  const blackTheme = document.body.getAttribute("data-theme") === "black";

  const color =
    state === "waiting"
      ? isIncluded
        ? "border-faint"
        : "border-secondary"
      : isIncluded
      ? answer.correct
        ? "border-success"
        : "border-error"
      : answer.correct
      ? "border-warning"
      : "border-secondary";

  const tickStyles =
    state === "waiting"
      ? isIncluded
        ? "opacity-100"
        : "opacity-0"
      : isIncluded
      ? answer.correct
        ? "bg-success"
        : "bg-error"
      : "opacity-0";
  return (
    <div className={`place-self-center hover:scale-95 transition-all ${blackTheme ? 'border border-faint' : ''}`}>
      {state === "waiting" ? (
        <button
          className={
            `bg-secondary relative p-5 text-center rounded-sm dark:shadow-sm shadow-lg  transition-all duration-300 ease-in-out w-52 sm:w-72 grow border-2 ` +
            color
          }
          onClick={() => handleSelect(answer.id as number)}
        >
          {answer.answer}
          <span
            className={
              `transition-opacity scale-105 duration-300 absolute right-0 top-0 h-6 w-6 bg-faint ` +
              tickStyles
            }
          ></span>
          <span className="absolute -z-10 right-2 top-2 bg-secondary h-8 w-8 rotate-45"></span>
          <CheckIcon className="absolute z-0 right-0 w-3 h-4 top-0 text-secondary" />
        </button>
      ) : (
        <div
          className={
            `bg-secondary relative p-5 text-center rounded-sm dark:shadow-sm shadow-lg  transition-all duration-300 ease-in-out w-52 sm:w-72  grow border-2 ` +
            color
          }
        >
          {answer.answer}
          <span
            className={
              `transition-opacity scale-105 duration-300 absolute right-0 top-0 h-6 w-6 ` +
              tickStyles
            }
          ></span>
          <span className="absolute right-2 top-2 bg-secondary h-8 w-8 rotate-45"></span>
          <CheckIcon className="absolute right-0 w-3 h-4 top-0 text-secondary " />
        </div>
      )}
    </div>
  );
};
