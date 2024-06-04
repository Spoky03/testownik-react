import { useEffect, useState } from "react";
import { Login } from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchUser, logoutUser } from "../../reducers/userReducer";
import { Button } from "../Button";
import { Notification } from "../Notification";
import { NewSetForm } from "./NewSetForm";
import { SetList } from "./SetList";
import { Routes, Route, useParams, Link } from 'react-router-dom';
import { SingleSetPreview } from "./SingleSetPreview";
import { FaBars as BarsIcon } from "react-icons/fa6";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const user = useSelector((state: any) => state.user.user);
  const notification = useSelector((state: any) => state.user.notification);

  return (
    <div className="flex flex-col place-items-center mt-12 w-screen px-10">
      {user && user.username ? (
        <div className="flex flex-col gap-5 p-5 rounded-xl shadow-2xl w-full h-full bg-w-primary dark:bg-primary">
            <div className="flex justify-between place-items-center">
              <h1 className="font-bold">Welcome {user.username}</h1>
              <div className="h-10 w-16"><Button label="Logout" type="button" onclick={() => dispatch(logoutUser())}/></div>
            </div>
            <Routes>
                  <Route path="/" element={<Link to='sets' className="place-self-center"><BarsIcon /></Link>} />
                  <Route path="sets" element={<SetList />} />
                  <Route path="sets/:id" element={<SingleSetPreview />} />
            </Routes>
        </div>
      ) : <><Notification props={notification}/><Login /></>}
    </div>
  );
};
export default Profile;
