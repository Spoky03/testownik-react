import React, { useState } from "react";
import { loginUser } from "../../reducers/userReducer";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { Navigate, useLocation } from "react-router-dom";
import { checkIfTokenIsValid } from "@/lib/utils";
export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [effect, setEffect] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user.user);
  const { origin, reason } = location.state || {};
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEffect(true);
    const res = await dispatch(loginUser(username, password));
    const variant = res.status === 200 ? "success" : "destructive";
    toast({
      variant: variant,
      title:
        variant === "success"
          ? "Logged in successfully!"
          : "There was a problem with your request.",
      description: res.message
    });
    setEffect(false);
  };
  if (checkIfTokenIsValid(user.exp)) {
    return <Navigate to={origin} />;
  }
  return (
    <div className="flex p-10 flex-col justify-center h-2/3">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 p-10 w-fit place-self-center rounded-xl shadow-2xl place-items-center bg-w-primary dark:bg-primary"
      >
      {reason && <p className="text-sm w-3/4 text-center bg-error rounded-md p-2 bg-opacity-30">{reason}</p>}
        <Input
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="place-self-center w-100">
          <Button type="submit" disabled={effect}>{effect ? 'Please wait' : 'Login'}</Button>
        </div>
      </form>
    </div>
  );
};