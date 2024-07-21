import { Input } from "@/components/ui/input";
import { createQuestion } from "@/reducers/userReducer";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { MdFileUpload as UploadIcon } from "react-icons/md";
import { useToast } from "../ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
interface QuestionFromFile {
  question: string;
  answers: {
    id: number;
    answer: string;
    correct: boolean;
  }[];
}
const FormSchema = z.object({
  files: z
    .instanceof(FileList)
    .refine((file) => file?.length >= 1, 'File is required.')
});
export const DropFiles = ({ setId }: { setId: string }) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      files: undefined,
    },
  });
  const filesRef = form.register("files");
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
  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!data.files) {
      toastCallback("No files selected", "destructive");
      return;
    }
    try {
      // Convert FileList to Array using Array.from()
      const questions = await Promise.all(
        Array.from(data.files).map((file) => readFile(file))
      );
      dispatch(createQuestion(questions, setId));
      toastCallback("Questions added successfully", "success");
    } catch (error) {
      toastCallback(error as string, "destructive");
    } finally {
      form.reset();
    }
  };

  return (
    <div className="grid max-w-sm items-center gap-1.5 dark:text-white place-self-center w-64">
      <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex gap-2 "
          >
            <FormField
              control={form.control}
              name="files"
              render={() => (
                <FormItem className="flex flex-col w-full rounded-md">
                  <FormMessage className="text-xs opacity-75" />
                  <FormControl>
                    <Input {...filesRef} type="file" multiple />
                  </FormControl>
                </FormItem>
              )}
            />
              <Button type="submit" size={"icon"} className="place-self-end shrink-0" >
                <UploadIcon size={24} />
              </Button>
          </form>
        </Form>
    </div>
  );
};
