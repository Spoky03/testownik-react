// import { IoBeerSharp as BeerIcon } from "react-icons/io5";
import { motion } from "framer-motion";
import { IconType } from "react-icons/lib";
import { MdGroups } from "react-icons/md";
import { MdLightbulb } from "react-icons/md";
import { IoMdQuote } from "react-icons/io";
import { useTranslation } from "react-i18next";
const DescriptionCard = ({
  className,
  props,
}: {
  className?: string;
  props: CardProps;
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'HERO.FACTS.ITEMS' });
  return (
    <motion.div
      className={`w-full hover:scale-105 transition-all bg-secondary border-text black:border shadow-md rounded-xl ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { opacity: 1, transform: "translateY(0)"},
        hidden: { opacity: 0, transform: "translateY(100px)"}
      }}
      transition={{ duration: 0.35, ease: "easeInOut", delay: 0.5*props.id }}
    >
      <div className="flex flex-col justify-around gap-4 p-4 md:p-6 h-full">
        <div className="flex gap-2">
          <props.icon size={32} className="place-self-center" />
          <h2 className="text-xl font-bold">{t(props.title)}</h2>
        </div>
        <p className="text-base">{t(props.description)}</p>
        <p className="text-xs opacity-50 text-text place-self-end">
          {t(props.annotation)}
        </p>
      </div>
    </motion.div>
  );
};
export const Facts = ({id}: {id?: string}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'HERO.FACTS' });
  return (
    <section className="max-w-7xl w-full p-10 mt-20" id={id}>
      <h3 className="text-2xl pl-4 pb-4 font-bold col-span-3">
        {t('TITLE')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 sm:gap-6 md:gap-8">
        {Cards.map((card: CardProps) => (
          <DescriptionCard
            key={card.id * Math.random()}
            props={card}
            className="col-span-1"
          />
        ))}
      </div>
    </section>
  );
};

interface CardProps {
  title: string;
  id: number;
  description: string;
  annotation: string;
  icon: IconType;
}
const Cards = [
  {
    title: "0.title",
    id: 0,
    description:
      "0.description",
    annotation: "0.annotation",
    icon: MdGroups,
  },
  {
    title: "1.title",
    id: 1,
    description:
      "1.description",
    annotation: "1.annotation",
    icon: MdLightbulb,
  },
  {
    title: "2.title",
    id: 2,
    description:
      "2.description",
    annotation: "2.annotation",
    icon: IoMdQuote,
  },
];
