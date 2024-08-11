import { FaCheck as CheckIcon } from "react-icons/fa6";
import { MdOutlineArrowBackIosNew as ArrowIcon } from "react-icons/md";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  resetExplanation,
  resetQuiz,
  saveQuizProgress,
  submitAnswersAction,
} from "../../reducers/quizReducer";
import { RootState } from "../../types";
import { useEffect, useState } from "react";
import { MdOutlineSave as SaveIcon } from "react-icons/md";
import { MdSettings as SettingsIcon } from "react-icons/md";
import { Modal } from "@/components/shared/Modal";
import { Settings } from "./Settings";
import { useNavigate } from "react-router-dom";
import { Finished } from "./Finished";
import constants from "@/constants";
import { useToast } from "../ui/use-toast";
import userService from "@/services/userService";
import { ExplanationButton } from "./ExplanationButton";
export const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openSettings, setOpenSettings] = useState(false);
  const [openFinished, setOpenFinished] = useState(false);
  const { questions, state, sidebar, finished, setId, active } = useSelector(
    (state: RootState) => state.quiz
  );
  const [timer, setTimer] = useState<number>(sidebar.time);
  useEffect(() => {
    // Only start the timer if sidebar.time has been initialized
    setTimer(sidebar.time);
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [sidebar.time]);
  useEffect(() => {
    if (finished) {
      const questionsToSave = questions.map((question) => {
        return {
          id: question._id,
          repeats: question.repeats,
        } as { id: string; repeats: number };
      });
      setOpenFinished(true);
      dispatch(saveQuizProgress(questionsToSave, timer));
      userService.saveFinishedSet(setId);
      dispatch(resetQuiz());
    }
  }, [dispatch, finished, navigate, questions, setId, timer]);
  const handleSubmit = () => {
    dispatch(submitAnswersAction());
    dispatch(resetExplanation());
  };
  const handleSave = () => {
    const questionsToSave = questions.map((question) => {
      return {
        id: question._id,
        repeats: question.repeats,
      } as { id: string; repeats: number };
    });
    dispatch(saveQuizProgress(questionsToSave, timer));
    toast({
      variant: "success",
      title: "Progress saved",
      description: "Your progress has been saved successfully",
    });
  };
  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return (
    <>
      <Finished open={openFinished} setOpen={setOpenFinished} />
      <Modal
        open={openSettings}
        setOpen={setOpenSettings}
        content={<Settings />}
      />
      <aside className="bg-primary min-w-32 flex flex-col place-items-center h-full gap-2 sm:gap-5 text-center">
        <div className="flex flex-col justify-evenly h-full p-0 sm:p-3">
          <section className="flex flex-col">
            <h2 className="text-sm mb-2">
              {constants.LABELS.SIDEBAR.TOTAL_ANSWERS}
            </h2>
            <div className="w-full flex max-w-64 rounded-full h-1.5 bg-faint">
              <div
                className="bg-success h-1.5 rounded-l-full transition-all"
                style={{
                  width: `${
                    (sidebar.correctAnswers /
                      (sidebar.correctAnswers + sidebar.incorrectAnswers)) *
                    100
                  }%`,
                }}
              ></div>
              <div
                className="bg-error h-1.5 rounded-r-full transition-all"
                style={{
                  width: `${
                    (sidebar.incorrectAnswers /
                      (sidebar.correctAnswers + sidebar.incorrectAnswers)) *
                    100
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
            <h2 className="text-sm mb-2">
              {constants.LABELS.SIDEBAR.MASTERED_ANSWERS}
            </h2>
            <div className="w-full max-w-64 rounded-full h-1.5 bg-faint">
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
            {constants.LABELS.SIDEBAR.TOTAL_QUESTIONS}
            <span className="text-3xl text-success">
              {sidebar.totalQuestions}
            </span>
          </p>
          <p className="flex flex-col text-sm">
            {constants.LABELS.SIDEBAR.TOTAL_TIME}
            <span className="text-2xl sm:text-3xl text-success">{formattedTime}</span>
          </p>
          <button
            onClick={handleSubmit}
            className="w-16 h-16 rounded-full bg-success shadow-xl hover:scale-95 transition-all place-self-center"
          >
            <div className="transition-all duration-500 ease-in-out">
              {state === "waiting" ? (
                <CheckIcon className="text-white w-6 h-6 m-auto transition-all duration-500 ease-in-out" />
              ) : (
                <ArrowIcon className="text-white w-6 h-6 m-auto rotate-180 transition-all duration-500 ease-in-out" />
              )}
            </div>
          </button>
        </div>
        <ExplanationButton state={state} active={active} />
        <div className="flex flex-row justify-evenly h-full gap-5">
          <button onClick={handleSave}>
            <SaveIcon size={24} />
          </button>
          <button onClick={() => setOpenSettings(true)}>
            <SettingsIcon size={24} />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
