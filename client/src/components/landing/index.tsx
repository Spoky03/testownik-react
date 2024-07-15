import { Hero } from "./hero";
import { Facts } from "./facts";
import { InfoPicker } from "./infoPicker";
import { BrowserRedirect } from "./browserRedirect";

export const LandingPage = () => {
  return (
    <div className="flex flex-col place-items-center mt-4 gap-20 space-y-20 overflow-x-hidden  mb-20">
      <Hero id="home" />
      <Facts id="facts" />
      <InfoPicker id="info" />
      <BrowserRedirect id="browserInfo" />
    </div>
  );
};
