import { Hero } from "./hero";
import { Facts } from "./facts";
import { InfoPicker } from "./infoPicker";

export const LandingPage = () => {
  return (
    <div className="flex flex-col place-items-center mt-4 gap-20 space-y-20">
      <Hero />
      <Facts />
      <InfoPicker />
    </div>
  );
};
