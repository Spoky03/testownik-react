import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { RootState } from "@/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { requestExplanation } from "@/reducers/quizReducer";

export const ExplanationButton = ({
  state,
  active,
}: {
  state: RootState["quiz"]["state"];
  active: RootState["quiz"]["active"];
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleExplanation = () => {
    if (state === "waiting") return;
    if (!active) return;
    dispatch(requestExplanation(active.question, active._id));
    //scroll to bottom
    const explanation = document.getElementById("explanation");
    explanation?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <Button
        className={`flex gap-2 ${
          state === "waiting" ? "cursor-not-allowed" : ""
        }`}
        variant={"outline"}
        disabled={state === "waiting"}
        onClick={handleExplanation}
      >
        <span>Ask for explanation</span>
        <Sparkles size={20} className="shrink-0 place-self-center" />
      </Button>
    </div>
  );
};
