import { MdLink as LinkIcon } from "react-icons/md";
import { FaHeart as LikeIcon } from "react-icons/fa";
import { FaBookmark as MarkIcon } from "react-icons/fa";
import { QuestionSet, RootState, SetListTypes } from "../../types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
const CopyLinkButton = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/browser/${id}`);
    toast({
      variant: "success",
      title: "Link copied to clipboard!",
      description: "",
      duration: 1600,
    })
  }
  return (
    <LinkIcon
      size={24}
      className="hover:text-success transition-colors duration-300 place-self-end"
      onClick={copyLink}
    />
  );
};
export const Socials = ({
  set,
  handleBookmark,
  type,
  handleLike,
}: {
  set: QuestionSet;
  type: SetListTypes;
  handleBookmark: () => Promise<void>;
  handleLike: (event: React.MouseEvent, id: string) => void;
}) => {
  const {bookmarks, user} = useSelector((state: RootState) => state.user);
  const [bookmarked, setBookmarked] = useState(false);
  useEffect(() => {
    if (bookmarks.includes(set._id)) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  }, [bookmarks, set._id]);
  return (
    <div className="flex place-items-center">
      <div className="flex gap-4 mr-2">
        <div className="rounded-full relative p-1 hover:bg-success hover:bg-opacity-30">
        <LikeIcon
          size={18}
          className={`transition-colors outline-2 duration-300  ${set.liked ? "text-red-500" : ""}`}
          onClick={(event) => handleLike(event, set._id)}
        />
        <span className="absolute right-0 top-3">{set.likes}</span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="rounded-full p-1 hover:bg-success hover:bg-opacity-30">
              <MarkIcon
                size={18}
                className={` transition-colors duration-300 ${
                  bookmarked
                    ? "text-amber-500 hover:text-amber-400"
                    : ""
                }`}
                onClick={handleBookmark}
              />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bookmark</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {type === SetListTypes.MODAL && <CopyLinkButton id={set._id} />}
      </div>
    </div>
  );
};
