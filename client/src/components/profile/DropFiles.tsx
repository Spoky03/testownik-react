import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { createQuestion } from "@/reducers/userReducer";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { MdFileUpload as UploadIcon } from "react-icons/md";
import { useToast } from "../ui/use-toast";
interface QuestionFromFile {
  question: string;
  answers: {
    id: number;
    answer: string;
    correct: boolean;
  }[];
}
export const DropFiles = ({ setId }: { setId: string }) => {
  const { toast } = useToast();
  const [files, setFiles] = useState<FileList | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const toastCallback = (
    message: string,
    variant?: "success" | "destructive"
  ) => {
    toast({
      variant: variant,
      title:
        variant === "success"
          ? "Success"
          : "There was a problem with your request.",
      description: message,
      // action: <ToastAction altText="Try again">Try again</ToastAction>,
    });
  };
  const readFile = (file: File): Promise<QuestionFromFile> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text !== "string") {
          reject("Invalid file format (not a text file)");
          return;
        }
        const lines = text.split("\n");
        const correct = lines.shift();
        if (!correct || correct[0] !== "X") {
          reject("Invalid file format (no string matching format X0000...)");
          return;
        }
        const question = lines.shift();
        if (!question) {
          reject("Invalid file format (no question)");
          return;
        }
        const answers = lines.map((line, index) => ({
          id: index,
          answer: line.trim(),
          correct: correct.charAt(index + 1) === "1",
        }));
        resolve({
          question: question,
          answers: answers,
        });
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files) {
      toastCallback("No files selected", "destructive");
      return;
    }
    try {
      // Convert FileList to Array using Array.from()
      const questions = await Promise.all(
        Array.from(files).map((file) => readFile(file))
      );
      dispatch(createQuestion(questions, setId));
      toastCallback("Questions added successfully", "success");
    } catch (error) {
      toastCallback(error as string, "destructive");
    } finally {
      setFiles(null);
    }
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
            className="border p-1 rounded-md bg-secondary shadow-md hover:scale-95"
          >
            <UploadIcon size={24} />
          </button>
        </div>
      </form>
    </div>
  );
};
