///<reference types="vite-plugin-svgr/client" />
import { Link, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTheme, useTheme } from "@/lib/theme";
import { useMediaQuery } from "@uidotdev/usehooks";
import Logo from "@/assets/logov3.svg?react";
import { LangButton } from "./lang";
import { ThemeButton } from "./theme";
import { MobileDrawer } from "./menus";
import { useTranslation } from "react-i18next";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/types";
const SingleLink = ({
  to,
  children,
  className,
}: {
  to: string;
  children: string;
  className?: string;
}) => {
  return (
    <div
      role="button"
      className={`rounded-full text-nowrap px-3 place-self-center hover:bg-success hover:bg-opacity-30 transition:colors duration-300 font-semibold ${className}`}
    >
      <Link to={to}>{children}</Link>
    </div>
  );
};
const NavLinks = ({ wrapped }: { wrapped?: boolean }) => {
  const activeTheme = getTheme();
  const { t } = useTranslation("translation", { keyPrefix: "NAV.LINKS" });
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isUser = useSelector((state: RootState) => state.user.user.sub);
  const [position, setPosition] = useState(activeTheme);
  const setTheme = useTheme();
  const switchTheme = () => {
    setTheme(position);
  };
  const toggleDarkMode = () => {
    if (!document.startViewTransition || isMobile) {
      switchTheme();
    } else {
      document.startViewTransition(switchTheme);
    }
  };

  useEffect(() => {
    toggleDarkMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);
  return (
    <>
      {!isMobile ? (
        <div className="flex flex-row-reverse gap-2 sm:gap-5 mr-5">
          <div className="place-self-center basis-1/4">
            <LangButton />
          </div>
          <div className="place-self-center basis-1/4">
            <ThemeButton position={position} setPosition={setPosition} />
          </div>
          <div className="place-self-center flex group h-full">
            {wrapped && <div className="group-hover:hidden px-4 flex justify-end w-full shrink-0">
              <FaBars className="place-self-center" size={20} />
              </div>}
            <div
              className={`${wrapped ? "hidden group-hover:flex" : ""} transition-all flex gap-2 sm:gap-5 `}
            >
              <SingleLink to="/browser">{t("BROWSER")}</SingleLink>
              {isUser && <SingleLink to="/profile/dashboard" className="hidden md:block">
                {t("DASHBOARD")}
              </SingleLink>}
              <SingleLink to="/profile">
               {isUser ? t("PROFILE") : t("LOGIN")}
              </SingleLink>
            </div>
          </div>
        </div>
      ) : (
        <div className="place-self-center mr-5">
          <MobileDrawer position={position} setPosition={setPosition} />
        </div>
      )}
    </>
  );
};
export const Navbar = () => {
  const match = useMatch("/profile/*");
  const quizMatch = useMatch("/quiz/*");
  const params = match && match.params ? true : false || quizMatch && quizMatch.params ? true : false;
  return (
    <div className="top-0 left-0 w-full max-h-28  sticky overflow-x-hidden z-50 flex justify-center bg-primary border-b sm:border-b-0 sm:shadow-md">
        <div className={`flex justify-between w-full p-2 max-w-5xl`}>
          <Link to="/" className="place-self-center text-2xl font-bold ml-5">
            <Logo
              className={`${
                params ? "h-8" : "h-14"
              } w-fit transition-all fill-text`}
            />
          </Link>
          <NavLinks wrapped={params} />
        </div>
    </div>
  );
};
