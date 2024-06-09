import { FaCheck as CheckIcon } from "react-icons/fa6";
import { MdOutlineArrowBackIosNew as ArrowIcon } from "react-icons/md";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { submitAnswersAction } from "../../reducers/quizReducer";
import { RootState } from "../../types";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selected, state, sidebar } = useSelector(
    (state: RootState) => state.quiz
  );
  const [timer, setTimer] = useState<number>(0);
  useEffect(() => {
    // Start the timer when the component mounts
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    // Clear the timer when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  const handleSubmit = () => {
    dispatch(submitAnswersAction());
  };

  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return (
    <aside className="dark:bg-primary bg-w-primary w-1/3 flex flex-col place-items-center p-5 gap-5 relative text-center">
      <div className="flex flex-col justify-evenly h-full p-3">
      <section className="flex flex-col">
          <h2 className="text-sm mb-2">Udzielone odpowiedzi</h2>
          <div className="w-full flex max-w-64 rounded-full h-1.5 bg-w-faint dark:bg-faint">
            <div
              className="bg-success h-1.5 rounded-l-full transition-all"
              style={{
                width: `${
                  (sidebar.correctAnswers / (sidebar.correctAnswers + sidebar.incorrectAnswers)) * 100
                }%`,
              }}
            ></div>
            <div
              className="bg-error h-1.5 rounded-r-full transition-all"
              style={{
                width: `${
                  (sidebar.incorrectAnswers / (sidebar.correctAnswers + sidebar.incorrectAnswers)) * 100
                }%`,
              }}
            ></div>
          </div>{" "}
          <div className="flex justify-between m-1 text-sm">
            <p>{sidebar.correctAnswers}</p>
            <p>{sidebar.incorrectAnswers}</p>
          </div>
        </section>

        <section className="flex flex-col">
          <h2 className="text-sm mb-2">Opanowane pytania</h2>
          <div className="w-full max-w-64 rounded-full h-1.5 bg-w-faint dark:bg-faint">
            <div
              className="bg-success h-1.5 rounded-full transition-all"
              style={{
                width: `${
                  (sidebar.masteredQuestions / sidebar.totalQuestions) * 100
                }%`,
              }}
            ></div>
          </div>{" "}
          <div className="flex justify-between m-1 text-sm">
            <p>{sidebar.masteredQuestions}</p>
            <p>{sidebar.totalQuestions - sidebar.masteredQuestions}</p>
          </div>
        </section>
      </div>
      <div className="flex flex-col justify-evenly h-full">
        <p className="flex flex-col text-sm">
          Liczba pytań{" "}
          <span className="text-3xl text-success">
            {sidebar.totalQuestions}
          </span>
        </p>
        <p className="flex flex-col text-sm">
          Czas nauki{" "}
          <span className="text-3xl text-success">{formattedTime}</span>
        </p>
      </div>
      <div className="flex flex-row justify-evenly h-full">
        <p>a </p>
        <p>b </p>
      </div>
      <button
        onClick={handleSubmit}
        className="w-16 h-16 rounded-full bg-success absolute top-1/2 -left-8 shadow-xl hover:scale-95 transition-all"
      >
        <div className="transition-all duration-500 ease-in-out">
          {state === "waiting" ? (
            <CheckIcon className="text-white w-6 h-6 m-auto transition-all duration-500 ease-in-out" />
          ) : (
            <ArrowIcon className="text-white w-6 h-6 m-auto rotate-180 transition-all duration-500 ease-in-out" />
          )}
        </div>
      </button>
    </aside>
  );
};

export default Sidebar;
