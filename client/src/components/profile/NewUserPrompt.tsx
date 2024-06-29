import { RootState } from "@/types";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { ShotThroughTitle } from "../ShotThroughTitile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "../ui/use-toast";
const FormSchema = z.object({
  terms: z.boolean().default(false).refine((v) => v === true, {
    message: "You must accept the terms and conditions",
  }),
  email: z.boolean().default(false).optional(),
});
export const UserSettings = () => {
  const toast = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      terms: false,
      email: false,
    },
  });

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  return (
    <div className="flex p-10 flex-col justify-center h-2/3">
      <div className="flex flex-col p-10 w-fit place-self-center rounded-xl shadow-2xl place-items-center bg-w-primary dark:bg-primary">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-6">
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                    Accept terms and conditions
                    </FormLabel>
                    <FormDescription>
                    (required){" "}
                     </FormDescription>
                  </div>
                </FormItem>
                
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                    Agree to recieve marketing emails
                    </FormLabel>
                    <FormDescription>
                    (optional){" "}
                    </FormDescription>
                    <FormDescription>
                    We won't sell your data
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="place-self-end">Submit</Button>
          </form>
        </Form>
        <ShotThroughTitle title={"or"} />
      </div>
    </div>
  );
};
