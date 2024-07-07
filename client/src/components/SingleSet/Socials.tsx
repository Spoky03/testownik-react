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
import { useSelector } from "react-redux";
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
    });
  };
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
  handleBookmark: (event: React.MouseEvent, id: string) => void;
  handleLike: (event: React.MouseEvent, id: string) => void;
}) => {
  const { bookmarks, user } = useSelector((state: RootState) => state.user);
  const [bookmarked, setBookmarked] = useState(false);
  const loggedIn = !!user.sub;
  useEffect(() => {
    if (bookmarks.includes(set._id)) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  }, [bookmarks, set._id]);
  return (
    <div className="flex justify-between h-fit">
      <div className="flex gap-1 mr-2">
        <button
          className="rounded-full p-1 hover:bg-success hover:bg-opacity-30"
          onClick={(event) => handleLike(event, set._id)}
          disabled={!loggedIn}
        >
          <div className="flex rounded-xl gap-1 p-1 px-2 border border-faint">
            <LikeIcon
              size={18}
              className={`transition-colors outline-2 duration-300  ${
                set.liked ? "text-red-500" : ""
              }`}
            />
            <span className="text-sm">{set.likes}</span>
          </div>
        </button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="rounded-full p-1 hover:bg-success hover:bg-opacity-30"
                onClick={(event) => handleBookmark(event, set._id)}
                disabled={!loggedIn}
              >
                <MarkIcon
                  size={18}
                  className={` transition-colors duration-300 ${
                    bookmarked ? "text-amber-500 hover:text-amber-400" : ""
                  }`}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bookmark</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {type === SetListTypes.MODAL && <CopyLinkButton id={set._id} />}
      </div>
      <div className="flex flex-wrap place-self-center overflow-x-hidden gap-1">
        {set.tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-2 py-1 text-xs bg-primary text-white light:text-text`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};