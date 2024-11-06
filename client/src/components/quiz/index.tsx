import { useLocation } from "react-router-dom";
import { SetList } from "../profile/dashboard/SetList";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProgress } from "@/reducers/userReducer";
const QuizContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/profile/dashboard") {
      dispatch(getProgress());
    }
  }, [dispatch, location.pathname]);
  return (
    <SetList />
  );
};

export default QuizContainer;
