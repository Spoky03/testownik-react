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
import userService from "@/services/userService";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { GoBackArrow } from "../GoBackArrow";
const FormSchema = z.object({
  agreements: z
    .boolean()
    .default(false)
    .refine((v) => v === true, {
      message: "You must accept the terms and conditions",
    }),
  newsletter: z.boolean().default(false),
});
export const UserSettings = () => {
  const { toast }= useToast();
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
    userService.saveSettings(data).then(() => {
      toast({
        title: "Settings saved",
        variant: "success",
      })
    }).catch((error) => {
      toast({
        title: "Error saving settings",
        description: error.message,
        variant: "destructive",
      });
    });
  }

  return (
    <div className="flex flex-col justify-center h-2/3">
      <div className="flex center mb-5 ">
        <div className="w-1/3">
          <GoBackArrow />
        </div>
        <h3 className="font-bold text-center text-lg w-1/3">
          Your Agreements
        </h3>
        <div className="w-1/3 flex justify-end">
        </div>
      </div>
      <div className="flex flex-col p-10 w-fit place-self-center rounded-xl shadow-2xl place-items-center bg-w-primary dark:bg-primary">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col space-y-6"
          >
            <FormField
              control={form.control}
              name="agreements"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Accept terms and conditions</FormLabel>
                    <FormDescription>(required) </FormDescription>
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
                    <FormLabel>Agree to recieve marketing emails</FormLabel>
                    <FormDescription>(optional) </FormDescription>
                    <FormDescription>We won't sell your data</FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="place-self-end">
              Save
            </Button>
          </form>
        </Form>
        <ShotThroughTitle title={"or"} />
      </div>
    </div>
  );
};
