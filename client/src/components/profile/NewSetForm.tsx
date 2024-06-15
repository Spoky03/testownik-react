import { useState } from "react";
import { Button } from "../Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addQuestionSet } from "../../reducers/userReducer";
import { MdAdd } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Question } from "@/types";

export const NewSetForm = () => {
  const [nameOfSet, setNameOfSet] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  /*
  X0010 (marks which question is correct in this case its third because 0,0,1,0)
  1. Question
  answer1
  answer2
  answer3
  answer4
  */
  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      const lines = text?.toString().split("\n");
      const correct = lines?.shift();
      const question = lines?.shift();
      const answers = lines?.map((line, index) => {
        const answer = line
        return {
          id: index,
          answer: answer.trim(),
          correct: correct?.charAt(index+1) === "1",
        };
      });
      console.log({ question, answers });
    };
    reader.readAsText(file);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addQuestionSet(nameOfSet));
    setNameOfSet("");
    if (files) {
      for (let i = 0; i < files.length; i++) {
        readFile(files[i]);
      }
    }
    console.log(questions);
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
        <div className="grid max-w-sm items-center gap-1.5 dark:text-white place-self-center w-64">
          <Label htmlFor="picture" className="place-self-center">
            optionally add txt's
          </Label>
          <Input
            id="picture"
            type="file"
            accept=".txt"
            className="place-self-center"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>
      </form>
    </div>
  );
};
