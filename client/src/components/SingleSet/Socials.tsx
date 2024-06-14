import { MdLink as LinkIcon } from "react-icons/md";
import { FaHeart as LikeIcon } from "react-icons/fa";
import { QuestionSet } from "../../types";
export const Socials = ({ set }: { set: QuestionSet }) => {
    return (
        <div className="flex place-items-center">
            <div className="flex gap-4 mr-2">
                <LinkIcon size={24} className="hover:text-success transition-colors duration-300" />
                <LikeIcon size={24} className="hover:text-success transition-colors duration-300" />
            </div>
        </div>
    );
}