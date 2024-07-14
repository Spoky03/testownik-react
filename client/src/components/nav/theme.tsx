import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { RxReader } from "react-icons/rx";
import { WiMoonAltFirstQuarter } from "react-icons/wi";
import { Label } from "../ui/label";
import { useTranslation } from "react-i18next";
const ThemeIcon = ({ position }: { position: string }) => {
    const style = "w-6 h-6";
    switch (position) {
      case "light":
        return <MdLightMode className={style} />;
      case "dark":
        return <MdDarkMode className={style} />;
      case "black":
        return <WiMoonAltFirstQuarter className={style} />;
      case "oak":
        return <RxReader className={style} />;
      default:
        return <MdLightMode className={style} />;
    }
  };
  
export const ThemeDropdown = ({
    position,
    setPosition,
  }: {
    position: string;
    setPosition: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    const {t} = useTranslation('translation', { keyPrefix: 'NAV.THEME' });
    return (
      <DropdownMenuRadioGroup
        value={position}
        onValueChange={setPosition}
        className=""
      >
        <DropdownMenuRadioItem value="light">
          {t("LIGHT")}
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="dark">{t("DARK")}</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="black">{t("BLACK")}</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    );
  };
  export const ThemeDropdownMobile = ({
    position,
    setPosition,
  }: {
    position: string;
    setPosition: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    const {t} = useTranslation('translation', { keyPrefix: 'NAV.THEME' });
    return (
      <RadioGroup
        value={position}
        onValueChange={setPosition}
        className="flex justify-around p-4"
      >
        <div className="flex gap-2">
          <RadioGroupItem value="light" id="light" />
          <Label htmlFor="light">{t("LIGHT")}</Label>
        </div>
        <div className="flex gap-2">
          <RadioGroupItem value="dark" id="dark" />
          <Label htmlFor="dark">{t("DARK")}</Label>
        </div>
        <div className="flex gap-2">
          <RadioGroupItem value="black" id="black" />
          <Label htmlFor="black">{t("BLACK")}</Label>
        </div>
      </RadioGroup>
    );
  };

  export const ThemeButton = ({
    position,
    setPosition,
  }: {
    position: string;
    setPosition: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    const {t} = useTranslation('translation', { keyPrefix: 'NAV.THEME' });
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            role="button"
            className="rounded-full px-3 place-self-center hover:bg-success hover:bg-opacity-30 transition:colors duration-300 font-semibold"
          >
            <ThemeIcon position={position} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
          <DropdownMenuLabel>{t("THEME")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ThemeDropdown position={position} setPosition={setPosition} />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };