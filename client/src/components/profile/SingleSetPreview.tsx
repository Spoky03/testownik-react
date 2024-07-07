import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { Question, QuestionSet, RootState } from "../../types";
import { DropFiles } from "./DropFiles";
import { GoBackArrow } from "../GoBackArrow";
import { NewQuestionForm } from "./NewQuestionForm";
import { SingleQuestion } from "./SingleQuestion";
import { MdEdit as EditIcon } from "react-icons/md";
import { MdClose as CancelIcon, MdCheck as CheckIcon } from "react-icons/md";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { editQuestionSet } from "@/reducers/userReducer";
import { AppDispatch } from "@/store";
("use client");

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
import { Input } from "../ui/input";
import userService from "@/services/userService";
import { useToast } from "../ui/use-toast";

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
  setOpen,
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
        className="flex p-1"
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
              userService.editQuestionSet({ tags: updatedTags, id })
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
        <Button type="submit" className="" variant="ghost">
          +
        </Button>
      </form>
      <CommandList>
        <CommandEmpty>No tags found.</CommandEmpty>
        <CommandGroup>
          {tags.map((tag) => (
            <CommandItem
              key={tag}
              className="flex w-full justify-between data-[selected=true]:bg-error data-[selected=true]:bg-opacity-50 cursor-pointer"
              value={tag}
              onSelect={(value) => {
                setTags(tags.filter((t) => t !== value));
                userService.editQuestionSet({ tags: tags.filter((t) => t !== value), id });
              }}
            >
              {tag}<CancelIcon className="opacity-50" />
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
        className="min-h-32 m-2"
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
                description,
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
  const [editDescription, setEditDescription] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>(set.tags);
  useEffect(() => {
    set && setDescription(set.description);
  }, [set]);
  return (
    <div className="flex flex-col gap-1">
      <div className="">
        <p className="text-sm opacity-45 place-self-center">description: </p>

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
          <p className="text-sm opacity-45 place-self-center">questions: </p>
          <p className="opacity-75">{set.questions.length}</p>
        </div>
        <div className="flex whitespace-pre h-fit border rounded-2xl px-3 border-faint justify-center w-fit">
          <p className="text-sm opacity-45 place-self-center">likes: </p>
          <p className="opacity-75">{set.likes}</p>
        </div>
        <div className="flex whitespace-pre h-fit border rounded-2xl px-3 border-faint justify-center w-fit">
          <p className="text-sm opacity-45 place-self-center">tags: </p>
          {tags.map((tag) => (
            <p key={tag} className="flex opacity-75 text-wrap break-all">
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
export const SingleSetPreview = () => {
  const match = useMatch("/profile/sets/:id");
  const singleSet = useSelector((state: RootState) => {
    return state.user?.user?.questionSets?.find(
      (set: QuestionSet) => set._id === match?.params.id
    );
  });

  return (
    <div className="flex flex-col place-items-center justify-center align-center w-full gap-5 ">
      <div className="place-self-start">
        <GoBackArrow />
      </div>
      {singleSet ? (
        <>
          <div className="flex flex-col font-semibold w-full px-2">
            <h1 className="text-2xl text-wrap break-all">{singleSet.name}</h1>
            <SingleSetDetails set={singleSet} />
          </div>
          <DropFiles setId={singleSet._id} />
          <div className="px-2 flex flex-col justify-between w-full">
            <NewQuestionForm />
            <div className="flex flex-col">
              {singleSet.questions.map((question: Question) => {
                return (
                  <SingleQuestion key={question._id} question={question} />
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <h1>Set not found/Not authorized/Loading</h1>
      )}
    </div>
  );
};
