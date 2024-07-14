import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiDotsHorizontal as DotsHorizontalIcon } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoMdArrowForward } from "react-icons/io";
import {
  DropdownMenu,
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
import { Separator } from "../ui/separator";
import { LangDropdown, LangDropdownMobile } from "./lang";
import { ThemeDropdown, ThemeDropdownMobile } from "./theme";
import { useTranslation } from "react-i18next";

export const MobileDrawer = ({
    position,
    setPosition,
  }: {
    position: string;
    setPosition: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    const [open, setOpen] = useState(false);
    const {t} = useTranslation('translation', { keyPrefix: 'NAV' });
    const close = () => {
      setOpen(false);
    };
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="sm">
            <DotsHorizontalIcon />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="text-text black:text-black gap-2 flex flex-col">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-center">{t('LINKS.NAV')}</DrawerTitle>
            {/* <DrawerDescription>
              Make changes to your profile here. Click save when you're done.
            </DrawerDescription> */}
          </DrawerHeader>
          <div className="text-center w-full flex flex-col gap-4 p-4">
            <Link
              className="link font-medium flex w-full justify-center gap-2"
              to="/browser"
              onClick={close}
            >
              {t('LINKS.BROWSER')}
              <IoMdArrowForward
                size={24}
                className="shrink-0 place-self-center"
              />
            </Link>
            <Link
              className="link font-medium flex w-full justify-center gap-2"
              to="/profile/dashboard"
              onClick={close}
            >
              {t('LINKS.DASHBOARD')}
              <IoMdArrowForward
                size={24}
                className="shrink-0 place-self-center"
              />
            </Link>
            <Link
              className="link font-medium flex w-full justify-center gap-2"
              to="/profile"
              onClick={close}
            >
              {t('LINKS.PROFILE')}
              <IoMdArrowForward
                size={24}
                className="shrink-0 place-self-center"
              />
            </Link>
          </div>
          <Separator />
          <DrawerTitle className="text-center">{t('THEME.THEME')}</DrawerTitle>
          <ThemeDropdownMobile position={position} setPosition={setPosition} />
          <Separator />
          <DrawerTitle className="text-center">{t('LANG.LANG')}</DrawerTitle>
          <LangDropdownMobile />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="black:text-white dark:text-white"
              >
                {t('CLOSE')}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
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