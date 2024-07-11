import { Hero } from "./hero";
import { Facts } from "./facts";
import { InfoPicker } from "./infoPicker";
import { useTranslation } from "react-i18next";

export const LandingPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col place-items-center mt-4 gap-20 space-y-20">
      <p>{t('Welcome to React')}</p>
      <Hero />
      <Facts />
      <InfoPicker />
    </div>
  );
};
