import React, { useState } from "react";
import { loginUser } from "../../reducers/userReducer";
import { Button } from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
  };

  return (
    <div className="w-fit">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 rounded-xl shadown-2xl place-items-center bg-w-primary dark:bg-primary">
        <input
            className="dark:text-primary"
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <input
            className="dark:text-primary"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <div className="place-self-center w-100">
            <Button type="submit" label="login"/>
        </div>
        </form>
    </div>
  );
};
