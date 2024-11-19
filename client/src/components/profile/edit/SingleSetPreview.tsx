import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { Question, QuestionSet, RootState } from "../../../types";
import { DropFiles } from "./DropFiles";
import { GoBackArrow } from "../../shared/GoBackArrow";
import { NewQuestionForm } from "./NewQuestionForm";
import { SingleQuestion } from "./SingleQuestion";
import { MdEdit as EditIcon } from "react-icons/md";
import { MdClose as CancelIcon, MdCheck as CheckIcon } from "react-icons/md";
import { useEffect, useState } from "react";
import { Textarea } from "../../ui/textarea";
import { MdPublicOff as PrivateIcon } from "react-icons/md";
import { MdPublic as PublicIcon } from "react-icons/md";
import { MdAdd as AddIcon } from "react-icons/md";
import {
  deleteOneQuestionSet,
  editQuestionSet,
  switchPrivacyOfSet,
} from "@/reducers/userReducer";
import { AppDispatch } from "@/store";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "../../ui/input";
import userService from "@/services/userService";
import { useToast } from "../../ui/use-toast";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { DeleteConfirmation } from "../../shared/DeleteConfirmation";
import { Separator } from "../../ui/separator";
import { useTranslation } from "react-i18next";
const DatePicker = ({
  date,
  setDate,
  id,
}: {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  id: string;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span className="">Pick a date</span>}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date as Date);
            userService.editQuestionSet({
              metaData: { date: date as Date },
              id: id,
            });
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
function TagsDropdown({
  tags,
  setTags,
  id,
}: {
  tags: string[];
  id: string;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = window.innerWidth > 1024;
  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button>
            <EditIcon className="shrink-0 cursor-pointer place-self-center hover:text-success transition-colors" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} tags={tags} setTags={setTags} id={id} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button>
          <EditIcon className="shrink-0 cursor-pointer place-self-center hover:text-success transition-colors" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} tags={tags} setTags={setTags} id={id} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  // setOpen,
  setTags,
  tags,
  id,
}: {
  setOpen: (open: boolean) => void;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  tags: string[];
  id: string;
}) {
  const { toast } = useToast();
  function toastCallback(type: string) {
    if (type === "success") {
      toast({
        variant: "success",
        title: "Tag removed",
        description: "",
        duration: 1600,
      });
    } else if (type === "destructive") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No duplicates allowed",
        duration: 1600,
      });
    } else if (type === "max") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Max 5 tags allowed",
        duration: 1600,
      });
    }
  }
  return (
    <Command>
      <form
        className="flex p-1 gap-1"
        onSubmit={async (e) => {
          e.preventDefault();
          const input = e.currentTarget.querySelector("input");
          if (input && tags.includes(input.value)) {
            toastCallback("destructive");
            return;
          }
          if (tags.length >= 5) {
            toastCallback("max");
            return;
          }
          if (input && input.value) {
            setTags((currentTags) => {
              const updatedTags = [...currentTags, input.value];
              input.value = "";
              userService.editQuestionSet({
                metaData: { tags: updatedTags },
                id,
              });
              return updatedTags;
            });
          }
        }}
      >
        <Input
          placeholder="Add tags"
          className="border-b border-faint"
          autoFocus
          required
          maxLength={16}
        />
        <Button type="submit" className="w-1/4" size={"icon"} variant="ghost">
          <AddIcon size={24} />
        </Button>
      </form>
      <CommandList>
        <CommandEmpty>No tags found.</CommandEmpty>
        <CommandGroup>
          {tags.map((tag) => (
            <CommandItem
              key={tag}
              className="flex w-full justify-between data-[selected=true]:border cursor-pointer"
              value={tag}
              onSelect={(value) => {
                setTags(tags.filter((t) => t !== value));
                userService.editQuestionSet({
                  metaData: { tags: tags.filter((t) => t !== value) },
                  id,
                });
              }}
            >
              {tag}
              <CancelIcon size={20} />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

const EditDescriptionInput = ({
  singleSet,
  editDescription,
  setEditDescription,
  description,
  setDescription,
}: {
  singleSet: QuestionSet;
  editDescription: boolean;
  setEditDescription: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="flex">
      <Textarea
        value={description}
        className="min-h-12 m-2"
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <div className="flex-col place-self-center">
        <button
          className="cursor-pointer hover:bg-success transition-colors hover:bg-opacity-50 rounded-full p-1"
          onClick={() => {
            setEditDescription(!editDescription);
            dispatch(
              editQuestionSet({
                name: singleSet.name,
                description: description,
                id: singleSet._id,
              })
            );
          }}
        >
          <CheckIcon size={20} />
        </button>
        <button
          className="cursor-pointer hover:bg-success transition-colors hover:bg-opacity-50 rounded-full p-1"
          onClick={() => {
            setEditDescription(!editDescription);
            setDescription(singleSet.description);
          }}
        >
          <CancelIcon size={20} />
        </button>
      </div>
    </div>
  );
};
const SingleSetDetails = ({ set }: { set: QuestionSet }) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "DASHBOARD.SETS.NEW_SET.NEW_QUESTION",
  });
  const [editDescription, setEditDescription] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [subject, setSubject] = useState<string>(set.metaData.subject);
  const [date, setDate] = useState<Date>(set.metaData.date);
  const [tags, setTags] = useState<string[]>(set.metaData.tags);
  useEffect(() => {
    set && setDescription(set.description);
  }, [set]);
  return (
    <div className="flex flex-col gap-1">
      <div className="">
        {editDescription ? (
          <EditDescriptionInput
            singleSet={set}
            editDescription={editDescription}
            setEditDescription={setEditDescription}
            description={description}
            setDescription={setDescription}
          />
        ) : (
          <div className="flex">
            <p className="font-normal">{description}</p>
            <EditIcon
              className="shrink-0 cursor-pointer place-self-center hover:text-success transition-colors "
              onClick={() => setEditDescription(!editDescription)}
            />
          </div>
        )}
      </div>
      <div className="flex gap-1 flex-wrap">
        <div className="flex whitespace-pre h-fit border rounded-2xl px-3 border-faint justify-center w-fit">
          <p className="text-sm opacity-45 place-self-center">{t("QUESTIONS")}</p>
          <p className="text-sm opacity-75">{set.questions.length}</p>
        </div>
        <div className="flex whitespace-pre h-fit border rounded-2xl px-3 border-faint justify-center w-fit">
          <p className="text-sm opacity-45 place-self-center">{t("LIKES")}</p>
          <p className="text-sm opacity-75">{set.likes}</p>
        </div>
        <div className="flex whitespace-pre h-fit border rounded-2xl px-3 border-faint justify-center w-fit">
          <div className="text-sm opacity-75">
            <DatePicker date={date} setDate={setDate} id={set._id} />
          </div>
        </div>
        <div className="flex whitespace-pre h-fit border rounded-2xl px-3 border-faint justify-center w-fit">
          <p className="text-sm opacity-45 place-self-center">{t("SUBJECT")}</p>
          {/* <p className="text-sm opacity-75">{set.metaData.subject || "N/A"}</p> */}
          <input
            type="text"
            value={subject}
            className="max-w-16 text-sm opacity-75 bg-ternary cursor-pointer border-0"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            onBlur={() => {
              userService.editQuestionSet({
                metaData: { subject },
                id: set._id,
              });
            }}
          />
        </div>
        <div className="flex whitespace-pre h-fit border rounded-2xl px-3 border-faint justify-center w-fit">
          <p className="text-sm opacity-45 place-self-center">{t("TAGS")}</p>
          {tags.map((tag) => (
            <p
              key={tag}
              className="flex text-sm opacity-75 text-wrap break-all"
            >
              {tag}
              {", "}
            </p>
          ))}
          <TagsDropdown tags={tags} setTags={setTags} id={set._id} />
        </div>
      </div>
    </div>
  );
};
const NotAuthorized = () => {
  return <h1 className="text-3xl text-error font-semibold">Not authorized</h1>;
};
export const SingleSetPreview = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "DASHBOARD.SETS.NEW_SET",
  });
  const match = useMatch("/profile/sets/:id");
  const userId = useSelector((state: RootState) => state.user.user.sub);
  const [openCreate, setOpenCreate] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const singleSet = useSelector((state: RootState) => {
    return state.user?.user?.questionSets?.find(
      (set: QuestionSet) => set._id === match?.params.id
    );
  });
  if (!singleSet) {
    return <h1>Set not found</h1>;
  }
  const handleDelete = () => {
    window.confirm(
      t("DELETE_CONFIRMATION")
    ) && dispatch(deleteOneQuestionSet(singleSet._id));
  };
  const handlePrivate = () => {
    dispatch(switchPrivacyOfSet(singleSet._id));
  };
  if (singleSet && typeof singleSet.author === "object") {
    if (singleSet.author._id !== userId) {
      return <NotAuthorized />;
    }
  } else if (singleSet && singleSet.author !== userId) {
    return <NotAuthorized />;
  }

  return (
    <div className="flex flex-col place-items-center justify-center align-center w-full gap-5 ">
      <div className="place-self-start">
        <GoBackArrow />
      </div>
      <>
        <div className="flex flex-col font-semibold w-full px-2">
          <div className="flex">
            <h1 className="text-2xl text-wrap break-all w-full">
              {singleSet.name}
            </h1>
            <div className="flex place-items-center gap-2 ">
              <DeleteConfirmation handleDelete={handleDelete} />
              <div
                onClick={handlePrivate}
                className="flex place-items-center gap-2"
              >
                {singleSet.private ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {" "}
                        <PrivateIcon
                          className="hover:text-warning transition-colors duration-300"
                          size={24}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          This set is currently private. Press to publish it.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {" "}
                        <PublicIcon
                          className="hover:text-success transition-colors duration-300"
                          size={24}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This set is public. Press to hide it.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          </div>
          <Separator className="my-2" />
          <SingleSetDetails set={singleSet} />
        </div>
        {openCreate ? (
          <div className="p-2 m-4 gap-2 flex flex-col justify-between w-full border rounded-xl">
            <div className="w-full flex justify-end">
              <CancelIcon
                onClick={() => setOpenCreate(!openCreate)}
                className="cursor-pointer place-self-end bg-error rounded-full"
                size={24}
              />
            </div>
            <div className="w-full place-self-center flex">
              <DropFiles setId={singleSet._id} />
            </div>
            <p className="w-full text-center opacity-75">{t("OR")}</p>
            <div className="w-full place-self-center sm:px-6">
              <NewQuestionForm />
            </div>
          </div>
        ) : (
          <div className="flex flex-col m-4 w-full">
            <Button
              onClick={() => setOpenCreate(!openCreate)}
              className="place-self-center"
              variant="outline"
            >
              {t("ADD_QUESTIONS")}
            </Button>
          </div>
        )}
        <div className="px-2 flex flex-col justify-between w-full">
          <div className="flex flex-col">
            {singleSet.questions.map((question: Question) => {
              return <SingleQuestion key={question._id} question={question} />;
            })}
          </div>
        </div>
      </>
    </div>
  );
};
