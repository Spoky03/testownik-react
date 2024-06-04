import { Answer as AnswerType } from "../../types";
import { FaCheck as CheckIcon } from "react-icons/fa6";
export const Answer = ({answer, selected, handleSelect} : {answer: AnswerType, selected: number[] | null, handleSelect: (id: number) => void}) => {

    return (
        <>
        <button className={`bg-w-secondary dark:bg-secondary relative p-5 text-center rounded-sm dark:shadow-sm shadow-lg hover:scale-95 transition-all duration-300 ease-in-out w-72 grow border-2 ` + (
            (selected && selected.includes(answer.id)) ? 'border-faint' : 'dark:border-secondary border-w-secondary')}
            onClick={() => handleSelect(answer.id)}
            >{answer.answer}
            <span className={`transition-opacity scale-105 duration-300 absolute right-0 top-0 h-6 w-6 bg-faint ` + ((selected && selected.includes(answer.id)) ? 'opacity-100' : 'opacity-0')}></span>
            <span className="absolute right-2 top-2 dark:bg-secondary bg-w-secondary h-8 w-8 rotate-45"></span>
            <CheckIcon className="absolute right-0 w-3 h-4 top-0 dark:text-secondary text-white"/>
        </button>
        </>
    )
}