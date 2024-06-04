import Quiz from "./components/quiz"
import Sidebar from "./components/sidebar"
import { Question } from "./types"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { initializeQuiz} from "./reducers/quizReducer"
import { AppDispatch } from "./store"
import { Route, Routes } from "react-router-dom"
import { LandingPage } from "./components/landing"
import Profile from "./components/profile"
import { createContext } from 'react'
import userService from "./services/userService"
import { Navbar } from "./components/Nav"


export const ThemeContext = createContext<boolean | null>(null)
const App = () => {
  const [darkMode, setDarkMode] = useState<boolean | null>(() => {
    const saved = JSON.parse(localStorage.getItem('darkMode') || 'null');
    return saved ?? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
  });

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(initializeQuiz())
  }, [dispatch])

  useEffect(() => {
    const token = window.localStorage.getItem('loggedUserToken')
    token && userService.setToken(token)
  }, [])

  const dummy = useSelector((state: { quiz: { questions: Question[] } }) => state.quiz.questions)
  return (
    <ThemeContext.Provider value={darkMode}>
    <div className={`w-full min-w-full overflow-x-hidden h-screen ` + (darkMode ? 'dark' : '')}>
      <Navbar setDarkMode={setDarkMode}/>
      <main className="flex h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quiz" element={
            <>
              <Quiz question={dummy[0]} />
              <Sidebar />
            </>
          } />
        </Routes>
        
      </main>
      </div>
      </ThemeContext.Provider>

  )
}

export default App