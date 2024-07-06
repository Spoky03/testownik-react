import { Answer } from "./Answer";
import { Answer as AnswerType, QuestionSet, RootState } from "../../types";
import { useEffect } from "react";
import Sidebar from "./sidebar";
import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import constants from "@/constants";
import {
  initializeQuiz,
  resetQuiz,
  setQuizSetId,
} from "../../reducers/quizReducer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const QuizQuestion = () => {
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
    <div className="flex place-center flex-col place-items-center p-4 gap-y-5 grow h-full">
      <div className="container justify-content-center py-5">
        <h2 className="text-center font-semibold text-xl text-wrap">
          {question.question}
        </h2>
      </div>
      <ul className="flex gap-5 flex-wrap justify-center container max-w-2xl">
        {question.answers.map((answer: AnswerType) => (
          <Answer key={answer.id} answer={answer} selected={selected} />
        ))}
      </ul>
      <div className="rounded-full p-2 px-4 text-sm absolute bottom-5 shadow-md bg-primary">
      {constants.LABELS.SIDEBAR.TOTAL_ANSWERS}{" "}
        <span className="text-success">{question.repeats}</span>
      </div>
    </div>
  );
};
const Quiz = () => {
  const dispatch = useDispatch<AppDispatch>();
  const match = useMatch("/dashboard/:id");
  const id = match?.params.id;
  const activeSet = useSelector((state: RootState) =>
    state.user?.user?.questionSets?.find((set: QuestionSet) => set._id === id)
  );
  const initReps = useSelector(
    (state: RootState) => state.quiz.preferences.initialRepetitions
  );
  const progress = useSelector((state: RootState) => state.user.progress);
  useEffect(() => {
    if (!activeSet) {
      return;
    }
    dispatch(resetQuiz());
    dispatch(initializeQuiz(activeSet, initReps, progress));
    dispatch(setQuizSetId(activeSet._id));
  }, [activeSet, dispatch, initReps, progress]);
  return (
      <ResizablePanelGroup direction="horizontal" className="-pb-10">
        <ResizablePanel className="min-w-56 h-screen">
          <QuizQuestion />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={28} className="min-w-32 sm:min-w-40 md:min-w-44">
          <Sidebar />
        </ResizablePanel>
      </ResizablePanelGroup>
  );
};
export default Quiz;
