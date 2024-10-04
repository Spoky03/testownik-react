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
const FormSchema = z.object({
  text: z.string().min(2).max(1024),
});
export const ReportExplanation = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { toast } = useToast();
  const [effect, setEffect] = useState<boolean>(false);
  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    setEffect(true);
    try {
      // await dispatch(reportExplanation(data.text));
      toast({
        variant: "success",
        title: "Explanation reported successfully!",
        description: "Thank you for your feedback.",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "There was a problem with your request.",
        description: error.response.data.message,
      });
    }
    setEffect(false);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex gap-2 w-fit"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full items-start rounded-md plac-eself-center relative">
              <FormLabel
                htmlFor="text"
                className="text-sm font-semibold text-gray-500"
              >
                Explanation
              </FormLabel>
              <FormControl
                {...field}
                as={Input}
                id="text"
                placeholder="Enter your explanation here"
                className="w-full"
              />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-primary text-white"
          disabled={effect}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
