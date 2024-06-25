import { checkIfTokenIsValid } from "@/lib/utils";
import { AppDispatch } from "@/store";
import { RootState } from "@/types";
import { Button} from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Link } from "react-router-dom";
import { ShotThroughTitle } from "../ShotThroughTitile";
import { useToast } from "../ui/use-toast";

export const Register = () => {
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
        // const res = await dispatch(registerUser(username, password));

        console.log("Registering user...");
        const res = { status: 200, message: "Registered successfully!" };

        const variant = res.status === 200 ? "success" : "destructive";
        toast({
        variant: variant,
        title:
            variant === "success"
            ? "Registered successfully!"
            : "There was a problem with your request.",
        description: res.message,
        });
        setEffect(false);
    };
    if (checkIfTokenIsValid(user.exp)) {
        return <Navigate to={origin} />;
    }
    return (
        <div className="flex p-10 flex-col justify-center h-2/3">
        <div className="flex flex-col p-10 w-fit place-self-center rounded-xl shadow-2xl place-items-center bg-w-primary dark:bg-primary">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {reason && (
                <p className="text-sm w-3/4 text-center bg-error rounded-md p-2 bg-opacity-30 place-self-center">
                {reason}
                </p>
            )}
            <Input
                type="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                type="email"
                placeholder="example@mail.to"
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
                <Button type="submit" disabled={effect}>
                {effect ? "Please wait" : "Register"}
                </Button>
            </div>
            </form>
            <ShotThroughTitle title={"or"} />
            <Link to="/login"><Button type="button" variant={'outline'}>{"Login"}</Button></Link>
        </div>
        </div>
    );
    }