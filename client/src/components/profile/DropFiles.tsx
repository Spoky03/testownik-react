import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { createQuestion } from "@/reducers/userReducer";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { MdFileUpload as UploadIcon } from "react-icons/md";
interface QuestionFromFile {
  question: string;
  answers: {
    id: number;
    answer: string;
    correct: boolean;
  }[];
}
export const DropFiles = ({setId}:{setId:string}) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [questions, setQuestions] = useState<QuestionFromFile[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text !== "string") return;
      if (!text.includes("X")) return;
      const lines = text?.toString().split("\n");
      if (!lines) return;
      const correct = lines.shift() as string;
      const question = lines.shift() as string;
      const answers = lines.map((line, index) => {
        const answer = line;
        return {
          id: index,
          answer: answer.trim(),
          correct: correct.charAt(index + 1) === "1",
        };
      });
      const questionObject = {
        question: question,
        answers: answers,
      };
      // Use a functional update to ensure you're working with the most current state
      setQuestions((currentQuestions) => [...currentQuestions, questionObject]);
    };
    reader.readAsText(file);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (files) {
      for (let i = 0; i < files.length; i++) {
        readFile(files[i]);
      }
    }
    console.log(questions);
    dispatch(createQuestion(questions, setId));
  };

  return (
    <div className="grid max-w-sm items-center gap-1.5 dark:text-white place-self-center w-64">
      <form>
        <Label htmlFor="picture" className="place-self-center">
          Drop files to add questions
        </Label>
        <div className="flex gap-2 w-full place-items-center">
        <Input
          id="picture"
          type="file"
          accept=".txt"
          className=""
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="border p-1 rounded-md bg-w-secondary dark:bg-secondary shadow-md hover:scale-95"
        >
          <UploadIcon size={24} />
        </button>
        </div>
      </form>
    </div>
  );
};
