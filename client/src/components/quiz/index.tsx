import Quiz from "./Quiz";
import { Route, Routes } from "react-router-dom";
import { SetList } from "./SetList";
//TOTALY BROKEN
const QuizContainer = () => {
  return (
    <Routes>
      <Route path="/" element={<SetList />} />
      <Route path="/:id" element={<Quiz />} />
    </Routes>
  );
};

export default QuizContainer;
