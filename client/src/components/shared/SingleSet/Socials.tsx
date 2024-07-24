import { MdLink as LinkIcon } from "react-icons/md";
import { QuestionSet, RootState } from "@/types";
import { HeartIcon, Bookmark } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useToast } from "../../ui/use-toast";
import { AppDispatch } from "@/store";
import { likeSet } from "@/reducers/browserReducer";
const CopyLinkButton = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const copyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
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
      className="hover:text-success transition-colors duration-300 place-self-center"
      onClick={copyLink}
    />
  );
};
const LikeButton = ({ set, loggedIn }: { set: QuestionSet; loggedIn: boolean }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleLike = (event: React.MouseEvent, id: string) => {
    event?.stopPropagation();
    dispatch(likeSet(id));
  };
  return (
    <button
          className="group rounded-full px-1"
          onClick={(event) => handleLike(event, set._id)}
          disabled={!loggedIn}
        >
          <div className="flex gap-1">
            <HeartIcon
              size={22}
              className={`group-hover:fill-error transition-all   ${
                set.liked ? "text-error" : ""
              }`}
            />
            <span className="opacity-85">{set.likes}</span>
          </div>
        </button>
  )
}
export const Socials = ({
  set,
  handleBookmark,
}: {
  set: QuestionSet;
  handleBookmark: (event: React.MouseEvent, id: string) => void;
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
    <div className="flex justify-between w-full h-fit">
      <div className="flex ">
        <LikeButton set={set} loggedIn={loggedIn} />
      </div>
      <div className="flex gap-3">
        <CopyLinkButton id={set._id} />
        <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="rounded-full group p-1"
                  onClick={(event) => handleBookmark(event, set._id)}
                  disabled={!loggedIn}
                >
                  <Bookmark
                    size={22}
                    className={` transition-all group-hover:fill-amber-500 ${
                      bookmarked && "text-amber-500"
                    }`}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bookmark</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
      </div>
    </div>
  );
};
