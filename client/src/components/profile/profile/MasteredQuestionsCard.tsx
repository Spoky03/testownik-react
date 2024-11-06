import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { Card } from "@/components/ui/card";
import { RootState } from "@/types";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export const MasteredQuestionsCard = () => {
  const { t } = useTranslation("translation", { keyPrefix: "DASHBOARD.PROFILE.MASTERED" });
  const totalMastered = useSelector(
    (state: RootState) => state.stats.totalMastered
  );
  return (
    <Card className="basis-full p-4">
      <div className="flex justify-between gap-2">
        <div className="">
          <h3 className="text-2xl font-semibold">{t("TITLE")}</h3>
          <p className="text-sm opacity-60">
            {t("DESCRIPTION")}
            <span>
              {totalMastered > 50 ? " 🔥" : totalMastered > 25 ? " 👍" : " 👀"}
            </span>
          </p>
        </div>
        <p className="text-4xl font-bold place-self-center">
          <AnimatedCounter from={0} to={totalMastered} animationOptions={{ease: "circOut", duration: 3}} />
        </p>
      </div>
    </Card>
  );
};
