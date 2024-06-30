import QuizContainer  from "./components/quiz";
import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "./store";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { LandingPage } from "./components/landing";
import Profile from "./components/profile";
import { createContext } from "react";
import { Navbar } from "./components/Nav";
import { fetchAllUserData, reLoginUser } from "./reducers/userReducer";
import BrowserContainer from "./components/browser";
import { Toaster } from "./components/ui/toaster";
import { Login } from "./components/profile/Login";
import { checkIfTokenIsValid } from "./lib/utils";
import constants from "./constants";
import { Register } from "./components/profile/Register";

export const ThemeContext = createContext<boolean | null>(null);

const AuthenticatedRoute = () => {
  const user = useSelector((state: RootState) => state.user.user); // Assuming state.user.user is null or undefined when not logged in
  const isLoggedIn = !!user.sub && !!user.username && !!user.exp && checkIfTokenIsValid(user.exp);
  const reason = !checkIfTokenIsValid(user.exp) ? constants.LABELS.LOGIN.EXPIRED : constants.LABELS.LOGIN.LOGOUT;
  const origin = window.location.pathname;
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" state={{ origin: origin, reason: reason }} replace />;
};
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
      dispatch(fetchAllUserData())
    }
  }, [dispatch]);

  return (
    <ThemeContext.Provider value={darkMode}>
      <main className={`w-full min-w-full h-screen overflow-x-hidden ${darkMode ? "dark" : ""}`}>
        <Navbar setDarkMode={setDarkMode} />
        <div className="pt-10 min-h-max">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route element={<AuthenticatedRoute />}>
              <Route path="profile/*" element={<Profile />} />
              <Route path="dashboard/*" element={<QuizContainer />} />
            </Route>
            {/* Add more protected routes inside the AuthenticatedRoute */}
            <Route path="browser/*" element={<BrowserContainer />} />

          </Routes>
        </div>
      </main>
      <Toaster />
    </ThemeContext.Provider>
  );
};

export default App;
