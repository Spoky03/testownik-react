import QuizContainer from "./components/quiz";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "./store";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { LandingPage } from "./components/landing";
import Profile from "./components/profile";
import { Navbar } from "./components/Nav";
import { fetchAllUserData, reLoginUser } from "./reducers/userReducer";
import BrowserContainer from "./components/browser";
import { Toaster } from "./components/ui/toaster";
import { Login } from "./components/profile/Login";
import { checkIfTokenIsValid } from "./lib/utils";
import constants from "./constants";
import { Register } from "./components/profile/Register";
import { useTheme } from "./lib/theme";
import { Footer } from "./components/Footer";
const AuthenticatedRoute = () => {
  const user = useSelector((state: RootState) => state.user.user); // Assuming state.user.user is null or undefined when not logged in
  const isLoggedIn =
    !!user.sub &&
    !!user.username &&
    !!user.exp &&
    checkIfTokenIsValid(user.exp);
  const reason = !checkIfTokenIsValid(user.exp)
    ? constants.LABELS.LOGIN.EXPIRED
    : constants.LABELS.LOGIN.LOGOUT;
  const origin = window.location.pathname;
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ origin: origin, reason: reason }} replace />
  );
};
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const setTheme = useTheme();
  const theme = useSelector((state: RootState) => state.theme.theme);
  useEffect(() => {
    const token = window.localStorage.getItem("loggedUserToken");
    if (token) {
      dispatch(reLoginUser(token));
      dispatch(fetchAllUserData());
    }
  }, [dispatch]);

  useEffect(() => {
    setTheme(theme);
    console.log("theme", theme);
    const monospace = localStorage.getItem("monospace");
    if (monospace) {
      document.body.classList.add("monospace");
    }
  }, [setTheme, theme]);
  return (
    <>
      <main
        className={`w-full bg-ternary text-text h-screen`}
      >
        <Navbar />
        <div className="pt-10 min-h-screen w-full">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<AuthenticatedRoute />}>
              <Route path="profile/*" element={<Profile />} />
              <Route path="dashboard/*" element={<QuizContainer />} />
            </Route>
            {/* Add more protected routes inside the AuthenticatedRoute */}
            <Route path="browser/*" element={<BrowserContainer />} />
          </Routes>
        </div>
        <Footer />
      </main>
      <Toaster />
    </>
  );
};

export default App;
