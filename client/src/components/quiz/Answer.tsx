export const Answer = ({answer} : {answer: string}) => {

    return (
        <button className="bg-secondary p-5 text-center rounded-sm shadow-sm hover:scale-95 transition-all ease-in-out w-72 grow">
            {answer}
        </button>
    )
}