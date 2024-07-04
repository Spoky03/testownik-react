import { RootState } from "@/types";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
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
import userService from "@/services/userService";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const FormSchema = z.object({
  agreements: z
    .boolean()
    .default(false)
    .refine((v) => v === true, {
      message: "You must accept the terms and conditions",
    }),
  newsletter: z.boolean().default(false),
});
export const UserAgreements = () => {
  const { toast } = useToast();
  const settings = useSelector((state: RootState) => state.user.settings);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      agreements: false,
      newsletter: false,
    },
  });
  // Update form default values when settings change
  useEffect(() => {
    form.reset({
      agreements: settings.agreements,
      newsletter: settings.newsletter,
    });
  }, [form, settings, form.reset]);

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    userService
      .saveSettings(data)
      .then(() => {
        toast({
          title: "Settings saved",
          variant: "success",
        });
      })
      .catch((error) => {
        toast({
          title: "Error saving settings",
          description: error.message,
          variant: "destructive",
        });
      });
  }

  return (
    <div className="flex flex-col p-5 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col space-y-6"
        >
          <FormField
            control={form.control}
            name="agreements"
            render={({ field }) => (
              <FormItem className="flex flex-row w-full items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Accept terms and conditions *</FormLabel>
                  <FormDescription>
                    By checking this box you agree to our terms and conditions
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newsletter"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Agree to recieve marketing emails </FormLabel>

                  <FormDescription>We won't sell your data</FormDescription>
                </div>
              </FormItem>
            )}
          />
          <p className="text-xs opacity-60 px-4"> *  Required field</p>

          <Button type="submit" className="place-self-end">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};
