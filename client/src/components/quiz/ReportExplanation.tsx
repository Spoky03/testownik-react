import { useToast } from "../ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import userService from "@/services/userService";
import { useSelector } from "react-redux";
import { RootState } from "@/types";
const EnumValues = ["Inappropriate", "Invalid", "Other"] as const;
const FormSchema = z.object({
  explanation: z.string().min(2).max(1024),
  reason: z.enum(EnumValues),
});
export const ReportExplanation = () => {
  const { toast } = useToast();
  const question = useSelector((state : RootState) => state.quiz.active);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reason: "Inappropriate",
      explanation: "",
    },
  });
  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    try {
      await userService.reportExplanation({
        explanation: data.explanation,
        reason: data.reason,
        questionId: question?._id || "",
      });
      toast({
        variant: "success",
        title: "Explanation reported successfully!",
        description: "Thank you for your feedback.",
      });
      form.reset();
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "There was a problem with your request."
      });
    }
  };
  return (
    <div className="flex flex-col items-center border bg-ternary p-5 space-y-4">
      <h3 className="text-lg font-semibold text-error">
        Report invalid or inappropriate explanation
      </h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-2 w-full place-items-center space-y-2"
        >
          <FormField control={form.control} name="reason"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full items-start rounded-md plac-eself-center relative">
                <FormLabel
                  htmlFor="reason"
                  className="text-sm font-semibold"
                >
                  Reason
                </FormLabel>
                <FormControl>
                  <select {...field} className="w-full">
                    {EnumValues.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full items-start rounded-md plac-eself-center relative">
                <FormLabel
                  htmlFor="explanation"
                  className="text-sm font-semibold"
                >
                  Explanation
                </FormLabel>
                <FormControl>
                  <textarea {...field} className="w-full h-32 rounded-md" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
