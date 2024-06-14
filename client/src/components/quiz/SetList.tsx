import { useSelector } from "react-redux";
import { QuestionSet, RootState } from "../../types";
import { SingleSet } from "../SingleSet/SingleSet";
import { SetListTypes } from "../../types";
import { MdOutlineSort as SortIcon } from "react-icons/md";
import { useEffect, useState } from "react";
export const SetList = () => {
  const [sortedSetList, setSortedSetList] = useState<QuestionSet[]>([]);
  const setList = useSelector(
    (state: RootState) => state.user.user?.questionSets
  );
  const bookmarks = useSelector((state: RootState) => state.user.bookmarks);
  useEffect(() => {
    if (setList && bookmarks) {
      // When sort is true, show bookmarked sets first
      const bookmarkedSets = setList.filter(set => bookmarks.includes(set._id));
      const nonBookmarkedSets = setList.filter(set => !bookmarks.includes(set._id));
      setSortedSetList([...bookmarkedSets, ...nonBookmarkedSets]);
    } else {
      // sort by completion status
      //TODO
      //!!!
    }
  }, [setList, bookmarks]);
  return (
    <div className="flex flex-col place-items-center w-screen px-5 sm:p-8">
      <div className="flex flex-col p-5 rounded-xl shadow-2xl w-full h-full bg-w-primary dark:bg-primary max-w-[900px]  ">
        <div>
          <div className="flex justify-end">
            <SortIcon
              size={24}
              className={`hover:text-success transition-color duration-300 ${
                0 && "-scale-y-100"}`}
            />
          </div>
          <div className="flex justify-between">
            <h1 className="py-1">Sets</h1>
            <h1 className="py-1">Your Progress</h1>
          </div>
          <div className="flex gap-2 w-full flex-col">
            {sortedSetList ? (
              sortedSetList.map((set: QuestionSet) => {
                return (
                  <SingleSet set={set} key={set._id} type={SetListTypes.QUIZ} />
                );
              })
            ) : (
              <h1>No sets</h1>
            )}
          </div>
        </div>
        <div className="w-full h-1 rounded-full place-self-center dark:bg-faint bg-w-faint m-3"></div>
      </div>
    </div>
  );
};
