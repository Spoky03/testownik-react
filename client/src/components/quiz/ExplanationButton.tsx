import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { RootState } from "@/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { requestExplanation } from "@/reducers/quizReducer";

export const ExplanationButton = ({
  state,
  active,
  variant,
}: {
  state: RootState["quiz"]["state"];
  active: RootState["quiz"]["active"];
  variant: "button" | "link";
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleExplanation = () => {
    if (state === "waiting") return;
    if (!active) return;
    dispatch(requestExplanation(active._id));
    //scroll to bottom
    const explanation = document.getElementById("explanation");
    explanation?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      {variant === "button" ? (
        <Button
          className={`flex gap-2 ${
            state === "waiting" ? "cursor-not-allowed" : ""
          }`}
          variant={"outline"}
          disabled={state === "waiting"}
          onClick={handleExplanation}
        >
          <span>Explanation</span>
          <Sparkles
            size={20}
            className="shrink-0 place-self-center hidden sm:block"
          />
        </Button>
      ) : (
        <>
          <button
            className={`text-success hover:underline ${
              state === "waiting" ? "cursor-not-allowed" : ""
            }`}
            disabled={state === "waiting"}
            onClick={handleExplanation}
          >
            Show the Explanation
          </button>
          {state === "waiting" && <p className="text-xs opacity-80">becomes available after answering current question</p>}
        </>
      )}
    </div>
  );
};
