import React, { useState } from "react";
import { loginUser } from "../../reducers/userReducer";
import { Button } from "../ui/button";
import { AppDispatch, RootState } from "../../store";
import { Input } from "../ui/input";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { ShotThroughTitle } from "../shared/ShotThroughTitile";
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
import { useForm } from "react-hook-form";
import { checkIfTokenIsValid } from "@/lib/utils";
const FormSchema = z.object({
  username: z.string().min(4).max(18),
  password: z.string().min(8).max(32),
});
export const Login = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [effect, setEffect] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user.user);
  const { origin } = location.state || {};
  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    setEffect(true);
    const res = await dispatch(loginUser(data.username, data.password));
    const variant = res.status === 200 ? "success" : "destructive";
    toast({
      variant: variant,
      title:
        variant === "success"
          ? "Logged in successfully!"
          : "There was a problem with your request.",
      description:
        variant === "success"
          ? "Logged in successfully!"
          : res.response.data.message,
    });
    setEffect(false);
  };
  if (checkIfTokenIsValid(user.exp)) {
    if (!origin) return <Navigate to="/profile/dashboard" />;
    return <Navigate to={origin} />;
  }
  return (
    <div className="flex sm:mt-5 p-10 flex-col justify-center h-2/3">
      <div className="flex flex-col p-10 w-fit place-self-center rounded-xl shadow-2xl place-items-center bg-primary black:border">
      <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col space-y-6 min-w-[240px]"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full items-start rounded-md">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="your username" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full items-start rounded-md">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Password" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="place-self-center mt-4 w-100">
              <Button type="submit" disabled={effect}>
                {effect ? "Please wait" : "Login"}
              </Button>
            </div>
            <ShotThroughTitle title={" "} />
            <div className="flex flex-col place-items-center">
              <p className="text-sm opacity-80 p-2 mb-2">
                {" "}
                Already have an account?
              </p>
              <Link to="/register">
                <Button type="button" variant={"outline"}>
                  {"Register"}
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
