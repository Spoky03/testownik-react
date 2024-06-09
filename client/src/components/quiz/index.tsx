import Quiz from "./Quiz";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AppDispatch } from "../../store";
import { fetchQuestionSets } from "../../reducers/userReducer";
import { SetList } from "./SetList";
import { RootState } from "../../types";
//TOTALY BROKEN
const QuizContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.user.token);
  useEffect(() => {
    dispatch(fetchQuestionSets());
  }, [dispatch, token]);
  if (!token) {
    return <h1>Not logged in</h1>;
  }
  return (
    <Routes>
      <Route path="/" element={<SetList />} />
      <Route path="/:id" element={<Quiz />} />
    </Routes>
  );
};

export default QuizContainer;
