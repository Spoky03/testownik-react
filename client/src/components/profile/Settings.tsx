import { RootState } from "@/types";
import { Button } from "../ui/button";
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
import { Separator } from "../ui/separator";
import userService from "@/services/userService";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { UpdatePassword } from "./UpdatePassword";
import { Modal } from "../Modal";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const FormSchema = z.object({
  email: z.string().email(),
  username: z.string(),
});
export const UserSettings = () => {
  const { toast } = useToast();
  const [isMonospace, setIsMonospace] = useState(
    document.body.classList.contains("monospace")
  );
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      username: "",
    },
  });
  useEffect(() => {
    if (isMonospace) {
      document.body.classList.add("monospace");
      localStorage.setItem("monospace", "true");
    } else {
      document.body.classList.remove("monospace");
      localStorage.removeItem("monospace");
    }
  }, [isMonospace]);
  // Update form default values when settings change
  useEffect(() => {
    form.reset({
      email: user.email,
      username: user.username,
    });
  }, [form, user, form.reset]);

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    userService
      .saveUserData(data)
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
    <div className="flex flex-col p-5 gap-2 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full items-start rounded-md">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Username"
                    readOnly
                    className="cursor-not-allowed"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full items-start rounded-md">
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input {...field} type="email" placeholder="Email" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" variant="outline" className="place-self-end">
            Save
          </Button>
        </form>
      </Form>
      <Separator />
      <div className="flex items-center space-x-2">
        <Switch
          id="font"
          onClick={() => setIsMonospace(!isMonospace)}
          checked={isMonospace}
        />
        <Label htmlFor="font">Monospace font</Label>
      </div>

      <Separator />
      <div className="p-2 border w-fit rounded-2xl flex gap-2 place-self-end">
        <Button
          onClick={() => setOpenPasswordModal(true)}
          className="max-w-fit  place-self-start text-wrap"
          variant="secondary"
        >
          Change password
        </Button>
        <Separator orientation="vertical" />
        <Button
          onClick={() => {
            console.log("delete account");
          }}
          className="max-w-fit place-self-start text-wrap"
          variant="destructive"
        >
          Delete account
        </Button>
      </div>
      <Modal
        open={openPasswordModal}
        setOpen={setOpenPasswordModal}
        content={<UpdatePassword />}
      />
    </div>
  );
};
