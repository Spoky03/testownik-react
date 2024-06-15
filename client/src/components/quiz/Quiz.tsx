import { Answer } from "./Answer";
import { Answer as AnswerType, QuestionSet, RootState } from "../../types";
import { useEffect } from "react";
import Sidebar from "./sidebar";
import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  initializeQuiz,
  resetQuiz,
  saveQuizProgress,
  setQuizSetId,
} from "../../reducers/quizReducer";
import { useNavigate } from "react-router-dom";

const QuizQuestion = () => {
  const {
    selected,
    active: question,
    finished,
  } = useSelector((state: RootState) => state.quiz);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (finished) {
      dispatch(saveQuizProgress())
      dispatch(resetQuiz());
      navigate("/");
    }
  }, [finished, navigate]);
  if (!question) {
    return <h2 className="text-center font-semibold text-xl">Loading...</h2>;
  }

  return (
    <div className="flex place-center flex-col place-items-center p-4 gap-y-5 grow">
      <div className="container h-16 justify-content-center py-5">
        <h2 className="text-center font-semibold text-xl">
          {question.question}
        </h2>
      </div>
      <ul className="flex gap-5 flex-wrap justify-center container max-w-2xl">
        {question.answers.map((answer: AnswerType) => (
          <Answer key={answer.id} answer={answer} selected={selected} />
        ))}
      </ul>
      <div className="rounded-full p-2 px-4 text-sm absolute bottom-5 shadow-md bg-w-primary dark:bg-primary">
        Ponowne wystąpienia:{" "}
        <span className="text-success">{question.repeats}</span>
      </div>
    </div>
  );
};
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
    <div className="flex h-screen w-full justify-end">
      {activeSet ? <QuizQuestion /> : <h1>Not found</h1>}
      <Sidebar />
    </div>
  );
};
export default Quiz;
