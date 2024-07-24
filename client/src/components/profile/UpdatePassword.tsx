import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import userService from "../../services/userService";
import { Input } from "../ui/input";
import { PasswordRequirements } from "../shared/PasswordRequirements";

const FormSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
});
export const UpdatePassword = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    if (data.newPassword !== data.confirmPassword) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    userService
      .saveUserData(data)
      .then(() => {
        toast({
          title: "Password updated",
          variant: "success",
        });
        form.reset();
      })
      .catch((error) => {
        toast({
          title: "Error updating password",
          description: error.response.data.message,
          variant: "destructive",
        });
      });
  }

  return (
    <div className="bg-secondary p-8 flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Change Password</h2>
      <Form {...form}>
        <form className="space-y-2" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full items-start rounded-md">
                <FormLabel>Current password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full items-start rounded-md">
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full items-start rounded-md">
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="opacity-70">
            <PasswordRequirements />
          </div>
          <Button type="submit" variant="secondary" className="w-full">
            Update password
          </Button>
        </form>
      </Form>
    </div>
  );
};
