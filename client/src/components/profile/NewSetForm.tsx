import { useState } from "react";
import { Button } from "../Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addQuestionSet } from "../../reducers/userReducer";

export const NewSetForm = () => {
    const [nameOfSet, setNameOfSet] = useState<string>('')
    const dispatch = useDispatch<AppDispatch>()
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(addQuestionSet(nameOfSet))
        setNameOfSet('')
    }
  return (
    <div className="flex flex-col place-content-center gap-2">
      <h1 className="place-self-center font-semibold">Create new set</h1>
      <form className="place-self-center flex gap-1 justify-center" onSubmit={handleSubmit}>
        <input
          type="nameOfSet"
          className="p-1 rounded-md shadow-sm"
          placeholder="Name of your set"
          value={nameOfSet}
          onChange={(e) => setNameOfSet(e.target.value)}
        />
        <div className="h-8 w-8">
          <Button type="submit" label="+" onclick={() => {}} />
        </div>
      </form>
    </div>
  );
};
