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
export const Explanation = () => {
  const { explanation, active, state } = useSelector(
    (state: RootState) => state.quiz
  );
  const [OpenReportModal, setOpenReportModal] = useState(false);
  const { t } = useTranslation("translation", {
    keyPrefix: "QUIZ.EXPLANATION",
  });
  return (
    <Card className="p-4 max-w-4xl">
      <CardHeader>
        <CardTitle>{active?.question}</CardTitle>
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
            <div className="mt-1 sm:mt-5">
              <button className="flex items-center " onClick={() => setOpenReportModal(true)}>
                <IoFlag className="text-error" size={24} />
                <p className="pl-1 text-error hover:underline">
                  Report this explanation
                </p>
              </button>
            </div>
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
      <Modal open={false} setOpen={setOpenReportModal} content={<div>Report</div>} />
    </Card>
  );
};
