import { useState } from "react";
import { Button } from "../Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addQuestionSet} from "../../reducers/userReducer";
import { MdAdd } from "react-icons/md";

export const NewSetForm = () => {
  const [nameOfSet, setNameOfSet] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  /*
  X0010 (marks which question is correct in this case its third because 0,0,1,0)
  1. Question
  answer1
  answer2
  answer3
  answer4
  */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addQuestionSet(nameOfSet));
    setNameOfSet("");
  };
  return (
    <div className="flex flex-col place-content-center gap-2">
      <h1 className="place-self-center font-semibold">Create new set</h1>
      <form
        className="place-self-center flex gap-1 justify-center flex-col"
        onSubmit={handleSubmit}
      >
        <div className="flex place-self-center">
          <input
            type="nameOfSet"
            id="nameOfSet"
            className="p-1 rounded-md shadow-sm dark:text-black"
            placeholder="Name of your set"
            value={nameOfSet}
            onChange={(e) => setNameOfSet(e.target.value)}
          />
          <div className="h-8 w-8 ml-1">
            <Button
              type="submit"
              label={<MdAdd size={24} />}
              onClick={() => {}}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
