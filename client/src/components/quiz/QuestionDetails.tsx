import { RootState } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSelector } from "react-redux";
import ReactStars from "../shared/Stars";
import { useToast } from "../ui/use-toast";
import userService from "@/services/userService";
import { useEffect, useState } from "react";
export const QuestionDestails = () => {
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
        <CardTitle className="text-xl font-bold">Question details</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Users difficulty rating: </p>
          <ReactStars
            count={5}
            value={difficultyRating}
            size={24}
            edit={false}
            onChange={VoteDifficulty}
          />
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <p className="text-xs">Total votes: {difficulty?.length} </p>
        <p className="text-xs">Average: ({difficultyRating})</p>

      </CardFooter>
    </Card>
  );
};
