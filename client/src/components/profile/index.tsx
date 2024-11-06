import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { logoutUser } from "../../reducers/userReducer";
import { SetList } from "./edit/SetList";
import { Routes, Route, Link, Outlet, useMatch } from "react-router-dom";
import { SingleSetPreview } from "./edit/SingleSetPreview";
import { RootState } from "../../types";
import { GoBackArrow } from "../shared/GoBackArrow";
import { UserAgreements } from "./Agreements";
import { UserSettings } from "./Settings";
import QuizContainer from "../quiz";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Separator } from "../ui/separator";
import { GlobalStats } from "./profile/GlobalStats";
import { initializeStats } from "@/reducers/statsReducer";

const SingleLink = ({
  to,
  children,
  params,
}: {
  to: string;
  children: string;
  params: string | undefined;
}) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(params === to);
  }, [params, to]);
  return (
    <Link
      to={to}
      className={`group transition-all sm:w-full md:px-2 text-base sm:text-lg font-semibold h-fit ${
        active ? "" : "opacity-80"
      }`}
    >
      {
        <span
          className={`transition-all ${
            active ? "opacity-100 ml-1" : "opacity-0"
          }`}
        >
          {"•"}
        </span>
      }
      <span
        className={`transition-all w-full ${
          active ? "ml-3" : "group-hover:ml-2"
        }`}
      >
        {children}
      </span>
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
  const { t } = useTranslation("translation", { keyPrefix: "DASHBOARD.NAV" });
  return (
    <nav
      className={`sm:sticky sm:top-28 flex sm:flex-col flex-wrap justify-between space-y-2 grow-0 shrink-0 basis-32 w-full overflow-x-hidden sm:min-h-96 ${className}`}
    >
      <div className="flex justify-between sm:flex-col gap-4 flex-wrap w-full">
        <SingleLink to="" params={params}>
          {t("PROFILE")}
        </SingleLink>
        <SingleLink to="dashboard" params={params}>
          {t("DASHBOARD")}
        </SingleLink>
        <SingleLink to="sets" params={params}>
          {t("SETS")}
        </SingleLink>
        <SingleLink to="settings" params={params}>
          {t("SETTINGS")}
        </SingleLink>
        <SingleLink to="agreements" params={params}>
          {t("AGREEMENTS")}
        </SingleLink>
        <Separator />
        <Link to="/browser" className="sm:w-full ml-2 md:px-2 text-base sm:text-lg font-semibold h-fit">
          <span className="link opacity-80">{t("BROWSER")}</span>
        </Link>
      </div>
      <button
        type="button"
        className="hover:bg-opacity-50 opacity-60 hover:opacity-100 w-full bg-error bg-opacity-0 transition-all rounded-full px-2 text-base sm:text-lg font-semibold h-fit"
        onClick={() => dispatch(logoutUser())}
      >
        {t("LOGOUT")}
      </button>
    </nav>
  );
};
type Titles = {
  "": string;
  sets: string;
  settings: string;
  agreements: string;
  dashboard: string;
  [key: string]: string; // This is the index signature
};
const titles: Titles = {
  "": "Profile",
  sets: "Sets",
  settings: "Settings",
  agreements: "Agreements",
  dashboard: "Dashboard",
};
const ProfileNav = ({
  username,
  dispatch,
}: {
  username: string;
  dispatch: AppDispatch;
}) => {
  const match = useMatch("/profile/*");
  const params = match ? match.params["*"] : "";
  const bentoStyles =
    " bg-ternary p-2 rounded-2xl black:border black:border-faint shadow-sm";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-1 grid-flow-row gap-2">
      <div className="sm:col-span-4 flex h-fit">
        <div className="w-1/3 h-fit">
          <GoBackArrow />
        </div>
        <h3 className="font-bold text-center text-xl w-1/3 h-fit">
          {params ? titles[params] : `Welcome ${username}`}
        </h3>
        <div className="w-1/3  h-fit flex justify-end">
        </div>
      </div>
      <NavLinks
        className={bentoStyles + "sm:col-span-1  sm:row-span-1"}
        dispatch={dispatch}
      />
      <div
        className={`${bentoStyles} row-span-2 col-span-1 sm:row-span-2 sm:col-span-3 flex w-full flex-col`}
      >
        <Outlet />
      </div>
    </div>
  );
};

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  //dispatch initial stats
  useEffect(() => {
    dispatch(initializeStats());
  }, [dispatch]);

  return (
    <div className="flex flex-col place-items-center px-5 sm:p-8">
      <div className="flex flex-col p-1 mt-4 sm:p-5 rounded-xl shadow-2xl w-full h-full bg-primary max-w-6xl">
        <Routes>
          <Route
            path=""
            element={
              <ProfileNav username={user.username} dispatch={dispatch} />
            }
          >
            <Route path="" element={<GlobalStats />} />
            <Route path="/agreements" element={<UserAgreements />} />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/dashboard" element={<QuizContainer />} />
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
