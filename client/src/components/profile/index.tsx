import { useEffect, useState } from "react";
import { Login } from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchUser, logoutUser } from "../../reducers/userReducer";
import { Button } from "../Button";
import { Notification } from "../Notification";
import { NewSetForm } from "./NewSetForm";
const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const user = useSelector((state: any) => state.user.user);
  const notification = useSelector((state: any) => state.user.notification);

  return (
    <div className="flex flex-col place-items-center justify-center align-center w-screen h-2/3">
      {user && user.username ? (
        <div className="flex flex-col gap-5 p-10 rounded-xl shadown-2xl place-items-center bg-w-primary dark:bg-primary">
          <p>Logged as: {user.username}</p>
          <Button
            label="Logout"
            type="button"
            onclick={() => dispatch(logoutUser())}
            />
            <NewSetForm />
        </div>
      ) : <><Notification props={notification}/><Login /></>}
    </div>
  );
};
export default Profile;
