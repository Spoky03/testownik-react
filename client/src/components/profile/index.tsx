import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { logoutUser } from "../../reducers/userReducer";
import { Button } from "../ui/button";
import { SetList } from "./SetList";
import { Routes, Route, Link, Outlet, useMatch, Params } from "react-router-dom";
import { SingleSetPreview } from "./SingleSetPreview";
import { RootState } from "../../types";
import constants from "../../constants";
import { GoBackArrow } from "../GoBackArrow";
import { UserSettings } from "./Settings";

const SingleLink = ({ to, children, params}: { to: string; children: string; params: string | undefined }) => {
  console.log(params);
  const activeStyle = params === to ? "border" : "";
  return (
    <Link
      to={to}
      className={`hover:bg-opacity-50 bg-success bg-opacity-0 transition-all rounded-full sm:w-full px-2 text-base sm:text-lg font-semibold h-fit ${activeStyle}`}
    >
      {children}
    </Link>
  );
};
const NavLinks = ({
  dispatch,
  className,
}: {
  dispatch: AppDispatch;
  className: string;
}) => {
  const match = useMatch("/profile/*");
  const params = match ? match.params["*"] : "";
  return (
    <nav
      className={`flex sm:flex-col flex-wrap justify-between space-y-2 grow-0 shrink-0 basis-32 w-full overflow-x-hidden sm:min-h-96 ${className}`}
    >
      <div className="flex justify-between sm:flex-col gap-2 flex-wrap w-full">
        <SingleLink to="" params={params}>Profile</SingleLink>
        <SingleLink to="sets" params={params}>Sets</SingleLink>
        <SingleLink to="settings" params={params}>Settings</SingleLink>
      </div>
      <button
        type="button"
        className="hover:bg-opacity-50 bg-error bg-opacity-0 transition-all rounded-full w-fit px-2 text-base sm:text-lg font-semibold h-fit"
        onClick={() => dispatch(logoutUser())}
      >
        {constants.LABELS.LOGOUT}
      </button>
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
  const bentoStyles =
    " dark:bg-ternary bg-w-ternary p-2 rounded-2xl border borer-faint shadow-sm";
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-1 grid-flow-row gap-2"
    >
      <div className="sm:col-span-4 flex h-fit">
        <div className="w-1/3 h-fit">
          <GoBackArrow />
        </div>
        <h3 className="font-bold text-center text-lg w-1/3  h-fit">
          Welcome {username}
        </h3>
        <div className="w-1/3  h-fit flex justify-end">
          <Button type="button" onClick={() => dispatch(logoutUser())}>
            {constants.LABELS.LOGOUT}
          </Button>
        </div>
      </div>
      <NavLinks
        className={bentoStyles + "sm:col-span-1  sm:row-span-2"}
        dispatch={dispatch}
      />
      {/* <ul
        className={`grow grid col-span-3 row-span-1 gap-4 grid-cols-1 sm:grid-cols-2 min-h-48 place-items-center ${bentoStyles} `}
      >
        <li className="w-32 h-32 bg-success"></li>
        <li className="w-32 h-32 bg-success"></li>
      </ul>
      <div className={`${bentoStyles} row-span-1 col-span-3`}>
        3
      </div> */}
      <div className={`${bentoStyles} row-span-2 col-span-1 sm:row-span-2 sm:col-span-3 flex w-full flex-col`}>
        <Outlet />
      </div>
    </div>
  );
};

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="flex flex-col place-items-center w-screen px-5 sm:p-8">
      <div className="flex flex-col p-5 rounded-xl shadow-2xl w-full h-full bg-w-primary dark:bg-primary max-w-6xl">
        <Routes>
          <Route
            path=""
            element={
              <ProfileNav username={user.username} dispatch={dispatch} />
            }
          >
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
          </Route>
        </Routes>
      </div>
    </div>
  );
};
export default Profile;
