import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/types";
import Markdown from "react-markdown";
import { ExplanationButton } from "./ExplanationButton";
import { useTranslation } from "react-i18next";
import { IoFlag } from "react-icons/io5";
import { Modal } from "../shared/Modal";
import { useState } from "react";
import { ReportExplanation } from "./ReportExplanation";
import { FiTriangle } from "react-icons/fi";
export const Explanation = () => {
  const { explanation, active, state } = useSelector(
    (state: RootState) => state.quiz
  );
  const [OpenReportModal, setOpenReportModal] = useState(false);
  const { t } = useTranslation("translation", {
    keyPrefix: "QUIZ.EXPLANATION",
  });
  return (
    <Card className="p-4 max-w-4xl w-full">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="w-full">{active?.question}</CardTitle>
        {explanation.visible && (
          <div className="flex justify-end w-full group">
            <button
              className="flex items-center "
              onClick={() => setOpenReportModal(true)}
            >
              <IoFlag className="text-error" size={24} />
              <p className="pl-1 text-error group-hover:block hidden font-semibold">
                Report this explanation
              </p>
            </button>
            {(active?.report && active?.report > 0) && (
              <div className="ml-2 text-lg text-error">
                <p className="font-semibold">
                  ({active?.report})
                </p>
              </div>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {!explanation.visible && (
          <>
            <ExplanationButton variant="link" state={state} active={active} />
          </>
        )}
        {explanation.visible && explanation.content.length > 0 && (
          <>
            {/* <p className="font-medium text-lg mb-2">Explanation: </p> */}
            <Markdown children={explanation.content} />
          </>
        )}
        {explanation.visible && explanation.content.length === 0 && (
          <>
            <p className="font-medium text-lg mb-2">Answer: </p>
            <Skeleton className="w-3/4 h-[16px] rounded-md mb-2" />
            <p className="font-medium text-lg mb-2">Explanation: </p>
            <Skeleton className="w-3/4 h-[16px] rounded-md mb-2" />
            <Skeleton className="w-full h-[48px] rounded-md" />
          </>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-wrap text-xs">
          <strong>{t("DISCLAIMER.TITLE")}</strong>
          {t("DISCLAIMER.DESCRIPTION")}
        </p>
      </CardFooter>
      <Modal
        open={OpenReportModal}
        setOpen={setOpenReportModal}
        content={<ReportExplanation />}
      />
    </Card>
  );
};
