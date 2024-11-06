import { cn } from "@/lib/utils";
import { SidebarCloseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { ChatMessage, RootState } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import {
  addChatMessage,
  setAgreed,
  toggleChatVisibility,
} from "@/reducers/quizReducer";
import { AppDispatch } from "@/store";
import { useEffect, useRef } from "react";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type CardProps = React.ComponentProps<typeof Card>;
function randomId() {
  return Math.random().toString(36);
}
const FormSchema = z.object({
  message: z.string().min(3, "Message is required"),
});
export const ChatBot = ({ className, ...props }: CardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation("translation", {
    keyPrefix: "QUIZ.CHATBOT",
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const visible = useSelector((state: RootState) => state.quiz.chat.visible);
  const messages = useSelector((state: RootState) => state.quiz.chat.messages);
  const agreed = useSelector((state: RootState) => state.quiz.chat.agreed);
  const id = useSelector((state: RootState) => state.quiz.active?._id);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });
  useEffect(() => {
    if (containerRef.current) {
      // containerRef.current.scrollTop = containerRef.current.scrollHeight;
      containerRef.current?.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    const body = { content: data.message, role: "user" } as ChatMessage;
    console.log(messages);
    console.log(data);
    dispatch(addChatMessage(body, id as string, messages));
    form.setValue("message", "");
  };
  return (
    <>
      {visible ? (
        <Card
          className={cn("md:w-[320px] lg:w-[460px] xl:w-[560px] fixed bottom-0 right-0 z-50", className)}
          {...props}
        >
          <CardHeader className="pt-4">
            <CardTitle className="flex justify-between items-center">
              {t("TITLE")}
              <Button
                className="ml-auto"
                variant={"ghost"}
                size={"icon"}
                onClick={() => dispatch(toggleChatVisibility())}
              >
                <SidebarCloseIcon className="-rotate-90" />
              </Button>
            </CardTitle>
            <CardDescription>
              {t("DESCRIPTION")}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* chatbot */}
            <div
              ref={containerRef}
              className="flex flex-col gap-2 max-h-[320px] overflow-y-scroll px-2 thin-scroll"
            >
              {messages.map((message) => (
                <div
                  key={randomId()}
                  className={`flex gap-2 ${
                    message.role === "system" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`bg-primary black:border p-2 rounded-lg ${
                      message.role === "user" && "bg-success bg-opacity-60"
                    }`}
                  >
                    {message.content.length === 0 ? (
                      <div className="h-4 w-12 rounded-full m-0 flex justify-center items-center">
                        <span className="circle"></span>
                        <span className="circle"></span>
                        <span className="circle"></span>
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="w-full">
            {agreed ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="flex gap-2 w-full"
                >
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t("PLACEHOLDER")}
                            className="w-full"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit">{t("SEND")}</Button>
                </form>
              </Form>
            ) : (
              <Button
                className="w-full"
                onClick={() => dispatch(setAgreed(id as string))}
              >
                {t("AGREE")}
              </Button>
            )}
          </CardFooter>
        </Card>
      ) : (
        <div className="w-[240px] fixed -bottom-0.5 right-0">
          <Button
            className="w-full h-2 bg-secondary border text-text text-xs border-b-0 rounded-bl-none rounded-br-none"
            variant={"ghost"}
            onClick={() => dispatch(toggleChatVisibility())}
          >
            {t("TITLE")}
          </Button>
        </div>
      )}
    </>
  );
};
