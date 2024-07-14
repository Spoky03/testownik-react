///<reference types="vite-plugin-svgr/client" />
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTheme, useTheme } from "@/lib/theme";
import { useMediaQuery } from "@uidotdev/usehooks";
import Logo from "@/assets/logo.svg?react";
import { LangButton, } from "./lang";
import { ThemeButton } from "./theme";
import { MobileDrawer } from "./menus";
import { useTranslation } from "react-i18next";

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
      className={`rounded-full px-3 place-self-center hover:bg-success hover:bg-opacity-30 transition:colors duration-300 font-semibold ${className}`}
    >
      <Link to={to}>{children}</Link>
    </div>
  );
};
const NavLinks = () => {
  const activeTheme = getTheme();
  const { t } = useTranslation("translation", { keyPrefix: "NAV.LINKS" });
  const isMobile = useMediaQuery("(max-width: 640px)");
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
        <div className="flex gap-2 sm:gap-5 mr-5">
          <SingleLink to="/browser">{t("BROWSER")}</SingleLink>
          <SingleLink to="/profile/dashboard" className="hidden md:block">
            {t("DASHBOARD")}
          </SingleLink>
          <SingleLink to="/profile">{t("PROFILE")}</SingleLink>
          <div className="place-self-center basis-1/4">
            <ThemeButton position={position} setPosition={setPosition} />
          </div>
          <div className="place-self-center basis-1/4">
            <LangButton />
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
  return (
    <div className=" overflow-x-hidden">
      <div className="flex justify-center max-h-28 w-screen z-10 mb-1 shadow-md sm:fixed bg-primary ">
        <div className={`flex justify-between w-full p-2 max-w-5xl`}>
          <Link to="/" className="place-self-center text-2xl font-bold ml-5">
            <Logo className="h-16 w-fit fill-text" />
          </Link>
          <NavLinks />
        </div>
      </div>
    </div>
  );
};
