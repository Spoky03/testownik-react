import { QuestionSet, RootState } from "../../types";
import { useEffect } from "react";
import Sidebar from "./sidebar";
import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
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
import { Separator } from "../ui/separator";
import { Explanation } from "./Explanation";
import { QuizQuestion } from "./QuizQuestion";

const Quiz = () => {
  const dispatch = useDispatch<AppDispatch>();
  const match = useMatch("/quiz/:id");
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
    <div>
      <ResizablePanelGroup direction="horizontal" >
        <ResizablePanel className="min-w-60 bg-ternary">
          <QuizQuestion />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={28}
          className="min-w-32 sm:min-w-40 md:min-w-44 bg-primary"
        >
          <Sidebar />
        </ResizablePanel>
      </ResizablePanelGroup>
      <Separator />
      <Explanation/>
    </div>
  );
};
export default Quiz;
