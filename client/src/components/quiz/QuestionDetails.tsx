import { RootState } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useSelector } from "react-redux";
import ReactStars from "../shared/Stars";
import { useToast } from "../ui/use-toast";
import userService from "@/services/userService";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
export const QuestionDestails = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "QUIZ.DETAILS",
  });
  const difficulty = useSelector(
    (state: RootState) => state.quiz.active?.difficulty
  );
  const id = useSelector((state: RootState) => state.quiz.active?._id);
  const [difficultyRating, setDifficultyRating] = useState<number>(
    difficulty?.value || 0
  );
  useEffect(() => {
    setDifficultyRating(difficulty?.value || 0);
  }, [difficulty]);
  const { toast } = useToast();
  const VoteDifficulty = async (value: number) => {
    try {
      await userService.voteDifficulty(id || "", value);
      toast({
        title: "Vote submitted",
        description: "Thank you for submitting your vote",
      });
      setDifficultyRating(value);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while submitting your vote",
        variant: "destructive",
      });
    }
  };
  return (
    <Card className="p-2 max-w-4xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{t("TITLE")}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{t("DESCRIPTION")}</p>
          <ReactStars
            count={5}
            value={difficultyRating}
            size={24}
            edit={false}
            onChange={VoteDifficulty}
          />
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <p className="text-xs">{t("TOTAL")}{difficulty?.length} </p>
        <p className="text-xs">{t("AVERAGE")}({difficultyRating})</p>

      </CardFooter>
    </Card>
  );
};
