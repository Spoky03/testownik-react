import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { IoMdBook } from "react-icons/io";
import { MdOutlineMoneyOff } from "react-icons/md";
function InnerContent({ title, content, links, annotation, exclamated }: ContentProps) {
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
        <li className="flex items-center gap-2 text-accent font-medium">
          {exclamated}
        </li>
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
        {typeof icon === "function" ? 
        icon({size: 34 })
         : icon}
      </span>
      <span className="font-medium text-sm">{title}</span>
    </button>
  );
}
export const InfoPicker = ({ id }: { id?: string }) => {
  const [active, setActive] = useState<number>(0);
  return (
    <section className="overflow-x-hidden h-full flex flex-col" id={id}>
      <div className="w-full max-w-5xl items-center justify-center place-self-center px-6 sm:px-10 md:px-16 xl:px-24">
        <p className="mb-1">{Main.short}</p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          {Main.heading}
        </h2>
        <div className="text-base leading-relaxed mb-8 mt-4 lg:text-lg">
          {Main.description}
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
const Main = {
  short: "",
  heading: "Dlaczego warto korzystać z naszej platformy?",
  description: "Zapoznaj się z naszymi funkcjami, dowiedz się dlaczego warto korzystać z naszej platformy i zapisz się już dziś! A jeśli masz jakieś sugestie, daj nam znać! ",
}
const Content = [
  {
    id: 0,
    title: "Wiedza",
    content: [
      "Potężne narzędzie do nauki",
      "Dostęp do wielu testów",
      "Usystematyzowane materiały",
    ],
    annotation: (
      <span className="font-light">
        Nauka nigdy nie była tak prosta, zapisz się już dziś i zacznij
      </span>
    ),
    icon: IoMdBook,
  },
  {
    id: 1,
    title: "Darmowe",
    content: ["Nie pobieramy opłat", "Bez ukrytych kosztów"],
    exclamated: "*Na zawsze za darmo",
    annotation: (
      <span className="font-light">
        *Prawdopodobnie
      </span>
    ),
    icon: MdOutlineMoneyOff,
  },
  {
    id: 2,
    title: "Profil",
    content: ["Śledź swoje postępy", "Ustanawiaj cele"],
    annotation: (
      <span className="font-light">
        Nie musisz się martwić o, że zapomnisz o nauce!
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
    title: "Zapisuj",
    content: ["Zapisuj swoje postępy", "Śledź swoje wyniki"],
    exclamated: "Na wielu urządzeniach",
    annotation: (
      <span className="font-light">
        Wszystko zapisuje się automatycznie, nie musisz się martwić o utratę postępów
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
    title: "Wyszukuj",
    content: ["Wyszukuj bazy tworzone przez innych", "Udostępniaj swoje"],
    annotation: (
      <span className="font-light">
        Twórz społeczność, dziel się wiedzą z innymi
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
    title: "Treści",
    content: ["Treści tworzone z dbałością przez użytkowników",
      "Dostęp do wielu testów"],
    annotation: (
      <span className="font-light">
        Dziel się swoją wiedzą z innymi, twórz treści dla innych
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
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        ></path>
      </svg>
    ),
  },
  {
    id: 6,
    title: "Więcej",
    content: ["Ciągły rozwój", "Nowe funkcje wkrótce"],
    exclamated: "Jeśli masz pomysł albo sugestie, daj znać ⇩",
    links: [
      {
        name: "Formularz kontaktowy",
        url: "https://www.google.com/",
      },
      {
        name: "Email",
        url: "mailto:PLACEHOLDER@gmail.com",
      },
    ],
    annotation: (
      <span className="font-light">
        Jesteśmy otwarci na wszelkie propozycje, skontaktuj się z nami
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
interface ContentProps {
  id: number;
  title: string;
  content: string[];
  exclamated?: string;
  links?: { name: string; url: string }[];
  annotation: ReactNode;
  icon: ReactNode | IconType;
}

type IconProps = Pick<ContentProps, 'id' | 'title' | 'icon'>;

interface ButtonIcon extends IconProps {
  active: number;
  setActive: (id: number) => void;
}
