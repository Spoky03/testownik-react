import { Answer } from "./Answer";
import { Answer as AnswerType, QuestionSet, RootState } from "../../types";
import { useEffect } from "react";
import Sidebar from "./sidebar";
import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { initializeQuiz, resetQuiz } from "../../reducers/quizReducer";
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
      dispatch(resetQuiz());
      navigate("/");
    }
  }, [finished, navigate]);
  if (!question) {
    return <h2 className="text-center font-semibold text-xl">Loading...</h2>;
  }

  return (
    <div className="flex place-center flex-col  place-items-center gap-5 w-2/3 px-10">
      <div className="container h-16 justify-content-center p-5">
        <h2 className="text-center font-semibold text-xl">
          {question.question}
        </h2>
      </div>
      <ul className="flex gap-5 w-full flex-wrap justify-center container max-w-4xl">
        {question.answers.map((answer: AnswerType) => (
          <Answer key={answer.id} answer={answer} selected={selected} />
        ))}
      </ul>
      <div className="rounded-full p-2 px-4 text-sm absolute bottom-5 shadow-md bg-w-primary dark:bg-primary">
        Ponowne wystąpienia:{" "}
        <span className="text-success">{question.repets}</span>
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

  useEffect(() => {
    if (activeSet) {
      dispatch(initializeQuiz(activeSet));
    }
  });
  return (
    <div className="flex h-screen w-full">
      {activeSet ? <QuizQuestion /> : <h1>Not found</h1>}
      <Sidebar />
    </div>
  );
};
export default Quiz;
