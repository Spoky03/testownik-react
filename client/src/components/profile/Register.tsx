import { checkIfTokenIsValid } from "@/lib/utils";
import { AppDispatch } from "@/store";
import { RootState } from "@/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Link, useNavigate } from "react-router-dom";
import { ShotThroughTitle } from "../ShotThroughTitile";
import { useToast } from "../ui/use-toast";
import { registerUser } from "@/reducers/userReducer";
import { Label } from "../ui/label";
import { ToastAction } from "../ui/toast";
import { Spinner } from "../Spinner";

export const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [effect, setEffect] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user.user);
  const { origin, reason } = location.state || {};
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEffect(true);
    const res = await dispatch(registerUser(username, email, password));
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
      setTimeout(() => {
        navigate("/settings");
      }, 3000);
    }
  };
  if (checkIfTokenIsValid(user.exp)) {
    console.log(
      "User is already logged in; checking token validity. Redirecting to origin."
    );
    return <Spinner className="place-self-center mt-20" />;
  }
  return (
    <div className="flex p-10 flex-col justify-center h-2/3">
      <div className="flex flex-col p-10 w-fit place-self-center rounded-xl shadow-2xl place-items-center bg-w-primary dark:bg-primary">
        <form onSubmit={handleSubmit} className="flex flex-col">
          {reason && (
            <p className="text-sm w-3/4 text-center bg-error rounded-md p-2 bg-opacity-30 place-self-center">
              {reason}
            </p>
          )}
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@mail.to"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
            pattern="[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}"
            required
          />
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            pattern=".{4,18}"
            className="mb-4"
          />

          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
            required
            pattern=".{8,32}"
          />
          <div className="place-self-center w-100">
            <Button type="submit" disabled={effect}>
              {effect ? "Please wait" : "Register"}
            </Button>
          </div>
        </form>
        <ShotThroughTitle title={"or"} />
        <Link to="/login">
          <Button type="button" variant={"outline"}>
            {"Login"}
          </Button>
        </Link>
      </div>
    </div>
  );
};
