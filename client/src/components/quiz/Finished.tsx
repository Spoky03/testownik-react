import { Modal } from "@/components/shared/Modal";
import { useTranslation } from "react-i18next";
import { IoBeerSharp as BeerIcon } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export const Finished = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", {
    keyPrefix: "QUIZ.FINISH",
  });

  const closeCallback = () => {
    setOpen(false);
    navigate("/");
  };
  return (
    <>
      <Modal
        open={open}
        setOpen={closeCallback}
        cancelAction={() => navigate("/profile")}
        cancelText={t("OK")}
        content={
          <div className="flex flex-col gap-5 items-center bg-ternary p-5">
            <div className="text-success text-center font-bold">{t('TITLE')}</div>
            <BeerIcon size={64} />
            <p className="text-center">
              {t('DESCRIPTION')}
            </p>
          </div>
        }
      />
    </>
  );
};
