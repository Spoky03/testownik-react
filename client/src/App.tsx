import QuizContainer  from "./components/quiz";
import { Question } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { initializeQuiz } from "./reducers/quizReducer";
import { AppDispatch } from "./store";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./components/landing";
import Profile from "./components/profile";
import { createContext } from "react";
import userService from "./services/userService";
import { Navbar } from "./components/Nav";
import { SingleSetPreview } from "./components/profile/SingleSetPreview";
import { reLoginUser } from "./reducers/userReducer";
import { Sidebar } from "./components/quiz/sidebar";

export const ThemeContext = createContext<boolean | null>(null);
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [darkMode, setDarkMode] = useState<boolean | null>(() => {
    const saved = JSON.parse(localStorage.getItem("darkMode") || "null");
    return (
      saved ??
      (window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });
  useEffect(() => {
    const token = window.localStorage.getItem("loggedUserToken");
    if (token) {
      dispatch(reLoginUser(token));
    }
  }, [dispatch]);

  return (
    <ThemeContext.Provider value={darkMode}>
      <div
        className={
          `w-full min-w-full overflow-x-hidden h-screen ` +
          (darkMode ? "dark" : "")
        }
      >
        <Navbar setDarkMode={setDarkMode} />
        <main className="flex h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="profile/*" element={<Profile />} />
            <Route path="quiz/*" element={<QuizContainer />} />
          </Routes>
        </main>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
