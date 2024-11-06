import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { IoMdBook } from "react-icons/io";
import { MdOutlineMoneyOff } from "react-icons/md";
import { useTranslation } from "react-i18next";
function InnerContent({ title, content, links, annotation }: ContentProps) {
  const randomKeyUsedToForceRerender = Math.random();
  return (
    <div
      className="text-base leading-relaxed space-y-4 px-12 md:px-0 py-12 max-w-xl min-h-80"
      key={randomKeyUsedToForceRerender}
    >
      <p className="font-medium text-lg">{title}</p>
      <ul className="space-y-1">
        {content.map((item, index) => (
          <li key={item} className="flex items-center gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { opacity: 1, transform: "translateX(0)" },
                hidden: { opacity: 0, transform: "translateX(100px)" },
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
                delay: 0.2 * index,
              }}
              className="inline-flex items-center gap-2"
            >
              <FaCheck className="text-success" />
              {item}
            </motion.div>
          </li>
        ))}
      </ul>
      <div className="pt-3 flex items-center gap-6 text-sm font-semibold">
        {links?.map((link, index) => (
          <span key={index}>
            <a href={link.url} target="_blank" className="link">
              {link.name}
            </a>
          </span>
        ))}
      </div>
      <div className="text-sm opacity-60 pt-2">{annotation}</div>
    </div>
  );
}

function ButtonIcon({ title, icon, active, setActive, id }: ButtonIcon) {
  return (
    <button
      className={`flex flex-col items-center justify-center gap-3 select-none cursor-pointer p-2 duration-200 ${
        id === active ? "text-success" : "hover:opacity-95 opacity-60"
      }`}
      onClick={() => setActive(id)}
    >
      <span className="">
        {typeof icon === "function" ? icon({ size: 34 }) : icon}
      </span>
      <span className="font-medium text-sm">{title}</span>
    </button>
  );
}
export const InfoPicker = ({ id }: { id?: string }) => {
  const [active, setActive] = useState<number>(0);
  const { t } = useTranslation("translation", {
    keyPrefix: "HERO.INFO_PICKER",
  });
  const Content = [
    {
      id: 0,
      title: t("ITEMS.0.title"),
      content: [
        t("ITEMS.0.content.0"),
        t("ITEMS.0.content.1"),
        t("ITEMS.0.content.2"),
      ],
      annotation: <span className="font-light">{t("ITEMS.0.annotation")}</span>,
      icon: IoMdBook,
    },
    {
      id: 1,
      title: t("ITEMS.1.title"),
      content: [
        t("ITEMS.1.content.0"),
        t("ITEMS.1.content.1"),
        t("ITEMS.1.content.2"),
      ],
      annotation: <span className="font-light">{t("ITEMS.1.annotation")}</span>,
      icon: MdOutlineMoneyOff,
    },
    {
      id: 2,
      title: t("ITEMS.2.title"),
      content: [
        t("ITEMS.2.content.0"),
        t("ITEMS.2.content.1"),
      ],
      annotation: (
        <span className="font-light">
          {t("ITEMS.2.annotation")}
        </span>
      ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
      ),
    },
    {
      id: 3,
      title: t("ITEMS.3.title"),
      content: [
        t("ITEMS.3.content.0"),
        t("ITEMS.3.content.1"),
        t("ITEMS.3.content.2"),
      ],
      annotation: (
        <span className="font-light">
          {t("ITEMS.3.annotation")}
        </span>
      ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
          ></path>
        </svg>
      ),
    },
    {
      id: 4,
      title: t("ITEMS.4.title"),
      content: [
        t("ITEMS.4.content.0"),
        t("ITEMS.4.content.1"),
        t("ITEMS.4.content.2"),
      ],
      annotation: (
        <span className="font-light">
          {t("ITEMS.4.annotation")}
        </span>
      ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          ></path>
        </svg>
      ),
    },
    {
      id: 5,
      title: t("ITEMS.5.title"),
      content: [
        t("ITEMS.5.content.0"),
        t("ITEMS.5.content.1"),
        t("ITEMS.5.content.2"),
      ],
      annotation: (
        <span className="font-light">
          {t("ITEMS.5.annotation")}
        </span>
      ),
      icon: (
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 320"
          className="w-8 h-8"
          fill="currentColor"
        >
          <path
            id="XMLID_12_"
            d="M160,0C91.075,0,35,56.075,35,125c0,39.627,18.545,76.425,50,100.005V245v60c0,8.284,6.716,15,15,15h120
    c8.284,0,15-6.716,15-15v-60v-19.995c31.455-23.58,50-60.378,50-100.005C285,56.075,228.925,0,160,0z M205,290h-90v-30h90V290z
     M211.807,204.638c-4.246,2.768-6.807,7.495-6.807,12.564V230h-30v-60h15c8.284,0,15-6.716,15-15s-6.716-15-15-15h-60
    c-8.284,0-15,6.716-15,15s6.716,15,15,15h15v60h-30v-12.797c0-5.069-2.561-9.796-6.807-12.564C81.147,187.001,65,157.23,65,125
    c0-52.383,42.617-95,95-95s95,42.617,95,95C255,157.23,238.852,187.001,211.807,204.638z"
          />
        </svg>
      ),
    },
    {
      id: 6,
      title: t("ITEMS.6.title"),
      content: [
        t("ITEMS.6.content.0"),
        t("ITEMS.6.content.1"),
        t("ITEMS.6.content.2"),
      ],
      links: [
        {
          name: t("ITEMS.6.links.0.name"),
          url: t("ITEMS.6.links.0.url"),
        },
        {
          name: t("ITEMS.6.links.1.name"),
          url: t("ITEMS.6.links.1.url"),
        },
      ],
      annotation: (
        <span className="font-light">
          {t("ITEMS.6.annotation")}{" "}
        </span>
      ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
    },
  ];
  return (
    <section className="overflow-x-hidden h-full flex flex-col" id={id}>
      <div className="w-full max-w-5xl items-center justify-center place-self-center px-6 sm:px-10 md:px-16 xl:px-24">
        <p className="mb-1">{""}</p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          {t("TITLE")}
        </h2>
        <div className="text-base leading-relaxed mb-8 mt-4 lg:text-lg">
          {t("DESCRIPTION")}
        </div>
        <div className="grid grid-cols-4 md:flex justify-start gap-4 md:gap-12 max-md:px-8 max-w-3xl mx-auto mb-8">
          {Content.map((item) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { opacity: 1, transform: "translateX(0)" },
                hidden: { opacity: 0, transform: "translateX(100px)" },
              }}
              transition={{
                duration: 0.15,
                ease: "easeInOut",
                delay: 0.1 * item.id,
              }}
            >
              <ButtonIcon
                id={item.id}
                title={item.title}
                icon={item.icon}
                active={active}
                setActive={setActive}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="bg-primary black:bordet-y-white black:border-y w-screen">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-center md:justify-start md:items-center gap-12">
          <InnerContent {...Content[active]} />
          <div className="hidden aspect-square max-md:w-full md:h-[28rem] bg-neutral md:order-first"></div>
        </div>
      </div>
    </section>
  );
};
interface ContentProps {
  id: number;
  title: string;
  content: string[];
  links?: { name: string; url: string }[];
  annotation: ReactNode;
  icon: ReactNode | IconType;
}

type IconProps = Pick<ContentProps, "id" | "title" | "icon">;

interface ButtonIcon extends IconProps {
  active: number;
  setActive: (id: number) => void;
}
