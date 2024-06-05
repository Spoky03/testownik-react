import { useEffect, useState } from "react";
import { Login } from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchUser, logoutUser } from "../../reducers/userReducer";
import { Button } from "../Button";
import { Notification } from "../Notification";
import { SetList } from "./SetList";
import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import { SingleSetPreview } from "./SingleSetPreview";
import { FaBars as BarsIcon } from "react-icons/fa6";
import { IoMdArrowRoundBack as ArrowBackIcon } from "react-icons/io";
const ProfileNav = ({
  username,
  dispatch,
}: {
  username: string;
  dispatch: AppDispatch;
}) => {
  return (
    <>
      <div className="flex justify-between place-items-center">
        <h1 className="font-bold">Welcome {username}</h1>
        <div className="h-10 w-16">
          <Button
            label="Logout"
            type="button"
            onclick={() => dispatch(logoutUser())}
          />
        </div>
      </div>
      <Link to="sets" className="place-self-center">
        <BarsIcon />
      </Link>
    </>
  );
};
const GoBackArrow = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-start">
      <ArrowBackIcon
        onClick={() => navigate(-1)}
        className="place-self-start"
        size={25}
      />
    </div>
  );
}
const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const user = useSelector((state: any) => state.user.user);
  const notification = useSelector((state: any) => state.user.notification);

  return (
    <div className="flex flex-col place-items-center w-screen px-10">
      {user && user.username ? (
        <div className="flex flex-col p-5 rounded-xl shadow-2xl w-full h-full bg-w-primary dark:bg-primary">
          <Routes>
            <Route
              path=""
              element={<ProfileNav user={user.username} dispatch={dispatch} />}
            />
            <Route path="sets/*" element={<><GoBackArrow/><Outlet/></>}>
              <Route path="" element={<SetList />} />
              <Route path=":id" element={<SingleSetPreview />} />
            </Route>
          </Routes>
        </div>
      ) : (
        <>
          <Notification props={notification} />
          <Login />
        </>
      )}
    </div>
  );
};
export default Profile;
