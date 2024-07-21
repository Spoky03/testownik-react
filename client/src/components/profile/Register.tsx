import { checkIfTokenIsValid } from "@/lib/utils";
import { AppDispatch } from "@/store";
import { RootState } from "@/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ShotThroughTitle } from "../shared/ShotThroughTitile";
import { useToast } from "../ui/use-toast";
import { registerUser } from "@/reducers/userReducer";
import { ToastAction } from "../ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const FormSchema = z.object({
  email: z.string().email(),
  username: z.string().min(4).max(18),
  password: z.string().min(8).max(32)
  .regex(/(?=.*\d)/, "Password must contain at least one digit")
  .regex(/(?=.*\W+)/, "Password must contain at least one special character")
  .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase character")
  .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase character"),
  passwordConfirmation: z.string().min(8).max(32),
}).superRefine(({ passwordConfirmation, password }, ctx) => {
  if (passwordConfirmation !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['passwordConfirmation']
    });
  }
});

export const Register = () => {
  const { toast } = useToast();
  const [effect, setEffect] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    },
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    setEffect(true);
    const res = await dispatch(registerUser(data.username, data.email, data.password));
    const variant = res.status === 200 ? "success" : "destructive";
    console.log(res);
    const description =
      variant === "destructive"
        ? Array.isArray(res.response.data.message)
          ? res.response.data.message.map((msg: string) => (
              <p key={msg}>{msg}</p>
            ))
          : res.response?.data.message
        : "Please check your email for a verification link.";
    toast({
      variant: variant,
      title:
        variant === "success"
          ? "Registered successfully!"
          : "There was a problem with your request.",
      description: description,
      action:
        description === "User already exists" ? (
          <ToastAction
            altText="Log In Instead"
            onClick={() => navigate(`/login`)}
          >
            Log In Instead
          </ToastAction>
        ) : (
          <></>
        ),
      duration: description === "User already exists" ? 10000 : 5000,
    });
    // when promise is resolved set effect to false
    setEffect(false);
    if (res.status === 200) {
      navigate("/profile/agreements");
    }
  };
  if (checkIfTokenIsValid(user.exp)) {
    toast({
      variant: "success",
      title: "Already logged in",
      description: "You are already logged in.",
    });
    return <Navigate to="/profile/dashboard" />;
  }

  return (
    <div className="flex sm:mt-5 p-10 flex-col justify-center h-2/3">
      <div className="flex flex-col p-5 sm:p-10 w-fit place-self-center rounded-xl shadow-2xl place-items-center bg-primary  black:border">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full items-start rounded-md">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="example@email.com" />
                  </FormControl>
                  <FormMessage className="w-full text-wrap text-sm" />
                  <FormDescription className="text-xs">
                    We wont send you any emails without your consent
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full items-start rounded-md">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Username" />
                  </FormControl>
                  <FormMessage className="w-full text-wrap text-sm" />
                  <FormDescription className="text-xs">
                    *Username must be between 4 and 18 characters and unique
                  </FormDescription>
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
                  <FormMessage className="w-full text-wrap text-sm" />
                  <FormDescription className="text-xs">
                    *Password must be between 8 and 32 characters
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full items-start rounded-md">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Confirm Password" />
                  </FormControl>
                  <FormMessage className="w-full text-wrap text-sm" />
                </FormItem>
              )}
            />
          
            <FormMessage />
            <div className="place-self-center mt-4 w-100">
              <Button type="submit" disabled={effect}>
                {effect ? "Please wait" : "Register"}
              </Button>
            </div>
            <ShotThroughTitle title={" "} />
            <div className="flex flex-col place-items-center">
              <p className="text-sm opacity-80 p-2 mb-2">
                {" "}
                Already have an account?
              </p>
              <Link to="/login">
                <Button type="button" variant={"outline"}>
                  {"Login"}
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
