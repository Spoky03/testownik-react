import { Answer } from './Answer';
import { Question } from '../../types';
import { useState } from 'react';
import Sidebar from './sidebar';
import { useMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
const QuizQuestion = ({ question } : { question: Question }) => {
    const [selected, setSelected] = useState<number[] | null>(null);
    const handleSelect = (id: number) => {
        setSelected(prev => {
            if (!prev) {
                return [id];
            }
            if (prev.includes(id)) {
                return prev.filter(i => i !== id);
            }
            return [...prev, id];
        });
        console.log(selected);
    }
    if (!question) {
        return (
            <h2 className='text-center w-2/3 font-semibold text-xl'>Loading...</h2>
        )
    }
    return (
        <div className='flex place-center flex-col  place-items-center gap-5 w-2/3 px-10'>
            <div className='container h-16 justify-content-center p-5'>
                <h2 className='text-center font-semibold text-xl'>{question.question}</h2>
            </div>
            <ul className='flex gap-5 w-full flex-wrap justify-center container max-w-4xl'>
                {question.answers.map(answer => (
                    <Answer key={answer.id} answer={answer} selected={selected} handleSelect={handleSelect} />
                ))}
            </ul>
        </div>
    )
}
const Quiz = () => {
    const match = useMatch('/quiz/:id');
    const id = match?.params.id;
    const activeSet = useSelector((state: any) => state.user?.user?.questionSets?.find((set: any) => set._id === id));
    console.log(activeSet);
    const question = activeSet?.questions[0] 
    return (
        <div className='flex h-screen'>
            {activeSet && <QuizQuestion question={question} />}
            <Sidebar />
        </div>
    )
}
export default Quiz