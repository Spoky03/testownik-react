import constants from "./constants"
import Quiz from "./components/quiz"
import Sidebar from "./components/sidebar"
import { Question } from "./types"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { initializeQuiz } from "./reducers/quizReducer"
import { AppDispatch } from "./store"

const App = () => {

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(initializeQuiz())
  }, [dispatch])

  const dummy = useSelector((state: Question[]) => state.quiz)
  
  return (
    <div className="w-full min-w-full overflow-x-hidden dark h-screen">
      <header>
        <h1 className="text-2xl text-center bg-primary">{constants.APP_NAME}</h1>
      </header>
      <main className="flex">
        <Quiz question={dummy[0]} />
        <Sidebar />
      </main>
      </div>

  )
}

export default App
