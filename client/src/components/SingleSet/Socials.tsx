import { MdLink as LinkIcon } from "react-icons/md";
import { FaHeart as LikeIcon } from "react-icons/fa";
import { FaBookmark as MarkIcon } from "react-icons/fa";
import { QuestionSet, RootState } from "../../types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { addBookmark, deleteBookmark } from "@/reducers/userReducer";
import { useEffect, useState } from "react";
export const Socials = ({ set, handleBookmark }: { set: QuestionSet, handleBookmark: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const bookmarks = useSelector((state: RootState) => state.user.bookmarks);
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
        <LikeIcon
          size={24}
          className="hover:text-rose-500 transition-colors duration-300"
        />
        {set.likes}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MarkIcon
                size={24}
                className={` transition-colors duration-300 ${bookmarked ? "text-amber-500 hover:text-amber-400" : "hover:text-amber-200"}`}
                onClick={handleBookmark}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Bookmark</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <LinkIcon
          size={24}
          className="hover:text-success transition-colors duration-300"
        />
      </div>
    </div>
  );
};
