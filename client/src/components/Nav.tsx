import { Link, useNavigate } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { RxReader } from "react-icons/rx";
import { WiMoonAltFirstQuarter } from "react-icons/wi";
import { IoIosArrowDown } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import { useEffect, useState } from "react";
import { HiDotsHorizontal as DotsHorizontalIcon } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  // DropdownMenuSub,
  // DropdownMenuSubContent,
  // DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTheme, useTheme } from "@/lib/theme";
import i18n from "@/i18n";

const LangDropdown = (
) => {
  const [lang, setLang] = useState(i18n.language);
  
  const changeLang = (lang: string) => {
    setLang(lang);
    document.documentElement.lang = lang;
    console.log(lang);
    i18n.changeLanguage(lang);
  }
  return (
    <DropdownMenuGroup>
        {/* <DropdownMenuLabel>Language</DropdownMenuLabel> */}
          {/* <DropdownMenuItem onClick={() => setLang("en")}>
            <p>English</p>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLang("pl")}>
            <p>Polski</p>
          </DropdownMenuItem> */}
          <DropdownMenuRadioGroup value={lang} onValueChange={changeLang}>
            <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="pl">Polski</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
  )
}

const LangButton = () => {
  const [open, setOpen] = useState(false);
  const lang = i18n.language;
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="group hover:bg-success text-text hover:bg-opacity-30 transition:colors duration-300 font-semibold px-2 py-1 rounded-2xl h-fit place-self-center flex gap-1">
        <MdLanguage className="w-6 h-6 animate-[fadeIn_500ms_ease-in-out] group-hover:hidden inline"/>
        <IoIosArrowDown className="w-6 h-6 animate-[fadeIn_500ms_ease-in-out] group-hover:inline hidden"/>
          <span className="underline">{lang}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <LangDropdown/>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
const ThemeDropdown = ({
  position,
  setPosition,
}: {
  position: string;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <DropdownMenuRadioGroup value={position} onValueChange={setPosition} className="">
      <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="black">Black</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="oak">Oak</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  );
};
export const ComboboxDropdownMenu = ({
  position,
  setPosition,
}: {
  position: string;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
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
            <DropdownMenuItem onClick={() => navigate("/browser")}>
              <p>Browser</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/profile/dashboard")}>
              <p>Dashboard</p>
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => navigate("/profile")}>
              <p>Profile</p>
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <ThemeDropdown position={position} setPosition={setPosition} />
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Language</DropdownMenuLabel>
          <LangDropdown />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
const ThemeIcon = ({ position }: { position: string }) => {
  const style = "w-6 h-6";
  switch (position) {
    case "light":
      return <MdLightMode className={style}/>;
    case "dark":
      return <MdDarkMode className={style}/>;
    case "black":
      return <WiMoonAltFirstQuarter className={style}/>;
    case "oak":
      return <RxReader className={style}/>;
    default:
      return <MdLightMode className={style}/>;
  }
}
const ThemeButton = ({
  position,
  setPosition,
}: {
  position: string;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div role="button" className="rounded-full px-3 place-self-center hover:bg-success hover:bg-opacity-30 transition:colors duration-300 font-semibold">
          <ThemeIcon position={position} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <ThemeDropdown position={position} setPosition={setPosition} />
      </DropdownMenuContent>
    </DropdownMenu>
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
const NavLinks = () => {
  const activeTheme = getTheme();
  const [position, setPosition] = useState(activeTheme);
  const setTheme = useTheme();
  const switchTheme = () => {
    setTheme(position);
  };
  const toggleDarkMode = () => {
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    if (!document.startViewTransition || mobile) {
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
      <div className="hidden sm:flex gap-2 sm:gap-5 mr-5">
        <SingleLink to="/browser">Browser</SingleLink>
        <SingleLink to="/profile/dashboard" className="hidden md:block">
          Dashboard
        </SingleLink>
        <SingleLink to="/profile">Profile</SingleLink>
        <ThemeButton position={position} setPosition={setPosition} />
        <LangButton />
      </div>
      <div className="block sm:hidden mr-5">
        <ComboboxDropdownMenu position={position} setPosition={setPosition} />
      </div>
    </>
  );
};
export const Navbar = () => {
  return (
    <div className="flex justify-center z-10 mb-1 shadow-md fixed w-full bg-primary ">
      <div
        className={`flex justify-between w-full px-2 py-2 max-w-5xl`}
      >
        <Link to="/" className="place-self-center text-2xl font-bold ml-5">
          Testownik
        </Link>
        <NavLinks />
      </div>
    </div>
  );
};
