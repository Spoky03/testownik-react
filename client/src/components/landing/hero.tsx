import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { AnimatedTyping } from "./AnimatedTyping";
import { PhoneMock } from "./PhoneMock";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Figure } from "./figure";
export const Hero = () => {
  const [mockEffect, setMockEffect] = useState(false);
  const { t } = useTranslation();
  return (
    <section className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-5 p-10 ">
      <div className="flex flex-col col-span-3 gap-4 mt-12">
        {/* <h1 className="text-4xl sm:text-5xl font-bold text-success pt-10 inline">
              {constants.APP_NAME}
            </h1> */}
        {/* <BeerIcon
              size={64}
              className="hover:animate-spin pl-2 place-self-center drop-shadow-xl inline"
            /> */}
        {/* <h2 className="text-xl sm:text-2xl font-bold dark:text-whit pt-5">
              {user ? (
                `${constants.LABELS.HERO.WELCOME_BACK}` + user?.username
              ) : (
                <Link to="/profile" className="animate-pulse">
                  {constants.LABELS.HERO.WELCOME}
                </Link>
              )}
            </h2> */}
        <div className="relative mt-10 h-20 w-full">
          {/* <div className="hidden lg:block bg-success w-48 rounded-md h-12 absolute top-0 right-6"></div> */}
          <Figure />
          <AnimatedTyping className="text-3xl md:text-4xl lg:text-[40px] font-bold" />
        </div>
        <p className="text-lg sm:text-xl dark:text-white place-self-center border-l-2 px-2 border-l-success z-[999]">
          {t("HERO.DESCRIPTION")}
        </p>
        <div className="flex mt-8 gap-5">
          <Link to="/login">
            <Button type="button" className="" onClick={() => {}}>
              Zacznij naukę
            </Button>
          </Link>
          <Link to="/">
            <Button
              type="button"
              variant={"ghost"}
              className=""
              onClick={() => {}}
            >
              Dowiedz się więcej
            </Button>
          </Link>
        </div>
      </div>
      {/* <div className="flex gap-5 place-self-center">
          <Link to="/dashboard" className="place-self-center text-2xl">
            <Button type="button">Quiz</Button>
          </Link>
          <Link to="/browser" className="place-self-center text-2xl">
            <Button type="button">Browse</Button>
          </Link>
          <Link to="/profile/sets" className="place-self-center text-2xl">
            <Button type="button">Edit</Button>
          </Link>
        </div> */}
      <motion.div 
        className={`col-span-2 overflow-x-visible"}`}
        initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              // transition={{
              //   duration: 2,
              //   ease: "easeInOut",
              // }}
              transition={{
                type: "spring",
                damping: 5,
                stiffness: 50,
              }}
              variants={{
                hidden: { translateX: 200 },
                visible: { translateX: 0 },
              }}
              onAnimationComplete={() => {
                setMockEffect(true);
              }}
      >
        <PhoneMock
          className={mockEffect ? "drop-shadow-xl shadow-2xl shadow-success" : ""}
          children={
            <>
              <img
                src="/mock1.png"
                className="dark:hidden w-[272px] h-[572px]"
                alt=""
              />
              <img
                src="/mock1.png"
                className="hidden dark:block w-[272px] h-[572px]"
                alt=""
              />
            </>
          }
        />
      </motion.div>
    </section>
  );
};
