import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "./store";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./components/landing";
import Profile from "./components/profile";
import { Navbar } from "./components/nav/Nav";
import { fetchAllUserData, reLoginUser } from "./reducers/userReducer";
import BrowserContainer from "./components/browser";
import { Toaster } from "./components/ui/toaster";
import { Login } from "./components/profile/Login";
import { Register } from "./components/profile/Register";
import { useTheme } from "./lib/theme";
import { Footer } from "./components/shared/Footer";
import { AuthenticatedRoute } from "./components/shared/AuthenticatedRoute";
import { RouteNotFound } from "./components/shared/RouteNotFound";
import ScrollToTop from "./components/shared/ScrollToTop";
import { AdminPanel } from "./components/admin";
import Quiz from "./components/quiz/Quiz";
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const setTheme = useTheme();
  const theme = useSelector((state: RootState) => state.theme.theme);
  // theming
  useEffect(() => {
    setTheme(theme);
    const monospace = localStorage.getItem("monospace");
    if (monospace) {
      document.body.classList.add("monospace");
    }
  }, [setTheme, theme]);
  // relogin user
  useEffect(() => {
    async function fetchData() {
      const token = window.localStorage.getItem("loggedUserToken");
      if (token) {
        const reLogin = await dispatch(reLoginUser(token));
        reLogin && dispatch(fetchAllUserData());
      }
    }
    fetchData();
  }
  , [dispatch]);

  return (
    <>
      <main className={`w-full bg-ternary text-text min-h-screen`}>
        <Navbar />
        <div className="min-h-screen w-full">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<AuthenticatedRoute />}>
              <Route path="profile/*" element={<Profile />} />
              <Route path="admin/*" element={<AdminPanel />} />
              <Route path="quiz/:id" element={<Quiz />} />
            </Route>
            <Route path="browser/*" element={<BrowserContainer />} />
            <Route path="/*" element={<RouteNotFound />} />
          </Routes>
        </div>
        <Footer />
      </main>
      <Toaster />
    </>
  );
};

export default App;
