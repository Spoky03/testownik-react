import { MdAutorenew as ResetIcon } from "react-icons/md";
import { AppDispatch } from "@/store";
import { resetSingleProgress } from "@/reducers/userReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
export const ResetProgressButton = ({
  setId,
  setCompleted,
}: {
  setId: string;
  setCompleted?: (value: boolean) => void;
}) => {
  const [effect, setEffect] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const handleReset = async (event?: React.MouseEvent) => {
    event?.stopPropagation();
    setEffect(true);
  };
  const effectCleanup = async () => {
    if (effect) {
      const res = await dispatch(resetSingleProgress(setId));
      if (res) {
        toast({
          variant: "destructive",
          title: "This set could not be reset.",
          description: "Please try again later.",
        });
      }
      setEffect(false);
      setCompleted && setCompleted(false);
    }
  };
  return (
    <ResetIcon
      size={24}
      className={`hover:text-success transition-colors duration-300 ${
        effect && "animate-rotateSemi"
      }`}
      onClick={handleReset}
      onAnimationEnd={effectCleanup}
    />
  );
};
