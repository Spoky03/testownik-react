"use client";
import { Link } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useContext } from "react";
import { ThemeContext } from "../App";
import constants from "@/constants";
import * as React from "react";
import { HiDotsHorizontal as DotsHorizontalIcon } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  // DropdownMenuSub,
  // DropdownMenuSubContent,
  // DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ComboboxDropdownMenu = ({
  setDarkMode,
}: {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean | null>>;
}) => {
  const [open, setOpen] = React.useState(false);
  const darkMode =
    localStorage.getItem("darkMode") === "true" ? true : undefined;
  console.log(darkMode);
  return (
    <div className="flex w-full flex-col items-start justify-between rounded-md border sm:flex-row sm:items-center">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <DotsHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Navigation</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link to="/browser">Browser</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={darkMode}
              onCheckedChange={() => {
                setDarkMode((prev: boolean | null) => {
                  localStorage.setItem("darkMode", JSON.stringify(!prev));
                  return !prev;
                });
              }}
            >
              Dark Mode
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ThemeButton = ({
  setDarkMode,
}: {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean | null>>;
}) => {
  const darkMode = useContext(ThemeContext);
  const switchTheme = () => {
    setDarkMode((prev: boolean | null) => {
      localStorage.setItem("darkMode", JSON.stringify(!prev));
      return !prev;
    });
  };
  const toggleDarkMode = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!document.startViewTransition) {
      switchTheme();
    } else {
      document.startViewTransition(switchTheme);
    }
  };
  return (
    <div className="flex">
      <div
        role="button"
        onClick={toggleDarkMode}
        className="rounded-full  place-self-center hover:bg-opacity-30 hover:bg-success transition:colors duration-300 hover:animate-[spin_0.6s_ease-in-out]"
      >
        {darkMode ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
      </div>
    </div>
  );
};
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
const NavLinks = ({
  setDarkMode,
}: {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean | null>>;
}) => {
  return (
    <>
      <div className="hidden sm:flex gap-2 sm:gap-5 mr-5">
        <SingleLink to="/dashboard">Dashboard</SingleLink>
        <SingleLink to="/browser">Browser</SingleLink>
        <SingleLink to="/profile">Profile</SingleLink>
        <ThemeButton setDarkMode={setDarkMode} />
      </div>
      <div className="block sm:hidden mr-5">
        <ComboboxDropdownMenu setDarkMode={setDarkMode} />
      </div>
    </>
  );
};
export const Navbar = ({
  setDarkMode,
}: {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean | null>>;
}) => {
  return (
    <div className="flex justify-center z-10 mb-1 shadow-md fixed w-full bg-w-primary dark:bg-primary">
      <div
        className={`flex justify-between w-full px-2 py-2 ${constants.STYLES.MAX_WIDTH}`}
      >
        <Link to="/" className="place-self-center text-2xl font-bold ml-5">
          {constants.APP_NAME}
        </Link>
        <NavLinks setDarkMode={setDarkMode} />
      </div>
    </div>
  );
};
