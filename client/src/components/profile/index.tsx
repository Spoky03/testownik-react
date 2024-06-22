import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { logoutUser } from "../../reducers/userReducer";
import { Button } from "../ui/button";
import { SetList } from "./SetList";
import { Routes, Route, Link, Outlet} from "react-router-dom";
import { SingleSetPreview } from "./SingleSetPreview";
import { RootState } from "../../types";
import constants from "../../constants";
import { GoBackArrow } from "../GoBackArrow";
const ProfileNav = ({
  username,
  dispatch,
}: {
  username: string;
  dispatch: AppDispatch;
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex center ">
        <div className="w-1/3">
          <GoBackArrow />
        </div>
        <h3 className="font-bold text-center text-lg w-1/3">Welcome {username}</h3>
        <div className="w-1/3 flex justify-end">
          <Button
              type="button"
              onClick={() => dispatch(logoutUser())}
            >{constants.LABELS.LOGOUT}</Button>
        </div>
      </div>
      <div className="">
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 min-h-96 place-items-center">
          <li className="w-32 h-32 bg-success"></li>
          <li className="w-32 h-32 bg-success"></li>
          <li className="w-32 h-32 bg-success"></li>
        </ul>
      </div>
      <Link to="sets" className="place-self-center w-20 h-12">
        <Button type="button">{constants.LABELS.VIEW_SETS}</Button>
      </Link>
    </div>
  );
};

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <div className="flex flex-col place-items-center w-screen px-5 sm:p-8">
        <div className="flex flex-col p-5 rounded-xl shadow-2xl w-full h-full bg-w-primary dark:bg-primary max-w-[900px]">
          <Routes>
            <Route
              path=""
              element={
                <ProfileNav username={user.username} dispatch={dispatch} />
              }
            />
            <Route
              path="sets/*"
              element={
                <>
                  <Outlet />
                </>
              }
            >
              <Route path="" element={<SetList />} />
              <Route path=":id" element={<SingleSetPreview />} />
            </Route>
          </Routes>
        </div>
    </div>
  );
};
export default Profile;
