import { TypeAnimation } from "react-type-animation";
import constants from "@/constants";
const CURSOR_CLASS_NAME = 'custom-type-animation-cursor';
export const AnimatedTyping = ({className} : {className?:string}) => {
  return (
    <>
    <TypeAnimation
      sequence={
        constants.LABELS.HERO.ANIMATED.map((label) => {
          return [
            (el : HTMLElement | null) => {
              if (el) {
                el.classList.add(CURSOR_CLASS_NAME);
              }
            },
            label,
            (el : HTMLElement | null) => {
              if (el) {
                el.classList.remove(CURSOR_CLASS_NAME);
              }
            },
            6000,
          ];
        }).flat()
      }
      wrapper="h2"
      speed={40}
      className={`inline-block z-100 relative break-words ${className} ${CURSOR_CLASS_NAME}`}
      repeat={Infinity}
      cursor={false}
    />
    </>
  );
};
