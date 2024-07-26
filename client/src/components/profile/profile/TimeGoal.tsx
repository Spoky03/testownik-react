import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { MdAutorenew as ResetIcon } from "react-icons/md";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types";
import { setWeeklyGoal } from "@/reducers/statsReducer";
import { AppDispatch } from "@/store";
const FormSchema = z.object({
  goalTime: z.coerce
    .number()
    .min(1)
    .max(60 * 24 * 7, "Goal time should be less than a week"),
});
export const SetTimeGoal = ({
  goalTime,
  setGoalTime,
}: {
  goalTime: number;
  setGoalTime: (time: number) => void;
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      goalTime: goalTime,
    },
  });
  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    setGoalTime(data.goalTime * 60);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex gap-2 w-fit"
      >
        <FormField
          control={form.control}
          name="goalTime"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full items-start rounded-md plac-eself-center relative">
              <FormLabel
                htmlFor="goalTime"
                className="w-full absolute text-xs  duration-300 transform -translate-y-2 scale-75 top-2 z-10 origin-[0] bg-secondary px-2 peer-focus:px-2 peer-focus:text-success  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Goal time (minutes)
              </FormLabel>
              <FormControl>
                <Input
                  id="goalTime"
                  {...field}
                  type="number"
                  placeholder=""
                  className="w-32 block text-sm appearance-none peer"
                  min={0}
                  max={60 * 24 * 7}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="place-self-end">
          <Button type="submit" variant={"outline"} size={"icon"}>
            <Check />
          </Button>
        </div>
      </form>
    </Form>
  );
};
export const TimeGoal = () => {
  const { currentGoalTime, weeklyGoal } = useSelector(
    (state: RootState) => state.stats
  );
  const dispatch = useDispatch<AppDispatch>();
  const setGoalTime = (time: number) => {
    dispatch(setWeeklyGoal(time));
  };
  return (
    <Card>
      <div className="flex flex-col md:flex-row gap-4 p-4 place-items-center">
        {weeklyGoal > 0 ? (
          <div className="flex gap-2 w-full">
            <h3 className="font-semibold basis-fit place-self-center text-nowrap">Weekly Goal</h3>
            <div
              className={`basis-full my-auto h-4 bg-faint rounded-full relative overflow-hidden`}
            >
              <div
                className="bg-success h-full rounded-l-full rounded-r-full transition-all"
                style={{
                  width: `${
                    (Math.min(currentGoalTime, weeklyGoal) / weeklyGoal) * 100
                  }%`,
                }}
              ></div>
              <p className="top-0 left-2 place-content-center h-full absolute text-xs font-semibold">
                {Math.round(currentGoalTime / 60)} minutes
              </p>
              <p className="top-0 right-2 place-content-center h-full absolute text-xs font-semibold">
                {Math.round((weeklyGoal - currentGoalTime) / 60)} minutes
              </p>
            </div>
            <Button
              onClick={() => setGoalTime(0)}
              variant={"ghost"}
              size={"icon"}
              className="basis-fit"
            >
              <ResetIcon size={18} />
            </Button>
          </div>
        ) : (
          <SetTimeGoal goalTime={weeklyGoal} setGoalTime={setGoalTime} />
        )}
      </div>
    </Card>
  );
};
