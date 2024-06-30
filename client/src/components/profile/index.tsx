import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { logoutUser } from "../../reducers/userReducer";
import { Button } from "../ui/button";
import { SetList } from "./SetList";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { SingleSetPreview } from "./SingleSetPreview";
import { RootState } from "../../types";
import constants from "../../constants";
import { GoBackArrow } from "../GoBackArrow";
import { UserSettings } from "./NewUserPrompt";

const NavLinks = () => {
  return (
    <nav className="flex flex-col space-y-2 grow-0 shrink-0 basis-32">
      <Link
        to="sets"
        className="hover:bg-opacity-50 bg-success bg-opacity-0 transition-all duration-300 rounded-full w-fit px-2 text-lg font-semibold"
      >
        Edit My Sets
      </Link>
      <Link
        to="settings"
        className="hover:bg-opacity-50 bg-success bg-opacity-0 transition-all duration-300 rounded-full w-fit px-2 text-lg font-semibold"
      >
        Settings
      </Link>
    </nav>
  );
};
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
        <h3 className="font-bold text-center text-lg w-1/3">
          Welcome {username}
        </h3>
        <div className="w-1/3 flex justify-end">
          <Button type="button" onClick={() => dispatch(logoutUser())}>
            {constants.LABELS.LOGOUT}
          </Button>
        </div>
      </div>
      <div className="flex p-2">
        <NavLinks />
        <div className="w-1 rounded-full bg-w-ternary"></div>
        <ul className="grow grid gap-4 grid-cols-1 sm:grid-cols-2 min-h-96 place-items-center">
          <li className="w-32 h-32 bg-success"></li>
          <li className="w-32 h-32 bg-success"></li>
          <li className="w-32 h-32 bg-success"></li>
          <li className="w-32 h-32 bg-success"></li>
        </ul>
      </div>
    </div>
  );
};

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

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
          <Route path="/settings" element={<UserSettings />} />

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
