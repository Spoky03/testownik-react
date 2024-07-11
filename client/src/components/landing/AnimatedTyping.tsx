import { TypeAnimation } from "react-type-animation";
import constants from "@/constants";

export const AnimatedTyping = ({className} : {className?:string}) => {
  return (
    <TypeAnimation
      sequence={constants.LABELS.HERO.ANIMATED}
      wrapper="h2"
      speed={55}
      className={`inline-block z-[100] relative break-words ${className}`}
      repeat={Infinity}
    />
  );
};
