import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { MdAutorenew as ResetIcon } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
    console.log(data);
    setGoalTime(data.goalTime * 60);
  };
  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
          <FormField
            control={form.control}
            name="goalTime"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full items-start rounded-md relative">
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
export const TimeGoal = ({ currentTime }: { currentTime: number }) => {
  //   const timeLeft = goalTime - currentTime;
  //   const timeLeftInMinutes = timeLeft / 60;
  const [goalTime, setGoalTime] = useState(0);

  return (
    <Card>
      <div className="flex flex-col md:flex-row gap-4 p-4 items-center">
        <h3 className="font-semibold basis-fit text-nowrap">Weekly Goal</h3>
        {goalTime > 0 ? (
          <div className="flex w-full">
            <div
              className={`basis-full my-auto h-4 bg-faint rounded-full relative overflow-hidden`}
            >
              <div
                className="bg-success h-full rounded-l-full rounded-r-full transition-all"
                style={{
                  width: `${
                    (Math.min(currentTime, goalTime) / goalTime) * 100
                  }%`,
                }}
              ></div>
              <p className="top-0 left-2 place-content-center h-full absolute text-xs font-semibold">
                {Math.round(currentTime / 60)} minutes
              </p>
              <p className="top-0 right-2 place-content-center h-full absolute text-xs font-semibold">
                {Math.round((goalTime - currentTime) / 60)} minutes
              </p>
            </div>
            <Button onClick={() => setGoalTime(0)} variant={"ghost"} size={"icon"} className="basis-fit">
              <ResetIcon size={18} />
            </Button>
          </div>
        ) : (
          <SetTimeGoal goalTime={goalTime} setGoalTime={setGoalTime} />
        )}
      </div>
    </Card>
  );
};
