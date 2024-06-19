import Quiz from "./Quiz";
import { Route, Routes, useLocation } from "react-router-dom";
import { SetList } from "./SetList";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProgress } from "@/reducers/userReducer";
//TOTALY BROKEN
const QuizContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      console.log("fetching progress");
      dispatch(getProgress());
    }
  }, [dispatch,location.pathname]);
  return (
    <Routes>
      <Route path="/" element={<SetList />} />
      <Route path="/:id" element={<Quiz />} />
    </Routes>
  );
};

export default QuizContainer;
