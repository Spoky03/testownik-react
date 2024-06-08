import Quiz from './Quiz';
import { Question } from '../../types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useMatch } from 'react-router-dom';
import { initializeQuiz } from '../../reducers/quizReducer';
import { AppDispatch } from '../../store';
import { fetchQuestionSets } from '../../reducers/userReducer';
import { SetList } from './SetList';
//TOTALY BROKEN
const QuizContainer = () => {
    // const dispatch = useDispatch<AppDispatch>();
    // useEffect(() => {
    //     dispatch(initializeQuiz());
    //   }, [dispatch]);
    // const [question, setQuestion] = useState<Question | null>(null);
    // const questions = useSelector((state: { quiz: { questions: Question[] } }) => state.quiz.questions);
    // const match = useMatch('/quiz/:id');
    // const id = match?.params.id;
    // console.log(id);

    // useEffect(() => {
    //     if (questions && questions.length > 0 && id) {
    //         const question = questions.find(question => question._id === id)
    //         setQuestion(question);
    //     }
    // }, [questions]);
    // if (!question) {
    //     return (
    //         <h2 className='text-center w-2/3 font-semibold text-xl'>Loading...</h2>
    //     )
    // }
    //if questionssets is not in redux state, fetch it from the server
    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector((state: any) => state.user.token);
    useEffect(() => {
        dispatch(fetchQuestionSets());
    }, [dispatch, token]);
    if (!token) {
        return <h1>Not logged in</h1>
    }
    return (
        <div className='flex h-screen'>
            <Routes>
                <Route path="/" element={<SetList />} />
                <Route path="/:id" element={<Quiz/>} />
            </Routes>
        </div>
    );
}

export default QuizContainer