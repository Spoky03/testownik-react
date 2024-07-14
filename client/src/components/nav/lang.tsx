///<reference types="vite-plugin-svgr/client" />
import { IoIosArrowDown } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import i18n from "@/i18n";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FlagPL from "@/assets/pl.svg?react";
import FlagEN from "@/assets/uk.svg?react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
export const LangDropdown = () => {
  const [lang, setLang] = useState(i18n.language);
  const { t } = useTranslation("translation", { keyPrefix: "NAV.LANG" });
  const changeLang = (lang: string) => {
    setLang(lang);
    document.documentElement.lang = lang;
    console.log(lang);
    i18n.changeLanguage(lang);
  };
  return (
    <DropdownMenuGroup>
      <DropdownMenuRadioGroup value={lang} onValueChange={changeLang}>
        <DropdownMenuRadioItem value="en" className="flex gap-2">
          <FlagEN className="w-6 h-6" />
          <span>{t("EN")}</span>
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="pl" className="flex gap-2">
          <FlagPL className="w-6 h-6" />
          <span>{t("PL")}</span>
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuGroup>
  );
};
export const LangDropdownMobile = () => {
  const [lang, setLang] = useState(i18n.language);

  const changeLang = (lang: string) => {
    setLang(lang);
    document.documentElement.lang = lang;
    i18n.changeLanguage(lang);
  };
  const { t } = useTranslation("translation", { keyPrefix: "NAV.LANG" });
  return (
    <RadioGroup
      value={lang}
      onValueChange={changeLang}
      className="place-items-center w-full p-4"
    >
      <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="en" id="en" />
            <Label htmlFor="en" className="flex gap-2 ">
              <FlagEN className="w-6 h-6 place-self-center" />
              <span className="place-self-center">{t("EN")}</span>
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="pl" id="pl" />
            <Label htmlFor="pl" className="flex gap-2">
              <FlagPL className="w-6 h-6 place-self-center" />
              <span className="place-self-center">{t("PL")}</span>
            </Label>
          </div>
      </div>
    </RadioGroup>
  );
};

export const LangButton = () => {
  const [open, setOpen] = useState(false);
  const lang = i18n.language;
  const { t } = useTranslation("translation", { keyPrefix: "NAV.LANG" });
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="group hover:bg-success text-text hover:bg-opacity-30 transition:colors duration-300 font-semibold px-2 py-1 rounded-2xl h-fit place-self-center flex gap-1"
        >
          <MdLanguage className="w-6 h-6 animate-[fadeIn_500ms_ease-in-out] group-hover:hidden inline" />
          <IoIosArrowDown className="w-6 h-6 animate-[fadeIn_500ms_ease-in-out] group-hover:inline hidden" />
          <span className="underline">{lang}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>{t("LANG")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <LangDropdown />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
