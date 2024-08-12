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
export const QuestionDestails = () => {
  const difficulty = 3.5;
  return (
    <Card className="p-2 max-w-4xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Question details</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Users difficulty rating: </p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="stars-container container bg-faint">
                <div className={`stars-container bg-success`}
                    style={{ width: `${difficulty * 20}%` }}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className="text-2xl">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Difficulty: {difficulty}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
      <CardFooter>
        <p className="text-xs">This is a footer</p>
      </CardFooter>
    </Card>
  );
};
