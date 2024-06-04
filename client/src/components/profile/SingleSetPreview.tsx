import { useSelector } from "react-redux"
import { useMatch } from "react-router-dom"
export const SingleSetPreview = () => {
    const match = useMatch('/profile/sets/:id')
    const singleSet = useSelector((state: any) => state.user.user.questionSets.find((set: any) => set._id === match.params.id))

    return (
        <div className="flex flex-col place-items-center justify-center align-center w-full ">
            <div className="flex justify-between font-bold w-full p-2">
                <h1 className="py-1">{singleSet.name}</h1>
                <h1 className="py-1">Questions: {singleSet.questions.length}</h1>
            </div>
            <div className="px-2 flex flex-col justify-between w-full">
            <div className="flex flex-col gap-3">
                {singleSet.questions.map((question: any) => {
                    return (
                        <div key={question._id} className="bg-w-ternary dark:bg-ternary rounded-md px-2 py-1 flex justify-between flex-col">
                            <h1 className="p-2">{question.question}</h1>
                            <hr />
                            <div className="grid grid-cols-2 gap-2 p-2">
                                {question.answers.map((answer: any) => {
                                    return (
                                        <div key={answer._id} className={"flex p-1 justify-between border-2 rounded-md bg-w-secondary dark:bg-secondary " + (answer.correct ? 'border-success' : 'border-error')}>
                                            <h1>{answer.answer}</h1>
                                        </div>
                                    )
                                }
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
    )
}