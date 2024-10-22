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
import { useState } from "react";
import { Input } from "../ui/input";

const messages = [
  {
    id: 1,
    text: "Hello",
    sender: "bot",
  },
  {
    id: 2,
    text: "How are you?",
    sender: "bot",
  },
  {
    id: 3,
    text: "I'm fine, thank you",
    sender: "user",
  },
  {
    id: 4,
    text: "What can I help you with?",
    sender: "bot",
  },
];
type CardProps = React.ComponentProps<typeof Card>;

export const ChatBot = ({ className, ...props }: CardProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {visible ? (
        <Card
          className={cn("w-[380px] fixed bottom-0 right-0", className)}
          {...props}
        >
          <CardHeader>
            <CardTitle className="flex justify-between">
              Chat
              <Button
                className="ml-auto"
                variant={"ghost"}
                size={"icon"}
                onClick={() => setVisible(false)}
              >
                <SidebarCloseIcon className="-rotate-90" />
              </Button>
            </CardTitle>
            <CardDescription>Ask about more details regarding your question.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* chatbot */}
            <div className="flex flex-col gap-2">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-2 ${message.sender==="bot" ? "justify-start" : "justify-end"}`}>
                  <div className={`bg-primary black:border p-2 rounded-lg ${message.sender==="user" && "bg-success bg-opacity-80"}`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="w-full">
            <div className="flex gap-2 w-full">
              <Input placeholder="Type a message" />
              <Button>Send</Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <div className="w-[240px] fixed -bottom-0.5 right-0">
          <Button
            className="w-full h-2 bg-secondary border text-text text-xs border-b-0 rounded-bl-none rounded-br-none"
            variant={"ghost"}
            onClick={() => setVisible(true)}
          >
            Chat
          </Button>
        </div>
      )}
    </>
  );
};
