import { useEffect} from "react";
import { Login } from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchQuestionSets, logoutUser } from "../../reducers/userReducer";
import { Button } from "../Button";
import { Notification } from "../Notification";
import { SetList } from "./SetList";
import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import { SingleSetPreview } from "./SingleSetPreview";
import { FaBars as BarsIcon } from "react-icons/fa6";
import { IoMdArrowRoundBack as ArrowBackIcon } from "react-icons/io";
import { RootState } from "../../types";
import constants from "../../constants";
const ProfileNav = ({
  username,
  dispatch,
}: {
  username: string;
  dispatch: AppDispatch;
}) => {
  return (
    <>
      <div className="flex justify-between min-h-96">
        <h3 className="font-bold text-lg">Welcome {username}</h3>
        <div className="h-10 w-16">
          <Button
            label={constants.LABELS.LOGOUT}
            type="button"
            onClick={() => dispatch(logoutUser())}
          />
        </div>
      </div>
      <Link to="sets" className="place-self-center w-20 h-12">
        <Button label={constants.LABELS.VIEW_SETS} type="button" />
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
  const {user, notification, token} = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(fetchQuestionSets());
  }, [dispatch, token]);
  return (
    <div className="flex flex-col place-items-center w-screen px-5 sm:p-8">
      {user && user.username ? (
        <div className="flex flex-col p-5 rounded-xl shadow-2xl w-full h-full bg-w-primary dark:bg-primary max-w-[900px]">
          <Routes>
            <Route
              path=""
              element={<ProfileNav username={user.username} dispatch={dispatch} />}
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
