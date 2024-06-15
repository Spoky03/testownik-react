import { useSelector } from "react-redux";
import { QuestionSet, RootState } from "../../types";
import { SingleSet } from "../SingleSet/SingleSet";
import { SetListTypes } from "../../types";
import { MdOutlineSort as SortIcon } from "react-icons/md";
import { useEffect, useState } from "react";
import { ShotThroughTitle } from "../ShotThroughTitile";
export const SetList = () => {
  const [sortedSetList, setSortedSetList] = useState<QuestionSet[]>([]);
  const [foreignAndNotBookmarked, setforeignAndNotBookmarked] = useState<
    QuestionSet[]
  >([]);
  const setList = useSelector(
    (state: RootState) => state.user.user?.questionSets
  );
  const bookmarks = useSelector((state: RootState) => state.user.bookmarks);
  useEffect(() => {
    if (setList && bookmarks) {
      // When sort is true, show bookmarked sets first
      const bookmarkedSets = setList.filter((set) =>
        bookmarks.includes(set._id)
      );
      const nonBookmarkedSets = setList.filter(
        (set) => !bookmarks.includes(set._id) && !set.foreign
      );
      setforeignAndNotBookmarked(
        setList.filter((set) => !bookmarks.includes(set._id) && set.foreign)
      );
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
        <div className="flex justify-end">
          <SortIcon
            size={24}
            className={`hover:text-success transition-color duration-300 ${
              0 && "-scale-y-100"
            }`}
          />
        </div>
        <ShotThroughTitle title="Your Sets" />

        <div className="flex gap-2 w-full flex-col">
          {sortedSetList ? (
            sortedSetList.map((set: QuestionSet) => {
              if (!set.questions.length) {
                return (
                  <div
                    key={set._id}
                    className={`bg-w-ternary dark:bg-ternary hover:outline font-bold rounded-md px-2 p-1 flex flex-col justify-cent w-full relative pl-5 opacity-50 pointer-events-none`}
                  >
                    {set.name}
                  </div>
                );
              }
              return (
                <SingleSet set={set} key={set._id} type={SetListTypes.QUIZ} />
              );
            })
          ) : (
            <h1>No sets</h1>
          )}
        </div>
        {foreignAndNotBookmarked.length > 0 && (
          <div className="flex flex-col">
            <ShotThroughTitle title="Foreign Sets" />
            <div className="flex gap-2 w-full flex-col">
              {foreignAndNotBookmarked.map((set: QuestionSet) => {
                return (
                  <SingleSet set={set} key={set._id} type={SetListTypes.QUIZ} />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
